import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
import ToolsSection from "./components/ToolsSection";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import Labs from "./components/Labs";
import OpenGraph from "./components/OpenGraph";

function App() {
  return (
    <Router>
      <div className="bg-bgPrimary min-h-screen">
        <Nav />
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
              <div className="text-primary max-w-[1280px] mx-auto px-4 py-8">
                <OpenGraph 
                  title="AI Tools Collection | AI Data Foundation"
                  description="Explore our curated collection of AI tools, frameworks, libraries, and resources for data science, machine learning, and artificial intelligence."
                  tags={["AI Tools", "Machine Learning Libraries", "Data Science Tools", "Frameworks"]}
                />
                <h1 className="text-3xl font-bold mb-8 text-center">AI Tools Collection</h1>
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
              <div className="text-primary max-w-[1280px] mx-auto px-4 py-8">
                <OpenGraph 
                  title="About AI Data Foundation"
                  description="AI Data Foundation is a non-profit organization dedicated to advancing artificial intelligence through high-quality data resources and research."
                  tags={["About", "AI Organization", "Non-Profit", "Research"]}
                />
                <h1 className="text-3xl font-bold mb-8 text-center">About AI Data Foundation</h1>
                <p className="text-grayFill text-lg mb-6">
                  AI Data Foundation is a non-profit organization dedicated to advancing the field of artificial intelligence through high-quality data resources and research.
                </p>
                <p className="text-grayFill text-lg mb-6">
                  Our mission is to democratize access to AI data, enabling researchers and developers from all backgrounds to participate in and contribute to the advancement of AI technology.
                </p>
                <p className="text-grayFill text-lg">
                  Founded in 2023, we collaborate with academic institutions, industry partners, and individual contributors to build a more inclusive and responsible AI ecosystem.
                </p>
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
