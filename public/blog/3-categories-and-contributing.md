---
id: "3"
title: "Categories and Contributing"
date: "July 23, 2023"
excerpt: "Explore our tool categories and learn how to contribute to the project."
author: "AI Data Foundation"
---

## 📚 Categories

The collection includes resources for:

- Machine Learning
- Deep Learning
- Natural Language Processing
- Computer Vision
- Data Quality
- Federated Learning
- Synthetic Data
- Privacy-Preserving ML
- Large Language Models
- Multimodal Learning
- Explainable AI
- And more...

## 🤝 Contributing

We welcome contributions from the community! Here's how you can contribute:

### Adding a New Tool

1. Fork the repository
2. Edit `src/data/entries.js` and add your tool in the appropriate category:
   ```javascript
   {
     title: "Your Tool Name",
     link: "https://link-to-tool",
     description: "Brief description of the tool",
     github: "github-username/repo", // Optional
     tag: "Category Name"
   }
   ```
3. Create a pull request with your changes

### Adding a New Blog Post

1. Fork the repository
2. Create a new markdown file in the `public/blog` directory with the following format: `[number]-[slug].md`
3. Include frontmatter at the top of your file:
   ```yaml
   ---
   id: "unique-id"
   title: "Your Blog Post Title"
   date: "Month Day, Year"
   excerpt: "A brief summary of your blog post"
   author: "Your Name"
   ---
   ```
4. Write your content using Markdown syntax
5. Create a pull request with your changes

### Guidelines

- Make sure the tool is relevant to the AI/ML ecosystem
- Provide a concise and accurate description
- Include the appropriate category/tag
- Ensure there are no duplicates
- For blog posts, use proper Markdown formatting and keep content focused on AI/ML topics 