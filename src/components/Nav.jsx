import React, { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-bgGray p-4 shadow-md">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-primary text-xl font-bold">AI Data Foundation</Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-primary"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-primary hover:text-gray-300 transition-colors">Home</Link>
          <Link to="/datasets" className="text-primary hover:text-gray-300 transition-colors">Tools</Link>
          <Link to="/labs" className="text-primary hover:text-gray-300 transition-colors">Labs</Link>
          <Link to="/blog" className="text-primary hover:text-gray-300 transition-colors">Blog</Link>
          <Link to="/about" className="text-primary hover:text-gray-300 transition-colors">About</Link>
          <a href="https://github.com/AIDataFoundation" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-gray-300 transition-colors">GitHub</a>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 px-4 py-2">
          <Link to="/" className="text-primary hover:text-gray-300 transition-colors">Home</Link>
          <Link to="/datasets" className="text-primary hover:text-gray-300 transition-colors">Tools</Link>
          <Link to="/labs" className="text-primary hover:text-gray-300 transition-colors">Labs</Link>
          <Link to="/blog" className="text-primary hover:text-gray-300 transition-colors">Blog</Link>
          <Link to="/about" className="text-primary hover:text-gray-300 transition-colors">About</Link>
          <a href="https://github.com/AIDataFoundation" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-gray-300 transition-colors">GitHub</a>
        </div>
      )}
    </nav>
  );
}

export default Nav; 