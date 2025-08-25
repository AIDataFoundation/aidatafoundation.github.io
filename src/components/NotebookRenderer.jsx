import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeBlock({ language, value, outputs = [] }) {
  return (
    <div className="my-6 space-y-4">
      {/* Code Input */}
      <div className="relative">
        <div className="flex items-center justify-between bg-muted/50 border border-border rounded-t-lg px-4 py-2">
          <span className="text-sm font-medium text-muted-foreground">
            {language || "python"}
          </span>
          <button 
            onClick={() => navigator.clipboard.writeText(value)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Copy
          </button>
        </div>
        <SyntaxHighlighter
          language={language || "python"}
          style={tomorrow}
          customStyle={{
            margin: 0,
            borderRadius: "0 0 0.5rem 0.5rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
          }}
          showLineNumbers={true}
        >
          {value}
        </SyntaxHighlighter>
      </div>

      {/* Code Outputs */}
      {outputs.length > 0 && (
        <div className="bg-muted/30 border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Output</span>
          </div>
          <div className="space-y-2">
            {outputs.map((output, index) => {
              if (output.text) {
                const text = Array.isArray(output.text) ? output.text.join("") : output.text;
                return (
                  <pre key={index} className="text-sm text-foreground whitespace-pre-wrap font-mono">
                    {text}
                  </pre>
                );
              }
              if (output.data && output.data["text/plain"]) {
                const text = Array.isArray(output.data["text/plain"]) 
                  ? output.data["text/plain"].join("") 
                  : output.data["text/plain"];
                return (
                  <pre key={index} className="text-sm text-foreground whitespace-pre-wrap font-mono">
                    {text}
                  </pre>
                );
              }
              if (output.data && output.data["text/html"]) {
                const html = Array.isArray(output.data["text/html"]) 
                  ? output.data["text/html"].join("") 
                  : output.data["text/html"];
                return (
                  <div key={index} 
                    className="text-sm text-foreground"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function MarkdownBlock({ value }) {
  // Simple markdown to HTML conversion for basic elements
  const convertMarkdown = (text) => {
    return text
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div 
      className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-em:text-muted-foreground prose-code:text-foreground prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded"
      dangerouslySetInnerHTML={{ __html: convertMarkdown(value) }}
    />
  );
}

export default function NotebookRenderer({ src }) {
  const [nb, setNb] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(src, { cache: "no-store" });
        if (!res.ok) throw new Error(`Failed to load notebook: ${res.status}`);
        const json = await res.json();
        if (isMounted) setNb(json);
      } catch (e) {
        if (isMounted) setError(e.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [src]);

  if (loading) {
    return (
      <div className="mt-8 flex items-center gap-3 text-muted-foreground">
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span>Loading notebook…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium">Failed to load notebook</span>
        </div>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!nb || !nb.cells) {
    return (
      <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4 text-muted-foreground">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="font-medium">No notebook content found</span>
        </div>
        <p className="text-sm">The notebook appears to be empty or has an invalid format.</p>
      </div>
    );
  }

  // Get language from metadata or default to python
  const defaultLanguage = nb.metadata?.language_info?.name || "python";

  const cells = nb.cells.map((cell, idx) => {
    if (cell.cell_type === "markdown") {
      const html = (cell.source || []).join("");
      return (
        <div key={idx} className="my-6 p-4 bg-card border border-border rounded-lg">
          <MarkdownBlock value={html} />
        </div>
      );
    }
    if (cell.cell_type === "code") {
      const code = (cell.source || []).join("");
      const lang = (cell.metadata && cell.metadata.language) || defaultLanguage;
      return (
        <div key={idx} className="my-6">
          <CodeBlock 
            language={lang} 
            value={code} 
            outputs={cell.outputs || []}
          />
        </div>
      );
    }
    return null;
  });

  return (
    <section className="mt-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-foreground">Interactive Notebook</h2>
          <p className="text-sm text-muted-foreground">
            {nb.metadata?.language_info?.name || "Python"} • {nb.cells.length} cells
          </p>
        </div>
      </div>
      
      <div className="space-y-2">
        {cells}
      </div>
      
      <div className="mt-8 p-4 bg-muted/30 border border-border rounded-lg">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>This is a read-only view. To run the code, download the notebook and open it in Jupyter.</span>
        </div>
      </div>
    </section>
  );
}


