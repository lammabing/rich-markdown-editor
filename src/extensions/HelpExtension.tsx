import { Node, mergeAttributes } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    help: {
      insertHelp: () => ReturnType;
    };
  }
}

export const HelpExtension = Node.create({
  name: 'help',

  group: 'block',

  atom: true,

  selectable: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-help]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-help': '' }, HTMLAttributes)];
  },

  addNodeView() {
    return () => ({
      dom: (() => {
        const div = document.createElement('div');
        div.innerHTML = `
          <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 1.5em; margin: 1em 0; background-color: #f8fafc; font-family: system-ui, -apple-system, sans-serif;">
            <h2 style="margin: 0 0 1em 0; color: #1e40af; font-size: 1.5em;">📖 Markdown Editor Help</h2>
            <p style="margin: 0; color: #6b7280; font-size: 0.875em;">Type <strong>/</strong> to see all available commands. See README.md for full documentation.</p>
          </div>
        `;
        return div;
      })(),
    });
  },

  addCommands() {
    return {
      insertHelp:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
          });
        },
    };
  },
});

export default HelpExtension;
