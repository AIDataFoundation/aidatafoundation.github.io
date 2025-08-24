import React from "react";
import GitHubButton from 'react-github-btn';

function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-responsive py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left side - Brand */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <div className="relative h-8 w-8 overflow-hidden rounded-lg shadow-md">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-cyan-500 rounded-lg transform rotate-3"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-bold text-xs tracking-wider">ADF</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground font-bold text-lg leading-tight">AI Data</span>
                <span className="text-muted-foreground text-xs tracking-wider font-medium">Foundation</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Advancing AI research through high-quality tools and resources
            </p>
          </div>

          {/* Center - Links */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a 
                href="/about" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
              <a 
                href="/tools" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Tools
              </a>
              <a 
                href="/labs" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Labs
              </a>
              <a 
                href="/blog" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Blog
              </a>
              <a 
                href="https://github.com/aidatafoundation" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Right side - GitHub Star and Visitor Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-4">
            <div className="github-btn-container">
              <GitHubButton 
                href="https://github.com/aidatafoundation/aidatafoundation.github.io" 
                data-color-scheme="no-preference: dark; light: dark; dark: dark;" 
                data-icon="octicon-star" 
                data-size="large" 
                data-show-count="true" 
                aria-label="Star aidatafoundation/aidatafoundation.github.io on GitHub"
              >
                Star
              </GitHubButton>
            </div>
            <a 
              href="https://visitorbadge.io/status?path=https%3A%2F%2Faidatafoundation.github.io%2F"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-105"
            >
              <img 
                src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Faidatafoundation.github.io%2F&label=Tools&labelColor=%2337d67a&countColor=%23ff8a65" 
                alt="Visitor Badge"
                className="rounded-lg shadow-soft"
              />
            </a>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="text-center md:text-left">
              <p>&copy; 2024 AI Data Foundation. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6">
              <a 
                href="/privacy" 
                className="hover:text-foreground transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="/terms" 
                className="hover:text-foreground transition-colors"
              >
                Terms of Service
              </a>
              <a 
                href="/contact" 
                className="hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


