/**
 * LLM Tools collection structured as entries
 * 
 * Each entry has the following structure:
 * {
 *     title: string // display name
 *     link: string // the link for the website which contain learning resources
 *     description?: string // description that will be listed with your entry
 *     github?: string // username on github that will display a link to your repo
 *     tag: string // category/tag of the tool
 * }
 */

export const llmEntries = [
  // LLM Frameworks
  {
    title: "LangChain",
    link: "https://github.com/langchain-ai/langchain",
    description: "Building applications with LLMs through composability",
    github: "langchain-ai",
    tag: "LLM Framework"
  },
  {
    title: "LlamaIndex",
    link: "https://github.com/jerryjliu/llama_index",
    description: "A data framework for your LLM applications",
    github: "jerryjliu",
    tag: "LLM Framework"
  },
  {
    title: "Haystack",
    link: "https://github.com/deepset-ai/haystack",
    description: "LLM orchestration framework to build NLP applications with LLMs, vector search and more",
    github: "deepset-ai",
    tag: "LLM Framework"
  },
  {
    title: "Semantic Kernel",
    link: "https://github.com/microsoft/semantic-kernel",
    description: "Microsoft's SDK that integrates large language models (LLMs) with conventional programming languages",
    github: "microsoft",
    tag: "LLM Framework"
  },
  {
    title: "LlamaHub",
    link: "https://github.com/run-llama/llama-hub",
    description: "A library of data loaders and tools for connecting LLMs with various data sources",
    github: "run-llama",
    tag: "LLM Framework"
  },
  {
    title: "AutoGen",
    link: "https://github.com/microsoft/autogen",
    description: "Build multi-agent conversational systems with customizable, autonomous agents",
    github: "microsoft",
    tag: "LLM Framework"
  },
  
  // LLM Models
  {
    title: "Llama",
    link: "https://github.com/facebookresearch/llama",
    description: "Open source large language models by Meta",
    github: "facebookresearch",
    tag: "LLM Model"
  },
  {
    title: "Mistral",
    link: "https://github.com/mistralai/mistral-src",
    description: "Mistral AI 7B v0.1 model reference implementation",
    github: "mistralai",
    tag: "LLM Model"
  },
  {
    title: "Falcon",
    link: "https://github.com/falconry/falcon",
    description: "An open source implementation of high-performing language models from TII",
    github: "falconry",
    tag: "LLM Model"
  },
  {
    title: "MPT",
    link: "https://github.com/mosaicml/llm-foundry",
    description: "MosaicML's MPT models built with LLM Foundry",
    github: "mosaicml",
    tag: "LLM Model"
  },
  {
    title: "Dolly",
    link: "https://github.com/databrickslabs/dolly",
    description: "Databricks' open-source instruction-following LLM",
    github: "databrickslabs",
    tag: "LLM Model"
  },
  {
    title: "StableLM",
    link: "https://github.com/Stability-AI/StableLM",
    description: "Stability AI Language Models",
    github: "Stability-AI",
    tag: "LLM Model"
  },
  
  // LLM Vector Databases
  {
    title: "Chroma",
    link: "https://github.com/chroma-core/chroma",
    description: "The AI-native open-source embedding database",
    github: "chroma-core",
    tag: "LLM Vector Database"
  },
  {
    title: "Milvus",
    link: "https://github.com/milvus-io/milvus",
    description: "Vector database for embedding similarity search and AI applications",
    github: "milvus-io",
    tag: "LLM Vector Database"
  },
  {
    title: "Qdrant",
    link: "https://github.com/qdrant/qdrant",
    description: "High-performance, massive-scale Vector Database for the next generation of AI",
    github: "qdrant",
    tag: "LLM Vector Database"
  },
  {
    title: "Pinecone",
    link: "https://www.pinecone.io/",
    description: "Managed vector database built for speed and scale",
    tag: "LLM Vector Database"
  },
  {
    title: "Weaviate",
    link: "https://github.com/weaviate/weaviate",
    description: "Vector database that allows for hybrid searches combining vector and scalar data",
    github: "weaviate",
    tag: "LLM Vector Database"
  },
  {
    title: "Faiss",
    link: "https://github.com/facebookresearch/faiss",
    description: "A library for efficient similarity search and clustering of dense vectors",
    github: "facebookresearch",
    tag: "LLM Vector Database"
  },
  
  // LLM Tools

  {
    title: "LangFlow",
    link: "https://github.com/logspace-ai/langflow",
    description: "An effortless way to experiment and prototype LangChain flows with drag-and-drop components and a chat interface.",
    github: "logspace-ai",
    tag: "LLM Tool"
  },
  {
    title: "LMQL",
    link: "https://github.com/eth-sri/lmql",
    description: "A query language for programming language models",
    github: "eth-sri",
    tag: "LLM Tool"
  },
  {
    title: "Guidance",
    link: "https://github.com/guidance-ai/guidance",
    description: "A structured approach to controlling large language models",
    github: "guidance-ai",
    tag: "LLM Tool"
  },
  {
    title: "vLLM",
    link: "https://github.com/vllm-project/vllm",
    description: "High-throughput and memory-efficient inference and serving engine for LLMs",
    github: "vllm-project",
    tag: "LLM Tool"
  },
  {
    title: "PEFT",
    link: "https://github.com/huggingface/peft",
    description: "Parameter-Efficient Fine-Tuning (PEFT) methods",
    github: "huggingface",
    tag: "LLM Tool"
  },
  {
    title: "LangSmith",
    link: "https://github.com/langchain-ai/langsmith-sdk",
    description: "Platform for debugging, testing, evaluating, and monitoring LLM applications",
    github: "langchain-ai",
    tag: "LLM Tool"
  },
  {
    title: "LiteLLM",
    link: "https://github.com/BerriAI/litellm",
    description: "Call all LLM APIs using the OpenAI format (Anthropic, Cohere, Replicate, etc.)",
    github: "BerriAI",
    tag: "LLM Tool"
  },
  
  // LLM Embedding Tools
  {
    title: "EmbedJs",
    link: "https://github.com/llm-tools/embedjs",
    description: "Framework for personalizing LLM responses with RAG capabilities",
    github: "llm-tools",
    tag: "LLM Embedding Tool"
  },
  {
    title: "Sentence Transformers",
    link: "https://github.com/UKPLab/sentence-transformers",
    description: "Compute dense vector representations for sentences, paragraphs, and images",
    github: "UKPLab",
    tag: "LLM Embedding Tool"
  },
  {
    title: "SimCSE",
    link: "https://github.com/princeton-nlp/SimCSE",
    description: "Simple Contrastive Learning of Sentence Embeddings",
    github: "princeton-nlp",
    tag: "LLM Embedding Tool"
  },
  {
    title: "OpenAI Embeddings",
    link: "https://platform.openai.com/docs/guides/embeddings",
    description: "Vector representations of text that can be used for search, clustering, recommendations, and other NLP tasks",
    tag: "LLM Embedding Tool"
  },
  
  // LLM Evaluation
  {
    title: "RAGAS",
    link: "https://github.com/explodinggradients/ragas",
    description: "Evaluation framework for your Retrieval Augmented Generation (RAG) pipelines",
    github: "explodinggradients",
    tag: "LLM Evaluation"
  },
  {
    title: "TruLens",
    link: "https://github.com/truera/trulens",
    description: "Evaluation suite for LLM applications with feedback functions for relevance, groundedness, and more",
    github: "truera",
    tag: "LLM Evaluation"
  },
  {
    title: "HELM",
    link: "https://github.com/stanford-crfm/helm",
    description: "Holistic Evaluation of Language Models",
    github: "stanford-crfm",
    tag: "LLM Evaluation"
  },

// llm hosting
  {
  title: "Nebius",
  link: "https://nebius.com/explorer-tier",
  description: "Nebius Explorer Tier: Just $1.50 per GPU hour for H100 NVIDIA Tensor Core GPUs!",
  tag: "LLM Hosting"
},
{
  title: "TensorWave",
  link: "https://go.tensorwave.com",
  description: "A platform for hosting and deploying machine learning models.",
  tag: "LLM Hosting"
},
{
  title: "Paperspace Gradient",
  link: "https://paperspace.com/deployments",
  description: "Deploy and manage machine learning models with Paperspace Gradient.",
  tag: "LLM Hosting"
},
{
  title: "AWS SageMaker",
  link: "https://aws.amazon.com/sagemaker",
  description: "Amazon SageMaker enables developers to build, train, and deploy machine learning models at scale.",
  tag: "LLM Hosting"
},
{
  title: "Azure AI Machine Learning Studio",
  link: "https://studio.azureml.net",
  description: "Build, train, and deploy machine learning models with Azure AI Machine Learning Studio.",
  tag: "LLM Hosting"
},
{
  title: "Google Vertex AI",
  link: "https://cloud.google.com/vertex-ai",
  description: "Google Vertex AI is a unified platform for building and deploying machine learning models.",
  tag: "LLM Hosting"
},
{
  title: "NVIDIA Triton Inference Server",
  link: "https://developer.nvidia.com/triton-inference-se",
  description: "Deploy high-performance inference models with NVIDIA Triton Inference Server.",
  tag: "LLM Hosting"
},
{
  title: "TensorDock",
  link: "https://tensordock.com/product-marketplace",
  description: "A marketplace for on-demand GPU cloud hosting.",
  tag: "LLM Hosting"
},
{
  title: "TrueFoundry",
  link: "https://truefoundry.com/llmops",
  description: "LLMOps platform for hosting and managing machine learning models.",
  tag: "LLM Hosting"
},
{
  title: "Latitude",
  link: "https://latitude.sh/accelerate/pricing",
  description: "Affordable GPU hosting with Latitude's Accelerate platform.",
  tag: "LLM Hosting"
},
{
  title: "Banana",
  link: "https://banana.dev",
  description: "Run machine learning models at scale with Banana.",
  tag: "LLM Hosting"
},
{
  title: "Beam Cloud",
  link: "https://beam.cloud",
  description: "A platform for hosting and scaling AI models with ease.",
  tag: "LLM Hosting"
},
{
  title: "Lightning",
  link: "https://lightning.ai",
  description: "Simplify machine learning model training and deployment with Lightning.",
  tag: "LLM Hosting"
},
{
  title: "Genesis Cloud",
  link: "https://genesiscloud.com",
  description: "High-performance cloud GPU hosting for AI and machine learning workloads.",
  tag: "LLM Hosting"
},
{
  title: "Vultr",
  link: "https://vultr.com/pricing",
  description: "Cloud compute and GPU hosting at competitive prices.",
  tag: "LLM Hosting"
},
{
  title: "ScaleWay",
  link: "https://scaleway.com/en",
  description: "ScaleWay provides cloud infrastructure for machine learning and AI workloads.",
  tag: "LLM Hosting"
},
{
  title: "CudoCompute",
  link: "https://cudocompute.com",
  description: "Cloud GPU hosting and compute services for AI.",
  tag: "LLM Hosting"
},
{
  title: "Unweave",
  link: "https://unweave.io",
  description: "Run and deploy machine learning models with Unweave's cloud platform.",
  tag: "LLM Hosting"
},
{
  title: "Vagon",
  link: "https://vagon.io",
  description: "Vagon provides high-performance cloud computing for AI workloads.",
  tag: "LLM Hosting"
},
{
  title: "LeaderGPU",
  link: "https://leadergpu.com",
  description: "Affordable and powerful GPU cloud hosting services.",
  tag: "LLM Hosting"
},
{
  title: "CirraScale",
  link: "https://cirrascale.com",
  description: "GPU cloud hosting optimized for training and inference.",
  tag: "LLM Hosting"
},
{
  title: "Vast.AI",
  link: "https://vast.ai",
  description: "A decentralized cloud GPU marketplace for AI and deep learning workloads.",
  tag: "LLM Hosting"
},
{
  title: "Immers Cloud",
  link: "https://en.immers.cloud/gpu",
  description: "Cloud hosting for GPU-intensive AI and machine learning tasks.",
  tag: "LLM Hosting"
},
{
  title: "Fai.ai",
  link: "https://fal.ai",
  description: "A platform for hosting and managing AI workloads efficiently.",
  tag: "LLM Hosting"
},

  {
  title: "RunPod",
  link: "https://runpod.io",
  description: "Affordable GPU hosting: A100 80GB $1.89/hr, H100 80GB $3.89/hr, A40 48GB $0.79/hr, RTX 4090 24GB $0.74/hr, RTX A6000 48GB $0.79/hr.",
  tag: "LLM Hosting"
},
{
  title: "HuggingFace Endpoint",
  link: "https://huggingface.co/inference-endpoints",
  description: "Deploy and serve machine learning models with Hugging Face Inference Endpoints.",
  tag: "LLM Hosting"
},
{
  title: "Modelbit",
  link: "https://modelbit.com",
  description: "Host and manage machine learning models with ease using Modelbit.",
  tag: "LLM Hosting"
},
{
  title: "Haven",
  link: "https://haven.run",
  description: "A platform for hosting and deploying machine learning models.",
  tag: "LLM Hosting"
},
{
  title: "Replicate",
  link: "https://replicate.com",
  description: "Run machine learning models in the cloud with Replicate.",
  tag: "LLM Hosting"
},
{
  title: "BaseTen",
  link: "https://baseten.co",
  description: "Deploy, monitor, and iterate on machine learning models with BaseTen.",
  tag: "LLM Hosting"
},
{
  title: "Modal",
  link: "https://modal.com",
  description: "Simplify machine learning model hosting and execution on Modal.",
  tag: "LLM Hosting"
},
{
  title: "Mystic",
  link: "https://mystic.ai",
  description: "Host and manage AI models with Mystic.",
  tag: "LLM Hosting"
},
{
  title: "Salad",
  link: "https://salad.com",
  description: "A platform for hosting AI and machine learning workloads.",
  tag: "LLM Hosting"
},
{
  title: "SaturnCloud",
  link: "https://saturncloud.io",
  description: "Collaborative data science and machine learning in the cloud.",
  tag: "LLM Hosting"
},
{
  title: "DataRobot Algorithmia",
  link: "https://datarobot.com/platform/deploy-and-run",
  description: "Deploy and manage models with DataRobot Algorithmia.",
  tag: "LLM Hosting"
},
{
  title: "DataBricks",
  link: "https://docs.databricks.com/en/machine-learning/",
  description: "A cloud platform for big data analytics and machine learning.",
  tag: "LLM Hosting"
},
{
  title: "Kaggle",
  link: "https://kaggle.com",
  description: "Collaborate, learn, and host machine learning models on Kaggle.",
  tag: "LLM Hosting"
},
{
  title: "Google Colab",
  link: "https://colab.google",
  description: "A free cloud-based Jupyter notebook environment for machine learning.",
  tag: "LLM Hosting"
},
{
  title: "QBlocks",
  link: "https://qblocks.cloud",
  description: "Cloud hosting and deployment for machine learning models.",
  tag: "LLM Hosting"
},
{
  title: "DataCrunch",
  link: "https://datacrunch.io/inference",
  description: "Fast and affordable GPU hosting for machine learning and AI workloads.",
  tag: "LLM Hosting"
},
{
  title: "DStack",
  link: "https://dstack.ai",
  description: "Deploy, monitor, and manage machine learning pipelines easily.",
  tag: "LLM Hosting"
},
{
  title: "CloudFlare",
  link: "https://ai.cloudflare.com",
  description: "AI hosting and deployment with Cloudflare's cloud services.",
  tag: "LLM Hosting"
},
{
  title: "Predibase",
  link: "https://predibase.com",
  description: "Deploy machine learning models and pipelines with Predibase.",
  tag: "LLM Hosting"
},
{
  title: "Encloud",
  link: "https://encloud.tech",
  description: "AI cloud hosting with high performance and scalability.",
  tag: "LLM Hosting"
},
{
  title: "MosaicML",
  link: "https://mosaicml.com",
  description: "Optimize and deploy machine learning models on MosaicML.",
  tag: "LLM Hosting"
},
{
  title: "SeaPlane",
  link: "https://seaplane.io",
  description: "Cloud platform for hosting machine learning models with SeaPlane.",
  tag: "LLM Hosting"
},
{
  title: "llama.cpp",
  link: "https://github.com/ggml-org/llama.cpp",
  description: "A C++ implementation of LLaMA model inference, optimized for CPU-based environments.",
  github: "ggml-org",
  tag: "LLM Hosting"
},
  {
  title: "SkyPilot",
  link: "https://github.com/skypilot-org/skypilot",
  description: "Framework for seamlessly running ML workloads on any cloud.",
  github: "skypilot-org",
  tag: "LLM Hosting"
},
  {
  title: "Titan",
  link: "https://titanml.co",
  description: "A platform for hosting and managing LLMs with ease.",
  tag: "LLM Hosting"
},
{
  title: "ollama.ai",
  link: "https://ollama.ai",
  description: "Service for deploying and hosting LLMs with optimized performance.",
  tag: "LLM Hosting"
},
  {
  title: "Together AI",
  link: "https://together.ai",
  description: "LLM hosting platform with a focus on collaborative AI development. Token cost applies.",
  tag: "LLM Hosting"
},
{
  title: "Mistral AI Platform",
  link: "https://mistral.ai",
  description: "A platform for deploying and managing Mistral AI models. Token cost applies.",
  tag: "LLM Hosting"
},
{
  title: "AWS BedRock",
  link: "https://aws.amazon.com/bedrock",
  description: "Amazon's fully managed service for deploying and scaling foundation models. Token cost applies.",
  tag: "LLM Hosting"
},
{
  title: "Anyscale",
  link: "https://anyscale.com/endpoints",
  description: "Deploy and manage machine learning models with Anyscale Endpoints. Token cost applies.",
  tag: "LLM Hosting"
},
{
  title: "Lamini.ai",
  link: "https://lamini.ai",
  description: "A platform for fine-tuning and hosting LLMs. Token cost applies.",
  tag: "LLM Hosting"
},
{
  title: "OpenPipe",
  link: "https://openpipe.ai",
  description: "A service for hosting and managing machine learning models. Token cost applies.",
  tag: "LLM Hosting"
},
{
  title: "Fireworks AI",
  link: "https://app.fireworks.ai",
  description: "A platform for hosting and running AI models at scale. Token cost applies.",
  tag: "LLM Hosting"
},
{
  title: "OpenRouter",
  link: "https://openrouter.ai",
  description: "LLM hosting service offering flexible deployment options. Token cost applies.",
  tag: "LLM Hosting"
},
{
  title: "DeepInfra",
  link: "https://deepinfra.com",
  description: "A platform for hosting AI inference services. Token cost applies.",
  tag: "LLM Hosting"
},
//LLM Prompt Management
{
  title: "PromptLayer",
  link: "https://www.promptlayer.com",
  description: "Prompt engineering platform. Collaborate, test, evaluate, and monitor your LLM applications.",
  tag: "LLM Prompt Management"
},
{
  title: "PromptDX",
  link: "https://github.com/puzzlet-ai/promptdx",
  description: "A declarative, extensible, and composable approach for developing LLM prompts using Markdown and JSX.",
  github: "puzzlet-ai",
  tag: "LLM Prompt Management"
},
{
  title: "PromptHub",
  link: "https://www.prompthub.us",
  description: "Full stack prompt management tool designed to be usable by technical and non-technical team members. Test, version, collaborate, and deploy prompts.",
  tag: "LLM Prompt Management"
},
{
  title: "PromptFoundry",
  link: "https://www.promptfoundry.ai",
  description: "A simple prompt engineering and evaluation tool designed for developers building AI applications.",
  tag: "LLM Prompt Management"
},
{
  title: "PromptTools",
  link: "https://github.com/hegelai/prompttools",
  description: "Open-source tools for testing and experimenting with prompts. Evaluate prompts using metrics and automated tests.",
  github: "hegelai",
  tag: "LLM Prompt Management"
},
{
  title: "PromptFlow",
  link: "https://github.com/logspace-ai/langflow",
  description: "An effortless way to prototype and manage LLM prompts with a user-friendly drag-and-drop interface.",
  github: "logspace-ai",
  tag: "LLM Prompt Management"
},
  //LLM Observability 

  {
  title: "Helicone",
  link: "https://github.com/Helicone/helicone",
  description: "Open-source LLM observability platform for logging, monitoring, and debugging AI applications.",
  github: "Helicone",
  tag: "LLM Observability"
},
{
  title: "Langfuse",
  link: "https://github.com/langfuse/langfuse",
  description: "Open Source LLM Engineering Platform: Traces, evals, prompt management, and metrics to debug and improve your LLM applications.",
  github: "langfuse",
  tag: "LLM Observability"
},
{
  title: "LangKit",
  link: "https://github.com/whylabs/langkit",
  description: "Out-of-the-box LLM telemetry collection library that extracts features and profiles prompts, responses, and metadata.",
  github: "whylabs",
  tag: "LLM Observability"
},
{
  title: "LangWatch",
  link: "https://github.com/langwatch/langwatch",
  description: "LLM Ops platform with Analytics, Monitoring, Evaluations, and an LLM Optimization Studio powered by DSPy.",
  github: "langwatch",
  tag: "LLM Observability"
},
{
  title: "Helm",
  link: "https://github.com/stanford-crfm/helm",
  description: "Holistic Evaluation of Language Models.",
  github: "stanford-crfm",
  tag: "LLM Observability"
},
{
  title: "Evidently",
  link: "https://github.com/evidentlyai/evidently",
  description: "An open-source framework to evaluate, test, and monitor ML and LLM-powered systems.",
  github: "evidentlyai",
  tag: "LLM Observability"
},
{
  title: "Traceloop OpenLLMetry",
  link: "https://github.com/traceloop/openllmetry",
  description: "OpenTelemetry-based observability and monitoring for LLM and agent workflows.",
  github: "traceloop",
  tag: "LLM Observability"
},
{
  title: "Great Expectations",
  link: "https://github.com/great-expectations/great_expectations",
  description: "Always know what to expect from your data.",
  github: "great-expectations",
  tag: "LLM Observability"
}
]; 
