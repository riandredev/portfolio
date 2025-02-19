'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl, prism } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useTheme } from 'next-themes'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  content: string
  language?: string
  title?: string
  showLineNumbers?: boolean
}

const CodeBlock = ({ content, language = 'typescript', title, showLineNumbers = false }: CodeBlockProps) => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  const cleanContent = useMemo(() => {
    let cleaned = content;
    // If content is wrapped in triple backticks, remove them and any language identifier
    if (cleaned.startsWith('```') && cleaned.endsWith('```')) {
      cleaned = cleaned.replace(/^```(\w+)?\n|\n```$/g, '');
    }
    // Remove any remaining triple backticks
    cleaned = cleaned.replace(/```/g, '');
    // Remove single backticks only if they're at the start and end
    if (cleaned.startsWith('`') && cleaned.endsWith('`')) {
      cleaned = cleaned.slice(1, -1);
    }
    // Clean up whitespace
    cleaned = cleaned.trim();
    return cleaned;
  }, [content]);

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Prevent hydration mismatch by rendering a simple block first
  if (!mounted) {
    return (
      <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 p-4 bg-zinc-50 dark:bg-zinc-900">
        <pre className="text-sm">
          <code>{content}</code>
        </pre>
      </div>
    )
  }

  const lightThemeCustomizations = {
    ...prism,
    'comment': { color: '#6e7681' },
    'punctuation': { color: '#24292f' },
    'keyword': { color: '#cf222e' },
    'string': { color: '#0a3069' },
    'function': { color: '#8250df' },
    'boolean': { color: '#0550ae' },
    'number': { color: '#0550ae' },
    'property': { color: '#953800' },
    'operator': { color: '#24292f' },
    'class-name': { color: '#953800' },
    'variable': { color: '#24292f' },
    'parameter': { color: '#953800' },
    'tag': { color: '#116329' },
    'attr-name': { color: '#0550ae' },
    'attr-value': { color: '#0a3069' },
  }

  // Line number styling
  const lineNumberStyle: React.CSSProperties = {
    display: 'inline-block',
    minWidth: '3em',
    paddingRight: '1em',
    marginRight: '1em',
    textAlign: 'right',
    color: resolvedTheme === 'dark' ? 'rgb(75 85 99)' : 'rgb(156 163 175)',
    borderRight: resolvedTheme === 'dark' ? '1px solid rgb(31 41 55)' : '1px solid rgb(229 231 235)',
    userSelect: 'none',
    fontFamily: 'var(--font-geist-mono)',
    fontWeight: 400,
    fontStyle: 'normal',
    position: 'relative',
    zIndex: 10,
    // Remove background color here
  }

  return (
    <div className="group relative rounded-xl overflow-hidden border dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-100 dark:bg-zinc-800/75 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              <div className="w-3 h-3 rounded-full bg-zinc-300 dark:bg-zinc-600" />
            </div>
            <span className="ml-2 text-xs text-zinc-600 dark:text-zinc-400 font-mono">
              {title}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700/50 transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
            )}
          </button>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={resolvedTheme === 'dark' ? nightOwl : lightThemeCustomizations}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          borderRadius: '0.5rem',
          background: resolvedTheme === 'dark' ? 'rgb(17, 20, 26)' : 'rgb(250, 251, 253)', // Slightly lighter than page background
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}
        lineNumberStyle={showLineNumbers ? lineNumberStyle : undefined}
        codeTagProps={{
          style: {
            fontStyle: 'normal', // Ensure no italic styling
          }
        }}
      >
        {cleanContent}
      </SyntaxHighlighter>
    </div>
  )
}

export default CodeBlock
