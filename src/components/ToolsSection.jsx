import React, { useState, useEffect } from "react";
import { entries } from "../data/entries";
import ToolCard from "./ToolCard";

function ToolsSection() {
  const [search, setSearch] = useState("");
  const [selectVal, setSelectVal] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [githubStars, setGithubStars] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryType, setCategoryType] = useState("all"); // "all", "ai", "llm", "mcp"

  // Extract unique tags from entries
  let allTags = Array.from(new Set(entries.map((entry) => entry.tag))).sort();
  
  // Separate AI, LLM, and MCP tags
  const aiTags = allTags.filter(tag => 
    tag.includes("Machine Learning") || 
    tag.includes("Deep Learning") || 
    tag.includes("Data") || 
    tag.includes("Reinforcement") || 
    tag === "Programming" ||
    tag.includes("Artificial Intelligence")
  );
  
  const llmTags = allTags.filter(tag => 
    tag.includes("LLM") || 
    tag.includes("Vector Database")
  );
  
  const mcpTags = allTags.filter(tag => 
    tag.includes("MCP")
  );
  
  // Select which tags to display based on categoryType
  let dropdownTags = categoryType === "all" ? allTags : 
                     categoryType === "ai" ? aiTags : 
                     categoryType === "llm" ? llmTags : mcpTags;

  // Function to format star count
  const formatStarCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count;
  };

  // Function to fetch GitHub stars for a repository
  const fetchGithubStars = async (repo) => {
    const cacheKey = `github-stars-${repo}`;
    const cachedData = localStorage.getItem(cacheKey);
    
    // Check if we have cached data less than 6 hours old
    if (cachedData) {
      const { stars, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < 21600000) { // 6 hours
        return stars;
      }
    }

    try {
      // Get GitHub token from environment variable
      const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
      
      const headers = {
        'Accept': 'application/vnd.github.v3+json',
        ...(githubToken && { 'Authorization': `token ${githubToken}` })
      };

      const response = await fetch(`https://api.github.com/repos/${repo}`, { headers });
      
      // Handle rate limiting
      const rateLimit = {
        limit: response.headers.get('X-RateLimit-Limit'),
        remaining: response.headers.get('X-RateLimit-Remaining'),
        reset: response.headers.get('X-RateLimit-Reset')
      };

      if (response.status === 429) {
        const resetDate = new Date(rateLimit.reset * 1000);
        const minutes = Math.ceil((resetDate - new Date()) / 60000);
        throw new Error(`GitHub API rate limit exceeded. Resets in ${minutes} minutes. Using cached data where available.`);
      }

      if (response.status === 403 && rateLimit.remaining === '0') {
        const resetDate = new Date(rateLimit.reset * 1000);
        const minutes = Math.ceil((resetDate - new Date()) / 60000);
        throw new Error(`GitHub API rate limit reached. Resets in ${minutes} minutes. Using cached data where available.`);
      }

      if (!response.ok) {
        throw new Error(`GitHub API error for ${repo}: ${response.status}`);
      }

      const data = await response.json();
      
      // Cache the result
      localStorage.setItem(cacheKey, JSON.stringify({
        stars: data.stargazers_count,
        timestamp: Date.now()
      }));
      
      return data.stargazers_count;
    } catch (error) {
      console.error("Error fetching GitHub stars:", error);
      // Return cached data if available when hitting rate limits
      if (error.message.includes('rate limit') && cachedData) {
        const { stars } = JSON.parse(cachedData);
        return stars;
      }
      setError(error.message);
      return null;
    }
  };

  // Fetch GitHub stars for all repositories on component mount
  useEffect(() => {
    const fetchAllStars = async () => {
      setIsLoading(true);
      setError(null);
      const stars = {};
      
      // Process repositories in batches to avoid overwhelming the API
      const batchSize = 10;
      const repos = entries.filter(entry => entry.github);
      
      for (let i = 0; i < repos.length; i += batchSize) {
        const batch = repos.slice(i, i + batchSize);
        const promises = batch.map(async (entry) => {
          const starCount = await fetchGithubStars(entry.github);
          stars[entry.github] = starCount;
        });
        
        try {
          await Promise.all(promises);
          setGithubStars(prevStars => ({ ...prevStars, ...stars }));
        } catch (error) {
          setError(error.message);
          // Don't break the loop on error, continue with next batch
        }
        
        // Add a small delay between batches to be nice to the API
        if (i + batchSize < repos.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      setIsLoading(false);
    };

    fetchAllStars();
  }, []);

  // Function to sort tools based on selected criteria
  const sortTools = (filteredEntries) => {
    switch (sortBy) {
      case 'stars':
        return [...filteredEntries].sort((a, b) => {
          const starsA = githubStars[a.github] || 0;
          const starsB = githubStars[b.github] || 0;
          return starsB - starsA;
        });
      case 'az':
        return [...filteredEntries].sort((a, b) => 
          a.title.localeCompare(b.title)
        );
      case 'za':
        return [...filteredEntries].sort((a, b) => 
          b.title.localeCompare(a.title)
        );
      default:
        return filteredEntries;
    }
  };

  // Filter entries based on search, tag selection, and category type
  const filteredEntries = entries.filter((entry) => {
    const searchTerm = search.toLowerCase();
    const selectedTag = selectVal.toLowerCase();
    const titleMatches = entry.title.toLowerCase().includes(searchTerm);
    const descriptionMatches = entry.description && entry.description.toLowerCase().includes(searchTerm);
    const tagMatches = selectedTag === "" || entry.tag.toLowerCase().includes(selectedTag);
    
    // Check if tag belongs to the selected category type
    let categoryMatches = true;
    if (categoryType === "ai") {
      categoryMatches = aiTags.includes(entry.tag);
    } else if (categoryType === "llm") {
      categoryMatches = llmTags.includes(entry.tag);
    } else if (categoryType === "mcp") {
      categoryMatches = mcpTags.includes(entry.tag);
    }
    
    return (titleMatches || descriptionMatches) && tagMatches && categoryMatches;
  });

  // Sort the filtered entries
  const sortedEntries = sortTools(filteredEntries);

  return (
    <div className="bg-bgPrimary w-full px-6 py-8 max-w-7xl mx-auto">
      <div className="flex flex-col w-full justify-center items-center gap-6 mx-auto rounded-xl">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-3xl font-bold text-primary mb-2">
            AI Data Tools
          </h2>
          <p className="text-grayFill max-w-2xl text-center mb-6">
            Discover and explore the best tools for AI, Machine Learning, and Data Science
          </p>
        </div>
        
        {error && (
          <div className="w-full bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md relative" role="alert">
            <div className="flex">
              <div className="py-1">
                <svg className="w-6 h-6 mr-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <p className="font-bold">API Error</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Category Type Selector */}
        <div className="w-full flex justify-center mb-4">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                categoryType === "all" 
                  ? "bg-blue-600 text-white" 
                  : "bg-bgGray text-primary hover:bg-gray-700"
              }`}
              onClick={() => {
                setCategoryType("all");
                setSelectVal("");
              }}
            >
              All Tools
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                categoryType === "ai" 
                  ? "bg-blue-600 text-white" 
                  : "bg-bgGray text-primary hover:bg-gray-700"
              }`}
              onClick={() => {
                setCategoryType("ai");
                setSelectVal("");
              }}
            >
              AI & ML Tools
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                categoryType === "llm" 
                  ? "bg-blue-600 text-white" 
                  : "bg-bgGray text-primary hover:bg-gray-700"
              }`}
              onClick={() => {
                setCategoryType("llm");
                setSelectVal("");
              }}
            >
              LLMs
            </button>
            <button
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                categoryType === "mcp" 
                  ? "bg-blue-600 text-white" 
                  : "bg-bgGray text-primary hover:bg-gray-700"
              }`}
              onClick={() => {
                setCategoryType("mcp");
                setSelectVal("");
              }}
            >
              MCP Servers
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="search"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-bgGray border-bgGray placeholder-gray-500 text-primary focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row w-full md:w-1/2 gap-4">
            {/* Category Dropdown */}
            <div className="w-full sm:w-2/3">
              <select
                className="w-full py-3 px-4 rounded-lg bg-bgGray border-bgGray text-primary appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectVal}
                onChange={(e) => setSelectVal(e.target.value)}
              >
                <option value="">All Categories</option>
                {dropdownTags.map((tag, index) => (
                  <option key={index} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
            
            {/* Sort Dropdown */}
            <div className="w-full sm:w-1/3">
              <select
                className="w-full py-3 px-4 rounded-lg bg-bgGray border-bgGray text-primary appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort by: Default</option>
                <option value="stars">Sort by: Stars</option>
                <option value="az">Sort by: A-Z</option>
                <option value="za">Sort by: Z-A</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Results count */}
        <div className="w-full text-left text-grayFill pb-4">
          Found {sortedEntries.length} {categoryType === "all" ? "tools" : 
          categoryType === "ai" ? "AI tools" : 
          categoryType === "llm" ? "LLM tools" : "MCP servers"}
        </div>
        
        {/* Display message if no results */}
        {sortedEntries.length === 0 && (
          <div className="w-full flex flex-col items-center py-10">
            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className="text-gray-400 text-xl font-medium">No results found</p>
            <p className="text-gray-500 text-center mt-2">Try adjusting your search or filter to find what you're looking for.</p>
          </div>
        )}
        
        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {sortedEntries.map((entry, index) => (
            <ToolCard 
              key={index} 
              title={entry.title} 
              link={entry.link} 
              description={entry.description} 
              github={entry.github} 
              githubStars={entry.github ? githubStars[entry.github] : null} 
              isLoading={isLoading}
              formatStarCount={formatStarCount}
              tag={entry.tag}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ToolsSection;
