/**
 * AI Tools collection structured as entries
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

export const aiEntries = [
  // Programming
  {
    title: "Dask",
    link: "https://github.com/dask/dask",
    description: "Parallel computing with task scheduling",
    github: "dask",
    tag: "Programming"
  },
  {
    title: "Infer.net",
    link: "https://github.com/dotnet/infer",
    description: "Infer.NET is a framework for running Bayesian inference in graphical models",
    github: "dotnet",
    tag: "Programming"
  },
  {
    title: "Julia",
    link: "https://github.com/JuliaLang/julia",
    description: "The Julia Programming Language",
    github: "JuliaLang",
    tag: "Programming"
  },
  {
    title: "Kompute",
    link: "https://github.com/KomputeProject/kompute",
    description: "General purpose GPU compute framework built on Vulkan to support 1000s of cross vendor graphics cards (AMD, Qualcomm, NVIDIA & friends).",
    github: "KomputeProject",
    tag: "Programming"
  },
  {
    title: "MARS",
    link: "https://github.com/mars-project/mars",
    description: "Mars is a tensor-based unified framework for large-scale data computation which scales numpy, pandas, scikit-learn and Python functions.",
    github: "mars-project",
    tag: "Programming"
  },
  {
    title: "Numba",
    link: "https://github.com/numba/numba",
    description: "NumPy aware dynamic Python compiler using LLVM",
    github: "numba",
    tag: "Programming"
  },
  {
    title: "NumPy",
    link: "https://github.com/numpy/numpy",
    description: "The fundamental package for scientific computing with Python.",
    github: "numpy",
    tag: "Programming"
  },
  {
    title: "Nyoka",
    link: "https://github.com/SoftwareAG/nyoka",
    description: "Nyoka is a Python library that helps to export ML models into PMML (PMML 4.4.1 Standard).",
    github: "SoftwareAG",
    tag: "Programming"
  },
  {
    title: "Pomegranete",
    link: "https://github.com/jmschrei/pomegranate",
    description: "Fast, flexible and easy to use probabilistic modelling in Python",
    github: "jmschrei",
    tag: "Programming"
  },
  {
    title: "PyMC3",
    link: "https://github.com/pymc-devs/pymc",
    description: "Bayesian Modeling in Python with MCMC and VI",
    github: "pymc-devs",
    tag: "Programming"
  },
  {
    title: "Pyro",
    link: "https://github.com/pyro-ppl/pyro",
    description: "Deep universal probabilistic programming with Python and PyTorch",
    github: "pyro-ppl",
    tag: "Programming"
  },
  {
    title: "Python",
    link: "https://github.com/python/cpython",
    description: "The Python programming language",
    github: "python",
    tag: "Programming"
  },
  {
    title: "RStudio IDE",
    link: "https://github.com/rstudio/rstudio",
    description: "RStudio is an integrated development environment (IDE) for R",
    github: "rstudio",
    tag: "Programming"
  },
  {
    title: "SciPy",
    link: "https://github.com/scipy/scipy",
    description: "SciPy library main repository",
    github: "scipy",
    tag: "Programming"
  },
  {
    title: "SKIP Language",
    link: "https://github.com/skiplang/skip",
    description: "A programming language to skip the things you have already computed",
    github: "skiplang",
    tag: "Programming"
  },
  {
    title: "Stan",
    link: "https://github.com/stan-dev/stan",
    description: "Stan development repository",
    github: "stan-dev",
    tag: "Programming"
  },

  // Machine Learning - Framework
  {
    title: "Autogen",
    link: "https://github.com/microsoft/autogen",
    description: "A programming framework for agentic AI.",
    github: "microsoft",
    tag: "Machine Learning - Framework"
  },
  {
    title: "Candle",
    link: "https://github.com/huggingface/candle",
    description: "Minimalist ML framework for Rust",
    github: "huggingface",
    tag: "Machine Learning - Framework"
  },
  {
    title: "LightGBM",
    link: "https://github.com/Microsoft/LightGBM",
    description: "A fast, distributed, high performance gradient boosting (GBT, GBDT,GBRT, GBM or MART) framework based on decision tree algorithms, used for ranking,classification and many other machine learning tasks.",
    github: "Microsoft",
    tag: "Machine Learning - Framework"
  },
  {
    title: "mahout",
    link: "https://github.com/apache/mahout",
    description: "Apache Mahout(TM) is a distributed linear algebra framework and mathematically expressive Scala DSL designed to let mathematicians, statisticians, and data scientists quickly implement their own algorithms.",
    github: "apache",
    tag: "Machine Learning - Framework"
  },
  {
    title: "ML.NET",
    link: "https://github.com/dotnet/machinelearning",
    description: "ML.NET is an open source and cross-platform machine learning framework for .NET.",
    github: "dotnet",
    tag: "Machine Learning - Framework"
  },
  {
    title: "Ray",
    link: "https://github.com/ray-project/ray",
    description: "Ray is a unified framework for scaling AI and Python applications. Ray consists of a core distributed runtime and a set of AI Libraries for accelerating ML workloads.",
    github: "ray-project",
    tag: "Machine Learning - Framework"
  },
  {
    title: "ZenML",
    link: "https://github.com/zenml-io/zenml",
    description: "ZenML 🙏: Build portable, production-ready MLOps pipelines.",
    github: "zenml-io",
    tag: "Machine Learning - Framework"
  },

  // Machine Learning - Platform
  {
    title: "Alink",
    link: "https://github.com/alibaba/Alink",
    description: "Alink is the Machine Learning algorithm platform based on Flink, developed by the PAI team of Alibaba computing platform.",
    github: "alibaba",
    tag: "Machine Learning - Platform"
  },
  {
    title: "Angel",
    link: "https://github.com/Angel-ML/angel",
    description: "A Flexible and Powerful Parameter Server for large-scale machine learning",
    github: "Angel-ML",
    tag: "Machine Learning - Platform"
  },
  {
    title: "Systemds",
    link: "https://github.com/apache/systemds",
    description: "An open source ML system for the end-to-end data science lifecycle",
    github: "apache",
    tag: "Machine Learning - Platform"
  },
  {
    title: "Ax",
    link: "https://github.com/facebook/Ax",
    description: "Adaptive Experimentation Platform",
    github: "facebook",
    tag: "Machine Learning - Platform"
  },
  {
    title: "Cortex",
    link: "https://github.com/cortexlabs/cortex",
    description: "Production infrastructure for machine learning at scale",
    github: "cortexlabs",
    tag: "Machine Learning - Platform"
  },
  {
    title: "ForestFlow",
    link: "https://github.com/ForestFlow/ForestFlow",
    description: "ForestFlow is a policy-driven Machine Learning Model Server",
    github: "ForestFlow",
    tag: "Machine Learning - Platform"
  },
  {
    title: "H203",
    link: "https://github.com/h2oai/h2o-3",
    description: "H2O is an Open Source, Distributed, Fast & Scalable Machine Learning",
    github: "h2oai",
    tag: "Machine Learning - Platform"
  },
  {
    title: "Kubeflow",
    link: "https://github.com/kubeflow/kubeflow",
    description: "Machine Learning Toolkit for Kubernetes",
    github: "kubeflow",
    tag: "Machine Learning - Platform"
  },
  {
    title: "metaflow",
    link: "https://github.com/Netflix/metaflow",
    description: "🚀 Build and manage real-life data science projects with ease!",
    github: "Netflix",
    tag: "Machine Learning - Platform"
  },
  {
    title: "Mlflow",
    link: "https://github.com/mlflow/mlflow",
    description: "Open source platform for the machine learning lifecycle",
    github: "mlflow",
    tag: "Machine Learning - Platform"
  },

  // Machine Learning - Library
  {
    title: "1chipML",
    link: "https://github.com/1chipML/1chipML",
    description: "a library for numerical crunching and machine learning on microcontrollers",
    github: "1chipML",
    tag: "Machine Learning - Library"
  },
  {
    title: "autogluon",
    link: "https://github.com/awslabs/autogluon",
    description: "AutoGluon: AutoML for Image, Text, Time Series, and Tabular Data",
    github: "awslabs",
    tag: "Machine Learning - Library"
  },
  {
    title: "catboost",
    link: "https://github.com/catboost/catboost",
    description: "A fast, scalable, high performance Gradient Boosting on Decision Trees library, used for ranking, classification, regression and other machine learning tasks for Python, R, Java, C++. Supports computation on CPU and GPU.",
    github: "catboost",
    tag: "Machine Learning - Library"
  },
  {
    title: "Hyper-geometric",
    link: "https://github.com/deepcausality-rs/deep_causality",
    description: "Hyper-geometric computational causality library for Rust",
    github: "deepcausality-rs",
    tag: "Machine Learning - Library"
  },
  {
    title: "flashlight",
    link: "https://github.com/flashlight/flashlight",
    description: "A C++ standalone library for machine learning",
    github: "flashlight",
    tag: "Machine Learning - Library"
  },
  {
    title: "MediaPipe",
    link: "https://github.com/google/mediapipe",
    description: "Cross-platform, customizable ML solutions for live and streaming media",
    github: "google",
    tag: "Machine Learning - Library"
  },
  {
    title: "mlpack",
    link: "https://github.com/mlpack/mlpack",
    description: "mlpack: a fast, header-only C++ machine learning library",
    github: "mlpack",
    tag: "Machine Learning - Library"
  },
  {
    title: "SciKit-learn",
    link: "https://github.com/scikit-learn/scikit-learn",
    description: "scikit-learn: machine learning in Python",
    github: "scikit-learn",
    tag: "Machine Learning - Library"
  },
  {
    title: "XGBoost",
    link: "https://github.com/dmlc/xgboost",
    description: "Scalable, Portable and Distributed Gradient Boosting (GBDT, GBRT or GBM) Library, for Python, R, Java, Scala, C++ and more. Runs on single machine, Hadoop, Spark, Dask, Flink and DataFlow",
    github: "dmlc",
    tag: "Machine Learning - Library"
  },

  // Deep Learning - Framework
  {
    title: "PyTorch",
    link: "https://github.com/pytorch/pytorch",
    description: "Tensors and Dynamic neural networks in Python with strong GPU acceleration",
    github: "pytorch",
    tag: "Deep Learning - Framework"
  },
  {
    title: "Tensorflow",
    link: "https://github.com/tensorflow/tensorflow",
    description: "An Open Source Machine Learning Framework for Everyone",
    github: "tensorflow",
    tag: "Deep Learning - Framework"
  },
  {
    title: "MXNet",
    link: "https://github.com/apache/incubator-mxnet",
    description: "Lightweight, Portable, Flexible Distributed/Mobile Deep Learning with Dynamic, Mutation-aware Dataflow Dep Scheduler; for Python, R, Julia, Scala, Go, Javascript and more",
    github: "apache",
    tag: "Deep Learning - Framework"
  },
  {
    title: "PaddlePaddle",
    link: "https://github.com/PaddlePaddle/Paddle",
    description: "PArallel Distributed Deep LEarning: Machine Learning Framework from Industrial Practice",
    github: "PaddlePaddle",
    tag: "Deep Learning - Framework"
  },
  {
    title: "CNTK",
    link: "https://github.com/Microsoft/CNTK",
    description: "Microsoft Cognitive Toolkit (CNTK), an open source deep-learning toolkit",
    github: "Microsoft",
    tag: "Deep Learning - Framework"
  },
  
  // Deep Learning - Library
  {
    title: "Keras",
    link: "https://github.com/keras-team/keras",
    description: "Deep Learning for humans",
    github: "keras-team",
    tag: "Deep Learning - Library"
  },
  {
    title: "fast.ai",
    link: "https://github.com/fastai/fastai",
    description: "The fastai deep learning library",
    github: "fastai",
    tag: "Deep Learning - Library"
  },
  {
    title: "PyTorch Lightning",
    link: "https://github.com/PyTorchLightning/pytorch-lightning",
    description: "Deep learning framework to train, deploy, and ship AI products Lightning fast.",
    github: "PyTorchLightning",
    tag: "Deep Learning - Library"
  },
  {
    title: "PyTorch Ignite",
    link: "https://github.com/pytorch/ignite",
    description: "High-level library to help with training and evaluating neural networks in PyTorch flexibly and transparently.",
    github: "pytorch",
    tag: "Deep Learning - Library"
  },
  
  // Data Visualization
  {
    title: "D3js",
    link: "https://github.com/d3/d3",
    description: "Bring data to life with SVG, Canvas and HTML. 📊📈🎉",
    github: "d3",
    tag: "Data Visualization"
  },
  {
    title: "Grafana",
    link: "https://github.com/grafana/grafana",
    description: "The open and composable observability and data visualization platform. Visualize metrics, logs, and traces from multiple sources like Prometheus, Loki, Elasticsearch, InfluxDB, Postgres and many more.",
    github: "grafana",
    tag: "Data Visualization"
  },
  {
    title: "bokeh",
    link: "https://github.com/bokeh/bokeh",
    description: "Interactive Data Visualization in the browser, from Python",
    github: "bokeh",
    tag: "Data Visualization"
  },
  {
    title: "dash",
    link: "https://github.com/plotly/dash",
    description: "Data Apps & Dashboards for Python. No JavaScript Required.",
    github: "plotly",
    tag: "Data Visualization"
  },
  {
    title: "Superset",
    link: "https://github.com/apache/superset",
    description: "Apache Superset is a Data Visualization and Data Exploration Platform",
    github: "apache",
    tag: "Data Visualization"
  },
  
  // Reinforcement Learning
  {
    title: "OpenAI Gym",
    link: "https://github.com/openai/gym",
    description: "A toolkit for developing and comparing reinforcement learning algorithms.",
    github: "openai",
    tag: "Reinforcement Learning"
  },
  {
    title: "Stable Baselines",
    link: "https://github.com/hill-a/stable-baselines",
    description: "A fork of OpenAI Baselines, implementations of reinforcement learning algorithms",
    github: "hill-a",
    tag: "Reinforcement Learning"
  },
  {
    title: "CleanRL",
    link: "https://github.com/vwxyzjn/cleanrl",
    description: "High-quality single file implementation of Deep Reinforcement Learning algorithms with research-friendly features (PPO, DQN, C51, DDPG, TD3, SAC, PPG)",
    github: "vwxyzjn",
    tag: "Reinforcement Learning"
  }
]; 