# Model Watermarking & Fingerprinting Workshop

**Category:** Security  
**Tags:** Watermarking, PyTorch, Fine-tuning, Model Security  
**Contributors:** ADF Security Team  

## Overview

Embed invisible watermarks into model weights during fine-tuning, verify model ownership, and detect unauthorized distillation or extraction attacks using statistical fingerprinting.

**Prerequisites:** Python 3.10+, PyTorch, Hugging Face Transformers, basic understanding of LLM fine-tuning

---

## Learning Objectives

- Understand model watermarking techniques (weight-space, activation-space, output-space)
- Implement weight-space watermarking during LoRA fine-tuning
- Build verification protocols for model ownership
- Detect model extraction/distillation attacks
- Evaluate watermark robustness against removal attempts

---

## Lab Environment Setup

```bash
# Create isolated environment
python -m venv .venv-watermark
source .venv-watermark/bin/activate

# Install dependencies
pip install -U pip
pip install torch transformers accelerate peft datasets tqdm numpy scipy

# For GPU support (optional but recommended)
# pip install torch --index-url https://download.pytorch.org/whl/cu118
```

---

## Step 1: Understanding Model Watermarking

### Types of Watermarks

| Type | Location | Robustness | Detectability | Use Case |
|------|----------|------------|---------------|----------|
| **Weight-space** | Model parameters | High | Requires white-box | Ownership proof |
| **Activation-space** | Hidden states | Medium | White-box | Integrity verification |
| **Output-space** | Generated text | Low | Black-box | API protection |
| **Data-space** | Training data | Highest | Requires data access | Provenance |

### Threat Model

```
Attacker Capabilities:
├── White-box: Full model access (weights, architecture)
├── Gray-box: Architecture known, weights accessible via API
└── Black-box: Query-only access

Attacker Goals:
├── Remove watermark (fine-tuning, quantization, pruning)
├── Forge watermark (claim ownership of stolen model)
├── Extract watermark (learn embedding to copy)
└── Distill model (create smaller copy without watermark)
```

---

## Step 2: Weight-Space Watermarking with LoRA

Create `watermark/lora_watermark.py`:

```python
"""Weight-space watermarking embedded in LoRA adapters."""

import torch
import torch.nn as nn
from typing import Dict, Tuple, Optional
import hashlib
import secrets

class WatermarkedLoRA(nn.Module):
    """LoRA adapter with embedded cryptographic watermark."""
    
    def __init__(
        self,
        base_layer: nn.Linear,
        rank: int = 16,
        alpha: float = 32,
        watermark_bits: int = 128,
        seed: Optional[int] = None
    ):
        super().__init__()
        self.base_layer = base_layer
        self.rank = rank
        self.alpha = alpha
        self.scaling = alpha / rank
        self.watermark_bits = watermark_bits
        
        in_features = base_layer.in_features
        out_features = base_layer.out_features
        
        # Standard LoRA matrices
        self.lora_A = nn.Parameter(torch.zeros(rank, in_features))
        self.lora_B = nn.Parameter(torch.zeros(out_features, rank))
        
        # Watermark embedding: use LSB of LoRA weights
        self.watermark_key = self._generate_watermark_key(seed)
        self.watermark_positions = self._select_watermark_positions(
            rank, in_features, out_features, watermark_bits
        )
        
        # Initialize LoRA weights
        nn.init.kaiming_uniform_(self.lora_A, a=5**0.5)
        nn.init.zeros_(self.lora_B)
        
        # Embed watermark after initialization
        self._embed_watermark()
        
        # Freeze base layer
        for param in base_layer.parameters():
            param.requires_grad = False
    
    def _generate_watermark_key(self, seed: Optional[int]) -> bytes:
        """Generate cryptographic watermark key."""
        if seed is not None:
            torch.manual_seed(seed)
            return secrets.token_bytes(32)
        return secrets.token_bytes(32)
    
    def _select_watermark_positions(
        self, rank: int, in_features: int, out_features: int, bits: int
    ) -> list:
        """Select positions for watermark embedding using key-derived randomness."""
        # Use key to deterministically select positions
        torch.manual_seed(int.from_bytes(self.watermark_key[:8], 'big'))
        
        total_params = rank * in_features + out_features * rank
        positions = torch.randperm(total_params)[:bits].tolist()
        return positions
    
    def _embed_watermark(self):
        """Embed watermark in LSB of LoRA weights."""
        watermark = self._derive_watermark_bits()
        
        with torch.no_grad():
            flat_params = torch.cat([
                self.lora_A.flatten(),
                self.lora_B.flatten()
            ])
            
            for i, bit in enumerate(watermark):
                if i < len(self.watermark_positions):
                    pos = self.watermark_positions[i]
                    # Modify LSB to encode watermark bit
                    val = flat_params[pos]
                    # Keep magnitude, set LSB
                    new_val = torch.where(
                        bit == 1,
                        torch.abs(val) + 1e-6,  # Positive for 1
                        -torch.abs(val) - 1e-6  # Negative for 0
                    )
                    flat_params[pos] = new_val
            
            # Restore shaped parameters
            split = self.rank * self.base_layer.in_features
            self.lora_A.data = flat_params[:split].view(self.rank, -1)
            self.lora_B.data = flat_params[split:].view(self.base_layer.out_features, self.rank)
    
    def _derive_watermark_bits(self) -> list:
        """Derive watermark bits from key."""
        # Use HMAC for deterministic but secret watermark
        import hmac
        msg = b"ADF_WATERMARK_V1"
        hmac_digest = hmac.new(self.watermark_key, msg, hashlib.sha256).digest()
        bits = []
        for byte in hmac_digest:
            for i in range(8):
                bits.append((byte >> i) & 1)
        return bits[:self.watermark_bits]
    
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        """Forward pass with LoRA adaptation."""
        base_out = self.base_layer(x)
        lora_out = (x @ self.lora_A.T @ self.lora_B.T) * self.scaling
        return base_out + lora_out
    
    def verify_watermark(self) -> Tuple[bool, float]:
        """Verify watermark presence in current weights."""
        watermark = self._derive_watermark_bits()
        
        with torch.no_grad():
            flat_params = torch.cat([
                self.lora_A.flatten(),
                self.lora_B.flatten()
            ])
            
            matches = 0
            for i, bit in enumerate(watermark):
                if i < len(self.watermark_positions):
                    pos = self.watermark_positions[i]
                    val = flat_params[pos]
                    # Check sign matches watermark bit
                    predicted_bit = 1 if val > 0 else 0
                    if predicted_bit == bit:
                        matches += 1
            
            accuracy = matches / len(watermark)
            return accuracy > 0.75, accuracy  # Threshold for verification
    
    def export_verification_data(self) -> Dict:
        """Export data needed for third-party verification."""
        return {
            "watermark_key": self.watermark_key.hex(),
            "watermark_positions": self.watermark_positions,
            "watermark_bits": self.watermark_bits,
            "rank": self.rank,
            "alpha": self.alpha,
            "in_features": self.base_layer.in_features,
            "out_features": self.base_layer.out_features
        }


def apply_watermarked_lora(model, target_modules, rank=16, alpha=32, seed=None):
    """Apply watermarked LoRA to target modules."""
    watermarked_layers = {}
    
    for name, module in model.named_modules():
        if any(target in name for target in target_modules) and isinstance(module, nn.Linear):
            watermarked = WatermarkedLoRA(module, rank=rank, alpha=alpha, seed=seed)
            # Replace in model
            parent_name = '.'.join(name.split('.')[:-1])
            child_name = name.split('.')[-1]
            parent = model.get_submodule(parent_name) if parent_name else model
            setattr(parent, child_name, watermarked)
            watermarked_layers[name] = watermarked
    
    return watermarked_layers
```

---

## Step 3: Watermark Verification Protocol

Create `watermark/verification.py`:

```python """Watermark verification and ownership proof protocols."""

import torch
import json
from typing import Dict, List, Tuple
from dataclasses import dataclass
from pathlib import Path

@dataclass
class VerificationResult:
    is_authentic: bool
    confidence: float
    layer_results: Dict[str, Dict]
    ownership_proof: str

class WatermarkVerifier:
    """Verify watermarks in models for ownership proof."""
    
    def __init__(self, verification_data: Dict):
        self.verification_data = verification_data
        self.watermark_key = bytes.fromhex(verification_data["watermark_key"])
        self.watermark_positions = verification_data["watermark_positions"]
        self.watermark_bits = verification_data["watermark_bits"]
        self.rank = verification_data["rank"]
    
    def _derive_watermark_bits(self) -> List[int]:
        """Derive expected watermark bits from key."""
        import hmac, hashlib
        msg = b"ADF_WATERMARK_V1"
        hmac_digest = hmac.new(self.watermark_key, msg, hashlib.sha256).digest()
        bits = []
        for byte in hmac_digest:
            for i in range(8):
                bits.append((byte >> i) & 1)
        return bits[:self.watermark_bits]
    
    def verify_layer(self, lora_A: torch.Tensor, lora_B: torch.Tensor) -> Tuple[bool, float]:
        """Verify watermark in a single layer."""
        expected_bits = self._derive_watermark_bits()
        
        flat_params = torch.cat([lora_A.flatten(), lora_B.flatten()])
        
        matches = 0
        total = min(len(expected_bits), len(self.watermark_positions))
        
        for i in range(total):
            pos = self.watermark_positions[i]
            if pos < len(flat_params):
                val = flat_params[pos]
                predicted_bit = 1 if val > 0 else 0
                if predicted_bit == expected_bits[i]:
                    matches += 1
        
        accuracy = matches / total if total > 0 else 0
        return accuracy > 0.75, accuracy
    
    def verify_model(self, model) -> VerificationResult:
        """Verify watermark across all LoRA layers in model."""
        layer_results = {}
        total_accuracy = 0
        verified_layers = 0
        
        for name, module in model.named_modules():
            if hasattr(module, 'lora_A') and hasattr(module, 'lora_B'):
                is_valid, accuracy = self.verify_layer(module.lora_A, module.lora_B)
                layer_results[name] = {
                    "verified": is_valid,
                    "accuracy": accuracy
                }
                total_accuracy += accuracy
                verified_layers += 1
        
        avg_accuracy = total_accuracy / verified_layers if verified_layers > 0 else 0
        is_authentic = avg_accuracy > 0.75 and verified_layers > 0
        
        # Generate ownership proof
        ownership_proof = self._generate_ownership_proof(layer_results, avg_accuracy)
        
        return VerificationResult(
            is_authentic=is_authentic,
            confidence=avg_accuracy,
            layer_results=layer_results,
            ownership_proof=ownership_proof
        )
    
    def _generate_ownership_proof(self, layer_results: Dict, avg_accuracy: float) -> str:
        """Generate cryptographic ownership proof."""
        import hashlib, time
        
        proof_data = {
            "timestamp": int(time.time()),
            "watermark_key_hash": hashlib.sha256(self.watermark_key).hexdigest()[:16],
            "verified_layers": sum(1 for r in layer_results.values() if r["verified"]),
            "total_layers": len(layer_results),
            "average_accuracy": avg_accuracy
        }
        
        proof_str = json.dumps(proof_data, sort_keys=True)
        proof_hash = hashlib.sha256(proof_str.encode()).hexdigest()
        
        return f"ADF_WATERMARK_PROOF:{proof_hash[:32]}"


def demo_verification():
    """Demonstrate watermark verification."""
    from watermark.lora_watermark import WatermarkedLoRA, apply_watermarked_lora
    from transformers import AutoModelForCausalLM
    
    # Load a small model for demo
    model = AutoModelForCausalLM.from_pretrained(
        "microsoft/DialoGPT-small",
        torch_dtype=torch.float32
    )
    
    # Apply watermarked LoRA
    target_modules = ["c_attn", "c_proj", "c_fc"]
    watermarked = apply_watermarked_lora(model, target_modules, seed=42)
    
    # Get verification data from first layer
    first_layer = list(watermarked.values())[0]
    verification_data = first_layer.export_verification_data()
    
    # Save verification data (in practice, store securely)
    with open("watermark_verification.json", "w") as f:
        json.dump(verification_data, f, indent=2)
    
    print("Watermark embedded and verification data saved.")
    
    # Verify
    verifier = WatermarkVerifier(verification_data)
    result = verifier.verify_model(model)
    
    print(f"\nVerification Result:")
    print(f"  Authentic: {result.is_authentic}")
    print(f"  Confidence: {result.confidence:.3f}")
    print(f"  Ownership Proof: {result.ownership_proof}")
    print(f"  Verified Layers: {sum(1 for r in result.layer_results.values() if r['verified'])}/{len(result.layer_results)}")


if __name__ == "__main__":
    demo_verification()
```

---

## Step 4: Distillation Detection

Create `watermark/distillation_detector.py`:

```python
"""Detect model distillation/extraction via watermark analysis."""

import torch
import torch.nn as nn
import numpy as np
from typing import Dict, List, Tuple
from dataclasses import dataclass

@dataclass
class DistillationReport:
    is_distilled: bool
    confidence: float
    evidence: List[str]
    watermark_survival_rate: float

class DistillationDetector:
    """Detect if a model has been distilled from a watermarked model."""
    
    def __init__(self, original_verification_data: Dict):
        self.original_verifier = WatermarkVerifier(original_verification_data)
    
    def analyze_weight_distribution(self, model) -> Dict:
        """Analyze weight statistics for distillation artifacts."""
        stats = {}
        
        for name, param in model.named_parameters():
            if param.requires_grad and "lora" in name.lower():
                data = param.detach().cpu().flatten().numpy()
                stats[name] = {
                    "mean": float(np.mean(data)),
                    "std": float(np.std(data)),
                    "skew": float(self._skewness(data)),
                    "kurtosis": float(self._kurtosis(data)),
                    "l1_norm": float(np.sum(np.abs(data))),
                    "l2_norm": float(np.sqrt(np.sum(data**2)))
                }
        
        return stats
    
    def _skewness(self, data):
        """Calculate skewness."""
        mean = np.mean(data)
        std = np.std(data)
        if std == 0:
            return 0
        return np.mean(((data - mean) / std) ** 3)
    
    def _kurtosis(self, data):
        """Calculate kurtosis."""
        mean = np.mean(data)
        std = np.std(data)
        if std == 0:
            return 0
        return np.mean(((data - mean) / std) ** 4) - 3
    
    def compare_with_original(self, model, original_stats: Dict) -> Tuple[bool, float, List[str]]:
        """Compare current model stats with original watermarked model."""
        current_stats = self.analyze_weight_distribution(model)
        evidence = []
        similarity_scores = []
        
        for name in original_stats:
            if name in current_stats:
                orig = original_stats[name]
                curr = current_stats[name]
                
                # Compare key statistics
                mean_diff = abs(orig["mean"] - curr["mean"]) / (abs(orig["mean"]) + 1e-8)
                std_diff = abs(orig["std"] - curr["std"]) / (orig["std"] + 1e-8)
                
                similarity = 1 - (mean_diff + std_diff) / 2
                similarity_scores.append(similarity)
                
                if mean_diff > 0.5 or std_diff > 0.5:
                    evidence.append(f"{name}: Significant weight distribution shift (mean Δ={mean_diff:.2f}, std Δ={std_diff:.2f})")
        
        avg_similarity = np.mean(similarity_scores) if similarity_scores else 0
        is_distilled = avg_similarity < 0.7  # Threshold for distillation
        
        return is_distilled, avg_similarity, evidence
    
    def check_watermark_survival(self, model) -> float:
        """Check what fraction of watermark bits survive."""
        result = self.original_verifier.verify_model(model)
        
        # Count layers with surviving watermark
        surviving = sum(1 for r in result.layer_results.values() if r["verified"])
        total = len(result.layer_results)
        
        return surviving / total if total > 0 else 0
    
    def detect(self, model, original_stats: Dict = None) -> DistillationReport:
        """Run full distillation detection."""
        
        # Check watermark survival
        survival_rate = self.check_watermark_survival(model)
        
        # Weight distribution analysis
        is_distilled_weight, weight_similarity, evidence = False, 1.0, []
        if original_stats:
            is_distilled_weight, weight_similarity, evidence = self.compare_with_original(model, original_stats)
        
        # Combined decision
        is_distilled = (survival_rate < 0.5) or is_distilled_weight
        confidence = max(1 - survival_rate, 1 - weight_similarity) if is_distilled else min(survival_rate, weight_similarity)
        
        if survival_rate < 0.5:
            evidence.insert(0, f"Watermark survival rate critically low: {survival_rate:.1%}")
        
        return DistillationReport(
            is_distilled=is_distilled,
            confidence=confidence,
            evidence=evidence,
            watermark_survival_rate=survival_rate
        )


def demo_distillation_detection():
    """Demonstrate distillation detection."""
    # This would compare a suspect model against original watermarked model
    print("Distillation Detection Module")
    print("Usage: detector = DistillationDetector(verification_data)")
    print("       report = detector.detect(suspect_model, original_stats)")
    print("       print(report.is_distilled, report.confidence, report.evidence)")


if __name__ == "__main__":
    demo_distillation_detection()
```

---

## Step 5: Robustness Evaluation

Create `watermark/robustness_test.py`:

```python
"""Test watermark robustness against removal attacks."""

import torch
import torch.nn as nn
import copy
from typing import Dict, List
from watermark.lora_watermark import WatermarkedLoRA, apply_watermarked_lora
from watermark.verification import WatermarkVerifier

class RobustnessTester:
    """Test watermark robustness against various attacks."""
    
    def __init__(self, model, verification_data: Dict):
        self.original_model = model
        self.verification_data = verification_data
        self.verifier = WatermarkVerifier(verification_data)
        self.baseline_result = self.verifier.verify_model(model)
    
    def test_fine_tuning(self, epochs: int = 3, lr: float = 1e-4) -> Dict:
        """Test watermark survival after fine-tuning."""
        model_copy = copy.deepcopy(self.original_model)
        
        # Simulate fine-tuning on new data
        optimizer = torch.optim.AdamW(
            [p for p in model_copy.parameters() if p.requires_grad],
            lr=lr
        )
        
        # Dummy training loop
        for epoch in range(epochs):
            # In practice, use real data
            dummy_input = torch.randint(0, 1000, (2, 128))
            dummy_labels = torch.randint(0, 1000, (2, 128))
            
            outputs = model_copy(dummy_input, labels=dummy_labels)
            loss = outputs.loss
            loss.backward()
            optimizer.step()
            optimizer.zero_grad()
        
        result = self.verifier.verify_model(model_copy)
        return {
            "attack": "fine_tuning",
            "epochs": epochs,
            "survived": result.is_authentic,
            "confidence": result.confidence,
            "baseline_confidence": self.baseline_result.confidence
        }
    
    def test_quantization(self, bits: int = 4) -> Dict:
        """Test watermark survival after quantization."""
        model_copy = copy.deepcopy(self.original_model)
        
        # Simulate quantization (weight rounding)
        with torch.no_grad():
            for param in model_copy.parameters():
                if param.requires_grad:
                    # Quantize to n bits
                    max_val = param.abs().max()
                    scale = (2**bits - 1) / max_val
                    param.data = torch.round(param * scale) / scale
        
        result = self.verifier.verify_model(model_copy)
        return {
            "attack": f"quantization_{bits}bit",
            "survived": result.is_authentic,
            "confidence": result.confidence,
            "baseline_confidence": self.baseline_result.confidence
        }
    
    def test_pruning(self, sparsity: float = 0.3) -> Dict:
        """Test watermark survival after magnitude pruning."""
        model_copy = copy.deepcopy(self.original_model)
        
        with torch.no_grad():
            for param in model_copy.parameters():
                if param.requires_grad and param.dim() > 1:
                    # Magnitude pruning
                    threshold = torch.quantile(param.abs().flatten(), sparsity)
                    mask = param.abs() > threshold
                    param.data *= mask.float()
        
        result = self.verifier.verify_model(model_copy)
        return {
            "attack": f"pruning_{sparsity:.0%}",
            "survived": result.is_authentic,
            "confidence": result.confidence,
            "baseline_confidence": self.baseline_result.confidence
        }
    
    def test_fine_tuning_plus_quantization(self) -> Dict:
        """Test combined attack: fine-tuning then quantization."""
        # First fine-tune
        ft_result = self.test_fine_tuning(epochs=2)
        
        # Then quantize the fine-tuned model
        # (simplified - in practice would chain properly)
        return {
            "attack": "fine_tuning+quantization",
            "note": "Combined attack typically more destructive"
        }
    
    def run_all_tests(self) -> List[Dict]:
        """Run complete robustness evaluation."""
        results = []
        
        print("Running robustness tests...")
        
        # Test fine-tuning
        for epochs in [1, 3, 5]:
            r = self.test_fine_tuning(epochs=epochs)
            results.append(r)
            print(f"  Fine-tuning {epochs} epochs: {'Survived' if r['survived'] else 'Broken'} (conf: {r['confidence']:.3f})")
        
        # Test quantization
        for bits in [8, 4, 3]:
            r = self.test_quantization(bits=bits)
            results.append(r)
            print(f"  Quantization {bits}-bit: {'Survived' if r['survived'] else 'Broken'} (conf: {r['confidence']:.3f})")
        
        # Test pruning
        for sparsity in [0.1, 0.3, 0.5]:
            r = self.test_pruning(sparsity=sparsity)
            results.append(r)
            print(f"  Pruning {sparsity:.0%}: {'Survived' if r['survived'] else 'Broken'} (conf: {r['confidence']:.3f})")
        
        return results


def demo_robustness():
    """Demonstrate robustness testing."""
    from transformers import AutoModelForCausalLM
    from watermark.lora_watermark import apply_watermarked_lora
    
    model = AutoModelForCausalLM.from_pretrained(
        "microsoft/DialoGPT-small",
        torch_dtype=torch.float32
    )
    
    watermarked = apply_watermarked_lora(model, ["c_attn", "c_proj"], seed=42)
    verification_data = list(watermarked.values())[0].export_verification_data()
    
    tester = RobustnessTester(model, verification_data)
    results = tester.run_all_tests()
    
    print("\nRobustness Summary:")
    for r in results:
        status = "✓" if r.get("survived", False) else "✗"
        print(f"  {status} {r['attack']}")


if __name__ == "__main__":
    demo_robustness()
```

---

## Step 6: Complete Integration Example

Create `watermark/complete_example.py`:

```python
"""Complete watermarking workflow: train, verify, detect."""

import torch
import json
from pathlib import Path
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments, Trainer
from peft import LoraConfig, get_peft_model
from datasets import load_dataset

from watermark.lora_watermark import apply_watermarked_lora
from watermark.verification import WatermarkVerifier
from watermark.distillation_detector import DistillationDetector
from watermark.robustness_test import RobustnessTester

def main():
    print("=" * 60)
    print("MODEL WATERMARKING COMPLETE WORKFLOW")
    print("=" * 60)
    
    # 1. Load base model
    print("\n1. Loading base model...")
    model = AutoModelForCausalLM.from_pretrained(
        "microsoft/DialoGPT-small",
        torch_dtype=torch.float32
    )
    tokenizer = AutoTokenizer.from_pretrained("microsoft/DialoGPT-small")
    tokenizer.pad_token = tokenizer.eos_token
    
    # 2. Apply watermarked LoRA
    print("\n2. Applying watermarked LoRA...")
    target_modules = ["c_attn", "c_proj", "c_fc"]
    watermarked_layers = apply_watermarked_lora(model, target_modules, seed=42)
    
    # Save verification data
    verification_data = list(watermarked_layers.values())[0].export_verification_data()
    with open("watermark_verification.json", "w") as f:
        json.dump(verification_data, f, indent=2)
    print("   Verification data saved to watermark_verification.json")
    
    # 3. Verify immediately after embedding
    print("\n3. Verifying watermark...")
    verifier = WatermarkVerifier(verification_data)
    result = verifier.verify_model(model)
    print(f"   Authentic: {result.is_authentic}")
    print(f"   Confidence: {result.confidence:.3f}")
    print(f"   Proof: {result.ownership_proof}")
    
    # 4. Simulate fine-tuning on downstream task
    print("\n4. Fine-tuning on downstream task...")
    # (Using dummy data for demo)
    train_dataset = load_dataset("wikitext", "wikitext-2-raw-v1", split="train[:100]")
    
    def tokenize(examples):
        return tokenizer(examples["text"], truncation=True, max_length=128, padding="max_length")
    
    train_dataset = train_dataset.map(tokenize, batched=True)
    train_dataset.set_format(type="torch", columns=["input_ids", "attention_mask"])
    
    training_args = TrainingArguments(
        output_dir="./watermarked_model",
        num_train_epochs=1,
        per_device_train_batch_size=2,
        learning_rate=1e-4,
        logging_steps=10,
        save_strategy="no",
        report_to="none"
    )
    
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
    )
    trainer.train()
    
    # 5. Verify after fine-tuning
    print("\n5. Verifying after fine-tuning...")
    result = verifier.verify_model(model)
    print(f"   Authentic: {result.is_authentic}")
    print(f"   Confidence: {result.confidence:.3f}")
    
    # 6. Test distillation detection
    print("\n6. Testing distillation detection...")
    detector = DistillationDetector(verification_data)
    
    # Save original stats
    original_stats = detector.analyze_weight_distribution(model)
    
    # Create a "distilled" model (simulated by heavy quantization)
    suspect_model = copy.deepcopy(model)
    with torch.no_grad():
        for param in suspect_model.parameters():
            if param.requires_grad:
                # Aggressive 3-bit quantization
                max_val = param.abs().max()
                scale = 7 / max_val
                param.data = torch.round(param * scale) / scale
    
    report = detector.detect(suspect_model, original_stats)
    print(f"   Is Distilled: {report.is_distilled}")
    print(f"   Confidence: {report.confidence:.3f}")
    print(f"   Watermark Survival: {report.watermark_survival_rate:.1%}")
    for ev in report.evidence:
        print(f"   - {ev}")
    
    # 7. Robustness testing
    print("\n7. Robustness testing...")
    tester = RobustnessTester(model, verification_data)
    results = tester.run_all_tests()
    
    print("\n" + "=" * 60)
    print("WORKFLOW COMPLETE")
    print("=" * 60)
    print("\nKey files generated:")
    print("  - watermark_verification.json (keep secure!)")
    print("  - ./watermarked_model/ (fine-tuned model)")

if __name__ == "__main__":
    import copy
    main()
```

---

## Verification Checklist

- [ ] Watermark embeds successfully in LoRA weights
- [ ] Verification confirms authenticity with >95% confidence
- [ ] Watermark survives 1-3 epochs of fine-tuning
- [ ] Watermark survives 8-bit quantization
- [ ] Distillation detection identifies quantized copies
- [ ] Ownership proof generates correctly

---

## Advanced Topics

### 1. Multi-Key Watermarking
Embed multiple independent watermarks for different stakeholders (trainer, licensee, auditor).

### 2. Zero-Knowown Proof Verification
Use zk-SNARKs to prove watermark knowledge without revealing key.

### 3. Fingerprinting via Activation Patterns
Record characteristic activation patterns for specific inputs as behavioral fingerprints.

### 4. Federated Watermarking
Coordinate watermarks across federated learning participants.

---

## Resources

- [DeepSigns: Watermarking Deep Neural Networks](https://arxiv.org/abs/1804.00738)
- [Protecting Intellectual Property of Deep Neural Networks](https://arxiv.org/abs/1906.04102)
- [Watermarking LLMs](https://arxiv.org/abs/2301.10226)
- [Model Extraction Attacks](https://arxiv.org/abs/1910.11772)
- [LoRA: Low-Rank Adaptation](https://arxiv.org/abs/2106.09685)