import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";

function Blog() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback data in case the fetch fails
  const fallbackBlogData = [
    {
      "id": "1",
      "title": "Cloud Native Tools Collection",
      "date": "May 10, 2023",
      "excerpt": "A curated collection of tools for Kubernetes and the cloud native ecosystem, presented in an easy-to-browse web interface.",
      "author": "AI Data Foundation",
      "file": "cloud-native-tools-collection.md"
    },
    {
      "id": "2",
      "title": "Quick Start Guide",
      "date": "June 15, 2023",
      "excerpt": "Get started with our platform quickly and easily with this comprehensive guide.",
      "author": "AI Data Foundation",
      "file": "quick-start-guide.md"
    },
    {
      "id": "3",
      "title": "Categories and Contributing",
      "date": "July 23, 2023", 
      "excerpt": "Explore our tool categories and learn how to contribute to the project.",
      "author": "AI Data Foundation",
      "file": "categories-and-contributing.md"
    }
  ];

  // Load blog index
  useEffect(() => {
    const fetchBlogIndex = async () => {
      try {
        // On GitHub Pages, sometimes JSON files are served with wrong content type
        // Try using the fallback data immediately to prevent raw JSON display
        if (window.location.hostname.includes('github.io')) {
          console.log('GitHub Pages detected, using fallback blog data');
          setBlogPosts(fallbackBlogData);
          setLoading(false);
          return;
        }
        
        // For local development, still try to fetch
        // Try multiple potential locations for the data
        const potentialUrls = [
          '/data/blog.json',  // New primary location
          '/blog/index.json', // Original location (as fallback)
          `${window.location.origin}/data/blog.json`,
          `${window.location.origin}/blog/index.json`
        ];
        
        let fetchSuccess = false;
        
        // Add a cache-busting parameter to prevent caching and direct display of JSON
        const timestamp = new Date().getTime();
        
        // Try each URL in sequence
        for (const url of potentialUrls) {
          try {
            const response = await fetch(`${url}?_=${timestamp}`, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // Add headers to prevent browsers from displaying the raw JSON
                'X-Requested-With': 'XMLHttpRequest'
              }
            });
            
            if (response.ok) {
              const data = await response.json();
              setBlogPosts(data);
              setLoading(false);
              fetchSuccess = true;
              break;
            }
          } catch (err) {
            console.log(`Failed to fetch from ${url}:`, err);
            // Continue to next URL
          }
        }
        
        if (!fetchSuccess) {
          console.warn('Failed to fetch blog index from any location, using fallback data');
          setBlogPosts(fallbackBlogData);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching blog index:', err);
        console.warn('Using fallback blog data');
        setBlogPosts(fallbackBlogData);
        setLoading(false);
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

    // Add structured data to head
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

    // Add structured data to head
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

      try {
        // GitHub Pages detection for static content
        if (window.location.hostname.includes('github.io')) {
          // Since we can't guarantee proper content-type on GitHub Pages, 
          // let's try to load the markdown file directly with the expected path
          try {
            const markdownPath = `/blog/${post.file}`;
            const timestamp = new Date().getTime();
            const response = await fetch(`${markdownPath}?_=${timestamp}`);
            
            if (response.ok) {
              const content = await response.text();
              
              // Extract frontmatter if it exists
              const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
              if (frontmatterMatch) {
                const frontmatterText = frontmatterMatch[1];
                const markdown = frontmatterMatch[2];
                
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
              
              setLoading(false);
              return;
            }
          } catch (err) {
            console.error('Error fetching from GitHub Pages:', err);
            // Continue to fallback paths
          }
        }
      
        // Add a cache-busting parameter to prevent caching
        const timestamp = new Date().getTime();
        
        // Try both potential locations for the markdown file
        const potentialPaths = [
          `/blog/${post.file}`,
          `/data/blog/${post.file}`
        ];
        
        let content = null;
        
        // Try each path in sequence
        for (const path of potentialPaths) {
          try {
            const response = await fetch(`${path}?_=${timestamp}`, {
              headers: {
                // Set content type to text to prevent browsers from displaying raw markdown
                'Accept': 'text/plain',
                'X-Requested-With': 'XMLHttpRequest'
              }
            });
            
            if (response.ok) {
              content = await response.text();
              break;
            }
          } catch (err) {
            console.log(`Failed to fetch from ${path}:`, err);
            // Continue to next path
          }
        }
        
        if (!content) {
          throw new Error(`Failed to fetch blog post content from any location`);
        }
        
        // Extract frontmatter and content
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
        if (frontmatterMatch) {
          const frontmatterText = frontmatterMatch[1];
          const markdown = frontmatterMatch[2];
          
          // Parse frontmatter into object (simple version)
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
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post. Please try again later.');
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [postId, blogPosts, navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-8 text-center">
        <div className="bg-red-500/10 text-red-500 p-4 rounded-xl mb-4">
          <p>{error}</p>
        </div>
        <Button 
          onClick={() => navigate("/blog")}
          className="mt-4"
        >
          Back to Blog
        </Button>
      </div>
    );
  }

  // If postId is provided, show the individual blog post
  if (postId && currentPost) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <BlogPostDetail post={currentPost} />
      </div>
    );
  }

  // Show blog list
  return (
    <div className="text-primary max-w-[1280px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">AI Data Foundation Blog</h1>
      <p className="text-grayFill text-lg mb-8 text-center max-w-3xl mx-auto">
        Stay updated with the latest AI research, tools, and insights from our team and community contributors.
      </p>
      
      <div className="mb-8 text-center">
        <a 
          href="https://github.com/aidatafoundation/aidatafoundation.github.io/tree/main/public/blog" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
          </svg>
          Contribute on GitHub
        </a>
      </div>
      
      {!postId ? <BlogList /> : <BlogDetail />}
    </div>
  );
}

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
    
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-blue-500">{post.date}</span>
        {post.author && (
          <span className="text-sm text-grayFill">by {post.author}</span>
        )}
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
          <a 
            href={`https://github.com/aidatafoundation/aidatafoundation.github.io/edit/main/public/blog/${post.file}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-blue-500 hover:underline flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit this page
          </a>
        </div>
      </div>
    </div>
  );
}

// Blog list component
function BlogList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchBlogIndex = async () => {
      try {
        // On GitHub Pages, sometimes JSON files are served with wrong content type
        // Try using the fallback data immediately to prevent raw JSON display
        if (window.location.hostname.includes('github.io')) {
          console.log('GitHub Pages detected, using fallback blog data');
          setBlogPosts(fallbackBlogData);
          setLoading(false);
          return;
        }
        
        // For local development, still try to fetch
        // Try multiple potential locations for the data
        const potentialUrls = [
          '/data/blog.json',  // New primary location
          '/blog/index.json', // Original location (as fallback)
          `${window.location.origin}/data/blog.json`,
          `${window.location.origin}/blog/index.json`
        ];
        
        let fetchSuccess = false;
        
        // Add a cache-busting parameter to prevent caching and direct display of JSON
        const timestamp = new Date().getTime();
        
        // Try each URL in sequence
        for (const url of potentialUrls) {
          try {
            const response = await fetch(`${url}?_=${timestamp}`, {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                // Add headers to prevent browsers from displaying the raw JSON
                'X-Requested-With': 'XMLHttpRequest'
              }
            });
            
            if (response.ok) {
              const data = await response.json();
              setBlogPosts(data);
              setLoading(false);
              fetchSuccess = true;
              break;
            }
          } catch (err) {
            console.log(`Failed to fetch from ${url}:`, err);
            // Continue to next URL
          }
        }
        
        if (!fetchSuccess) {
          console.warn('Failed to fetch blog index from any location, using fallback data');
          setBlogPosts(fallbackBlogData);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching blog index:', err);
        console.warn('Using fallback blog data');
        setBlogPosts(fallbackBlogData);
        setLoading(false);
      }
    };

    fetchBlogIndex();
  }, []);

  // Add structured data for the blog list
  useEffect(() => {
    if (!blogPosts.length) return;

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

    // Add structured data to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [blogPosts]);

  // Filter blog posts based on search query
  const filteredPosts = blogPosts.filter(post => {
    return searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Sort posts by date (newest first)
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <h2 className="text-2xl font-bold">Latest Posts</h2>
          
          <div className="w-full md:w-64">
            <Input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-bgGray/50 border-gray-700"
            />
          </div>
        </div>
      </div>

      <div className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.length === 0 ? (
            <div className="col-span-full text-center py-12 border border-dashed border-gray-700 rounded-lg">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="text-grayFill text-lg">No posts found matching your criteria</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear search
              </Button>
            </div>
          ) : (
            sortedPosts.map((post) => (
              <Card 
                key={post.id} 
                className="hover:shadow-lg transition duration-300 hover:border-blue-500/30 cursor-pointer overflow-hidden flex flex-col"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="mb-2">{post.title}</CardTitle>
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-500 w-fit">
                    {post.date}
                  </Badge>
                </CardHeader>
                <CardContent className="py-2 flex-grow">
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardContent>
                <CardFooter className="pt-2 border-t border-gray-800 bg-bgGray/30 flex justify-between items-center">
                  <div className="text-sm text-grayFill">
                    {post.author && `By ${post.author}`}
                  </div>
                  <Button variant="ghost" className="text-blue-500 p-0 hover:text-blue-400 text-xs">
                    Read More
                    <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>

      <div className="mt-16 bg-bgGray rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Want to Contribute?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-bgGray/50">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-semibold text-lg">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fork the Repository</h3>
              <p className="text-grayFill">
                Start by forking our GitHub repository to create your own copy where you can make changes.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-bgGray/50">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-semibold text-lg">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Create Markdown File</h3>
              <p className="text-grayFill">
                Add your blog post as a markdown file in the public/blog directory with proper frontmatter.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-bgGray/50">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-white font-semibold text-lg">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Submit a Pull Request</h3>
              <p className="text-grayFill">
                Submit your changes for review, and our team will review and merge your contribution.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-8 p-6 border border-blue-500/30 rounded-lg bg-blue-500/10">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
            </svg>
            Markdown Format
          </h3>
          <p className="text-grayFill mb-4">
            Each blog post uses a markdown file with frontmatter. Here's the basic structure:
          </p>
          <pre className="bg-bgPrimary p-4 rounded-md overflow-x-auto text-sm">
            <code>{
`---
title: Your Blog Title
date: Month Day, Year
author: Your Name
---

# Your Blog Title

Introduction paragraph...

## Subheading

Content of your blog post...

### Another Section

More content...`
            }</code>
          </pre>
          
          <div className="mt-6">
            <a 
              href="https://github.com/aidatafoundation/aidatafoundation.github.io/blob/main/public/blog/categories-and-contributing.md" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
              </svg>
              View Full Contributing Guidelines
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

// Blog detail component
function BlogDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogPost = async () => {
      setLoading(true);
      
      try {
        // First, fetch the blog index to find the correct post
        let blogPost = null;
        
        // On GitHub Pages, use the fallback data
        if (window.location.hostname.includes('github.io')) {
          blogPost = fallbackBlogData.find(p => p.id === postId);
        } else {
          // For local development, try to fetch the index
          const timestamp = new Date().getTime();
          const potentialIndexUrls = [
            '/data/blog.json',
            '/blog/index.json',
            `${window.location.origin}/data/blog.json`,
            `${window.location.origin}/blog/index.json`
          ];
          
          // Try to find the post in the index
          for (const url of potentialIndexUrls) {
            try {
              const response = await fetch(`${url}?_=${timestamp}`, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'X-Requested-With': 'XMLHttpRequest'
                }
              });
              
              if (response.ok) {
                const data = await response.json();
                const foundPost = data.find(p => p.id === postId);
                if (foundPost) {
                  blogPost = foundPost;
                  break;
                }
              }
            } catch (err) {
              console.log(`Failed to fetch from ${url}:`, err);
            }
          }
          
          // If post not found in any index, use fallback
          if (!blogPost) {
            blogPost = fallbackBlogData.find(p => p.id === postId);
          }
        }
        
        // If post still not found, set error
        if (!blogPost) {
          setError("Blog post not found");
          setLoading(false);
          return;
        }
        
        // GitHub Pages detection for static content
        if (window.location.hostname.includes('github.io')) {
          // Since we can't guarantee proper content-type on GitHub Pages, 
          // let's try to load the markdown file directly with the expected path
          try {
            const markdownPath = `/blog/${blogPost.file}`;
            const timestamp = new Date().getTime();
            const response = await fetch(`${markdownPath}?_=${timestamp}`);
            
            if (response.ok) {
              const content = await response.text();
              
              // Extract frontmatter if it exists
              const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
              if (frontmatterMatch) {
                const frontmatterText = frontmatterMatch[1];
                const markdown = frontmatterMatch[2];
                
                setPost({
                  ...blogPost,
                  content: markdown
                });
              } else {
                setPost({
                  ...blogPost,
                  content: content
                });
              }
              
              setLoading(false);
              return;
            }
          } catch (err) {
            console.error('Error fetching from GitHub Pages:', err);
            // Continue to fallback paths
          }
        }
        
        // Now fetch the post content using the path from the post object
        try {
          const potentialPaths = [
            `/blog/${blogPost.file}`,
            `/data/blog/${blogPost.file}`
          ];
          
          let content = null;
          
          // Try each path in sequence
          for (const path of potentialPaths) {
            try {
              const timestamp = new Date().getTime();
              const response = await fetch(`${path}?_=${timestamp}`, {
                headers: {
                  'Accept': 'text/plain',
                  'X-Requested-With': 'XMLHttpRequest'
                }
              });
              
              if (response.ok) {
                content = await response.text();
                break;
              }
            } catch (err) {
              console.log(`Failed to fetch from ${path}:`, err);
              // Continue to next path
            }
          }
          
          if (!content) {
            throw new Error(`Failed to fetch blog post content from any location`);
          }
          
          // Extract frontmatter and content
          const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
          if (frontmatterMatch) {
            const frontmatterText = frontmatterMatch[1];
            const markdown = frontmatterMatch[2];
            
            setPost({
              ...blogPost,
              content: markdown
            });
          } else {
            setPost({
              ...blogPost,
              content: content
            });
          }
          
        } catch (contentErr) {
          console.error("Error fetching blog content:", contentErr);
          setError(`Could not load blog content. Please try again later.`);
        }
      } catch (err) {
        console.error("Error in blog fetching process:", err);
        setError("Failed to load blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [postId, navigate]);

  // Add structured data for the blog post
  useEffect(() => {
    if (!post) return;

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "image": "https://aidatafoundation.github.io/og-image.png",
      "datePublished": new Date(post.date).toISOString(),
      "dateModified": new Date(post.date).toISOString(),
      "author": {
        "@type": "Person",
        "name": post.author || "AI Data Foundation"
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
        "@id": `https://aidatafoundation.github.io/blog/${post.id}`
      },
      "keywords": "AI, artificial intelligence, machine learning, data science, AI tools, AI research"
    };

    // Add structured data to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [post]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[900px] mx-auto py-8">
        <Card className="bg-red-500/10 text-red-400 border-red-500/20">
          <CardContent className="p-8 text-center">
            <svg className="w-16 h-16 mx-auto mb-4 text-red-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-bold mb-4">{error}</h2>
            <Button 
              onClick={() => navigate('/blog')}
              variant="outline"
              className="mt-2"
            >
              Back to Blog
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Blog post not found</h2>
          <Button 
            onClick={() => navigate('/blog')}
            variant="outline"
            className="mt-2"
          >
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/blog')}
          className="mb-4"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Button>
        
        <div className="flex items-center justify-between mb-6">
          <Badge variant="outline" className="bg-blue-500/10 text-blue-500 mb-2">
            {post.date}
          </Badge>
          <div className="flex gap-2">
            <a
              href={`https://github.com/aidatafoundation/aidatafoundation.github.io/edit/main/public/blog/${post.file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-blue-500 hover:text-blue-400"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit this post
            </a>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-6 text-primary">{post.title}</h1>
        <p className="text-grayFill text-lg mb-6">{post.excerpt}</p>
        
        {post.author && (
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-2">
              <span className="text-blue-500 font-medium text-sm">{post.author.charAt(0).toUpperCase()}</span>
            </div>
            <span className="text-grayFill">By {post.author}</span>
          </div>
        )}
      </div>
      
      <Card className="mb-16">
        <CardContent className="p-8">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>
              {post.content || `# ${post.title}\n\n${post.excerpt}`}
            </ReactMarkdown>
          </div>
        </CardContent>
        
        <CardFooter className="pt-6 pb-8 px-8 border-t border-gray-800">
          <div className="flex items-center justify-between w-full">
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
                  <path d="M9.4 16H5.6l-1.7 5H0l6.5-18h5l6.5 18h-3.9zm-3.1-2.5h2.5L7.1 7.3zM24 15l-4-4-4 4v-3h-4V0h4v8h8z" />
                </svg>
              </button>
            </div>
            
            <a 
              href={`https://github.com/aidatafoundation/aidatafoundation.github.io/blob/main/public/blog/${post.file}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View source
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Blog; 