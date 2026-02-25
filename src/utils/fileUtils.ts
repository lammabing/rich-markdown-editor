// @ts-nocheck
/**
 * Convert HTML to Markdown
 * Basic converter for common elements
 */
export function htmlToMarkdown(html: string): string {
  let md = html;

  // Remove HTML comments
  md = md.replace(/<!--[\s\S]*?-->/g, '');

  // Headers
  md = md.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n');
  md = md.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n');
  md = md.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n');
  md = md.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '#### $1\n\n');
  md = md.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '##### $1\n\n');
  md = md.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '###### $1\n\n');

  // Bold and Italic
  md = md.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
  md = md.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
  md = md.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');
  md = md.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*');

  // Strikethrough
  md = md.replace(/<s[^>]*>([\s\S]*?)<\/s>/gi, '~~$1~~');
  md = md.replace(/<del[^>]*>([\s\S]*?)<\/del>/gi, '~~$1~~');
  md = md.replace(/<strike[^>]*>([\s\S]*?)<\/strike>/gi, '~~$1~~');

  // Underline (convert to bold since markdown doesn't support underline)
  md = md.replace(/<u[^>]*>([\s\S]*?)<\/u>/gi, '**$1**');

  // Links
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');

  // Images
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)\n');
  md = md.replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, '![]($1)\n');

  // Inline code
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');

  // Code blocks
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, '```\n$1\n```\n\n');
  md = md.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '```\n$1\n```\n\n');

  // Blockquotes
  md = md.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '> $1\n\n');

  // Horizontal rules
  md = md.replace(/<hr[^>]*>/gi, '---\n\n');
  md = md.replace(/<hr\/>/gi, '---\n\n');

  // Line breaks
  md = md.replace(/<br[^>]*>/gi, '  \n');
  md = md.replace(/<br\/>/gi, '  \n');

  // Paragraphs
  md = md.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');

  // Lists - unordered
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, content) => {
    return content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n');
  });
  md = md.replace(/^-([\s\S]*?)\n/gm, '-$1');

  // Lists - ordered
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, content, offset, string) => {
    let count = 1;
    return content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, () => `${count++}. $1\n`);
  });

  // Task lists
  md = md.replace(/<ul[^>]*data-type="taskList"[^>]*>([\s\S]*?)<\/ul>/gi, (match, content) => {
    return content.replace(/<li[^>]*data-checked="([^"]*)"[^>]*>([\s\S]*?)<\/li>/gi, (m, checked, itemContent) => {
      const checkbox = checked === 'true' ? '[x]' : '[ ]';
      // Extract text from inner paragraphs/divs
      const text = itemContent.replace(/<[^>]+>/g, '').trim();
      return `- ${checkbox} ${text}\n`;
    });
  });

  // Tables
  md = md.replace(/<table[^>]*>([\s\S]*?)<\/table>/gi, (match, content) => {
    const rows = content.match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
    if (rows.length === 0) return '';
    
    const markdownRows = rows.map((row, rowIndex) => {
      const cells = row.match(/<(td|th)[^>]*>([\s\S]*?)<\/\1>/gi) || [];
      const cellContents = cells.map(cell => {
        const content = cell.replace(/<(td|th)[^>]*>/gi, '').replace(/<\/(td|th)>/gi, '').trim();
        return content || ' ';
      });
      return '| ' + cellContents.join(' | ') + ' |';
    });

    // Insert separator after header
    if (markdownRows.length > 0) {
      const headerCells = markdownRows[0].match(/[^|]+/g) || [];
      const separator = '| ' + headerCells.map(() => '---').join(' | ') + ' |';
      markdownRows.splice(1, 0, separator);
    }

    return markdownRows.join('\n') + '\n\n';
  });

  // Remove remaining HTML tags
  md = md.replace(/<[^>]+>/g, '');

  // Clean up extra whitespace
  md = md.replace(/\n{3,}/g, '\n\n');
  md = md.trim();

  return md;
}

/**
 * Convert Markdown to HTML
 * Basic converter for common elements
 */
export function markdownToHtml(md: string): string {
  let html = md;

  // Escape HTML in code blocks first (to protect code content)
  const codeBlocks: string[] = [];
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const index = codeBlocks.length;
    codeBlocks.push(`<pre><code class="language-${lang}">${code.trim()}</code></pre>`);
    return `%%CODEBLOCK${index}%%`;
  });

  // Escape inline code
  const inlineCodes: string[] = [];
  html = html.replace(/`([^`]+)`/g, (match, code) => {
    const index = inlineCodes.length;
    inlineCodes.push(`<code>${code}</code>`);
    return `%%INLINECODE${index}%%`;
  });

  // Headers (must be at start of line)
  html = html.replace(/^###### (.*$)/gim, '<h6>$1</h6>');
  html = html.replace(/^##### (.*$)/gim, '<h5>$1</h5>');
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold and Italic combined
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>');

  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');

  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');

  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');

  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote><p>$1</p></blockquote>');

  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr>');
  html = html.replace(/^\*\*\*$/gim, '<hr>');
  html = html.replace(/^\*\s+\*\s+\*$/gim, '<hr>');

  // Images (before links, as they use similar syntax)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Task lists
  html = html.replace(/^- \[([ x])\] (.*$)/gim, (match, checked, text) => {
    const isChecked = checked === 'x' ? 'true' : 'false';
    return `<li data-type="taskItem" data-checked="${isChecked}"><div><p>${text}</p></div></li>`;
  });

  // Unordered lists
  html = html.replace(/^[\-\*+] (.*$)/gim, '<li>$1</li>');

  // Ordered lists
  html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');

  // Wrap consecutive list items
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
    if (match.includes('data-type="taskItem"')) {
      return `<ul data-type="taskList">\n${match}</ul>\n`;
    }
    return `<ul>\n${match}</ul>\n`;
  });

  // Code blocks (restore)
  html = html.replace(/%%CODEBLOCK(\d+)%%/g, (match, index) => {
    return codeBlocks[parseInt(index)];
  });

  // Inline codes (restore)
  html = html.replace(/%%INLINECODE(\d+)%%/g, (match, index) => {
    return inlineCodes[parseInt(index)];
  });

  // Line breaks (two spaces at end of line)
  html = html.replace(/  $/gm, '<br>');

  // Paragraphs (text surrounded by blank lines)
  html = html.replace(/\n\n(?!<)(.*?)(?=\n\n|$)/g, (match, content) => {
    if (content.trim() && !content.startsWith('<')) {
      return `<p>${content.replace(/\n/g, '<br>')}</p>\n`;
    }
    return match;
  });

  return html.trim();
}

/**
 * Download content as file
 */
export function downloadFile(content: string, filename: string, mimeType: string = 'text/plain'): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Read file content
 */
export function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = (e) => {
      reject(e);
    };
    reader.readAsText(file);
  });
}
