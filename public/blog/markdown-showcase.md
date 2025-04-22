---
title: "Markdown Styling Showcase"
date: "2024-06-04"
author: "AI Data Foundation"
category: "Documentation"
excerpt: "A showcase of all markdown styling elements with syntax highlighting"
tags: ["markdown", "styling", "code", "documentation"]
---

# Markdown Styling Showcase

This page demonstrates all the markdown styling features available in the AI Data Foundation website.

## Text Formatting

You can use various text formatting options like **bold text**, *italic text*, and ***bold italic text***. 

You can also use ~~strikethrough~~ text when needed.

## Links and References

You can add [links to external websites](https://aidatafoundation.github.io) or reference [internal pages](/tools).

## Lists

### Unordered Lists

* Item 1
* Item 2
  * Nested item 2.1
  * Nested item 2.2
* Item 3

### Ordered Lists

1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item

## Blockquotes

> This is a blockquote. It can be used to emphasize important information or to quote someone else's words.
>
> You can have multiple paragraphs in a blockquote by adding a blank line with the > character.

## Code

### Inline Code

You can use `inline code` for short code snippets or command references.

### Code Blocks

```javascript
// This is a JavaScript code block
function greet(name) {
  console.log(`Hello, ${name}!`);
  return true;
}

// Call the function
greet('World');
```

```python
# This is a Python code block
def factorial(n):
    """Calculate factorial of n."""
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)
        
# Calculate factorial of 5
result = factorial(5)
print(f"Factorial of 5 is {result}")
```

```bash
# This is a bash script
echo "Hello, World!"
cd /path/to/directory
ls -la | grep "*.txt"
```

```jsx
// This is a React component
import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
```

## Tables

| Name | Type | Description |
|------|------|-------------|
| id | string | Unique identifier |
| title | string | Display name of the item |
| created_at | datetime | When the item was created |
| tags | array | List of associated tags |

## Images

![AI Data Foundation Logo](/logo.png)

## Horizontal Rule

Use horizontal rules to separate sections.

---

## Math Equations

When integrating with MathJax, you can display mathematical equations like:

This is an inline equation: $E = mc^2$

And this is a block equation:

$$
\frac{d}{dx}\left( \int_{a}^{x} f(u)\,du\right)=f(x)
$$

## Task Lists

- [x] Create markdown showcase
- [x] Add syntax highlighting
- [ ] Add more examples
- [ ] Update documentation

## Callouts/Admonitions

> **Note**
> This is a note callout that can be used to provide additional information.

> **Warning**
> This is a warning callout that can be used to highlight potential issues.

## Conclusion

This document showcases the various markdown styling elements available in the AI Data Foundation website. Use this as a reference when creating new content. 