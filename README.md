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
```markdown
Use `console.log()` for debugging
```

#### Code Blocks
````markdown
```javascript
function hello() {
  console.log("Hello, World!");
}
```
````

Supported languages: JavaScript, TypeScript, Python, Java, C++, Go, Rust, Ruby, PHP, HTML, CSS, SQL, and many more.

---

### Math/LaTeX

#### Inline Math
```markdown
The equation $E = mc^2$ is famous.
```

#### Block Math
```markdown
$$
\int_{0}^{\infty} x^2 dx
$$
```

**Slash Commands:**
- `/inline-math` - Insert inline LaTeX equation
- `/block-math` - Insert block LaTeX equation

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
│   │   │   ├── Editor.tsx       # Main editor component
│   │   │   ├── Editor.css       # Editor styles
│   │   │   └── index.ts
│   │   └── SlashCommand/
│   │       ├── SlashCommandList.tsx  # Command menu UI
│   │       ├── SlashCommand.css
│   │       └── index.ts
│   ├── extensions/
│   │   ├── MathExtension.tsx    # KaTeX math support
│   │   ├── Highlight.ts         # Highlight mark
│   │   ├── CriticMarkup.ts      # Critic markup
│   │   ├── Footnotes.tsx        # Footnotes
│   │   ├── AlertExtension.tsx   # Alerts/callouts
│   │   ├── EmojiExtension.tsx   # Emoji support
│   │   ├── HTMLBlockExtension.tsx # HTML blocks
│   │   ├── SlashCommandExtension.ts
│   │   └── slashCommand.ts      # Command definitions
│   ├── tests/
│   │   ├── Editor.test.tsx
│   │   ├── SlashCommandList.test.tsx
│   │   ├── colorCommands.test.ts
│   │   ├── phase2.test.ts       # Tables, tasks, code
│   │   ├── phase3.test.ts       # Math, highlight, footnotes
│   │   └── phase4.test.ts       # Alerts, emoji, HTML
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

## Testing

```bash
npm run test        # Run all tests
npm run test:watch  # Watch mode
npm run test:ui     # Open Vitest UI
```

**Test Coverage**: 111 tests across 8 test files

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
