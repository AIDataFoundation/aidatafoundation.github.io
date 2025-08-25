import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Helmet } from "react-helmet";
import MarkdownRenderer from "./MarkdownRenderer";
import NotebookRenderer from "./NotebookRenderer";
import DebugInfo from "./DebugInfo";
import OpenGraph from "./OpenGraph";

function Blog() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDebug, setShowDebug] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState("grid");

  // Load blog index
  useEffect(() => {
    const fetchBlogIndex = async () => {
      const possiblePaths = [
        '/data/blog.json',
        '/blog/index.json',
        '/blog.json',
        './data/blog.json',
        './blog/index.json',
        './blog.json',
      ];
      
      let data = null;
      let fetchError = null;
      
      for (const path of possiblePaths) {
        try {
          console.log(`Attempting to fetch blog index from: ${path}`);
          const response = await fetch(path, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            cache: 'no-store'
          });
          
          if (response.ok) {
            const jsonData = await response.json();
            data = jsonData.blogs || jsonData;
            console.log('Blog posts loaded from:', path, data);
            break;
          }
        } catch (err) {
          console.error(`Error fetching from ${path}:`, err);
          fetchError = err;
        }
      }
      
      if (data) {
        setBlogPosts(data);
        setLoading(false);
      } else {
        console.error('All fetch attempts failed:', fetchError);
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
        
        // Fallback data
        const fallbackData = [
          {
              "id": "Qwen-Coder-Models",
              "title": "Qwen Coder Models: Breakthrough AI at Your Fingertips",
              "date": "April 23, 2025",
              "excerpt": "Qwen Coder Models are a new generation of AI models that are designed to be more efficient and effective than traditional LLM models.",
              "author": "Sangam Biradar",
              "file": "/blog/Qwen-Coder-Models.md",
              "category": "LLM",
              "tags": ["Qwen Coder Models", "AI", "LLM", "LLM Models", "LLM Framework", "LLM Model", "LLM Vector Database", "LLM Tool", "MCP Core", "MCP Database", "MCP Finance", "MCP Web", "MCP Developer", "MCP AI", "MCP AI Tools", "MCP AI Models", "MCP AI Frameworks", "MCP AI Models", "MCP AI Frameworks", "MCP AI Models", "MCP AI Frameworks"]
          },
          {
            id: "MCP_SDLC",
            title: "MCP Context Protocol Impact on Software Development Life Cycle",
            date: "June 2, 2025",
            excerpt: "Model Context Protocol (MCP) is a game-changer in the world of software development. It's a set of guidelines and best practices that help developers create better, more efficient software.",
            author: "AI Data Foundation",
            file: "/blog/MCP_SDLC.md",
            category: "MCP",
            tags: ["MCP Core", "MCP Database", "MCP Finance", "MCP Web", "MCP Developer", "MCP AI", "MCP AI Tools", "MCP AI Models", "MCP AI Frameworks", "MCP AI Models", "MCP AI Frameworks", "MCP AI Models", "MCP AI Frameworks"]
          }
        ];
        
        console.log('Using fallback blog data');
        setBlogPosts(fallbackData);
        setError(null);
      }
    };

    fetchBlogIndex();
  }, []);

  // Add structured data for the blog list
  useEffect(() => {
    if (!blogPosts.length || postId) return;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "AI Data Foundation Blog",
      "url": "https://aidatafoundation.github.io/blog",
      "description": "Stay updated with the latest AI research, tools, and insights from our team and community contributors.",
      "publisher": {
        "@type": "Organization",
        "name": "AI Data Foundation",
        "logo": {
          "@type": "ImageObject",
          "url": "https://aidatafoundation.github.io/android-icon-192x192.png"
        }
      },
      "blogPost": blogPosts.map(post => ({
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "datePublished": new Date(post.date).toISOString(),
        "author": {
          "@type": "Person",
          "name": post.author || "AI Data Foundation"
        },
        "url": `https://aidatafoundation.github.io/blog/${post.id}`
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [blogPosts, postId]);

  // Add structured data for individual blog post
  useEffect(() => {
    if (!currentPost) return;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": currentPost.title,
      "description": currentPost.excerpt,
      "image": "https://aidatafoundation.github.io/og-image.png",
      "datePublished": new Date(currentPost.date).toISOString(),
      "dateModified": new Date(currentPost.date).toISOString(),
      "author": {
        "@type": "Person",
        "name": currentPost.author || "AI Data Foundation"
      },
      "publisher": {
        "@type": "Organization",
        "name": "AI Data Foundation",
        "logo": {
          "@type": "ImageObject",
          "url": "https://aidatafoundation.github.io/android-icon-192x192.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://aidatafoundation.github.io/blog/${currentPost.id}`
      },
      "keywords": "AI, artificial intelligence, machine learning, data science, AI tools, AI research"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [currentPost]);

  // Load individual blog post when postId changes
  useEffect(() => {
    if (!postId || !blogPosts.length) return;

    const fetchBlogPost = async () => {
      setLoading(true);
      const post = blogPosts.find(p => p.id === postId);
      
      if (!post) {
        setError('Blog post not found');
        setLoading(false);
        setTimeout(() => navigate("/blog"), 1000);
        return;
      }

      const postPath = post.path || post.file;
      
      if (!postPath) {
        console.error('Post has no file or path:', post);
        setError('Post has invalid configuration');
        setLoading(false);
        return;
      }

      const possiblePaths = [
        postPath,
        postPath.startsWith('/') ? postPath.substring(1) : postPath,
        `./public${postPath}`,
        `.${postPath}`,
      ];
      
      console.log('Trying paths:', possiblePaths);
      
      let content = null;
      let fetchError = null;
      
      for (const path of possiblePaths) {
        try {
          console.log(`Attempting to fetch blog post from: ${path}`);
          const response = await fetch(path, {
            headers: {
              'Accept': 'text/plain, text/markdown'
            },
            cache: 'no-store'
          });
          
          if (response.ok) {
            content = await response.text();
            console.log('Blog post content loaded successfully from:', path);
            break;
          }
        } catch (err) {
          console.error(`Error fetching from ${path}:`, err);
          fetchError = err;
        }
      }
      
      if (content) {
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        if (frontmatterMatch) {
          const frontmatterText = frontmatterMatch[1];
          const markdown = frontmatterMatch[2];
          
          const frontmatter = {};
          frontmatterText.split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
              const value = valueParts.join(':').trim();
              frontmatter[key.trim()] = value.replace(/^"(.*)"$/, '$1');
            }
          });
          
          setCurrentPost({
            ...post,
            content: markdown
          });
        } else {
          setCurrentPost({
            ...post,
            content: content
          });
        }
      } else {
        console.error('All fetch attempts failed:', fetchError);
        setError('Failed to load blog post content. Using fallback display.');
        
        setCurrentPost({
          ...post,
          content: `# ${post.title}\n\n${post.excerpt}\n\nThis content is being displayed as a fallback.`
        });
        
        setTimeout(() => setError(null), 100);
      }
      
      setLoading(false);
    };

    fetchBlogPost();
  }, [postId, blogPosts, navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="container-responsive py-20">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container-responsive py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-destructive/10 text-destructive p-6 rounded-xl mb-6 border border-destructive/20">
            <p className="font-medium">{error}</p>
        </div>
        <Button 
          onClick={() => navigate("/blog")}
          className="mt-4"
        >
          Back to Blog
        </Button>
        </div>
      </div>
    );
  }

  // If postId is provided, show the individual blog post
  if (postId && currentPost) {
    return (
      <div className="container-responsive py-8">
        <BlogPostDetail post={currentPost} />
      </div>
    );
  }

  // Show blog list
  return (
    <div className="container-responsive py-8">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Latest AI Insights & Research
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          AI Data Foundation Blog
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Stay updated with the latest AI research, tools, and insights from our team and community contributors.
        </p>
        
        {/* Debug toggle button */}
        <div className="flex justify-center mt-4">
          <button 
            onClick={() => setShowDebug(!showDebug)}
            className="text-sm text-muted-foreground hover:text-foreground px-3 py-1 rounded-lg hover:bg-accent transition-colors"
          >
            {showDebug ? 'Hide Debug Info' : 'Show Debug Info'}
          </button>
        </div>
      </div>
      
      {/* Featured post section */}
      {blogPosts.length > 0 && (
        <FeaturedPost post={blogPosts[0]} />
      )}
      
      <BlogList 
        blogPosts={blogPosts} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeView={activeView}
        setActiveView={setActiveView}
      />
      
      {/* Debug information panel */}
      <DebugInfo show={showDebug} />
      
      <ContributionSection />
    </div>
  );
}

// Blog post detail component
function BlogPostDetail({ post }) {
  const navigate = useNavigate();
  const hasContent = post.content && post.content.trim().length > 0;
  
  // Calculate reading time
  const readingTime = useMemo(() => {
    if (!post.content) return 3;
    const wordsPerMinute = 200;
    const wordCount = post.content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }, [post.content]);
  
  return (
    <div className="w-full max-w-none">
      <OpenGraph
        title={`${post.title} | AI Data Foundation Blog`}
        description={post.excerpt}
        url={`/blog/${post.id}`}
        image={post.image || "/og-image.png"}
        type="article"
        tags={post.tags || []}
      />
      
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-sm border-b border-border mb-8">
        <div className="container-responsive py-4">
      <Button 
        variant="ghost" 
            className="group"
        onClick={() => navigate("/blog")}
      >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to All Posts
      </Button>
        </div>
      </div>
    
      <article className="w-full">
        {/* Article Header */}
        <header className="text-center space-y-8 mb-12">
          <div className="container-responsive">
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {post.category || 'General'}
              </Badge>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {readingTime} min read
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {post.date}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight bg-gradient-to-r from-foreground via-primary to-purple-600 bg-clip-text text-transparent mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed max-w-4xl mx-auto mb-8">
              {post.excerpt}
            </p>
            
        {post.author && (
              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="font-medium text-lg">by {post.author}</span>
              </div>
        )}
      </div>
        </header>
      
        {/* Article Content */}
      <div className="w-full">
          <div className="container-responsive">
            <div className="grid grid-cols-1 gap-8">
              {/* Main Content */}
              <div className="col-span-1">
                <div className="bg-card border border-border rounded-xl shadow-medium overflow-hidden">
                  <div className="p-8 md:p-12 lg:p-16">
        {hasContent ? (
                      <div className="blog-content">
                        <MarkdownRenderer>
            {post.content}
          </MarkdownRenderer>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="bg-muted/50 border border-border rounded-xl p-8 max-w-2xl mx-auto">
                          <p className="text-muted-foreground mb-4 text-lg">{post.excerpt}</p>
                          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                            <p className="text-yellow-600 dark:text-yellow-400 mb-2 font-medium">⚠️ Content loading issue</p>
                            <p className="text-sm text-muted-foreground">
                              The content for this post could not be loaded. Please try again later or visit our GitHub repository to view the source markdown.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    {post.notebook && (
                      <div className="mt-8">
                        <NotebookRenderer src={post.notebook} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
            </div>
          </div>
      </div>
      
        {/* Article Footer */}
        <footer className="bg-muted/30 border-t border-border mt-16">
          <div className="container-responsive py-12">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Share this article</h3>
                <div className="flex items-center gap-3">
                  <button className="p-3 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-all duration-200 hover:scale-105">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </button>
                  <button className="p-3 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-all duration-200 hover:scale-105">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </button>
                  <button className="p-3 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-all duration-200 hover:scale-105">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </button>
                  <button className="p-3 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-all duration-200 hover:scale-105">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </button>
                </div>
          </div>
              
              <div className="flex items-center gap-4">
          <a 
            href={`https://github.com/aidatafoundation/aidatafoundation.github.io/edit/main/public${(post.path || post.file)}`} 
            target="_blank" 
            rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary/80 flex items-center gap-2 hover:bg-accent px-4 py-2 rounded-lg transition-colors"
          >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit this page
          </a>
                
                <Button 
                  variant="outline"
                  onClick={() => navigate("/blog")}
                  className="group"
                >
                  <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  View All Posts
                </Button>
              </div>
        </div>
      </div>
        </footer>
      </article>
    </div>
  );
}

// Blog list component
function BlogList({ blogPosts, searchQuery, setSearchQuery, activeView, setActiveView }) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Sort posts by date (newest first)
  const sortedPosts = useMemo(() => {
    return [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [blogPosts]);
  
  // Get unique categories
  const categories = useMemo(() => {
    return ['All', ...new Set(blogPosts.map(post => post.category).filter(Boolean))];
  }, [blogPosts]);
  
  // Filter posts by search query and category
  const filteredPosts = useMemo(() => {
    let filtered = sortedPosts;
    
    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(post => post.category === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.author?.toLowerCase().includes(query) ||
        post.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  }, [sortedPosts, activeCategory, searchQuery]);
  
  return (
    <div className="space-y-8">
      {/* Search and filters */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={activeView === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("grid")}
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Grid
            </Button>
            <Button
              variant={activeView === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveView("list")}
              className="flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              List
            </Button>
          </div>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
        </p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => window.open('https://github.com/aidatafoundation/aidatafoundation.github.io/tree/main/public/blog', '_blank')}
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Contribute
        </Button>
      </div>
      
      {/* Blog posts */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-muted/50 border border-border rounded-xl p-8 max-w-md mx-auto">
            <svg className="w-12 h-12 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-muted-foreground font-medium mb-2">No posts found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        </div>
      ) : activeView === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPosts.map(post => (
            <BlogListItem key={post.id} post={post} />
          ))}
        </div>
                  )}
                </div>
  );
}

// Blog card component
function BlogCard({ post }) {
  const navigate = useNavigate();
  
  // Calculate reading time
  const readingTime = useMemo(() => {
    const wordsPerMinute = 200;
    const wordCount = post.excerpt.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }, [post.excerpt]);
  
  return (
    <Card className="group h-full flex flex-col hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/30">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-600/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <CardHeader className="pb-4 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {post.category || 'General'}
            </Badge>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readingTime} min read
            </div>
          </div>
          <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </CardTitle>
        </CardHeader>
      </div>
      
      <CardContent className="flex-grow pb-4">
        <CardDescription className="text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
          {post.excerpt}
        </CardDescription>
                
                {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag} 
                className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md border border-border/50"
                      >
                        #{tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">
                        +{post.tags.length - 3} more
                      </span>
                    )}
                  </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 border-t border-border/50 bg-muted/20">
        <div className="w-full">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-2">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {post.date}
            </div>
            {post.author && (
              <div className="flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {post.author}
              </div>
            )}
          </div>
          <Button 
            onClick={() => navigate(`/blog/${post.id}`)} 
            className="w-full group"
            variant="outline"
          >
            Read More
            <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// Blog list item component
function BlogListItem({ post }) {
  const navigate = useNavigate();
  
  // Calculate reading time
  const readingTime = useMemo(() => {
    const wordsPerMinute = 200;
    const wordCount = post.excerpt.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }, [post.excerpt]);
  
  return (
    <Card className="group hover:shadow-medium transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-3">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {post.category || 'General'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {readingTime} min read
              </span>
            </div>
            
            <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors mb-2">
              {post.title}
            </CardTitle>
            
            <CardDescription className="text-muted-foreground mb-3">
              {post.excerpt}
            </CardDescription>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{post.date}</span>
                {post.author && (
                  <span>by {post.author}</span>
                )}
              </div>
              
              <Button 
                    onClick={() => navigate(`/blog/${post.id}`)} 
                variant="outline"
                size="sm"
                className="group"
                  >
                    Read More
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Contribution section component
function ContributionSection() {
  return (
    <Card className="mt-16 overflow-hidden border-primary/20">
      <div className="bg-gradient-to-r from-primary/5 via-purple-600/5 to-cyan-500/5 p-8">
        <CardHeader className="text-center pb-0">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            Join Our Community
          </div>
          <CardTitle className="text-3xl font-bold">Want to Contribute?</CardTitle>
          <CardDescription className="text-lg max-w-2xl mx-auto">
            We welcome blog post contributions from the community. Share your knowledge, insights, and experiences related to AI data, tools, and methodologies.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center font-semibold text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Fork the Repository</h3>
                  <p className="text-muted-foreground">Start by forking our GitHub repository to your account.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center font-semibold text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Create a Markdown File</h3>
                  <p className="text-muted-foreground">Add a new markdown file in the <code className="bg-muted px-2 py-1 rounded text-sm border border-border">public/blog</code> directory with proper frontmatter.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center font-semibold text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Update the Index</h3>
                  <p className="text-muted-foreground">Add your post entry to <code className="bg-muted px-2 py-1 rounded text-sm border border-border">public/data/blog.json</code>.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 group">
                <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center font-semibold text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Submit a Pull Request</h3>
                  <p className="text-muted-foreground">Create a pull request with your changes for review.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <Button 
              onClick={() => window.open('https://github.com/aidatafoundation/aidatafoundation.github.io/blob/main/public/blog/3-categories-and-contributing.md', '_blank')}
              size="lg"
              className="group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Contribution Guidelines
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

// Featured post component
function FeaturedPost({ post }) {
  const navigate = useNavigate();
  
  // Calculate reading time
  const readingTime = useMemo(() => {
    const wordsPerMinute = 200;
    const wordCount = post.excerpt.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }, [post.excerpt]);
  
  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-full"></div>
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Featured Post</span>
        <div className="flex-1 h-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-full"></div>
        </div>
      
      <Card className="group overflow-hidden hover:shadow-strong transition-all duration-500 hover:-translate-y-1">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                {post.category || 'General'}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {readingTime} min read
              </span>
            </div>
            
            <CardTitle className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary transition-colors mb-4">
              {post.title}
            </CardTitle>
            
            <CardDescription className="text-lg text-muted-foreground leading-relaxed mb-6">
              {post.excerpt}
            </CardDescription>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{post.date}</span>
                {post.author && (
                  <span>by {post.author}</span>
                )}
              </div>
              
              <Button 
                onClick={() => navigate(`/blog/${post.id}`)} 
                className="group"
                size="lg"
              >
                Read Full Article
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-primary/5 via-purple-600/5 to-cyan-500/5 p-8 md:p-12 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-glow">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground font-medium">Featured Article</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Blog; 