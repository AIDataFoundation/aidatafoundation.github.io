import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

function Labs() {
  const [selectedLab, setSelectedLab] = useState(null);
  const [content, setContent] = useState("");
  
  const labs = [
    {
      id: "data-quality-metrics",
      title: "Data Quality Metrics for Large Language Models",
      description: "A comprehensive framework for assessing and improving the quality of training data for large language models.",
      category: "Data Quality",
      path: "/labs/data-quality-metrics.md",
      contributors: ["alex.chen", "maria.rodriguez"]
    },
    {
      id: "ethical-synthetic-data",
      title: "Ethical Considerations in Synthetic Data Generation",
      description: "Addressing privacy, bias, and fairness concerns in the creation and use of synthetic datasets for AI training.",
      category: "Ethics",
      path: "/labs/ethical-synthetic-data.md",
      contributors: ["james.wilson", "aisha.patel"]
    },
    {
      id: "llm-evaluation",
      title: "LLM Evaluation Framework",
      description: "Open source methodology for evaluating large language models across multiple dimensions.",
      category: "Evaluation",
      path: "/labs/llm-evaluation.md",
      contributors: ["robin.zhang"]
    }
  ];

  useEffect(() => {
    if (selectedLab) {
      const fetchContent = async () => {
        try {
          // Fetch the markdown file from the public directory
          const response = await fetch(selectedLab.path);
          
          if (response.ok) {
            const text = await response.text();
            setContent(text);
          } else {
            // If the file doesn't exist yet, show a placeholder
            setContent(`# ${selectedLab.title}
            
## Overview

${selectedLab.description}

## Goals

- Create standardized metrics for evaluation
- Develop tools for analysis and improvement
- Establish guidelines for best practices

## How to Contribute

This lab is still in early stages. You can help by:

1. Fork the repository
2. Create or edit the markdown file at \`${selectedLab.path}\`
3. Submit a pull request with your contributions

## Current Contributors

${selectedLab.contributors.join(', ')}
`);
          }
        } catch (error) {
          console.error("Error fetching lab content:", error);
          setContent("# Error loading content\n\nPlease try again later.");
        }
      };
      
      fetchContent();
    } else {
      setContent("");
    }
  }, [selectedLab]);

  return (
    <div className="text-primary max-w-[1280px] mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">AI Labs</h1>
      <p className="text-grayFill text-lg mb-8 text-center max-w-3xl mx-auto">
        Explore our experimental AI labs where we test new ideas, methodologies, and technologies.
        Anyone can contribute to these projects through markdown files.
      </p>
      
      <div className="mb-8 text-center">
        <a 
          href="https://github.com/aidata-foundation/labs" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
          </svg>
          Contribute on GitHub
        </a>
      </div>
      
      {selectedLab ? (
        <div>
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => setSelectedLab(null)}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Labs
          </Button>
          
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {labs.map((lab) => (
            <Card 
              key={lab.id} 
              className="hover:shadow-lg transition duration-300 hover:border-blue-500/30 cursor-pointer"
              onClick={() => setSelectedLab(lab)}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={
                    lab.category === "Data Quality" ? "data" : 
                    lab.category === "Ethics" ? "mcpAI" : 
                    "ml"
                  }>
                    {lab.category}
                  </Badge>
                </div>
                <CardTitle>{lab.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{lab.description}</CardDescription>
                <div className="flex flex-wrap gap-2">
                  {lab.contributors.map((contributor, index) => (
                    <Badge key={index} variant="outline" className="bg-bgGray/50">
                      @{contributor}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="text-blue-500 p-0 hover:text-blue-400">
                  Explore lab
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {!selectedLab && (
        <div className="mt-16 bg-bgGray rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">How to Contribute</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-semibold text-lg">1</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Fork the Repository</h3>
                <p className="text-grayFill">
                  Start by forking our GitHub repository to create your own copy of the project.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-semibold text-lg">2</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Create or Edit Markdown</h3>
                <p className="text-grayFill">
                  Add your content in markdown format following our templates and guidelines.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-semibold text-lg">3</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">Submit a Pull Request</h3>
                <p className="text-grayFill">
                  Submit your changes for review, and our team will review and merge your contribution.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 p-6 border border-blue-500/30 rounded-lg bg-blue-500/10">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
              Markdown Format
            </h3>
            <p className="text-grayFill mb-4">
              Each lab project uses markdown files to store content. Here's our basic structure:
            </p>
            <pre className="bg-bgPrimary p-4 rounded-md overflow-x-auto text-sm">
              <code>{
`# Lab Title

## Overview
Brief description of the lab project

## Goals
- Goal 1
- Goal 2

## Methodology
Detailed explanation...

## Results
Current findings...

## How to Contribute
Specific guidelines for this lab...`
              }</code>
            </pre>
            
            <div className="mt-6">
              <a 
                href="/labs/CONTRIBUTING.md" 
                target="_blank"
                className="text-blue-400 hover:text-blue-300 flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                </svg>
                View Full Contributing Guidelines
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Labs; 