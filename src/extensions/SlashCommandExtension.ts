import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import { slashCommand } from './slashCommand';

export const SlashCommandExtension = Extension.create({
  name: 'slashCommand',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: () => {},
        items: () => [],
        render: () => ({
          onStart: () => {},
          onUpdate: () => {},
          onKeyDown: () => false,
          onExit: () => {},
        }),
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...slashCommand,
      }),
    ];
  },
});

export default SlashCommandExtension;
