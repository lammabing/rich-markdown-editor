# Welcome to the Markdown Editor! 👋

This is an example document showcasing all the features available in this editor.

---

## 📝 Text Formatting

You can format text in various ways:

- **Bold text** using `**bold**` or `__bold__`
- *Italic text* using `*italic*` or `_italic_`
- ~~Strikethrough~~ using `~~strikethrough~~`
- <u>Underlined text</u> using HTML `<u>` tags
- ==Highlighted text== using the `/highlight` command

### Colored Text

Use slash commands to add color:

- `/red` - This text is red
- `/green` - This text is green  
- `/blue` - This text is blue
- `/yellow` - This text is yellow
- `/orange` - This text is orange
- `/purple` - This text is purple
- `/pink` - This text is pink
- `/gray` - This text is gray

---

## 📦 Blocks

### Headings

Use `/h1`, `/h2`, `/h3` or type `#`, `##`, `###` followed by space.

### Lists

#### Bullet List
- Item one
- Item two
  - Nested item
- Item three

#### Numbered List
1. First item
2. Second item
3. Third item

#### Task List
- [x] Completed task
- [ ] Incomplete task
- [ ] Another task

> 💡 **Tip:** Click the checkboxes to toggle them!

### Blockquote

> This is a blockquote. Use it for quotes or to highlight important information.
> 
> — Someone Wise

### Code Block

```javascript
// JavaScript example
function greet(name) {
  console.log(`Hello, ${name}!`);
}

greet('World');
```

```python
# Python example
def greet(name):
    print(f"Hello, {name}!")

greet("World")
```

---

## 📊 Tables

| Feature | Status | Priority |
|---------|--------|----------|
| Tables | ✅ Done | High |
| Task Lists | ✅ Done | High |
| Math Support | ✅ Done | Medium |
| Emoji | ✅ Done | Low |

**Table Commands:**
- `/table` - Insert a new table
- `/add-column-right` - Add column to the right
- `/add-row-below` - Add row below

---

## ∑ Math/LaTeX

### Inline Math
The famous equation $E = mc^2$ relates energy and mass.

### Block Math

$$
\int_{0}^{\infty} x^2 dx = \left[\frac{x^3}{3}\right]_{0}^{\infty}
$$

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

**Tips:**
- Use `$...$` for inline math
- Use `$$...$$` for block math
- Or use `/inline-math` and `/block-math` commands

---

## 📋 Alerts/Callouts

### Note
📝 **NOTE**

This is a note callout for general information that doesn't fit elsewhere.

### Tip
💡 **TIP**

This is a helpful tip to guide users toward best practices.

### Warning
⚠️ **WARNING**

This warns users about potential issues or gotchas.

### Danger
🚨 **DANGER**

This indicates danger or critical information that must not be ignored.

### Info
ℹ️ **INFO**

This provides additional information or context.

---

## 🏷️ CriticMarkup

### Deletion
{--This text is marked as deleted--}

### Insertion
{++This text is marked as inserted++}

### Highlight
{==This text is highlighted using CriticMarkup==}

---

## 🔤 Emoji

Click on any emoji to change it: 😀 🎉 🚀 ⭐ 💡 ✅

Or use `/emoji` to insert an emoji with a picker!

**Common emojis:**
- Reactions: 😀 😃 😄 😁 😆 😅 🤣 😂
- Gestures: 👍 👎 👏 🙌 🙏 💪
- Symbols: ❤️ 💔 💯 ✨ ⭐ 🌟 💡 ✅

---

## 📎 Footnotes

Here is a statement that needs a reference.[^1]

Another claim that requires citation.[^2]

[^1]: This is the first footnote. It can contain multiple paragraphs and even code.
[^2]: This is the second footnote. Keep it concise and relevant.

---

## 🌐 HTML Block

<div style="padding: 1em; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; color: white;">
  <h3 style="margin: 0 0 0.5em 0;">Custom HTML Block</h3>
  <p style="margin: 0;">You can insert custom HTML with styling. Great for special content!</p>
</div>

**Security:** All HTML is sanitized using DOMPurify for safe rendering.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + B` | Toggle bold |
| `Ctrl/Cmd + I` | Toggle italic |
| `Ctrl/Cmd + U` | Toggle underline |
| `Ctrl/Cmd + Shift + H` | Toggle highlight |
| `/` | Open command menu |
| `Escape` | Close menu |

---

## 🎯 Quick Command Reference

Type `/` followed by a search term:

| Category | Commands |
|----------|----------|
| **Format** | `/bold` `/italic` `/strike` `/underline` `/highlight` |
| **Blocks** | `/h1` `/h2` `/h3` `/table` `/task-list` `/code-block` |
| **Colors** | `/red` `/green` `/blue` `/yellow` `/purple` `/pink` `/orange` `/gray` |
| **Alerts** | `/note` `/tip` `/warning` `/danger` `/info` |
| **Math** | `/inline-math` `/block-math` |
| **Insert** | `/emoji` `/hr` `/footnote` `/html-block` `/help` |

---

## 📖 Getting Help

- Type `/help` or `/?` to show the help panel
- Read `README.md` for full documentation
- Check `task.md` for the original feature specification

---

**Happy Writing!** ✍️
