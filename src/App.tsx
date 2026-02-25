import { Editor } from './components/Editor';
import './App.css';

const defaultContent = `# Welcome to the Markdown Editor! 👋

Type \`/\` to see all available commands.

## Quick Start

1. **Type \`/\`** - Opens the command palette
2. **Start typing** - Filter commands by name
3. **Use arrow keys** - Navigate the menu
4. **Press Enter** - Select a command

## Try These Commands

- \`/help\` - Show syntax guide
- \`/tip\` - Insert a tip callout
- \`/table\` - Insert a table
- \`/emoji\` - Insert an emoji
- \`/inline-math\` - Insert math equation

## Example Content

Type \`/note\`, \`/warning\`, or \`/code-block\` to see more features!

For full documentation, see **README.md**.
`;

function App() {
  return (
    <div className="app">
      <Editor content={defaultContent} />
    </div>
  );
}

export default App;
