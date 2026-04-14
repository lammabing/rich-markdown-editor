import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion';
import { slashCommand } from '../components/SlashCommand/slashCommand';

export const SlashCommandExtension = Extension.create({
  name: 'slashCommand',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }: any) => {
          props.command(editor);
          editor.chain().focus().deleteRange(range).run();
        },
        items: ({ query, editor }: { query: string; editor: any }) => {
          return slashCommand.items!({ query, editor });
        },
        render: () => {
          return slashCommand.render!();
        },
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export default SlashCommandExtension;
