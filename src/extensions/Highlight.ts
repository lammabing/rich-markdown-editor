import { Mark, mergeAttributes } from '@tiptap/core';

export interface HighlightOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    highlight: {
      setHighlight: () => ReturnType;
      toggleHighlight: () => ReturnType;
      unsetHighlight: () => ReturnType;
    };
  }
}

export const Highlight = Mark.create<HighlightOptions>({
  name: 'highlight',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-color'),
        renderHTML: (attributes) => ({
          'data-color': attributes.color,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'mark',
      },
      {
        tag: 'span.highlight',
      },
      {
        style: 'background-color',
        consuming: false,
      },
      {
        tag: 'span[data-highlight]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'mark',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: 'highlight',
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setHighlight:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleHighlight:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
      unsetHighlight:
        () =>
        ({ commands }) => {
          return commands.unsetMark(this.name);
        },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-h': () => this.editor.commands.toggleHighlight(),
      'Mod-Shift-y': () => this.editor.commands.toggleHighlight(),
    };
  },
});

export default Highlight;
