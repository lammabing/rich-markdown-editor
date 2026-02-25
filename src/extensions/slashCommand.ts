import { ReactRenderer } from '@tiptap/react';
import type { SuggestionOptions } from '@tiptap/suggestion';
import tippy from 'tippy.js';
import type { GetReferenceClientRect } from 'tippy.js';
import { SlashCommandList } from '../components/SlashCommand/SlashCommandList';

export interface CommandItem {
  title: string;
  description: string;
  category: 'format' | 'blocks' | 'color' | 'insert' | 'math' | 'markup';
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
    title: 'Task List',
    description: 'Create a task list with checkboxes',
    category: 'blocks',
    command: (editor) => editor.chain().focus().toggleTaskList().run(),
    aliases: ['todo', 'checkbox', 'task'],
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
    description: 'Insert a code block with syntax highlighting',
    category: 'blocks',
    command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    aliases: ['pre', 'code'],
  },
  // Table commands
  {
    title: 'Table',
    description: 'Insert a table',
    category: 'blocks',
    command: (editor) => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    aliases: ['table'],
  },
  {
    title: 'Add Column Right',
    description: 'Add column to the right',
    category: 'blocks',
    command: (editor) => editor.chain().focus().addColumnRight().run(),
    aliases: ['column-right'],
  },
  {
    title: 'Add Column Left',
    description: 'Add column to the left',
    category: 'blocks',
    command: (editor) => editor.chain().focus().addColumnLeft().run(),
    aliases: ['column-left'],
  },
  {
    title: 'Add Row Above',
    description: 'Add row above',
    category: 'blocks',
    command: (editor) => editor.chain().focus().addRowAbove().run(),
    aliases: ['row-above'],
  },
  {
    title: 'Add Row Below',
    description: 'Add row below',
    category: 'blocks',
    command: (editor) => editor.chain().focus().addRowBelow().run(),
    aliases: ['row-below'],
  },
  {
    title: 'Delete Table',
    description: 'Delete the table',
    category: 'blocks',
    command: (editor) => editor.chain().focus().deleteTable().run(),
    aliases: ['delete-table'],
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
  // Math commands
  {
    title: 'Inline Math',
    description: 'Insert inline LaTeX equation',
    category: 'math',
    command: (editor) => editor.chain().focus().insertMath({ latex: 'x^2', displayMode: false }).run(),
    aliases: ['math', 'equation', 'latex', 'formula'],
  },
  {
    title: 'Block Math',
    description: 'Insert block LaTeX equation',
    category: 'math',
    command: (editor) => editor.chain().focus().insertMath({ latex: 'E = mc^2', displayMode: true }).run(),
    aliases: ['display-math', 'block-equation'],
  },
  // Markup commands
  {
    title: 'Highlight',
    description: 'Highlight text with background color',
    category: 'markup',
    command: (editor) => editor.chain().focus().toggleHighlight().run(),
    aliases: ['mark'],
  },
  {
    title: 'Deletion',
    description: 'Mark text as deleted (strikethrough)',
    category: 'markup',
    command: (editor) => editor.chain().focus().toggleCriticDeletion().run(),
    aliases: ['delete', 'remove'],
  },
  {
    title: 'Insertion',
    description: 'Mark text as inserted',
    category: 'markup',
    command: (editor) => editor.chain().focus().toggleCriticInsertion().run(),
    aliases: ['add', 'insert'],
  },
  {
    title: 'Footnote',
    description: 'Insert footnote reference',
    category: 'markup',
    command: (editor) => editor.chain().focus().insertFootnote({ id: '1', label: '1' }).run(),
    aliases: ['note', 'reference'],
  },
  // Alert/Callout commands
  {
    title: 'Note',
    description: 'Insert a note callout',
    category: 'blocks',
    command: (editor) => editor.chain().focus().insertAlert({ alertType: 'note' }).run(),
    aliases: ['callout', 'alert-note'],
  },
  {
    title: 'Tip',
    description: 'Insert a tip callout',
    category: 'blocks',
    command: (editor) => editor.chain().focus().insertAlert({ alertType: 'tip' }).run(),
    aliases: ['hint', 'alert-tip'],
  },
  {
    title: 'Warning',
    description: 'Insert a warning callout',
    category: 'blocks',
    command: (editor) => editor.chain().focus().insertAlert({ alertType: 'warning' }).run(),
    aliases: ['caution', 'alert-warning'],
  },
  {
    title: 'Danger',
    description: 'Insert a danger callout',
    category: 'blocks',
    command: (editor) => editor.chain().focus().insertAlert({ alertType: 'danger' }).run(),
    aliases: ['error', 'alert-danger'],
  },
  {
    title: 'Info',
    description: 'Insert an info callout',
    category: 'blocks',
    command: (editor) => editor.chain().focus().insertAlert({ alertType: 'info' }).run(),
    aliases: ['information', 'alert-info'],
  },
  // Emoji commands
  {
    title: 'Emoji',
    description: 'Insert an emoji',
    category: 'insert',
    command: (editor) => editor.chain().focus().insertEmoji({ emoji: '😀' }).run(),
    aliases: ['emoticon', 'smile'],
  },
  // HTML commands
  {
    title: 'HTML Block',
    description: 'Insert custom HTML block',
    category: 'blocks',
    command: (editor) => editor.chain().focus().insertHTMLBlock({ htmlContent: '<p>Your HTML here</p>' }).run(),
    aliases: ['html', 'custom-html'],
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
