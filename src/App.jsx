import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
import ToolsSection from "./components/ToolsSection";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import Labs from "./components/Labs";
import OpenGraph from "./components/OpenGraph";
import Popup from "./components/Popup";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Nav />
        {/* Global Discord popup that shows when clicking external links */}
        <Popup />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={
              <>
                <OpenGraph
                  title="AI Data Foundation | AI Tools, Research & Resources"
                  description="A comprehensive resource for AI tools, frameworks, datasets, and methodologies. Explore the latest in machine learning, natural language processing, computer vision, and more."
                  tags={["AI", "Machine Learning", "Data Science", "NLP", "Computer Vision"]}
                />
                <LandingPage />
              </>
            } />
            <Route path="/tools" element={
              <div className="container-responsive py-8">
                <OpenGraph
                  title="AI Tools Collection | AI Data Foundation"
                  description="Explore our curated collection of AI tools, frameworks, libraries, and resources for data science, machine learning, and artificial intelligence."
                  tags={["AI Tools", "Machine Learning Libraries", "Data Science Tools", "Frameworks"]}
                />
                <div className="text-center mb-12">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    AI Tools Collection
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                    Discover and explore cutting-edge AI tools, frameworks, and libraries
                  </p>
                </div>
                <ToolsSection />
              </div>
            } />
            <Route path="/labs" element={
              <>
                <OpenGraph
                  title="AI Labs | AI Data Foundation"
                  description="Interactive AI labs and experiments showcasing cutting-edge artificial intelligence research and applications."
                  tags={["AI Labs", "Experiments", "Interactive AI", "Research"]}
                />
                <Labs />
              </>
            } />
            <Route path="/labs/:labId" element={<Labs />} />
            <Route path="/blog" element={
              <>
                <OpenGraph
                  title="AI Blog | AI Data Foundation"
                  description="Latest insights, tutorials, and news about artificial intelligence, machine learning, and data science."
                  tags={["AI Blog", "Machine Learning", "Data Science", "Tutorials", "AI News"]}
                />
                <Blog />
              </>
            } />
            <Route path="/blog/:postId" element={<Blog />} />
            <Route path="/about" element={
              <div className="container-responsive py-16">
                <OpenGraph
                  title="About AI Data Foundation"
                  description="AI Data Foundation is a non-profit organization dedicated to advancing artificial intelligence through high-quality data resources and research."
                  tags={["About", "AI Organization", "Non-Profit", "Research"]}
                />
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                      About AI Data Foundation
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-purple-600 mx-auto rounded-full"></div>
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    <div className="bg-card border border-border rounded-xl p-8 shadow-soft">
                      <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        AI Data Foundation is a non-profit organization dedicated to advancing the field of artificial intelligence through high-quality data resources and research.
                      </p>
                      <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                        Our mission is to democratize access to AI data, enabling researchers and developers from all backgrounds to participate in and contribute to the advancement of AI technology.
                      </p>
                      <p className="text-xl text-muted-foreground leading-relaxed">
                        Founded in 2023, we collaborate with academic institutions, industry partners, and individual contributors to build a more inclusive and responsible AI ecosystem.
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8 mt-12">
                      <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
                        <h3 className="text-2xl font-semibold mb-4 text-foreground">Our Vision</h3>
                        <p className="text-muted-foreground">
                          To create a world where AI technology is accessible, ethical, and beneficial to all of humanity.
                        </p>
                      </div>
                      <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
                        <h3 className="text-2xl font-semibold mb-4 text-foreground">Our Values</h3>
                        <p className="text-muted-foreground">
                          Transparency, inclusivity, responsibility, and innovation guide everything we do.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            } />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
