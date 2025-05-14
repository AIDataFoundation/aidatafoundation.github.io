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

def extract_github_info(url):
    if not url:
        return None, None
    if url.startswith("https://github.com/"):
        # Split the URL into parts
        parts = url.replace("https://github.com/", "").split("/")
        username = parts[0]
        return url, username
    return None, None

def convert_to_mcp_entry(server):
    # Get the source code URL if available
    source_code_url = server.get("source_code_url", "")
    github_url, github_username = extract_github_info(source_code_url)
    
    # If no GitHub URL is found, create one from the name
    if not github_url:
        # Convert server name to a GitHub-friendly format
        repo_name = server["name"].lower().replace(" ", "-").replace("(", "").replace(")", "")
        github_username = "mcp-contrib"  # Default organization
        github_url = f"https://github.com/{github_username}/{repo_name}"
    
    return {
        "title": server["name"],
        "link": github_url,  # Always use GitHub URL
        "description": server.get("short_description", ""),
        "github": github_username,
        "tag": "MCP Server"  # Default tag, can be customized based on server properties
    }

def update_mcp_entries(servers):
    mcp_entries_js = """/**
 * MCP (Model Context Protocol) servers and tools collection
 * 
 * Each entry has the following structure:
 * {
 *     title: string // display name
 *     link: string // the link for the website which contain learning resources (GitHub repository)
 *     description?: string // description that will be listed with your entry
 *     github?: string // username on github that will display a link to your repo
 *     tag: string // category/tag of the tool
 * }
 */

export const mcpEntries = """
    
    # Convert servers to mcp entries format
    mcp_entries = [convert_to_mcp_entry(server) for server in servers]
    
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