import { Node, mergeAttributes, nodeInputRule, nodePasteRule } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer, type ReactNodeViewProps } from '@tiptap/react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export interface MathOptions {
  HTMLAttributes: Record<string, any>;
  katexOptions: katex.KatexOptions;
}

function MathComponent(props: ReactNodeViewProps) {
  const { node, selected } = props;
  const latex = node.attrs.latex;
  const isBlock = node.type.name === 'blockMath';

  const renderMath = () => {
    try {
      return katex.renderToString(latex, {
        displayMode: isBlock,
        throwOnError: false,
        errorColor: '#cc0000',
      });
    } catch (error) {
      return `<span style="color: #cc0000;">Invalid LaTeX: ${latex}</span>`;
    }
  };

  return (
    <NodeViewWrapper
      as="span"
      className={`math-node ${isBlock ? 'math-block' : 'math-inline'}`}
      contentEditable={false}
    >
      <span
        dangerouslySetInnerHTML={{ __html: renderMath() }}
        onClick={() => {
          // Could open editor for latex on click
        }}
        style={{
          cursor: 'pointer',
          padding: isBlock ? '0.5em' : '0',
          borderRadius: '4px',
          backgroundColor: selected ? '#e8f0fe' : 'transparent',
        }}
      />
    </NodeViewWrapper>
  );
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    math: {
      insertMath: (props: { latex: string; displayMode?: boolean }) => ReturnType;
      insertBlockMath: (props: { latex: string }) => ReturnType;
    };
  }
}

// Inline Math Extension ($...$)
export const MathExtension = Node.create<MathOptions>({
  name: 'math',

  addOptions() {
    return {
      HTMLAttributes: {},
      katexOptions: {
        displayMode: false,
        throwOnError: false,
      },
    };
  },

  addAttributes() {
    return {
      latex: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-latex'),
        renderHTML: (attributes) => ({
          'data-latex': attributes.latex,
        }),
      },
    };
  },

  group: 'inline',

  inline: true,

  atom: true,

  selectable: true,

  parseHTML() {
    return [
      {
        tag: 'span[data-latex]:not([data-display-mode])',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(
        { 'data-latex': node.attrs.latex },
        { class: 'math-inline' },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathComponent);
  },

  addCommands() {
    return {
      insertMath:
        ({ latex, displayMode = false }) =>
        ({ commands }) => {
          if (displayMode) {
            return commands.insertContent({
              type: 'blockMath',
              attrs: { latex },
            });
          }
          return commands.insertContent({
            type: this.name,
            attrs: { latex },
          });
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: /\$([^$\s][^$]*?[^$\s]?)\$$/,
        type: this.type,
        getAttributes: (match) => ({
          latex: match[1],
        }),
      }),
    ];
  },

  addPasteRules() {
    return [
      nodePasteRule({
        find: /\$([^$\s][^$]*?[^$\s]?)\$/g,
        type: this.type,
        getAttributes: (match) => ({
          latex: match[1],
        }),
      }),
    ];
  },
});

// Block Math Extension ($$...$$)
export const BlockMathExtension = Node.create<MathOptions>({
  name: 'blockMath',

  addOptions() {
    return {
      HTMLAttributes: {},
      katexOptions: {
        displayMode: true,
        throwOnError: false,
      },
    };
  },

  addAttributes() {
    return {
      latex: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-latex'),
        renderHTML: (attributes) => ({
          'data-latex': attributes.latex,
        }),
      },
    };
  },

  group: 'block',

  atom: true,

  selectable: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-latex][data-display-mode="true"]',
      },
      {
        tag: 'div[data-latex]',
        getAttrs: (element) => {
          const displayMode = element.getAttribute('data-display-mode');
          if (displayMode === 'true') {
            return null;
          }
          return false;
        },
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(
        { 'data-latex': node.attrs.latex },
        { 'data-display-mode': 'true' },
        { class: 'math-block' },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(MathComponent);
  },

  addCommands() {
    return {
      insertBlockMath:
        ({ latex }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { latex },
          });
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: /^\$\$([^$]*?)\$\$\s$/,
        type: this.type,
        getAttributes: (match) => ({
          latex: match[1],
        }),
      }),
    ];
  },

  addPasteRules() {
    return [
      nodePasteRule({
        find: /\$\$([^$]*?)\$\$/g,
        type: this.type,
        getAttributes: (match) => ({
          latex: match[1],
        }),
      }),
    ];
  },
});

export default MathExtension;
