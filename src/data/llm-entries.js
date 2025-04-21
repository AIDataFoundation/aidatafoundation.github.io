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
  }
]; 