import { Node, mergeAttributes, nodePasteRule } from '@tiptap/core';
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
  const isBlock = node.attrs.displayMode;

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
    };
  }
}

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
      displayMode: {
        default: false,
        parseHTML: (element) => element.getAttribute('data-display-mode') === 'true',
        renderHTML: (attributes) => ({
          'data-display-mode': attributes.displayMode,
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
        tag: 'span[data-latex]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const latex = node.attrs.latex;
    const isBlock = node.attrs.displayMode;
    
    let renderedHtml = '';
    try {
      renderedHtml = katex.renderToString(latex, {
        displayMode: isBlock,
        throwOnError: false,
        errorColor: '#cc0000',
      });
    } catch (error) {
      renderedHtml = `<span style="color: #cc0000;">Invalid LaTeX: ${latex}</span>`;
    }
    
    return [
      'span',
      mergeAttributes(
        { 'data-latex': latex },
        { 'data-display-mode': isBlock },
        { class: isBlock ? 'math-block' : 'math-inline' },
        this.options.HTMLAttributes,
        HTMLAttributes
      ),
      {
        dangerouslySetInnerHTML: {
          __html: renderedHtml
        }
      }
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
          return commands.insertContent({
            type: this.name,
            attrs: {
              latex,
              displayMode,
            },
          });
        },
    };
  },

  addPasteRules() {
    return [
      nodePasteRule({
        find: /\$\$([\s\S]+?)\$\$/,
        type: this.type,
        getAttributes: (match) => ({
          latex: match[1],
          displayMode: true,
        }),
      }),
      nodePasteRule({
        find: /\$([^\s$]+?)\$/,
        type: this.type,
        getAttributes: (match) => ({
          latex: match[1],
          displayMode: false,
        }),
      }),
    ];
  },
});

export default MathExtension;
