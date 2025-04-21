import React from "react";
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

  return (
    <div className="bg-bgPrimary min-h-screen">
      {/* Hero Section - Enhanced with gradient background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-bgPrimary opacity-30"></div>
        <div className="max-w-[1280px] mx-auto px-4 pt-20 pb-24 relative z-10">
          <div className="flex flex-col items-center gap-8 text-center">
            <Badge variant="outline" className="bg-white/10 backdrop-blur-sm px-4 py-2">
              <span className="text-primary text-sm font-medium">Advancing AI Research Through Tools</span>
            </Badge>
            
            <h1 className="text-primary text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight animate-fadeIn">
              Building the Foundation for Responsible AI Innovation
            </h1>
            
            <p className="text-grayFill text-xl max-w-3xl">
              AIData Foundation is dedicated to creating, curating, and promoting high-quality tools 
              that power the next generation of AI research and applications.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-5 mt-6">
              <Button 
                text={"Explore Tools"} 
                link={"/tools"} 
              />
              <Button 
                text={"Join Our Community"} 
                link={"#community"} 
              />
            </div>
            
            {/* Stats section */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl">
              <Card className="bg-white/5 backdrop-blur-sm border-0">
                <CardContent className="p-6">
                  <div className="text-blue-400 text-3xl font-bold mb-2">10K+</div>
                  <div className="text-primary text-sm">Curated Tools</div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur-sm border-0">
                <CardContent className="p-6">
                  <div className="text-purple-400 text-3xl font-bold mb-2">50+</div>
                  <div className="text-primary text-sm">Tech Partners</div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur-sm border-0">
                <CardContent className="p-6">
                  <div className="text-green-400 text-3xl font-bold mb-2">30K+</div>
                  <div className="text-primary text-sm">Community Members</div>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur-sm border-0">
                <CardContent className="p-6">
                  <div className="text-amber-400 text-3xl font-bold mb-2">200+</div>
                  <div className="text-primary text-sm">AI Use Cases</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* Decorative element */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </div>

      {/* Mission Section - With visual element */}
      <div className="max-w-[1280px] mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-primary text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-grayFill text-lg mb-6">
              We believe that access to high-quality tools is the foundation of responsible AI development. 
              Our mission is to democratize this access while promoting ethical considerations and diversity in AI systems.
            </p>
            <p className="text-grayFill text-lg mb-8">
              Through collaboration with researchers, industry leaders, and diverse communities, we're building 
              a more inclusive AI ecosystem that benefits humanity. We focus on community building and continuous 
              improvement of AI tools and methodologies that serve the greater good.
            </p>
            <Link to="/about" className="text-blue-500 hover:text-blue-400 flex items-center">
              Learn more about our work
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 p-10 rounded-2xl shadow-xl">
            <div className="h-64 w-full rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Tools Section */}
      <div className="bg-bgGray py-20">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-primary text-3xl font-bold mb-4">Featured Tools</h2>
            <p className="text-grayFill text-xl max-w-3xl mx-auto">
              Explore some of our most popular AI tools used by researchers and developers worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTools.map(tool => (
              <Card key={tool.id} className="bg-bgPrimary shadow-md transition duration-300 hover:shadow-lg hover:translate-y-[-5px]">
                <CardHeader className="p-8 pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant={tool.category === "Machine Learning" ? "ml" : tool.category === "NLP" ? "llmFramework" : "data"}>
                      {tool.category}
                    </Badge>
                    <div className="flex items-center text-yellow-400">
                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {tool.stars.toLocaleString()}
                    </div>
                  </div>
                  <CardTitle className="mb-2">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 py-2">
                  <CardDescription className="text-grayFill">
                    {tool.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-8 pt-4">
                  <Link to={`/tools/${tool.id}`} className="text-blue-500 hover:text-blue-400 flex items-center text-sm">
                    Explore Tool
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/tools" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition">
              View All Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-[1280px] mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-primary text-3xl font-bold mb-4">What We Offer</h2>
          <p className="text-grayFill text-xl max-w-3xl mx-auto">
            Our comprehensive approach to AI tools provides researchers and developers with everything they need to build ethical and effective AI systems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="relative overflow-hidden border-0">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <CardTitle className="mb-4">Curated Tools</CardTitle>
              <CardDescription>
                Access our carefully curated collection of high-quality AI tools across various domains, thoroughly evaluated and documented for research and commercial use.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden border-0">
            <div className="absolute top-0 left-0 w-2 h-full bg-purple-500"></div>
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <CardTitle className="mb-4">Tool Comparisons</CardTitle>
              <CardDescription>
                Explore our detailed comparisons and evaluations of various AI tools to help you select the right solutions for your specific use cases and requirements.
              </CardDescription>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden border-0">
            <div className="absolute top-0 left-0 w-2 h-full bg-green-500"></div>
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <CardTitle className="mb-4">Community & Collaboration</CardTitle>
              <CardDescription>
                Join our vibrant community of researchers, data scientists, and AI practitioners to collaborate on projects, share insights, and advance the field together.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Call to Action */}
      <div id="community" className="max-w-[1280px] mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 rounded-2xl">
          <CardContent className="p-10 text-center">
            <h2 className="text-white text-3xl font-bold mb-6">Join the AIData Community</h2>
            <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
              Connect with fellow researchers and AI enthusiasts. Contribute to our tools directory, participate in discussions, and help shape the future of AI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                text={"Join Now"} 
                link={"#signup"} 
              />
              <Button 
                text={"Learn More"} 
                link={"/about"} 
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LandingPage; 