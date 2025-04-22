/**
 * MCP (Model Context Protocol) servers and tools collection
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

export const mcpEntries = [
  // MCP Core
  {
    title: "Model Context Protocol",
    link: "https://github.com/anthropics/MCP",
    description: "Model Context Protocol - enabling Claude and other LLMs to communicate with tools and services",
    github: "anthropics",
    tag: "MCP Core"
  },
  {
    title: "MCP SDK",
    link: "https://github.com/modelcontextprotocol/mcp-js",
    description: "Official JavaScript SDK for the Model Context Protocol",
    github: "modelcontextprotocol",
    tag: "MCP Core"
  },
  {
    title: "MCP Inspector",
    link: "https://github.com/modelcontextprotocol/inspector",
    description: "Tool for testing and debugging MCP servers",
    github: "modelcontextprotocol",
    tag: "MCP Core"
  },


  
  // MCP Data/Database
  {
    title: "PostgreSQL MCP",
    link: "https://github.com/punkpeye/postgres-mcp",
    description: "MCP server for interacting with PostgreSQL databases",
    github: "punkpeye",
    tag: "MCP Database"
  },
  {
    title: "MongoDB MCP",
    link: "https://github.com/KnowledgeCanvas/mongodb-mcp",
    description: "MCP server for MongoDB database operations",
    github: "KnowledgeCanvas",
    tag: "MCP Database"
  },
  {
    title: "Surreal MCP",
    link: "https://github.com/ethanturk/surreal-mcp",
    description: "MCP server for SurrealDB",
    github: "ethanturk",
    tag: "MCP Database"
  },
  {
    title: "SQLite MCP",
    link: "https://github.com/milojs/sqlite-mcp",
    description: "MCP server for SQLite database operations",
    github: "milojs",
    tag: "MCP Database"
  },
  {
    title: "Vector DB MCP",
    link: "https://github.com/arunesh90/vectordb-mcp",
    description: "MCP server for vector database operations (Pinecone, Qdrant, etc.)",
    github: "arunesh90",
    tag: "MCP Database"
  },
  
  // MCP Finance/Crypto
  {
    title: "OKX MCP",
    link: "https://github.com/esshka/okx-mcp",
    description: "MCP server for OKX cryptocurrency exchange data",
    github: "esshka",
    tag: "MCP Finance"
  },
  {
    title: "Financial MCP",
    link: "https://github.com/petergriffinjr/financial-mcp",
    description: "MCP server for financial data and stock information",
    github: "petergriffinjr",
    tag: "MCP Finance"
  },
  {
    title: "Crypto Markets MCP",
    link: "https://github.com/cryptovisor/markets-mcp",
    description: "MCP server for cryptocurrency market data from multiple exchanges",
    github: "cryptovisor",
    tag: "MCP Finance"
  },
  {
    title: "DexPaprika MCP",
   link: "https://github.com/coinpaprika/dexpaprika-mcp",
    description: "Access real-time DEX analytics across 20+ blockchains with DexPaprika API.",
    github: "coinpaprika",
    tag: "MCP Finance"
  },
  {
    title: "Bankless Onchain",
    link: "https://github.com/bankless/onchain-mcp",
    description: "Query Onchain data, like ERC20 tokens, transaction history, smart contract state.",
    github: "bankless",
    tag: "MCP Finance"
  },
  
  // MCP Search/Web
  {
    title: "Browserless MCP",
    link: "https://github.com/browserless/browserless-mcp",
    description: "MCP server for headless browser automation and web scraping",
    github: "browserless",
    tag: "MCP Web"
  },
  {
    title: "Search MCP",
    link: "https://github.com/searcherAI/search-mcp",
    description: "MCP server for web search across multiple search engines",
    github: "searcherAI",
    tag: "MCP Web"
  },
  {
    title: "Web Scraper MCP",
    link: "https://github.com/webwanderer/scraper-mcp",
    description: "MCP server for extracting data from websites",
    github: "webwanderer",
    tag: "MCP Web"
  },
  
  // MCP Developer Tools
  {
    title: "GitHub MCP",
    link: "https://github.com/devflow/github-mcp",
    description: "MCP server for GitHub operations (issues, PRs, repositories)",
    github: "devflow",
    tag: "MCP Developer"
  },
  {
    title: "Code Executor MCP",
    link: "https://github.com/coderunner/executor-mcp",
    description: "MCP server for executing code in multiple languages securely",
    github: "coderunner",
    tag: "MCP Developer"
  },
  {
    title: "Terminal MCP",
    link: "https://github.com/terminalai/terminal-mcp",
    description: "MCP server for running terminal commands in a sandboxed environment",
    github: "terminalai",
    tag: "MCP Developer"
  },

  
 {
    title: "Playwright MCP Server",
    link: "https://github.com/microsoft/playwright-mcp",
    description: "Playwright MCP server for browser automation and web scraping.",
    github: "microsoft",
    tag: "MCP Developer"
  },
  {
    title: "JetBrains MCP",
    link: "https://github.com/JetBrains/mcp-jetbrains",
    description: "Work on your code with JetBrains IDEs.",
    github: "JetBrains",
    tag: "MCP Developer"
  },
 
  
  // MCP AI/ML
  {
    title: "AI APIs MCP",
    link: "https://github.com/aibridge/aiapis-mcp",
    description: "MCP server for accessing various AI APIs (OpenAI, Anthropic, etc.)",
    github: "aibridge",
    tag: "MCP AI"
  },
  {
    title: "Image Gen MCP",
    link: "https://github.com/pixelmaker/imagegen-mcp",
    description: "MCP server for image generation using DALL-E, Midjourney, and Stable Diffusion",
    github: "pixelmaker",
    tag: "MCP AI"
  },
  {
    title: "Audio Transcription MCP",
    link: "https://github.com/audioscape/transcribe-mcp",
    description: "MCP server for audio transcription and processing",
    github: "audioscape",
    tag: "MCP AI"
  },
  
  // MCP Productivity
  {
    title: "Calendar MCP",
    link: "https://github.com/timemaster/calendar-mcp",
    description: "MCP server for calendar operations (Google Calendar, Outlook, etc.)",
    github: "timemaster",
    tag: "MCP Productivity"
  },
  {
    title: "Email MCP",
    link: "https://github.com/mailwizard/email-mcp",
    description: "MCP server for email operations and management",
    github: "mailwizard",
    tag: "MCP Productivity"
  },
  {
    title: "File Manager MCP",
    link: "https://github.com/fileflow/files-mcp",
    description: "MCP server for file system operations and cloud storage",
    github: "fileflow",
    tag: "MCP Productivity"
  },
  {
  title: "Zapier MCP",
    link: "https://zapier.com/mcp",
    description: "Connect your AI Agents to 8,000 apps instantly.",
    github: null,
    tag: "MCP Productivity"
  } 
]; 
