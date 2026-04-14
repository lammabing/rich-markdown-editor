import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import DOMPurify from 'dompurify';

interface HTMLBlockNodeProps {
  node: any;
  selected: boolean;
  updateAttributes: (attrs: Record<string, any>) => void;
}

function HTMLBlockNodeComponent({ node, selected }: HTMLBlockNodeProps) {
  const htmlContent = node.attrs.htmlContent || '';

  const sanitizedHtml = DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: [
      'div', 'span', 'p', 'br', 'hr',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'strong', 'b', 'em', 'i', 'u', 's', 'strike',
      'a', 'img', 'video', 'audio',
      'blockquote', 'pre', 'code',
      'details', 'summary',
      'svg', 'path', 'circle', 'rect', 'line', 'polyline', 'polygon',
    ],
    ALLOWED_ATTR: [
      'href', 'src', 'alt', 'title', 'width', 'height',
      'class', 'id', 'style', 'target', 'rel',
      'controls', 'autoplay', 'loop', 'muted',
      'open', 'colspan', 'rowspan',
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.]+(?:[^a-z+.:]|$))/i,
  });

  return (
    <NodeViewWrapper
      as="div"
      className="html-block-node"
      contentEditable={false}
      style={{
        border: selected ? '2px solid #3b82f6' : '1px solid #e5e7eb',
        borderRadius: '6px',
        padding: '1em',
        margin: '1em 0',
        backgroundColor: selected ? '#f0f7ff' : '#fafbfc',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          fontSize: '0.625em',
          color: '#6b7280',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontWeight: '600',
        }}
      >
        HTML
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        style={{
          marginTop: '1em',
        }}
      />
    </NodeViewWrapper>
  );
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    htmlBlock: {
      insertHTMLBlock: (props: { htmlContent: string }) => ReturnType;
    };
  }
}

export const HTMLBlockExtension = Node.create({
  name: 'htmlBlock',

  group: 'block',

  selectable: true,

  atom: true,

  addAttributes() {
    return {
      htmlContent: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-html-content') || '',
        renderHTML: (attributes) => ({
          'data-html-content': attributes.htmlContent,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-html-block]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(
        { 'data-html-block': '' },
        { 'data-html-content': node.attrs.htmlContent },
        HTMLAttributes
      ),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(HTMLBlockNodeComponent);
  },

  addCommands() {
    return {
      insertHTMLBlock:
        ({ htmlContent }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              htmlContent,
            },
          });
        },
    };
  },
});

export default HTMLBlockExtension;
