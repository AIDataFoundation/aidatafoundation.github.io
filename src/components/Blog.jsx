import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

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
        "file": "/blog/cloud-native-tools-collection.md"
      },
      {
        "id": "2",
        "title": "Quick Start Guide",
        "date": "June 15, 2023",
        "excerpt": "Get started with our platform quickly and easily with this comprehensive guide.",
        "author": "AI Data Foundation",
        "file": "/blog/quick-start-guide.md"
      },
      {
        "id": "3",
        "title": "Categories and Contributing",
        "date": "July 23, 2023", 
        "excerpt": "Explore our tool categories and learn how to contribute to the project.",
        "author": "AI Data Foundation",
        "file": "/blog/categories-and-contributing.md"
      }
    ] 
  
  // Load blog index
  useEffect(() => {
    const fetchBlogIndex = async () => {
      try {
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
    <div className="max-w-[1280px] mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-primary mb-2">AI Data Foundation Blog</h1>
        <p className="text-grayFill text-center max-w-[800px] mx-auto">
          Stay updated with the latest AI research, tools, and insights from our team and community contributors.
        </p>
      </div>
      
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary">Latest Posts</h2>
          <Button 
            variant="outline" 
            onClick={() => window.open('https://github.com/aidatafoundation/aidatafoundation.github.io/tree/main/public/blog', '_blank')}
            className="text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Contribute a Post
          </Button>
        </div>
        
        <BlogList blogPosts={blogPosts} />
      </div>
      
      <div className="bg-bgGray rounded-xl p-8 border border-gray-800">
        <h2 className="text-xl font-semibold text-primary mb-4">Want to Contribute?</h2>
        <p className="text-grayFill mb-6">
          We welcome blog post contributions from the community. Share your knowledge, insights, and experiences related to AI data, tools, and methodologies.
        </p>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="bg-blue-500/20 text-blue-500 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">1</div>
            <div>
              <h3 className="font-medium text-primary">Fork the Repository</h3>
              <p className="text-sm text-grayFill">Start by forking our GitHub repository to your account.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-500/20 text-blue-500 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">2</div>
            <div>
              <h3 className="font-medium text-primary">Create a Markdown File</h3>
              <p className="text-sm text-grayFill">Add a new markdown file in the <code className="bg-bgPrimary px-1 py-0.5 rounded text-xs">public/blog</code> directory with proper frontmatter.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-500/20 text-blue-500 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">3</div>
            <div>
              <h3 className="font-medium text-primary">Update the Index</h3>
              <p className="text-sm text-grayFill">Add your post entry to <code className="bg-bgPrimary px-1 py-0.5 rounded text-xs">public/blog/index.json</code>.</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-500/20 text-blue-500 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">4</div>
            <div>
              <h3 className="font-medium text-primary">Submit a Pull Request</h3>
              <p className="text-sm text-grayFill">Create a pull request with your changes for review.</p>
            </div>
          </div>
        </div>
        <Button 
          onClick={() => window.open('https://github.com/aidatafoundation/aidatafoundation.github.io/blob/main/public/blog/3-categories-and-contributing.md', '_blank')}
          className="mt-6"
        >
          View Contribution Guidelines
        </Button>
      </div>
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
function BlogList({ blogPosts }) {
  const navigate = useNavigate();
  
  // Sort posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sortedPosts.map(post => (
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
              <div className="text-sm text-grayFill">
                {post.author && `By ${post.author}`}
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

export default Blog; 