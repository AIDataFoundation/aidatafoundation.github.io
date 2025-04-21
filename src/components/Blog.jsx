import React from "react";
import ReactMarkdown from "react-markdown";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

// Blog posts data
const blogPosts = [
  {
    id: "1",
    title: "Cloud Native Tools Collection",
    date: "May 10, 2023",
    excerpt: "A curated collection of tools for Kubernetes and the cloud native ecosystem, presented in an easy-to-browse web interface.",
    content: `
# Cloud Native Tools Collection

A curated collection of tools for Kubernetes and the cloud native ecosystem, presented in an easy-to-browse web interface.

## 🌟 Features

- **Comprehensive Tool Directory**: Browse hundreds of tools for Kubernetes and cloud native development
- **Categorized Browsing**: Filter tools by categories like Cluster Management, Security, Monitoring, and more
- **Search Functionality**: Quickly find tools based on name or description
- **GitHub Integration**: View GitHub stars for each project
- **Modern UI**: Clean and responsive interface for desktop and mobile devices
    `
  },
  {
    id: "2",
    title: "Quick Start Guide",
    date: "June 15, 2023",
    excerpt: "Get started with our platform quickly and easily with this comprehensive guide.",
    content: `
## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`
   git clone https://github.com/sangam14/cloudnativetools.git
   cd cloudnativetools
   \`\`\`

2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`
   npm run dev
   \`\`\`

4. Open your browser and navigate to \`http://localhost:5173\`

## 🔧 Available Scripts

- \`npm run dev\` - Start the development server
- \`npm run build\` - Build the project for production
- \`npm run serve\` - Serve the production build locally
    `
  },
  {
    id: "3",
    title: "Categories and Contributing",
    date: "July 23, 2023",
    excerpt: "Explore our tool categories and learn how to contribute to the project.",
    content: `
## 📚 Categories

The collection includes tools for:

- Cluster Management
- Pods Management
- Debugging & Troubleshooting
- Security Tools
- Monitoring & Observability
- Service Mesh
- Auto Scaling
- Development Tools
- Artificial Intelligence
- Continuous Integration & Delivery
- Platform Engineering
- Networking
- And more...

## 🤝 Contributing

We welcome contributions from the community! Here's how you can contribute:

### Adding a New Tool

1. Fork the repository
2. Edit \`src/data/entries.js\` and add your tool in the appropriate category:
   \`\`\`javascript
   {
     title: "Your Tool Name",
     link: "https://link-to-tool",
     description: "Brief description of the tool",
     github: "github-username/repo", // Optional
     tag: "Category Name"
   }
   \`\`\`
3. Create a pull request with your changes

### Improving the Application

1. Fork the repository
2. Create a new branch for your feature or fix
3. Make your changes
4. Submit a pull request

### Guidelines

- Make sure the tool is relevant to the Kubernetes/cloud native ecosystem
- Provide a concise and accurate description
- Include the appropriate category/tag
- Ensure there are no duplicates
    `
  }
];

// Blog post detail component
function BlogPostDetail({ post }) {
  const navigate = useNavigate();
  
  return (
    <div className="bg-bgGray p-8 rounded-xl shadow-md">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => navigate("/blog")}
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to All Posts
      </Button>
    
      <div className="mb-4">
        <span className="text-sm text-blue-500">{post.date}</span>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-primary">{post.title}</h2>
      
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>
          {post.content}
        </ReactMarkdown>
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-grayFill">Share:</span>
            <button className="text-grayFill hover:text-blue-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </button>
            <button className="text-grayFill hover:text-blue-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </button>
            <button className="text-grayFill hover:text-blue-500">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Blog list component
function BlogList() {
  const navigate = useNavigate();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {blogPosts.map(post => (
        <div 
          key={post.id} 
          className="bg-bgGray rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-blue-500/30 hover:translate-y-[-2px] flex flex-col h-full border border-gray-800"
        >
          <div className="p-6 flex-grow">
            <div className="mb-2">
              <span className="text-xs font-medium text-blue-500 bg-blue-500/10 py-1 px-2 rounded-full">{post.date}</span>
            </div>
            <h2 className="text-xl font-bold mb-3 text-primary leading-tight">{post.title}</h2>
            <p className="text-grayFill text-sm mb-4 line-clamp-3">{post.excerpt}</p>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-800 bg-bgGray/50 mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button className="text-grayFill hover:text-blue-500 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </button>
                <button className="text-grayFill hover:text-blue-500 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </button>
              </div>
              <button 
                onClick={() => navigate(`/blog/${post.id}`)} 
                className="text-blue-500 text-sm font-medium hover:text-blue-400 transition-colors flex items-center"
              >
                Read More
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Main Blog component
function Blog() {
  const { postId } = useParams();
  const navigate = useNavigate();

  // If postId is provided, show the individual blog post
  if (postId) {
    const post = blogPosts.find(p => p.id === postId);
    
    // If post not found, redirect to blog list
    if (!post) {
      setTimeout(() => navigate("/blog"), 0);
      return (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-primary">AIData Foundation Blog</h1>
        <BlogPostDetail post={post} />
      </div>
    );
  }

  // Otherwise, show the blog list
  return (
    <div className="max-w-[1280px] mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-primary">AIData Foundation Blog</h1>
      
      <p className="text-grayFill text-lg mb-10 max-w-2xl mx-auto text-center">
        Stay updated with the latest insights, news, and developments in AI data research, curation, and ethical considerations.
      </p>
      
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">Latest Articles</h2>
        <div className="relative w-full sm:w-64">
          <input 
            type="text"
            placeholder="Search articles..."
            className="w-full py-2 px-4 bg-bgGray/50 border border-gray-700 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <BlogList />
    </div>
  );
}

export default Blog; 