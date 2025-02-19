'use client'

import { ExternalLink } from 'lucide-react'

interface ParagraphBlockProps {
  content: string;
}

export default function ParagraphBlock({ content }: ParagraphBlockProps) {
  if (!content?.trim()) return null;

  const renderContent = () => {
    const parts = [];
    let currentText = '';
    let id = 0;

    // Split the content into characters and process
    for (let i = 0; i < content.length; i++) {
      // Check for inline code
      if (content[i] === '`') {
        // Add any accumulated text
        if (currentText) {
          parts.push(<span key={`text-${id++}`}>{currentText}</span>);
          currentText = '';
        }

        // Skip the opening backtick
        i++;

        // Collect code content until closing backtick
        let codeContent = '';
        while (i < content.length && content[i] !== '`') {
          codeContent += content[i];
          i++;
        }

        if (codeContent) {
          parts.push(
            <code
              key={`code-${id++}`}
              className="px-1.5 py-0.5 rounded font-mono text-sm
                bg-zinc-100 dark:bg-zinc-800
                text-pink-500 dark:text-pink-400
                border border-zinc-200 dark:border-zinc-700"
            >
              {codeContent}
            </code>
          );
        }
      }
      // Check for links
      else if (content[i] === '[') {
        // Add any accumulated text
        if (currentText) {
          parts.push(<span key={`text-${id++}`}>{currentText}</span>);
          currentText = '';
        }

        let linkText = '';
        let url = '';
        i++; // Skip the opening bracket

        // Get link text
        while (i < content.length && content[i] !== ']') {
          linkText += content[i];
          i++;
        }
        i += 2; // Skip ']('

        // Get URL
        while (i < content.length && content[i] !== ')') {
          url += content[i];
          i++;
        }

        if (linkText && url) {
          parts.push(
            <a
              key={`link-${id++}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-inherit hover:underline decoration-pink-500 dark:decoration-pink-400 decoration-1 underline-offset-2"
            >
              {linkText}
              <ExternalLink className="w-3 h-3 text-pink-500 dark:text-pink-400" />
            </a>
          );
        }
      }
      else {
        currentText += content[i];
      }
    }

    // Add any remaining text
    if (currentText) {
      parts.push(<span key={`text-${id++}`}>{currentText}</span>);
    }

    return parts;
  };

  return (
    <div className="px-4 sm:px-12 -my-3">
      <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300">
        {renderContent()}
      </p>
    </div>
  );
}
