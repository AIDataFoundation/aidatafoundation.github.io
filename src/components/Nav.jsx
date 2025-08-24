import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if a link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-medium" 
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="container-responsive">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              {/* Enhanced Logo */}
              <div className="relative h-10 w-10 overflow-hidden rounded-xl shadow-lg group-hover:shadow-glow transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-cyan-500 rounded-xl transform rotate-3"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-sm tracking-wider">ADF</span>
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-gradient-to-tr from-primary/80 to-cyan-400 rounded-full opacity-80 blur-sm animate-pulse-slow"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                  AI Data
                </span>
                <span className="text-muted-foreground text-xs tracking-wider font-medium">
                  Foundation
                </span>
              </div>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors focus-ring"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-6 h-6 relative">
              <span className={`absolute inset-0 transform transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1"
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </span>
              <span className={`absolute inset-0 transform transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </span>
              <span className={`absolute inset-0 transform transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1"
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </span>
            </div>
          </button>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1">
            {[
              { path: "/", label: "Home" },
              { path: "/tools", label: "Tools" },
              { path: "/labs", label: "Labs" },
              { path: "/blog", label: "Blog" },
              { path: "/about", label: "About" }
            ].map((item) => (
              <Link 
                key={item.path}
                to={item.path} 
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-ring ${
                  isActive(item.path) 
                    ? "bg-primary text-primary-foreground shadow-glow" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Dark mode toggle */}
            <DarkModeToggle />
            
            <a 
              href="https://github.com/aidatafoundation" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ml-2 p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all duration-200 focus-ring"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-md border-t border-border px-4 py-4 space-y-2 shadow-medium">
          {[
            { path: "/", label: "Home" },
            { path: "/tools", label: "Tools" },
            { path: "/labs", label: "Labs" },
            { path: "/blog", label: "Blog" },
            { path: "/about", label: "About" }
          ].map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 focus-ring ${
                isActive(item.path) 
                  ? "bg-primary text-primary-foreground shadow-glow" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Mobile dark mode toggle */}
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-base font-medium text-muted-foreground">Theme</span>
            <DarkModeToggle />
          </div>
          
          <a 
            href="https://github.com/aidatafoundation" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 focus-ring"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav; 