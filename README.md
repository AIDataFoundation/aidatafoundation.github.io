# AI Data Foundation

A comprehensive resource for AI tools, frameworks, and methodologies, presented in a modern, responsive web interface with enhanced blog functionality and cutting-edge design.


## 🌟 Features

### 🛠️ Core Features
- **Comprehensive AI Directory**: Browse tools and frameworks for artificial intelligence and machine learning
- **Categorized Browsing**: Filter resources by categories like Machine Learning, Natural Language Processing, Computer Vision, and more
- **Advanced Search**: Real-time search functionality with filters and sorting options
- **GitHub Integration**: View GitHub stars and repository information using GitHub's GraphQL API
- **Modern UI/UX**: Clean, responsive interface with dark mode support and smooth animations

### 📝 Enhanced Blog Section
- **Full-Screen Reading**: Optimized layout for maximum readability and content utilization
- **Modern Typography**: Enhanced font system with Inter font and improved readability
- **Rich Content Support**: Advanced markdown rendering with syntax highlighting
- **Search & Filtering**: Find blog posts by title, content, author, or tags
- **Grid/List Views**: Toggle between different viewing modes
- **Featured Posts**: Prominent display of latest content
- **Social Sharing**: Easy sharing to social media platforms
- **Reading Time**: Automatic calculation and display of reading time estimates

### 🎨 Design System
- **Dark Mode**: Beautiful dark theme with automatic preference detection
- **Responsive Design**: Optimized for all devices from mobile to 4K displays
- **Modern Animations**: Smooth transitions and hover effects throughout
- **Enhanced Typography**: Professional font hierarchy and spacing
- **Accessibility**: WCAG compliant with proper semantic HTML and ARIA labels

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- GitHub Personal Access Token (for local development only) - See [GitHub API Setup](GITHUB-API-SETUP.md)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aidatafoundation/aidatafoundation.github.io.git
   cd aidatafoundation.github.io
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. For local development only, create a `.env.local` file with your GitHub token:
   ```bash
   VITE_GITHUB_TOKEN=your_github_token_here
   ```
   See [GitHub API Setup](GITHUB-API-SETUP.md) for detailed instructions.
   
   **Note:** When deploying with GitHub Actions, the token is automatically configured.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build the project for production with optimization
- `npm run preview` - Preview the production build locally
- `npm run deploy` - Deploy to GitHub Pages
- `npm run lint` - Run ESLint for code quality checks

## 📚 Content Categories

The collection includes resources for:

### 🤖 AI & Machine Learning
- Machine Learning
- Deep Learning
- Natural Language Processing
- Computer Vision
- Large Language Models
- Multimodal Learning

### 🔬 Research & Development
- Data Quality
- Federated Learning
- Synthetic Data
- Privacy-Preserving ML
- Explainable AI
- Model Interpretability

### 🛠️ Tools & Frameworks
- Development Tools
- Model Training
- Data Processing
- Visualization
- Deployment
- Monitoring

## 📝 Blog Features

### Content Management
- **Markdown Support**: Rich content creation with enhanced markdown rendering
- **Frontmatter**: Metadata support for posts (title, date, author, tags)
- **Categories**: Organized content by topics and themes
- **Tags System**: Flexible tagging for better content discovery

### Reading Experience
- **Full-Screen Layout**: Maximum content width utilization
- **Enhanced Typography**: Larger, more readable fonts
- **Code Highlighting**: Syntax highlighting for code blocks
- **Responsive Images**: Optimized image display with captions
 

### User Engagement
- **Social Sharing**: One-click sharing to major platforms
- **Author Information**: Enhanced author profiles and metadata
- **Related Content**: Suggestions for further reading

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

### Contributing Blog Posts

1. Fork the repository
2. Create a new markdown file in `public/blog/` directory
3. Add your post entry to `public/data/blog.json`
4. Include proper frontmatter with metadata
5. Submit a pull request

### Improving the Application

1. Fork the repository
2. Create a new branch for your feature or fix
3. Make your changes following the coding standards
4. Test your changes thoroughly
5. Submit a pull request with a detailed description

### Guidelines

- Make sure the tool is relevant to the AI/ML ecosystem
- Provide a concise and accurate description
- Include the appropriate category/tag
- Ensure there are no duplicates
- Follow the established design patterns
- Test on multiple devices and screen sizes

## 🔧 Technologies Used

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern component library

### Styling & Design
- **Inter Font** - Professional typography
- **CSS Variables** - Dynamic theming system
- **Framer Motion** - Smooth animations and transitions
- **Lucide Icons** - Beautiful, consistent iconography

### Development Tools
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **TypeScript** - Type safety (optional)
- **GitHub Actions** - Automated deployment

### Content Management
- **Markdown** - Rich content creation
- **JSON** - Structured data management
- **GitHub API** - Repository information and stars

## 🎨 Design System

### Color Palette
- **Primary**: Modern blue with purple accents
- **Secondary**: Muted grays and whites
- **Accent**: Purple and cyan highlights
- **Semantic**: Success, warning, error, and info colors

### Typography
- **Font Family**: Inter (primary), system fonts (fallback)
- **Font Sizes**: Responsive scale from 14px to 72px
- **Line Heights**: Optimized for readability
- **Font Weights**: 100-900 with semantic usage

### Components
- **Cards**: Elevated content containers
- **Buttons**: Multiple variants and sizes
- **Forms**: Accessible input components
- **Navigation**: Responsive navigation system
- **Modals**: Overlay dialogs and popups

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

### Features
- **Mobile-First**: Optimized for mobile devices
- **Touch-Friendly**: Large touch targets and gestures
- **Performance**: Optimized loading and rendering
- **Accessibility**: WCAG 2.1 AA compliance

## 🚀 Performance

### Optimizations
- **Code Splitting**: Dynamic imports for better loading
- **Image Optimization**: WebP format and lazy loading
- **Caching**: Strategic caching strategies
- **Bundle Size**: Minimal JavaScript bundle
- **SEO**: Optimized meta tags and structured data

### Metrics
- **Lighthouse Score**: 90+ across all categories
- **Core Web Vitals**: Optimized for user experience
- **Load Time**: Sub-2 second initial load
- **Time to Interactive**: Fast interactive experience

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Maintainers

- [AI Data Foundation Team](https://github.com/aidatafoundation)

## 🙏 Acknowledgments

- **Inter Font**: Beautiful typography by Rasmus Andersson
- **Lucide Icons**: Consistent iconography
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool
- **React Community**: Amazing ecosystem and tools

---

**Star the repo if you find it useful!** ⭐

*Built with ❤️ by the AI Data Foundation team*