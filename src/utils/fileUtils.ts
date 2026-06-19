// @ts-nocheck
/**
 * Decode HTML special characters
 */
function decodeHtml(html: string): string {
  return html
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

/**
 * Convert HTML to Markdown
 * Basic converter for common elements
 */
export function htmlToMarkdown(html: string): string {
  let md = html;

  // Remove HTML comments
  md = md.replace(/<!--[\s\S]*?-->/g, '');

  // Math blocks (must be before other conversions)
  // Block math: div with data-latex and data-display-mode="true"
  md = md.replace(/<div[^>]*data-latex="([^"]*)"[^>]*data-display-mode="true"[^>]*><\/div>/gi, (match, latex) => {
    return `$$${latex}$$\n\n`;
  });
  md = md.replace(/<div[^>]*data-display-mode="true"[^>]*data-latex="([^"]*)"[^>]*><\/div>/gi, (match, latex) => {
    return `$$${latex}$$\n\n`;
  });
  // Also handle span-based math blocks (from NodeViewWrapper)
  md = md.replace(/<span[^>]*class="[^"]*math-block[^"]*"[^>]*data-latex="([^"]*)"[^>]*>[\s\S]*?<\/span>/gi, (match, latex) => {
    return `$$${latex}$$\n\n`;
  });

  // Inline math: span with data-latex (without data-display-mode or data-display-mode="false")
  md = md.replace(/<span[^>]*data-latex="([^"]*)"[^>]*class="[^"]*math-inline[^"]*"[^>]*><\/span>/gi, (match, latex) => {
    return `$${latex}$`;
  });
  md = md.replace(/<span[^>]*class="[^"]*math-inline[^"]*"[^>]*data-latex="([^"]*)"[^>]*><\/span>/gi, (match, latex) => {
    return `$${latex}$`;
  });
  md = md.replace(/<span[^>]*data-latex="([^"]*)"[^>]*><\/span>/gi, (match, latex) => {
    return `$${latex}$`;
  });

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

  // Code blocks (must be before inline code to avoid conflicts)
  md = md.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (match, code) => {
    return '```\n' + decodeHtml(code) + '\n```\n\n';
  });
  md = md.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (match, code) => {
    return '```\n' + decodeHtml(code) + '\n```\n\n';
  });

  // Inline code
  md = md.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (match, code) => {
    return '`' + decodeHtml(code) + '`';
  });

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

  // Lists - unordered (use lookbehind to exclude </li> from content)
  md = md.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (match, content) => {
    return content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (m, liContent) => `- ${liContent}\n`);
  });

  // Lists - ordered (use lookbehind to exclude </li> from content)
  md = md.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (match, content, offset, string) => {
    let count = 1;
    return content.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (m, liContent) => `${count++}. ${liContent}\n`);
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
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Process marked list items into proper nested HTML
 */
function processListItems(html: string): string {
  const lines = html.split('\n');
  const result: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const olMatch = line.match(/^<OL-ITEM level="(\d+)" num="(\d+)">(.*)<\/OL-ITEM>$/);
    const ulMatch = line.match(/^<UL-ITEM level="(\d+)">(.*)<\/UL-ITEM>$/);

    if (!olMatch && !ulMatch) {
      result.push(line);
      i++;
      continue;
    }

    // Found a list - collect all consecutive list items (including nested ones, skipping blank lines)
    const listBlock: Array<{type: 'ol' | 'ul', level: number, num: number, content: string}> = [];

    while (i < lines.length) {
      const l = lines[i];
      const ol = l.match(/^<OL-ITEM level="(\d+)" num="(\d+)">(.*)<\/OL-ITEM>$/);
      const ul = l.match(/^<UL-ITEM level="(\d+)">(.*)<\/UL-ITEM>$/);

      if (ol) {
        listBlock.push({ type: 'ol', level: parseInt(ol[1]), num: parseInt(ol[2]), content: ol[3] });
        i++;
      } else if (ul) {
        listBlock.push({ type: 'ul', level: parseInt(ul[1]), num: 0, content: ul[2] });
        i++;
      } else if (l.trim() === '') {
        // Skip blank lines within list blocks
        i++;
        continue;
      } else {
        break;
      }
    }

    // Now convert the list block to HTML using a stack
    result.push(buildListHTML(listBlock));
  }

  return result.join('\n');
}

/**
 * Build HTML from a list block
 */
function buildListHTML(items: Array<{type: 'ol' | 'ul', level: number, num: number, content: string}>): string {
  if (items.length === 0) return '';

  let html = '';
  const stack: Array<{type: 'ol' | 'ul', level: number, counter: number}> = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    if (stack.length === 0) {
      // First item - open list
      stack.push({ type: item.type, level: item.level, counter: 1 });
      html += `<${item.type}>`;
      html += `<li>${item.content}`;
      if (item.type === 'ol') stack[0].counter = item.num;
    } else {
      const top = stack[stack.length - 1];

      if (item.level > top.level) {
        // Deeper nesting - open new list
        stack.push({ type: item.type, level: item.level, counter: 1 });
        html += `<${item.type}><li>${item.content}`;
      } else if (item.level === top.level) {
        // Same level - close previous li
        html += `</li>`;
        if (item.type !== top.type) {
          // Switch list type
          html += `</${top.type}>`;
          stack.pop();
          const newCounter = item.type === 'ol' ? item.num : 0;
          stack.push({ type: item.type, level: item.level, counter: newCounter });
          // Add start attribute for ordered lists
          const startAttr = item.type === 'ol' && item.num > 1 ? ` start="${item.num}"` : '';
          html += `<${item.type}${startAttr}>`;
        }
        html += `<li>${item.content}`;
        if (item.type === 'ol') top.counter = item.num;
      } else {
        // Higher level (less indented) - close nested lists
        while (stack.length > 0 && stack[stack.length - 1].level > item.level) {
          html += `</li></${stack[stack.length - 1].type}>`;
          stack.pop();
        }
        html += `</li>`;
        if (stack.length === 0 || stack[stack.length - 1].type !== item.type) {
          if (stack.length > 0) {
            html += `</${stack[stack.length - 1].type}>`;
            stack.pop();
          }
          const newCounter = item.type === 'ol' ? item.num : 0;
          stack.push({ type: item.type, level: item.level, counter: newCounter });
          // Add start attribute for ordered lists
          const startAttr = item.type === 'ol' && item.num > 1 ? ` start="${item.num}"` : '';
          html += `<${item.type}${startAttr}>`;
        }
        html += `<li>${item.content}`;
        if (item.type === 'ol' && stack.length > 0) stack[stack.length - 1].counter = item.num;
      }
    }
  }

  // Close remaining open tags
  while (stack.length > 0) {
    html += `</li></${stack[stack.length - 1].type}>`;
    stack.pop();
  }

  return html;
}

/**
 * Convert Markdown to HTML
 * Basic converter for common elements
 */
export function markdownToHtml(md: string): string {
  let html = md;

  // Phase 1: Extract and protect special blocks that could interfere with parsing

  // Normalize line endings
  html = html.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Extract tables early (before other processing)
  const tables: string[] = [];
  html = html.replace(/^(\|.+\|)\n(\|[\s:-|]+\|)\n((?:\|.+\|\n?)*)/gm, (match, header, separator, body) => {
    const index = tables.length;
    const headerCells = header.split('|').filter(c => c.trim()).map(c => `<th>${c.trim()}</th>`).join('');
    const rows = body.trim().split('\n').map(row => {
      const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
      return `<tr>${cells}</tr>`;
    }).join('');
    tables.push(`<table><thead><tr>${headerCells}</tr></thead><tbody>${rows}</tbody></table>`);
    return `\n%%TABLE${index}%%\n`;
  });

  // Extract code blocks first (before any other processing)
  const codeBlocks: string[] = [];
  html = html.replace(/```(\w*)\n?([\s\S]*?)```/g, (match, lang, code) => {
    const index = codeBlocks.length;
    const escapedCode = escapeHtml(code.trimEnd());
    codeBlocks.push(`<pre><code class="language-${lang || ''}">${escapedCode}</code></pre>`);
    return `\n%%CODEBLOCK${index}%%\n`;
  });

  // Extract block math ($$...$$)
  const blockMaths: string[] = [];
  html = html.replace(/\$\$\n?([\s\S]+?)\n?\$\$/g, (match, latex) => {
    const index = blockMaths.length;
    blockMaths.push(`<div data-latex="${escapeHtml(latex.trim())}" data-display-mode="true" class="math-block"></div>`);
    return `\n%%BLOCKMATH${index}%%\n`;
  });

  // Extract inline math ($...$) - but not inside code or already processed blocks
  const inlineMaths: string[] = [];
  html = html.replace(/\$([^\$\s][^$]*?[^\$\s]?)\$/g, (match, latex) => {
    const index = inlineMaths.length;
    inlineMaths.push(`<span data-latex="${escapeHtml(latex)}" class="math-inline"></span>`);
    return `%%INLINEMATH${index}%%`;
  });

  // Extract inline code (`...`) - but not inside already processed blocks
  const inlineCodes: string[] = [];
  html = html.replace(/`([^`\n]+)`/g, (match, code) => {
    const index = inlineCodes.length;
    const escapedCode = escapeHtml(code);
    inlineCodes.push(`<code>${escapedCode}</code>`);
    return `%%INLINECODE${index}%%`;
  });

  // Extract HTML span with color styles
  const colorSpans: string[] = [];
  html = html.replace(/<span[^>]*style="[^"]*color:\s*(#[0-9a-fA-F]{3,8})[^"]*"[^>]*>([\s\S]*?)<\/span>/gi,
    (match, color, content) => {
      const index = colorSpans.length;
      colorSpans.push(`<span data-color="${color}">${content}</span>`);
      return `%%COLORSPAN${index}%%`;
    }
  );

  // Extract CriticMarkup deletions {--text--}
  const criticDeletions: string[] = [];
  html = html.replace(/\{--([\s\S]*?)--\}/g, (match, content) => {
    const index = criticDeletions.length;
    criticDeletions.push(`<del data-critic="deletion" class="critic-deletion">${content}</del>`);
    return `%%CRITICDEL${index}%%`;
  });

  // Extract CriticMarkup insertions {++text++}
  const criticInsertions: string[] = [];
  html = html.replace(/\{\+\+([\s\S]*?)\+\+\}/g, (match, content) => {
    const index = criticInsertions.length;
    criticInsertions.push(`<ins data-critic="insertion" class="critic-insertion">${content}</ins>`);
    return `%%CRITICINS${index}%%`;
  });

  // Extract CriticMarkup highlights {==text==}
  const criticHighlights: string[] = [];
  html = html.replace(/\{==([\s\S]*?)==\}/g, (match, content) => {
    const index = criticHighlights.length;
    criticHighlights.push(`<span data-critic="highlight" class="critic-highlight">${content}</span>`);
    return `%%CRITICHIL${index}%%`;
  });

  // Extract HTML blocks (custom HTML with div tags)
  const htmlBlocks: string[] = [];
  html = html.replace(/<div[\s\S]*?<\/div>/gi, (match) => {
    const index = htmlBlocks.length;
    htmlBlocks.push(`<div data-html-block="" data-html-content="${escapeHtml(match)}">${match}</div>`);
    return `%%HTMLBLOCK${index}%%`;
  });

  // Extract footnotes references [^1]
  const footnoteRefs: Array<{ id: string; label: string }> = [];
  html = html.replace(/\[\^(\d+)\]/g, (match, id) => {
    const index = footnoteRefs.length;
    footnoteRefs.push({ id, label: id });
    return `%%FOOTNOTEREF${index}%%`;
  });

  // Extract footnote definitions [^1]: content
  const footnoteDefs: Array<{ id: string; content: string }> = [];
  html = html.replace(/^\[\^(\d+)\]:\s+(.+)$/gm, (match, id, content) => {
    const index = footnoteDefs.length;
    footnoteDefs.push({ id, content: content.trim() });
    return `%%FOOTNOTEDEF${index}%%`;
  });

  // Phase 2: Process block-level elements

  // Horizontal rules (before headers, as --- could be confused)
  html = html.replace(/^---+$/gm, '<hr>');
  html = html.replace(/^\*\*\*+$/gm, '<hr>');

  // Headers
  html = html.replace(/^######\s+(.*$)/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s+(.*$)/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s+(.*$)/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.*$)/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.*$)/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.*$)/gm, '<h1>$1</h1>');

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

  // Images (before links)
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Task lists (convert to special list items)
  html = html.replace(/^- \[([ xX])\]\s+(.*$)/gm, (match, checked, text) => {
    const isChecked = checked.toLowerCase() === 'x' ? 'true' : 'false';
    return `<TASKITEM data-checked="${isChecked}">${text}</TASKITEM>`;
  });

  // Blockquotes - handle multi-line blockquotes properly
  // First, join consecutive blockquote lines
  html = html.replace(/^(> .+\n(?:> .+\n?)*)/gm, (match) => {
    const lines = match.split('\n').filter(l => l.startsWith('> ')).map(l => l.slice(2));
    const content = lines.join('<br>');
    return `<blockquote><p>${content}</p></blockquote>`;
  });

  // Ordered list items
  html = html.replace(/^(\s*)(\d+)\.\s+(.*$)/gm, (match, indent, num, content) => {
    const level = Math.floor(indent.length / 2);
    return `<OL-ITEM level="${level}" num="${num}">${content}</OL-ITEM>`;
  });

  // Unordered list items (but not task lists or regular bullets mixed with special content)
  html = html.replace(/^(\s*)([-*+])\s+(.*$)/gm, (match, indent, bullet, content) => {
    const level = Math.floor(indent.length / 2);
    return `<UL-ITEM level="${level}">${content}</UL-ITEM>`;
  });

  // Process task items into task list structure
  html = html.replace(/(<TASKITEM[^>]*>[\s\S]*?<\/TASKITEM>[\s\n]*)+/g, (match) => {
    const items = match.match(/<TASKITEM data-checked="([^"]*)">(.*)<\/TASKITEM>/g) || [];
    const listItems = items.map(item => {
      const m = item.match(/<TASKITEM data-checked="([^"]*)">(.*)<\/TASKITEM>/);
      if (m) {
        return `<li data-type="taskItem" data-checked="${m[1]}"><div><p>${m[2]}</p></div></li>`;
      }
      return item;
    }).join('');
    return `<ul data-type="taskList">${listItems}</ul>`;
  });

  // Process list items into proper nested HTML
  html = processListItems(html);

  // Phase 3: Restore protected blocks

  // Restore code blocks
  html = html.replace(/%%CODEBLOCK(\d+)%%/g, (match, index) => {
    return codeBlocks[parseInt(index)] || match;
  });

  // Restore inline codes
  html = html.replace(/%%INLINECODE(\d+)%%/g, (match, index) => {
    return inlineCodes[parseInt(index)] || match;
  });

  // Restore block math
  html = html.replace(/%%BLOCKMATH(\d+)%%/g, (match, index) => {
    return blockMaths[parseInt(index)] || match;
  });

  // Restore inline math
  html = html.replace(/%%INLINEMATH(\d+)%%/g, (match, index) => {
    return inlineMaths[parseInt(index)] || match;
  });

  // Restore color spans
  html = html.replace(/%%COLORSPAN(\d+)%%/g, (match, index) => {
    return colorSpans[parseInt(index)] || match;
  });

  // Restore CriticMarkup
  html = html.replace(/%%CRITICDEL(\d+)%%/g, (match, index) => {
    return criticDeletions[parseInt(index)] || match;
  });
  html = html.replace(/%%CRITICINS(\d+)%%/g, (match, index) => {
    return criticInsertions[parseInt(index)] || match;
  });
  html = html.replace(/%%CRITICHIL(\d+)%%/g, (match, index) => {
    return criticHighlights[parseInt(index)] || match;
  });

  // Restore HTML blocks
  html = html.replace(/%%HTMLBLOCK(\d+)%%/g, (match, index) => {
    return htmlBlocks[parseInt(index)] || match;
  });

  // Restore tables
  html = html.replace(/%%TABLE(\d+)%%/g, (match, index) => {
    return tables[parseInt(index)] || match;
  });

  // Restore footnote references
  html = html.replace(/%%FOOTNOTEREF(\d+)%%/g, (match, index) => {
    const ref = footnoteRefs[parseInt(index)];
    if (ref) {
      return `<sup data-footnote-id="${ref.id}" data-footnote-label="${ref.label}">[${ref.label}]</sup>`;
    }
    return match;
  });

  // Restore footnote definitions (append at end)
  let footnoteDefsHtml = '';
  for (const def of footnoteDefs) {
    footnoteDefsHtml += `<div data-footnote-id="${def.id}" data-footnote-definition=""><p>${def.content}</p></div>`;
  }
  if (footnoteDefsHtml) {
    html = html.replace(/%%FOOTNOTEDEF\d+%%/g, '');
    html = html + '\n\n' + footnoteDefsHtml;
  }

  // Line breaks (two spaces at end of line)
  html = html.replace(/ {2,}$/gm, '<br>');

  // Paragraphs - wrap loose text in <p> tags
  html = html.replace(/\n\n(?!<[\w/])(.+?)(?=\n\n|$)/gs, (match, content) => {
    const trimmed = content.trim();
    if (trimmed && !trimmed.startsWith('<')) {
      return `\n<p>${trimmed.replace(/\n/g, '<br>')}</p>\n`;
    }
    return match;
  });

  // Clean up empty paragraphs and extra whitespace
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/\n{3,}/g, '\n\n');

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
 * Get a timestamp-based filename with md extension
 */
export function getTimestampFilename(): string {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const ts = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}-${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;
  return `${ts}.md`;
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
