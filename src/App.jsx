import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import LandingPage from "./components/LandingPage";
import ToolsSection from "./components/ToolsSection";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import Labs from "./components/Labs";

function App() {
  return (
    <Router>
      <div className="bg-bgPrimary min-h-screen">
        <Nav />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/datasets" element={
            <div className="text-primary max-w-[1280px] mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-8 text-center">AI Datasets Collection</h1>
              <ToolsSection />
            </div>
          } />
          <Route path="/labs" element={<Labs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={
            <div className="text-primary max-w-[1280px] mx-auto px-4 py-8">
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
