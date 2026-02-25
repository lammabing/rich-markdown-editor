import { ReactRenderer } from '@tiptap/react';
import type { SuggestionOptions } from '@tiptap/suggestion';
import tippy from 'tippy.js';
import type { GetReferenceClientRect } from 'tippy.js';
import { SlashCommandList } from '../components/SlashCommand/SlashCommandList';

export interface CommandItem {
  title: string;
  description: string;
  category: 'format' | 'blocks' | 'color' | 'insert';
  command: (editor: any) => void;
  aliases?: string[];
}

export const commandItems: CommandItem[] = [
  // Format commands
  {
    title: 'Bold',
    description: 'Make text bold',
    category: 'format',
    command: (editor) => editor.chain().focus().toggleBold().run(),
    aliases: ['strong'],
  },
  {
    title: 'Italic',
    description: 'Make text italic',
    category: 'format',
    command: (editor) => editor.chain().focus().toggleItalic().run(),
    aliases: ['em'],
  },
  {
    title: 'Strike',
    description: 'Add strikethrough',
    category: 'format',
    command: (editor) => editor.chain().focus().toggleStrike().run(),
    aliases: ['strikethrough', 'delete'],
  },
  {
    title: 'Underline',
    description: 'Underline text',
    category: 'format',
    command: (editor) => editor.chain().focus().toggleUnderline().run(),
    aliases: [],
  },
  // Heading commands
  {
    title: 'Heading 1',
    description: 'Large section heading',
    category: 'blocks',
    command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
    aliases: ['h1', 'title'],
  },
  {
    title: 'Heading 2',
    description: 'Medium section heading',
    category: 'blocks',
    command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    aliases: ['h2', 'subtitle'],
  },
  {
    title: 'Heading 3',
    description: 'Small section heading',
    category: 'blocks',
    command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    aliases: ['h3'],
  },
  {
    title: 'Bullet List',
    description: 'Create a bullet list',
    category: 'blocks',
    command: (editor) => editor.chain().focus().toggleBulletList().run(),
    aliases: ['ul', 'unordered'],
  },
  {
    title: 'Numbered List',
    description: 'Create a numbered list',
    category: 'blocks',
    command: (editor) => editor.chain().focus().toggleOrderedList().run(),
    aliases: ['ol', 'ordered'],
  },
  {
    title: 'Blockquote',
    description: 'Create a quote block',
    category: 'blocks',
    command: (editor) => editor.chain().focus().toggleBlockquote().run(),
    aliases: ['quote'],
  },
  {
    title: 'Code Block',
    description: 'Insert a code block',
    category: 'blocks',
    command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    aliases: ['pre'],
  },
  // Color commands
  {
    title: 'Red Text',
    description: 'Apply red color to text',
    category: 'color',
    command: (editor) => editor.chain().focus().setColor('#dc2626').run(),
    aliases: ['red'],
  },
  {
    title: 'Green Text',
    description: 'Apply green color to text',
    category: 'color',
    command: (editor) => editor.chain().focus().setColor('#16a34a').run(),
    aliases: ['green'],
  },
  {
    title: 'Blue Text',
    description: 'Apply blue color to text',
    category: 'color',
    command: (editor) => editor.chain().focus().setColor('#2563eb').run(),
    aliases: ['blue'],
  },
  {
    title: 'Yellow Text',
    description: 'Apply yellow color to text',
    category: 'color',
    command: (editor) => editor.chain().focus().setColor('#ca8a04').run(),
    aliases: ['yellow'],
  },
  {
    title: 'Orange Text',
    description: 'Apply orange color to text',
    category: 'color',
    command: (editor) => editor.chain().focus().setColor('#ea580c').run(),
    aliases: ['orange'],
  },
  {
    title: 'Purple Text',
    description: 'Apply purple color to text',
    category: 'color',
    command: (editor) => editor.chain().focus().setColor('#9333ea').run(),
    aliases: ['purple'],
  },
  {
    title: 'Pink Text',
    description: 'Apply pink color to text',
    category: 'color',
    command: (editor) => editor.chain().focus().setColor('#db2777').run(),
    aliases: ['pink'],
  },
  {
    title: 'Gray Text',
    description: 'Apply gray color to text',
    category: 'color',
    command: (editor) => editor.chain().focus().setColor('#4b5563').run(),
    aliases: ['grey'],
  },
  {
    title: 'Clear Color',
    description: 'Remove text color',
    category: 'color',
    command: (editor) => editor.chain().focus().unsetColor().run(),
    aliases: ['clear'],
  },
  // Insert commands
  {
    title: 'Horizontal Rule',
    description: 'Insert a horizontal line',
    category: 'insert',
    command: (editor) => editor.chain().focus().setHorizontalRule().run(),
    aliases: ['hr', 'divider'],
  },
  {
    title: 'Hard Break',
    description: 'Insert a line break',
    category: 'insert',
    command: (editor) => editor.chain().focus().setHardBreak().run(),
    aliases: ['br', 'break'],
  },
];

export const slashCommand: Partial<SuggestionOptions> = {
  char: '/',
  command: ({ editor, range, props }) => {
    props.command(editor);
    editor.chain().focus().deleteRange(range).run();
  },
  items: ({ query }) => {
    return commandItems.filter((item) => {
      const searchTerm = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.aliases?.some((alias) => alias.toLowerCase().includes(searchTerm))
      );
    });
  },
  render: () => {
    let component: ReactRenderer;
    let popup: any;

    return {
      onStart: (props: any) => {
        component = new ReactRenderer(SlashCommandList, {
          props,
          editor: props.editor,
        });

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect as GetReferenceClientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
          theme: 'slash-command',
        });
      },

      onUpdate(props: any) {
        component.updateProps(props);

        popup[0].setProps({
          getReferenceClientRect: props.clientRect as GetReferenceClientRect,
        });
      },

      onKeyDown(props: any) {
        if (props.event.key === 'Escape') {
          popup[0].hide();
          return true;
        }

        return (component.ref as any)?.onKeyDown(props);
      },

      onExit() {
        popup[0].destroy();
        component.destroy();
      },
    };
  },
};
