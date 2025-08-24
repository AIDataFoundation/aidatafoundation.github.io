import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Define custom renderers for various markdown elements
const MarkdownRenderer = ({ children, className = '' }) => {
  // Create enhanced dark theme based on oneDark
  const enhancedDarkTheme = {
    ...oneDark,
    'pre[class*="language-"]': {
      ...oneDark['pre[class*="language-"]'],
      background: 'hsl(var(--background))',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      margin: '2rem 0',
      overflow: 'auto',
      border: '1px solid hsl(var(--border))',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      position: 'relative',
    },
    'code[class*="language-"]': {
      ...oneDark['code[class*="language-"]'],
      background: 'none',
      textShadow: 'none',
      fontSize: '0.95rem',
      fontFamily: '"JetBrains Mono", SFMono-Regular, Consolas, Menlo, Monaco, "Liberation Mono", "Courier New", monospace',
      lineHeight: 1.7,
      color: 'hsl(var(--foreground))',
    },
    comment: {
      ...oneDark.comment,
      color: 'hsl(var(--muted-foreground))',
    },
    punctuation: {
      ...oneDark.punctuation,
      color: 'hsl(var(--foreground))',
    },
    tag: {
      ...oneDark.tag,
      color: 'hsl(var(--primary))',
    },
    'attr-name': {
      ...oneDark['attr-name'],
      color: 'hsl(var(--primary))',
    },
    'attr-value': {
      ...oneDark['attr-value'],
      color: 'hsl(var(--accent-foreground))',
    },
    string: {
      ...oneDark.string,
      color: 'hsl(var(--accent-foreground))',
    },
    keyword: {
      ...oneDark.keyword,
      color: 'hsl(var(--destructive))',
    },
    boolean: {
      ...oneDark.boolean,
      color: 'hsl(var(--destructive))',
    },
    number: {
      ...oneDark.number,
      color: 'hsl(var(--warning))',
    },
    'function-variable': {
      ...oneDark['function-variable'],
      color: 'hsl(var(--secondary-foreground))',
    },
    function: {
      ...oneDark.function,
      color: 'hsl(var(--secondary-foreground))',
    },
    'class-name': {
      ...oneDark['class-name'],
      color: 'hsl(var(--primary))',
    },
    operator: {
      ...oneDark.operator,
      color: 'hsl(var(--destructive))',
    },
    builtin: {
      ...oneDark.builtin,
      color: 'hsl(var(--primary))',
    },
    property: {
      ...oneDark.property,
      color: 'hsl(var(--primary))',
    },
  };

  return (
    <article className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        components={{
          // Custom code block renderer with enhanced styling
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : 'text';
            
            if (!inline) {
              return (
                <div className="code-block-wrapper relative group my-8">
                  <div className="code-block-header absolute top-0 right-0 px-4 py-2 text-xs font-medium text-muted-foreground bg-muted/80 backdrop-blur-sm rounded-bl-lg border-l border-b border-border">
                    <span className="language-label uppercase tracking-wider">{language}</span>
                  </div>
                  <div className="code-block-actions absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button 
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => navigator.clipboard.writeText(String(children).replace(/\n$/, ''))}
                      title="Copy code"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                  <SyntaxHighlighter
                    style={enhancedDarkTheme}
                    language={language}
                    PreTag="div"
                    showLineNumbers={language !== 'text'}
                    wrapLongLines={true}
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                </div>
              );
            }
            
            return (
              <code className="bg-muted px-2 py-1 rounded-md text-sm font-mono text-foreground border border-border" {...props}>
                {children}
              </code>
            );
          },
          
          // Enhanced headings with better typography and anchor links
          h1: ({ children, ...props }) => (
            <h1 className="scroll-mt-24 text-4xl md:text-5xl font-bold leading-tight mb-8 mt-12 first:mt-0 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="scroll-mt-20 text-3xl md:text-4xl font-bold leading-tight mb-6 mt-10 first:mt-0 text-foreground" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="scroll-mt-16 text-2xl md:text-3xl font-semibold leading-tight mb-4 mt-8 first:mt-0 text-foreground" {...props}>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 className="scroll-mt-16 text-xl md:text-2xl font-semibold leading-tight mb-3 mt-6 first:mt-0 text-foreground" {...props}>
              {children}
            </h4>
          ),
          
          // Enhanced paragraph styling
          p: ({ children, ...props }) => (
            <p className="text-base leading-relaxed mb-6 text-muted-foreground" {...props}>
              {children}
            </p>
          ),
          
          // Enhanced link renderer
          a: ({ node, href, children, ...props }) => (
            <a 
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary transition-all duration-200"
              {...props}
            >
              {children}
            </a>
          ),
          
          // Enhanced blockquote with better styling
          blockquote: ({ children, ...props }) => (
            <blockquote className="border-l-4 border-primary pl-6 py-4 my-8 bg-muted/30 rounded-r-lg relative" {...props}>
              <div className="absolute top-4 left-4 text-primary opacity-20">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>
              <div className="pl-8">
                {children}
              </div>
            </blockquote>
          ),
          
          // Enhanced tables with better styling
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-8 rounded-lg border border-border shadow-medium">
              <table className="min-w-full divide-y divide-border" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-muted/50" {...props}>
              {children}
            </thead>
          ),
          tbody: ({ children, ...props }) => (
            <tbody className="divide-y divide-border bg-background" {...props}>
              {children}
            </tbody>
          ),
          th: ({ children, ...props }) => (
            <th 
              className="px-6 py-4 text-left text-sm font-semibold text-foreground uppercase tracking-wider" 
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="px-6 py-4 text-sm text-muted-foreground" {...props}>
              {children}
            </td>
          ),
          
          // Enhanced list styling
          ul: ({ children, ...props }) => (
            <ul className="list-disc pl-8 my-6 space-y-3 marker:text-primary" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal pl-8 my-6 space-y-3 marker:text-primary marker:font-semibold" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="pl-2 text-muted-foreground leading-relaxed" {...props}>
              {children}
            </li>
          ),
          
          // Enhanced horizontal rule
          hr: (props) => (
            <hr className="my-12 border-border/50" {...props} />
          ),
          
          // Enhanced image styling
          img: ({ src, alt, ...props }) => (
            <div className="my-8">
              <div className="relative group">
                <img 
                  src={src} 
                  alt={alt || ''} 
                  className="rounded-lg max-w-full mx-auto border border-border shadow-medium hover:shadow-strong transition-shadow duration-300"
                  loading="lazy"
                  {...props}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>
              {alt && (
                <p className="text-center text-sm text-muted-foreground mt-3 italic">
                  {alt}
                </p>
              )}
            </div>
          ),
          
          // Enhanced strong text
          strong: ({ children, ...props }) => (
            <strong className="font-bold text-foreground" {...props}>
              {children}
            </strong>
          ),
          
          // Enhanced emphasis
          em: ({ children, ...props }) => (
            <em className="italic text-muted-foreground" {...props}>
              {children}
            </em>
          ),
          
          // Enhanced code blocks
          pre: ({ children, ...props }) => (
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-6 border border-border" {...props}>
              {children}
            </pre>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </article>
  );
};

export default MarkdownRenderer; 