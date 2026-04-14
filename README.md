# Markdown Editor

A modern, feature-rich markdown editor with real-time in-place rendering, slash commands, and extensive GFM (GitHub Flavored Markdown) support.

## Features

### Core Features
- **Real-time Rendering**: See your markdown rendered instantly as you type
- **Slash Commands**: Type `/` to access a command palette with all available commands
- **In-place Editing**: No split-pane needed - edit and preview in the same view
- **Interactive Elements**: Clickable checkboxes, emoji picker, resizable tables

### Supported Markdown & Extensions

| Category | Features |
|----------|----------|
| **Standard Markdown** | Headers, Bold, Italic, Links, Images, Blockquotes, Code spans, Horizontal rules |
| **GFM** | Tables, Task lists, Strikethrough, Autolinks |
| **Text Formatting** | Underline, Highlight, Colored text (8 colors) |
| **Math/LaTeX** | Inline equations (`$...$`), Block equations (`$$...$$`) |
| **CriticMarkup** | Deletion, Insertion, Highlight |
| **Content Blocks** | Alerts/Callouts (5 types), Emoji, HTML blocks, Footnotes |
| **Code** | Syntax-highlighted code blocks (multiple languages) |

---

## Getting Started

### Installation

```bash
npm install
npm run dev
```

### Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run test     # Run test suite
npm run preview  # Preview production build
```

---

## File Operations

### Saving Documents

**💾 Save as Markdown**
- Click the **💾 Save** button in the toolbar
- Or press `Ctrl+S` (Windows/Linux) / `Cmd+S` (Mac)
- Downloads your document as `document.md`

### Opening Documents

**📂 Open Markdown File**
- Click the **📂 Open** button in the toolbar
- Or press `Ctrl+O` (Windows/Linux) / `Cmd+O` (Mac)
- Select a `.md` or `.markdown` file to open
- The markdown is converted and rendered in the editor

### Exporting

**📄 Export as HTML**
- Click **📄 Export HTML** in the toolbar
- Downloads a styled HTML file

**🖨️ Print**
- Click **🖨️ Print** in the toolbar
- Or press `Ctrl+P` / `Cmd+P`

---

## Syntax Guide

### Basic Formatting

#### Headers
```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

#### Text Styling
```markdown
**Bold text** or __Bold text__
*Italic text* or _Italic text_
~~Strikethrough~~
<ins>Underlined text</ins>
==Highlighted text==
```

#### Colored Text
Use slash commands:
- `/red` - Apply red color
- `/green` - Apply green color
- `/blue` - Apply blue color
- `/yellow` - Apply yellow color
- `/orange` - Apply orange color
- `/purple` - Apply purple color
- `/pink` - Apply pink color
- `/gray` - Apply gray color
- `/clear` - Remove color

---

### Lists

#### Bullet List
```markdown
- Item 1
- Item 2
  - Nested item
- Item 3
```

#### Numbered List
```markdown
1. First item
2. Second item
3. Third item
```

#### Task List
```markdown
- [ ] Incomplete task
- [x] Completed task
- [ ] Another task
```

---

### Tables

```markdown
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

**Slash Commands:**
- `/table` - Insert a 3x3 table
- `/add-column-right` - Add column to the right
- `/add-column-left` - Add column to the left
- `/add-row-above` - Add row above
- `/add-row-below` - Add row below
- `/delete-table` - Delete the table

---

### Code

#### Inline Code

Use backticks for inline code:

```markdown
Use `console.log()` for debugging
Install with `npm install package-name`
```

Renders as: Use `console.log()` for debugging

#### Code Blocks with Syntax Highlighting

Use triple backticks with a language identifier:

````markdown
```javascript
function hello() {
  console.log("Hello, World!");
}
```
````

**Supported Languages:**
- JavaScript (`javascript`, `js`)
- TypeScript (`typescript`, `ts`)
- Python (`python`, `py`)
- Java (`java`)
- C++ (`cpp`, `c++`)
- C# (`csharp`, `cs`)
- Go (`go`, `golang`)
- Rust (`rust`, `rs`)
- Ruby (`ruby`, `rb`)
- PHP (`php`)
- HTML (`html`)
- CSS (`css`)
- SQL (`sql`)
- JSON (`json`)
- XML (`xml`)
- YAML (`yaml`, `yml`)
- Markdown (`markdown`, `md`)
- Shell (`shell`, `bash`, `sh`)

**Example Code Blocks:**

```javascript
// JavaScript
function greet(name) {
  console.log(`Hello, ${name}!`);
  return `Welcome, ${name}!`;
}
```

```python
# Python
def fibonacci(n):
    if n <= 0:
        return []
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence
```

```typescript
// TypeScript
interface User {
  id: number;
  name: string;
  email: string;
}
```

---

### Math/LaTeX

#### Inline Math

Use single dollar signs for inline equations:

```markdown
The equation $E = mc^2$ is famous.
The value of $\pi$ is approximately 3.14159.
```

Renders as: The equation $E = mc^2$ is famous.

#### Block Math

Use double dollar signs for displayed equations:

```markdown
$$
\int_{0}^{\infty} x^2 dx = \left[\frac{x^3}{3}\right]_{0}^{\infty}
$$

$$
e^{i\pi} + 1 = 0
$$
```

**Slash Commands:**
- `/inline-math` - Insert inline LaTeX equation
- `/block-math` - Insert block LaTeX equation

**Direct Input:**
- Type `$latex$` in the editor to create inline math (e.g., `$E=mc^2$`)
- Type `$$latex$$` at the start of a line to create block math

**Common LaTeX Examples:**

| Description | LaTeX |
|-------------|-------|
| Fraction | `$\frac{a}{b}$` |
| Square root | `$\sqrt{x}$` |
| Superscript | `$x^2$` |
| Subscript | `$x_i$` |
| Sum | `$\sum_{i=1}^{n}$` |
| Integral | `$\int_{a}^{b}$` |
| Greek letters | `$\alpha, \beta, \gamma$` |
| Inequality | `$x \leq y$` |

---

### Alerts/Callouts

Use slash commands to insert styled callouts:

- `/note` - 📝 Blue note callout
- `/tip` - 💡 Green tip callout
- `/warning` - ⚠️ Yellow warning callout
- `/danger` - 🚨 Red danger callout
- `/info` - ℹ️ Cyan info callout

**Example output:**

> 📝 **NOTE**
> This is a note callout for general information.

> 💡 **TIP**
> This is a helpful tip for users.

> ⚠️ **WARNING**
> This is a warning about something important.

> 🚨 **DANGER**
> This indicates danger or critical information.

> ℹ️ **INFO**
> This is additional information.

---

### CriticMarkup

#### Deletion
```markdown
{--This text will be marked as deleted--}
```

#### Insertion
```markdown
{++This text will be marked as inserted++}
```

#### Highlight
```markdown
{==This text will be highlighted==}
```

**Slash Commands:**
- `/deletion` - Mark text as deleted
- `/insertion` - Mark text as inserted
- `/highlight` - Highlight text

---

### Footnotes

```markdown
Here is a statement with a footnote.[^1]

[^1]: This is the footnote content.
```

**Slash Command:**
- `/footnote` - Insert footnote reference

---

### Emoji

Click on any emoji to change it, or use:

**Slash Command:**
- `/emoji` - Insert an emoji (opens picker)

**Common Emojis Available:**
😀 😃 😄 😁 😆 😅 🤣 😂 🙂 😊 😇 🥰 😍 🤩 😘 😗
😋 😛 😜 🤪 😝 🤑 🤗 🤭 🤫 🤔 🤐 🤨 😐 😑 😶 😏
👍 👎 👏 🙌 🙏 💪 🎉 🔥 ❤️ 💔 💯 ✨ ⭐ 🌟 💡 ✅

---

### HTML Blocks

Insert custom HTML content:

**Slash Command:**
- `/html-block` - Insert custom HTML block

**Example:**
```html
<div style="padding: 1em; background: #f0f0f0;">
  <p>Custom HTML content</p>
</div>
```

**Security:** HTML is sanitized using DOMPurify for safe rendering.

---

## Slash Commands Reference

Type `/` followed by a search term to filter commands.

### Format Commands (📝)
| Command | Aliases | Description |
|---------|---------|-------------|
| `/bold` | strong | Make text bold |
| `/italic` | em | Make text italic |
| `/strike` | strikethrough, delete | Add strikethrough |
| `/underline` | - | Underline text |
| `/highlight` | mark | Highlight text |

### Block Commands (📦)
| Command | Aliases | Description |
|---------|---------|-------------|
| `/h1` | title | Large heading |
| `/h2` | subtitle | Medium heading |
| `/h3` | - | Small heading |
| `/bullet-list` | ul, unordered | Bullet list |
| `/numbered-list` | ol, ordered | Numbered list |
| `/task-list` | todo, checkbox | Task list with checkboxes |
| `/blockquote` | quote | Quote block |
| `/code-block` | pre, code | Code with syntax highlighting |
| `/table` | - | Insert 3x3 table |
| `/note` | callout | Note callout |
| `/tip` | hint | Tip callout |
| `/warning` | caution | Warning callout |
| `/danger` | error | Danger callout |
| `/info` | information | Info callout |
| `/html-block` | html, custom-html | Custom HTML block |

### Color Commands (🎨)
| Command | Aliases | Description |
|---------|---------|-------------|
| `/red` | - | Red text |
| `/green` | - | Green text |
| `/blue` | - | Blue text |
| `/yellow` | - | Yellow text |
| `/orange` | - | Orange text |
| `/purple` | - | Purple text |
| `/pink` | - | Pink text |
| `/gray` | grey | Gray text |
| `/clear` | - | Remove text color |

### Math Commands (∑)
| Command | Aliases | Description |
|---------|---------|-------------|
| `/inline-math` | math, equation, latex, formula | Inline LaTeX |
| `/block-math` | display-math, block-equation | Block LaTeX |

### Markup Commands (🏷️)
| Command | Aliases | Description |
|---------|---------|-------------|
| `/deletion` | delete, remove | Critic deletion |
| `/insertion` | add, insert | Critic insertion |
| `/footnote` | note, reference | Footnote reference |

### Insert Commands (🔧)
| Command | Aliases | Description |
|---------|---------|-------------|
| `/horizontal-rule` | hr, divider | Horizontal line |
| `/hard-break` | br, break | Line break |
| `/emoji` | emoticon, smile | Insert emoji |

### Table Operations
| Command | Aliases | Description |
|---------|---------|-------------|
| `/add-column-right` | column-right | Add column right |
| `/add-column-left` | column-left | Add column left |
| `/add-row-above` | row-above | Add row above |
| `/add-row-below` | row-below | Add row below |
| `/delete-table` | delete-table | Delete table |

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + S` | Save as Markdown |
| `Ctrl/Cmd + O` | Open Markdown file |
| `Ctrl/Cmd + P` | Print document |
| `Ctrl/Cmd + B` | Toggle bold |
| `Ctrl/Cmd + I` | Toggle italic |
| `Ctrl/Cmd + U` | Toggle underline |
| `Ctrl/Cmd + Shift + S` | Toggle strikethrough |
| `Ctrl/Cmd + Shift + H` | Toggle highlight |
| `Ctrl/Cmd + Shift + Y` | Toggle highlight (alternative) |
| `/` | Open slash command menu |
| `Escape` | Close command menu |
| `↑` `↓` | Navigate command menu |
| `Enter` | Select command |

---

## Project Structure

```
markdown-editor/
├── src/
│   ├── components/
│   │   ├── Editor/
│   │   │   ├── Editor.tsx # Main editor component
│   │   │   ├── Editor.css # Editor styles
│   │   │   └── index.ts
│   │   ├── Toolbar/
│   │   │   ├── Toolbar.tsx # Editor toolbar
│   │   │   └── Toolbar.css
│   │   ├── FileMenu/
│   │   │   ├── FileMenu.tsx # File operations menu
│   │   │   └── FileMenu.css
│   │   └── SlashCommand/
│   │       ├── SlashCommandList.tsx # Command menu UI
│   │       ├── SlashCommand.css
│   │       └── index.ts
│   ├── extensions/
│   │   ├── MathExtension.tsx # KaTeX math (inline & block)
│   │   ├── Highlight.ts # Highlight mark
│   │   ├── CriticMarkup.ts # Critic markup
│   │   ├── Footnotes.tsx # Footnotes
│   │   ├── AlertExtension.tsx # Alerts/callouts
│   │   ├── EmojiExtension.tsx # Emoji support
│   │   ├── HTMLBlockExtension.tsx # HTML blocks
│   │   ├── HelpExtension.tsx # Help panel
│   │   ├── SlashCommandExtension.ts
│   │   └── slashCommand.ts # Command definitions
│   ├── hooks/
│   │   └── useKeyboardShortcuts.ts # Keyboard shortcuts hook
│   ├── utils/
│   │   └── fileUtils.ts # HTML↔Markdown conversion
│   ├── tests/
│   │   ├── Editor.test.tsx
│   │   ├── SlashCommandList.test.tsx
│   │   ├── SlashCommandExtension.test.ts
│   │   ├── colorCommands.test.ts
│   │   ├── slashCommand.test.ts
│   │   ├── mathAndCode.test.ts # Math & code rendering tests
│   │   ├── phase2.test.ts # Tables, tasks, code
│   │   ├── phase3.test.ts # Math, highlight, footnotes
│   │   └── phase4.test.ts # Alerts, emoji, HTML
│   └── App.tsx
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Editor**: TipTap (ProseMirror-based)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Math**: KaTeX
- **Syntax Highlighting**: lowlight (highlight.js)
- **HTML Sanitization**: DOMPurify
- **Testing**: Vitest + React Testing Library

---

## Customization

### Changing Fonts and Font Sizes

The editor uses the **Inter** font family by default, loaded from Google Fonts. You can customize fonts and sizes by editing `src/components/Editor/Editor.css`.

#### To Change the Font Family

1. Open `src/components/Editor/Editor.css`

2. Update the `@import` statement (line 2) to load a different Google Font:
   ```css
   /* Example: Using Roboto instead of Inter */
   @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
   ```

3. Update the `font-family` declarations (lines 8 and 48):
   ```css
   .editor-wrapper {
     font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
   }

   .ProseMirror {
     font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
   }
   ```

#### To Change the Base Font Size

Edit the `font-size` property in `.ProseMirror` (line 49):

```css
.ProseMirror {
  font-size: 18px;  /* Change from default 16px */
  line-height: 1.8;
  color: #1f2937;
}
```

#### To Change Heading Sizes

Find the heading styles (lines 73-107) and adjust the `font-size` values:

```css
.ProseMirror h1 { font-size: 3em; }    /* Default: 2.5em */
.ProseMirror h2 { font-size: 2.5em; }  /* Default: 2em */
.ProseMirror h3 { font-size: 1.75em; } /* Default: 1.5em */
.ProseMirror h4 { font-size: 1.5em; }  /* Default: 1.25em */
.ProseMirror h5 { font-size: 1.25em; } /* Default: 1.125em */
.ProseMirror h6 { font-size: 1.125em; }/* Default: 1em */
```

#### To Change Line Height

Edit the `line-height` property:

```css
.ProseMirror {
  font-size: 16px;
  line-height: 2.0;  /* Increase from 1.8 for more spacing */
}

.ProseMirror p {
  line-height: 2.0;  /* Match the parent */
}
```

#### To Change Letter Spacing

Edit the `letter-spacing` property for headings:

```css
.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3 {
  letter-spacing: -0.03em;  /* More negative = tighter */
}
```

#### Complete Font Customization Example

Here's a complete example using **Merriweather** for a serif look:

```css
/* 1. Import the font */
@import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');

/* 2. Apply to editor wrapper */
.editor-wrapper {
  font-family: 'Merriweather', Georgia, serif;
  font-size: 17px;
}

/* 3. Apply to editor content */
.ProseMirror {
  font-family: 'Merriweather', Georgia, serif;
  font-size: 17px;
  line-height: 1.9;
}

/* 4. Adjust headings */
.ProseMirror h1 { font-size: 2.75em; font-weight: 700; }
.ProseMirror h2 { font-size: 2.25em; font-weight: 700; }
.ProseMirror h3 { font-size: 1.75em; font-weight: 700; }
```

#### Popular Google Fonts for Editors

| Font | Style | Import URL |
|------|-------|------------|
| **Inter** | Sans-serif | `?family=Inter:wght@400;500;600;700` |
| **Roboto** | Sans-serif | `?family=Roboto:wght@400;500;700` |
| **Open Sans** | Sans-serif | `?family=Open+Sans:wght@400;600;700` |
| **Lato** | Sans-serif | `?family=Lato:wght@400;700` |
| **Merriweather** | Serif | `?family=Merriweather:wght@400;700` |
| **Playfair Display** | Serif | `?family=Playfair+Display:wght@400;700` |
| **Fira Code** | Monospace | `?family=Fira+Code:wght@400;500` |
| **JetBrains Mono** | Monospace | `?family=JetBrains+Mono:wght@400;500` |

#### Recommended Font Size Combinations

| Use Case | Base Size | H1 | H2 | H3 | Line Height |
|----------|-----------|----|----|----|-------------|
| **Default** | 16px | 2.5em | 2em | 1.5em | 1.8 |
| **Large Text** | 18px | 2.5em | 2em | 1.5em | 1.9 |
| **Compact** | 14px | 2em | 1.75em | 1.5em | 1.6 |
| **Accessibility** | 20px | 2em | 1.75em | 1.5em | 2.0 |

---

## Testing

```bash
npm run test        # Run all tests
npm run test:watch  # Watch mode
npm run test:ui     # Open Vitest UI
```

**Test Coverage**: 148 tests across 9 test files

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## License

MIT

---

## Quick Start Example

1. Start the dev server: `npm run dev`
2. Open your browser to the displayed URL
3. Type `/` to see all available commands
4. Start typing markdown or use slash commands
5. Try `/table` to insert a table
6. Try `/tip` to add a callout
7. Try `$E=mc^2$` for inline math
8. Click checkboxes in task lists to toggle them

Enjoy writing with the enhanced markdown editor!
