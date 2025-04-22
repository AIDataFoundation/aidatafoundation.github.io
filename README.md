# AI Data Foundation

A comprehensive resource for AI tools, frameworks, and methodologies, presented in an easy-to-browse web interface.

![AI Data Foundation Preview](./src/assets/Tools.png)

## 🌟 Features

- **Comprehensive AI Directory**: Browse tools and frameworks for artificial intelligence and machine learning
- **Categorized Browsing**: Filter resources by categories like Machine Learning, Natural Language Processing, Computer Vision, and more
- **Search Functionality**: Quickly find tools based on name or description
- **GitHub Integration**: View GitHub stars for each project using GitHub's GraphQL API
- **Modern UI**: Clean and responsive interface for desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- GitHub Personal Access Token (for local development only) - See [GitHub API Setup](GITHUB-API-SETUP.md)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/aidatafoundation/aidatafoundation.github.io.git
   cd aidatafoundation.github.io
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. For local development only, create a `.env.local` file with your GitHub token:
   ```
   VITE_GITHUB_TOKEN=your_github_token_here
   ```
   See [GitHub API Setup](GITHUB-API-SETUP.md) for detailed instructions.
   
   **Note:** When deploying with GitHub Actions, the token is automatically configured.

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run deploy` - Deploy to GitHub Pages

## 📚 Categories

The collection includes resources for:

- Machine Learning
- Deep Learning
- Natural Language Processing
- Computer Vision
- Data Quality
- Federated Learning
- Synthetic Data
- Privacy-Preserving ML
- Large Language Models
- Multimodal Learning
- Explainable AI
- And more...

## 🤝 Contributing

We welcome contributions from the community! Here's how you can contribute:

### Adding a New Tool

1. Fork the repository
2. Edit `src/data/entries.js` and add your tool in the appropriate category:
   ```javascript
   {
     title: "Your Tool Name",
     link: "https://link-to-tool",
     description: "Brief description of the tool",
     github: "github-username/repo", // Optional
     tag: "Category Name"
   }
   ```
3. Create a pull request with your changes

### Improving the Application

1. Fork the repository
2. Create a new branch for your feature or fix
3. Make your changes
4. Submit a pull request

### Guidelines

- Make sure the tool is relevant to the AI/ML ecosystem
- Provide a concise and accurate description
- Include the appropriate category/tag
- Ensure there are no duplicates

## 🔧 Technologies Used

- React
- Tailwind CSS
- Vite

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Maintainers

- [AI Data Foundation Team](https://github.com/aidatafoundation)

---

**Star the repo if you find it useful!** ⭐