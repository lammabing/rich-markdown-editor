import { Mark, mergeAttributes } from '@tiptap/core';

export interface CriticMarkupOptions {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    criticMarkup: {
      setCriticDeletion: () => ReturnType;
      toggleCriticDeletion: () => ReturnType;
      setCriticInsertion: () => ReturnType;
      toggleCriticInsertion: () => ReturnType;
      setCriticHighlight: () => ReturnType;
      toggleCriticHighlight: () => ReturnType;
    };
  }
}

export const CriticDeletion = Mark.create<CriticMarkupOptions>({
  name: 'criticDeletion',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'del',
      },
      {
        tag: 'span[data-critic="deletion"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'del',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-critic': 'deletion',
        class: 'critic-deletion',
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setCriticDeletion:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleCriticDeletion:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});

export const CriticInsertion = Mark.create<CriticMarkupOptions>({
  name: 'criticInsertion',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'ins',
      },
      {
        tag: 'span[data-critic="insertion"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'ins',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-critic': 'insertion',
        class: 'critic-insertion',
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setCriticInsertion:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleCriticInsertion:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});

export const CriticHighlight = Mark.create<CriticMarkupOptions>({
  name: 'criticHighlight',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-critic="highlight"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-critic': 'highlight',
        class: 'critic-highlight',
      }),
      0,
    ];
  },

  addCommands() {
    return {
      setCriticHighlight:
        () =>
        ({ commands }) => {
          return commands.setMark(this.name);
        },
      toggleCriticHighlight:
        () =>
        ({ commands }) => {
          return commands.toggleMark(this.name);
        },
    };
  },
});

export default {
  CriticDeletion,
  CriticInsertion,
  CriticHighlight,
};
