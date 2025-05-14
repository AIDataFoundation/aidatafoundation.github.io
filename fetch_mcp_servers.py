import requests
import json
import time

def fetch_all_servers():
    base_url = "https://api.pulsemcp.com/v0beta/servers"
    headers = {
        "User-Agent": "CustomMCPFetcher/1.0"
    }
    
    all_servers = []
    offset = 0
    count_per_page = 5000  # Maximum allowed per documentation
    
    while True:
        try:
            params = {
                "offset": offset,
                "count_per_page": count_per_page
            }
            
            response = requests.get(base_url, headers=headers, params=params)
            response.raise_for_status()
            
            data = response.json()
            servers = data.get("servers", [])
            
            if not servers:
                break
                
            all_servers.extend(servers)
            print(f"Fetched {len(servers)} servers. Total so far: {len(all_servers)}")
            
            if "next" not in data:
                break
                
            offset += count_per_page
            time.sleep(1)  # Be nice to the API
            
        except Exception as e:
            print(f"Error fetching servers: {e}")
            break
    
    return all_servers

def extract_github_info(server):
    source_code_url = server.get("source_code_url", "")
    github_stars = server.get("github_stars", 0) or 0  # Convert None to 0
    
    if source_code_url and source_code_url.startswith("https://github.com/"):
        # Extract username and repo from GitHub URL
        parts = source_code_url.replace("https://github.com/", "").split("/")
        if len(parts) >= 2:
            username = parts[0]
            repo = parts[1]
            return {
                "url": source_code_url,
                "username": username,
                "repo": repo,
                "stars": github_stars
            }
    
    # If no valid GitHub URL found, create one from the name
    name = server["name"]
    repo_name = name.lower().replace(" ", "-").replace("(", "").replace(")", "")
    username = "mcp-contrib"
    return {
        "url": f"https://github.com/{username}/{repo_name}",
        "username": username,
        "repo": repo_name,
        "stars": 0
    }

def convert_to_mcp_entry(server):
    github_info = extract_github_info(server)
    
    # Get download count if available
    download_count = server.get("package_download_count", 0) or 0  # Convert None to 0
    
    return {
        "title": server["name"],
        "link": github_info["url"],
        "description": server.get("short_description", ""),
        "githubUsername": github_info["username"],
        "githubRepo": github_info["repo"],
        "stars": github_info["stars"],
        "downloads": download_count,
        "tag": determine_tag(server)
    }

def determine_tag(server):
    # Extract category from server name or description
    name = server["name"].lower()
    desc = server.get("short_description", "").lower()
    
    if any(kw in name or kw in desc for kw in ["blockchain", "ethereum", "web3"]):
        return "MCP Blockchain"
    elif any(kw in name or kw in desc for kw in ["ai", "llm", "gpt", "claude"]):
        return "MCP AI"
    elif any(kw in name or kw in desc for kw in ["database", "sql", "mongodb"]):
        return "MCP Database"
    elif any(kw in name or kw in desc for kw in ["file", "storage", "s3"]):
        return "MCP Storage"
    elif any(kw in name or kw in desc for kw in ["api", "rest", "graphql"]):
        return "MCP API"
    elif any(kw in name or kw in desc for kw in ["web", "browser", "http"]):
        return "MCP Web"
    elif any(kw in name or kw in desc for kw in ["cli", "terminal", "shell"]):
        return "MCP CLI"
    elif any(kw in name or kw in desc for kw in ["ui", "design", "figma"]):
        return "MCP Design"
    else:
        return "MCP Server"

def update_mcp_entries(servers):
    mcp_entries_js = """/**
 * MCP (Model Context Protocol) servers and tools collection
 * 
 * Each entry has the following structure:
 * {
 *     title: string // display name
 *     link: string // GitHub repository URL
 *     description?: string // description that will be listed with your entry
 *     githubUsername: string // GitHub username
 *     githubRepo: string // GitHub repository name
 *     stars: number // GitHub star count
 *     downloads: number // Package download count if available
 *     tag: string // category/tag of the tool
 * }
 */

export const mcpEntries = """
    
    # Convert servers to mcp entries format
    mcp_entries = [convert_to_mcp_entry(server) for server in servers]
    
    # Sort entries by stars count (descending)
    mcp_entries.sort(key=lambda x: (x["stars"], x["downloads"]), reverse=True)
    
    # Add the entries as JSON
    mcp_entries_js += json.dumps(mcp_entries, indent=2)
    mcp_entries_js += ";\n"
    
    # Write to file
    with open("src/data/mcp-entries.js", "w") as f:
        f.write(mcp_entries_js)
    
    print(f"Updated mcp-entries.js with {len(mcp_entries)} entries")

if __name__ == "__main__":
    print("Fetching all MCP servers...")
    servers = fetch_all_servers()
    update_mcp_entries(servers) 