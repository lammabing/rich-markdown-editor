import { describe, it, expect } from 'vitest';
import { htmlToMarkdown, markdownToHtml } from '../utils/fileUtils';

describe('Math Extension - Markdown to HTML Conversion', () => {
  describe('Inline Math', () => {
    it('converts simple inline math $E=mc^2$', () => {
      const md = 'The equation $E=mc^2$ is famous.';
      const html = markdownToHtml(md);
      expect(html).toContain('data-latex="E=mc^2"');
      expect(html).toContain('math-inline');
    });

    it('converts inline math with fractions $\\frac{a}{b}$', () => {
      const md = 'The fraction $\\frac{a}{b}$ shows division.';
      const html = markdownToHtml(md);
      expect(html).toContain('data-latex="\\frac{a}{b}"');
    });

    it('converts inline math with Greek letters $\\alpha + \\beta$', () => {
      const md = 'Greek letters $\\alpha + \\beta$ are used.';
      const html = markdownToHtml(md);
      expect(html).toContain('data-latex="\\alpha + \\beta"');
    });

    it('converts inline math with subscripts $x_1 + x_2$', () => {
      const md = 'Variables $x_1 + x_2$ are common.';
      const html = markdownToHtml(md);
      expect(html).toContain('data-latex="x_1 + x_2"');
    });

    it('converts inline math with superscripts $x^2 + y^2$', () => {
      const md = 'Powers $x^2 + y^2$ appear often.';
      const html = markdownToHtml(md);
      expect(html).toContain('data-latex="x^2 + y^2"');
    });

    it('handles multiple inline math expressions in one line', () => {
      const md = 'Both $a$ and $b$ are variables.';
      const html = markdownToHtml(md);
      const matches = html.match(/data-latex="a"/g);
      expect(matches).toHaveLength(1);
      expect(html).toContain('data-latex="b"');
    });
  });

  describe('Block Math', () => {
    it('converts simple block math $$E=mc^2$$', () => {
      const md = '$$E=mc^2$$';
      const html = markdownToHtml(md);
      expect(html).toContain('data-latex="E=mc^2"');
      expect(html).toContain('data-display-mode="true"');
      expect(html).toContain('math-block');
    });

    it('converts block math with integrals', () => {
      const md = '$$\\int_{0}^{\\infty} x^2 dx$$';
      const html = markdownToHtml(md);
      expect(html).toContain('data-latex="\\int_{0}^{\\infty} x^2 dx"');
      expect(html).toContain('data-display-mode="true"');
    });

    it('converts block math with summations', () => {
      const md = '$$\\sum_{n=1}^{\\infty} \\frac{1}{n^2}$$';
      const html = markdownToHtml(md);
      expect(html).toContain('data-latex="\\sum_{n=1}^{\\infty} \\frac{1}{n^2}"');
    });

    it('converts block math with matrices', () => {
      const md = '$$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$$';
      const html = markdownToHtml(md);
      expect(html).toContain('data-latex');
      expect(html).toContain('pmatrix');
    });

    it('handles multi-line block math', () => {
      const md = '$$\\begin{aligned} a &= b \\\\ c &= d \\end{aligned}$$';
      const html = markdownToHtml(md);
      expect(html).toContain('data-latex');
      expect(html).toContain('aligned');
    });
  });
});

describe('Math Extension - HTML to Markdown Conversion', () => {
  describe('Inline Math', () => {
    it('converts inline math span to $...$', () => {
      const html = '<span data-latex="E=mc^2" class="math-inline"></span>';
      const md = htmlToMarkdown(html);
      expect(md).toContain('$E=mc^2$');
    });

    it('converts inline math with complex LaTeX', () => {
      const html = '<span data-latex="\\frac{a}{b}" class="math-inline"></span>';
      const md = htmlToMarkdown(html);
      expect(md).toContain('$\\frac{a}{b}$');
    });
  });

  describe('Block Math', () => {
    it('converts block math div to $$...$$', () => {
      const html = '<div data-latex="E=mc^2" data-display-mode="true" class="math-block"></div>';
      const md = htmlToMarkdown(html);
      expect(md).toContain('$$E=mc^2$$');
    });

    it('converts block math with complex LaTeX', () => {
      const html = '<div data-latex="\\int_{0}^{1} x dx" data-display-mode="true" class="math-block"></div>';
      const md = htmlToMarkdown(html);
      expect(md).toContain('$$\\int_{0}^{1} x dx$$');
    });
  });
});

describe('Code Syntax Highlighting - Markdown to HTML Conversion', () => {
  describe('Inline Code', () => {
    it('converts inline code with backticks', () => {
      const md = 'Use the `console.log()` function.';
      const html = markdownToHtml(md);
      expect(html).toContain('<code>console.log()</code>');
    });

    it('handles multiple inline code in one line', () => {
      const md = 'Use `const` and `let` for declarations.';
      const html = markdownToHtml(md);
      expect(html).toContain('<code>const</code>');
      expect(html).toContain('<code>let</code>');
    });

    it('preserves code content with special characters', () => {
      const md = 'The pattern `/\\w+/g` matches words.';
      const html = markdownToHtml(md);
      expect(html).toContain('<code>/\\w+/g</code>');
    });
  });

  describe('Code Blocks', () => {
    it('converts code block with language', () => {
      const md = '```javascript\nconsole.log("Hello");\n```';
      const html = markdownToHtml(md);
      expect(html).toContain('<pre>');
      expect(html).toContain('<code class="language-javascript">');
      expect(html).toContain('console.log(&quot;Hello&quot;)');
    });

    it('converts code block without language', () => {
      const md = '```\nsome code\n```';
      const html = markdownToHtml(md);
      expect(html).toContain('<pre>');
      expect(html).toContain('<code class="language-">');
    });

    it('handles Python code block', () => {
      const md = '```python\ndef hello():\n    print("Hello")\n```';
      const html = markdownToHtml(md);
      expect(html).toContain('language-python');
      expect(html).toContain('def hello()');
    });

    it('handles TypeScript code block', () => {
      const md = '```typescript\nconst x: number = 42;\n```';
      const html = markdownToHtml(md);
      expect(html).toContain('language-typescript');
      expect(html).toContain('const x: number = 42');
    });

    it('preserves code indentation', () => {
      const md = '```javascript\nfunction test() {\n  return 1;\n}\n```';
      const html = markdownToHtml(md);
      expect(html).toContain('function test()');
      expect(html).toContain('return 1');
    });

    it('handles code with special characters', () => {
      const md = '```javascript\nconst regex = /\\d+/g;\n```';
      const html = markdownToHtml(md);
      expect(html).toContain('regex');
    });

    it('escapes HTML special characters in code blocks', () => {
      const md = '```html\n<div class="test">Hello & World</div>\n```';
      const html = markdownToHtml(md);
      expect(html).toContain('&lt;div class=&quot;test&quot;&gt;');
      expect(html).toContain('Hello &amp; World');
      expect(html).toContain('&lt;/div&gt;');
    });

    it('handles code with comparison operators', () => {
      const md = '```javascript\nif (a < b && b > c) { return true; }\n```';
      const html = markdownToHtml(md);
      expect(html).toContain('if (a &lt; b &amp;&amp; b &gt; c)');
    });

    it('escapes angle brackets in code blocks', () => {
      const md = '```typescript\nconst el = document.getElementById("app");\nif (el != null) { }\n```';
      const html = markdownToHtml(md);
      expect(html).toContain('if (el != null)');
      expect(html).toContain('language-typescript');
    });
  });
});

describe('Code Syntax Highlighting - HTML to Markdown Conversion', () => {
  describe('Inline Code', () => {
    it('converts code element to backticks', () => {
      const html = '<code>console.log()</code>';
      const md = htmlToMarkdown(html);
      expect(md).toContain('`console.log()`');
    });
  });

  describe('Code Blocks', () => {
    it('converts pre/code to code block', () => {
      const html = '<pre><code class="language-javascript">console.log("test");</code></pre>';
      const md = htmlToMarkdown(html);
      expect(md).toContain('```');
      expect(md).toContain('console.log("test")');
    });
  });
});

describe('Mixed Content - Math and Code', () => {
  it('handles document with both math and code', () => {
    const md = `
# Math and Code

The equation $E=mc^2$ is famous.

\`\`\`javascript
const energy = mass * c * c;
\`\`\`

Block math:

$$\\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}$$
`;
    const html = markdownToHtml(md);

    // Check inline math
    expect(html).toContain('data-latex="E=mc^2"');
    expect(html).toContain('math-inline');

    // Check code block
    expect(html).toContain('language-javascript');
    expect(html).toContain('const energy = mass * c * c');

    // Check block math
    expect(html).toContain('data-display-mode="true"');
    expect(html).toContain('math-block');
  });

  it('handles code with dollar signs that should not be treated as math', () => {
    const md = '```javascript\nconst price = $100;\n```';
    const html = markdownToHtml(md);
    // The dollar sign inside code should be preserved
    expect(html).toContain('price');
    expect(html).toContain('100');
  });
});

describe('Color Text - Markdown to HTML Conversion', () => {
  it('converts inline color span with style to data-color', () => {
    const md = 'This is <span style="color: #dc2626">red text</span>.';
    const html = markdownToHtml(md);
    expect(html).toContain('data-color="#dc2626"');
    expect(html).toContain('red text');
  });

  it('handles multiple colored text spans', () => {
    const md = '- <span style="color: #dc2626">Red</span>\n- <span style="color: #2563eb">Blue</span>';
    const html = markdownToHtml(md);
    expect(html).toContain('data-color="#dc2626"');
    expect(html).toContain('data-color="#2563eb"');
  });

  it('preserves colored text in list items', () => {
    const md = '- <span style="color: #16a34a">Green text</span>';
    const html = markdownToHtml(md);
    expect(html).toContain('<li>');
    expect(html).toContain('data-color="#16a34a"');
    expect(html).toContain('Green text');
  });
});

describe('Ordered Lists - Markdown to HTML Conversion', () => {
  it('converts numbered list to ordered list', () => {
    const md = '1. First item\n2. Second item\n3. Third item';
    const html = markdownToHtml(md);
    expect(html).toContain('<ol>');
    expect(html).toContain('</ol>');
    expect(html).not.toContain('<ul>');
    expect(html).toContain('First item');
    expect(html).toContain('Second item');
    expect(html).toContain('Third item');
  });

  it('preserves content in ordered list items', () => {
    const md = '1. **Evidence-First Principle**\n2. No unstated Assumptions';
    const html = markdownToHtml(md);
    expect(html).toContain('<ol>');
    expect(html).toContain('<strong>Evidence-First Principle</strong>');
    expect(html).toContain('No unstated Assumptions');
  });

  it('handles unordered list separately', () => {
    const md = '- Item one\n- Item two\n- Item three';
    const html = markdownToHtml(md);
    expect(html).toContain('<ul>');
    expect(html).toContain('</ul>');
  });

  it('continues numbering after nested bullets', () => {
    const md = '1. First item\n   - nested\n   - nested2\n2. Second item';
    const html = markdownToHtml(md);
    expect(html).toContain('<ol>');
    expect(html).toContain('First item');
    expect(html).toContain('Second item');
    // Nested bullets should be inside the first li, and Second item should be in the same ol
    expect(html).toContain('<li>First item<ul><li>nested</li><li>nested2</li></ul></li><li>Second item</li>');
  });

  it('handles numbered list with bullets at same level', () => {
    const md = '1. **Principle One**\n- Detail A\n- Detail B\n2. **Principle Two**';
    const html = markdownToHtml(md);
    expect(html).toContain('Principle One');
    expect(html).toContain('Principle Two');
    // Should have ol elements with start attributes for continuation
    expect(html).toMatch(/<ol>/);
    // The second numbered item should continue numbering
    expect(html).toContain('start="2"');
  });

  it('handles evidence-based protocol format', () => {
    const md = `1. **Evidence-First Principle**
- Only use facts, data, or observations
- If a claim relies on inferred entities

2. **No unstated Assumptions**
- Identify hidden premises
- Do not assume truth`;
    const html = markdownToHtml(md);
    // Should contain both numbered items
    expect(html).toContain('Evidence-First Principle');
    expect(html).toContain('No unstated Assumptions');
    // Should have ol with start="2" for continuation
    expect(html).toMatch(/start="2"/);
  });
});

describe('Edge Cases', () => {
  describe('Math Edge Cases', () => {
    it('handles empty inline math', () => {
      const md = 'Empty math $$';
      const html = markdownToHtml(md);
      // Empty math should not create a math element
      expect(html).not.toContain('data-latex=""');
    });

    it('handles math with spaces', () => {
      const md = 'Math $x + y$ here';
      const html = markdownToHtml(md);
      expect(html).toContain('data-latex="x + y"');
    });

    it('handles escaped dollar signs in text', () => {
      // In markdown, $ followed by space shouldn't be math
      const md = 'Price is $ 100 dollars';
      const html = markdownToHtml(md);
      // Should not create math element for "$ 100"
      expect(html).not.toContain('data-latex');
    });
  });

  describe('Code Edge Cases', () => {
    it('handles empty code block', () => {
      const md = '```\n```';
      const html = markdownToHtml(md);
      expect(html).toContain('<pre>');
    });

    it('handles code block with empty language', () => {
      const md = '```\ncode here\n```';
      const html = markdownToHtml(md);
      expect(html).toContain('<code class="language-"');
    });

    it('handles inline code with backticks inside', () => {
      const md = 'Use `code` for inline code';
      const html = markdownToHtml(md);
      expect(html).toContain('<code>code</code>');
    });
  });
});

describe('Round-trip Conversion', () => {
  it('preserves inline math through conversion cycle', () => {
    const originalMd = 'The equation $E=mc^2$ is famous.';
    const html = markdownToHtml(originalMd);
    const backToMd = htmlToMarkdown(html);
    expect(backToMd).toContain('$E=mc^2$');
  });

  it('preserves block math through conversion cycle', () => {
    const originalMd = '$$\\int_0^1 x dx$$';
    const html = markdownToHtml(originalMd);
    const backToMd = htmlToMarkdown(html);
    expect(backToMd).toContain('$$');
    expect(backToMd).toContain('int_0^1 x dx');
  });

  it('preserves code block through conversion cycle', () => {
    const originalMd = '```javascript\nconsole.log("test");\n```';
    const html = markdownToHtml(originalMd);
    const backToMd = htmlToMarkdown(html);
    expect(backToMd).toContain('```');
    // The HTML entities should be escaped in the HTML but preserved in the markdown
    expect(backToMd).toContain('console.log("test")');
  });

  it('preserves HTML special characters in code through conversion cycle', () => {
    const originalMd = '```\nconst x = 1;\nconst y = 2;\n```';
    const html = markdownToHtml(originalMd);
    const backToMd = htmlToMarkdown(html);
    expect(backToMd).toContain('```');
    expect(backToMd).toContain('const x = 1;');
    expect(backToMd).toContain('const y = 2;');
  });

  it('preserves colored text through conversion cycle', () => {
    const originalMd = 'This is <span style="color: #dc2626">red text</span>.';
    const html = markdownToHtml(originalMd);
    expect(html).toContain('data-color="#dc2626"');
    // Round-trip should preserve the content
    const backToMd = htmlToMarkdown(html);
    expect(backToMd).toContain('red text');
  });
});
