import React, { useEffect } from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

function LandingPage() {
  // Sample featured tools
  const featuredTools = [
    {
      id: 1,
      title: "TensorFlow",
      description: "An end-to-end open source platform for machine learning with comprehensive ecosystem of tools.",
      category: "Machine Learning",
      stars: 172400
    },
    {
      id: 2,
      title: "Hugging Face",
      description: "The AI community building the future with state-of-the-art NLP models and libraries.",
      category: "NLP",
      stars: 87500
    },
    {
      id: 3,
      title: "PyTorch",
      description: "An open source machine learning framework that accelerates the path from research to production.",
      category: "Deep Learning",
      stars: 62300
    }
  ];

  // Add structured data for SEO
  useEffect(() => {
    // Create JSON-LD structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "AI Data Foundation",
      "url": "https://aidatafoundation.github.io/",
      "logo": "https://aidatafoundation.github.io/android-icon-192x192.png",
      "description": "AI Data Foundation is dedicated to creating, curating, and promoting high-quality tools that power the next generation of AI research and applications.",
      "sameAs": [
        "https://github.com/aidatafoundation"
      ],
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://aidatafoundation.github.io/"
      },
      "keywords": "AI, artificial intelligence, machine learning, deep learning, natural language processing, computer vision, AI tools, data science",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://aidatafoundation.github.io/tools?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    // Add the structured data to the document head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    // Clean up the script tag when component unmounts
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen">
      {/* Hero Section - Modern design with professional gradient */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-950">
        {/* Background gradient - refined for professional look */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-slate-100 dark:from-slate-900/50 dark:via-indigo-950/30 dark:to-slate-950 opacity-90"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] bg-repeat opacity-[0.03] dark:opacity-[0.02]"></div>
        
        {/* Animated accent elements - more subtle and professional */}
        <div className="absolute top-40 left-20 w-96 h-96 bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-500/5 rounded-full filter blur-3xl animate-pulse-slow animation-delay-2000"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32 relative z-10">
          <div className="flex flex-col items-center gap-8 text-center">
            <Badge variant="outline" className="bg-indigo-50/80 dark:bg-indigo-900/10 backdrop-blur-sm px-5 py-2 rounded-full border-indigo-100 dark:border-indigo-800/30">
              <span className="text-indigo-700 dark:text-indigo-400 text-sm font-medium">Advancing AI Research Through Tools</span>
            </Badge>
            
            <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight tracking-tight">
              Building the Foundation for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">Responsible AI</span> Innovation
            </h1>
            
            <p className="text-slate-600 dark:text-slate-300 text-xl max-w-3xl">
              AI Data Foundation is dedicated to creating, curating, and promoting high-quality tools 
              that power the next generation of AI research and applications.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-5 mt-6">
              <Button 
                text={"Explore Tools"} 
                link={"/tools"} 
              />
              <Link 
                to="#community"
                className="px-6 py-3 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-md hover:bg-slate-50 dark:hover:bg-slate-900 transition-all duration-200 flex items-center justify-center group"
              >
                Join Our Community
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
            </div>
            
            {/* Stats section - refined cards with professional shadow */}
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 w-full max-w-5xl">
              <Card className="border border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-indigo-600 dark:text-indigo-400 text-3xl lg:text-4xl font-bold mb-2">10K+</div>
                  <div className="text-slate-700 dark:text-slate-300 text-sm font-medium">Curated Tools</div>
                </CardContent>
              </Card>
              <Card className="border border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-cyan-600 dark:text-cyan-400 text-3xl lg:text-4xl font-bold mb-2">50+</div>
                  <div className="text-slate-700 dark:text-slate-300 text-sm font-medium">Tech Partners</div>
                </CardContent>
              </Card>
              <Card className="border border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-emerald-600 dark:text-emerald-400 text-3xl lg:text-4xl font-bold mb-2">30K+</div>
                  <div className="text-slate-700 dark:text-slate-300 text-sm font-medium">Community Members</div>
                </CardContent>
              </Card>
              <Card className="border border-slate-100 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-amber-600 dark:text-amber-400 text-3xl lg:text-4xl font-bold mb-2">200+</div>
                  <div className="text-slate-700 dark:text-slate-300 text-sm font-medium">AI Use Cases</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Decorative element - refined wave with subtle gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-slate-50 dark:to-slate-950">
          <svg className="absolute bottom-0 w-full h-12 text-slate-50 dark:text-slate-950" preserveAspectRatio="none" viewBox="0 0 1440 74" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,0V74H1440V0C1200,40 960,64 720,64C480,64 240,40 0,0Z" />
          </svg>
        </div>
      </div>

      {/* Mission Section - Modern design with improved layout and shadows */}
      <div className="bg-slate-50 dark:bg-slate-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <span className="inline-block text-indigo-600 dark:text-indigo-400 font-semibold tracking-wider text-sm uppercase mb-3">Our Mission</span>
              <h2 className="text-slate-900 dark:text-white text-3xl lg:text-4xl font-bold mb-6 leading-tight">Democratizing Access to AI Technology</h2>
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-6 leading-relaxed">
                We believe that access to high-quality tools is the foundation of responsible AI development. 
                Our mission is to democratize this access while promoting ethical considerations and diversity in AI systems.
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 leading-relaxed">
                Through collaboration with researchers, industry leaders, and diverse communities, we're building 
                a more inclusive AI ecosystem that benefits humanity. We focus on community building and continuous 
                improvement of AI tools and methodologies that serve the greater good.
              </p>
              <Link to="/about" className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center group transition-colors">
                Learn more about our work
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 mb-10 md:mb-0">
              <div className="relative">
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 dark:from-indigo-500/10 dark:to-cyan-500/10 opacity-70 blur-xl"></div>
                <div className="relative bg-white dark:bg-slate-900 p-6 sm:p-10 rounded-xl shadow-xl">
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 dark:from-indigo-500/10 dark:to-cyan-500/10 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-center p-6">
                      <svg className="w-32 h-32 sm:w-48 sm:h-48 text-indigo-500/80 dark:text-indigo-400/80" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                        <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                        <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Tools Section - Modern cards with refined design */}
      <div className="bg-white dark:bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-indigo-600 dark:text-indigo-400 font-semibold tracking-wider text-sm uppercase mb-3">SHOWCASED TOOLS</span>
            <h2 className="text-slate-900 dark:text-white text-3xl lg:text-4xl font-bold mb-4 leading-tight">Discover Leading AI Technologies</h2>
            <p className="text-slate-600 dark:text-slate-300 text-xl max-w-3xl mx-auto">
              Browse through our curated collection of notable AI tools that are advancing research and development in the field.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTools.map(tool => (
              <Card key={tool.id} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-xl transition duration-300 rounded-xl overflow-hidden">
                <CardHeader className="p-8 pb-4">
                  <div className="flex justify-between items-start mb-3">
                    <Badge 
                      variant={tool.category === "Machine Learning" ? "ml" : tool.category === "NLP" ? "llmFramework" : "data"} 
                      className="font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                    >
                      {tool.category}
                    </Badge>
                    <div className="flex items-center text-amber-600 dark:text-amber-400 font-medium">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {tool.stars.toLocaleString()}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-900 dark:text-white mb-2">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 py-2">
                  <CardDescription className="text-slate-600 dark:text-slate-300 text-base">
                    {tool.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-8 pt-6">
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link to="/tools" className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm hover:shadow transition">
              View All Tools
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section - Modern design with improved depth and colors */}
      <div className="bg-slate-50 dark:bg-slate-950 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-indigo-600 dark:text-indigo-400 font-semibold tracking-wider text-sm uppercase mb-3">What We Offer</span>
            <h2 className="text-slate-900 dark:text-white text-3xl lg:text-4xl font-bold mb-4 leading-tight">Comprehensive AI Resources</h2>
            <p className="text-slate-600 dark:text-slate-300 text-xl max-w-3xl mx-auto">
              Our comprehensive approach to AI tools provides researchers and developers with everything they need to build ethical and effective AI systems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12">
            <Card className="relative overflow-hidden border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-lg transition-shadow group">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow transition-shadow">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white mb-4">Curated Tools</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300 text-base">
                  Access our carefully curated collection of high-quality AI tools across various domains, thoroughly evaluated and documented for research and commercial use.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="relative overflow-hidden border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-lg transition-shadow group">
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow transition-shadow">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white mb-4">Tool Comparisons</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300 text-base">
                  Explore our detailed comparisons and evaluations of various AI tools to help you select the right solutions for your specific use cases and requirements.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="relative overflow-hidden border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-md hover:shadow-lg transition-shadow group">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:shadow transition-shadow">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-bold text-slate-900 dark:text-white mb-4">Community & Collaboration</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300 text-base">
                  Join our vibrant community of researchers, data scientists, and AI practitioners to collaborate on projects, share insights, and advance the field together.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Call to Action - Professional gradient with enhanced design */}
      <div id="community" className="bg-white dark:bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            {/* Modern professional gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600"></div>
            
            {/* Refined pattern overlay */}
            <div className="absolute inset-0 bg-[url('/patterns/dot-grid.svg')] bg-repeat opacity-10"></div>
            
            {/* Add subtle animated accent */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/10 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
            
            <div className="relative px-8 py-16 md:p-16 text-center">
              <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">Join the AI Data Community</h2>
              <p className="text-white/90 text-xl mb-10 max-w-2xl mx-auto">
                Connect with fellow researchers and AI enthusiasts. Contribute to our tools directory, participate in discussions, and help shape the future of AI.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-5">
                <a 
                  href="https://github.com/aidatafoundation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-indigo-600 font-medium rounded-md hover:bg-indigo-50 transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center group"
                >
                  <svg className="w-5 h-5 mr-2 transform group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Join on GitHub
                </a>
                <Link 
                  to="/about"
                  className="px-8 py-4 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center group"
                >
                  Learn More
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage; 