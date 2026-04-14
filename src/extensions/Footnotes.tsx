import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { useState } from 'react';

interface FootnoteNodeProps {
  node: any;
  selected: boolean;
  updateAttributes: (attrs: Record<string, any>) => void;
}

function FootnoteNodeComponent({ node, selected }: FootnoteNodeProps) {
  const [hovered, setHovered] = useState(false);
  const footnoteId = node.attrs.footnoteId;
  const footnoteLabel = node.attrs.footnoteLabel || footnoteId;

  return (
    <NodeViewWrapper
      as="span"
      className="footnote-ref"
      contentEditable={false}
      style={{
        backgroundColor: selected || hovered ? '#e8f0fe' : 'transparent',
        borderRadius: '4px',
        padding: '2px 4px',
        display: 'inline-block',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <sup
        style={{
          cursor: 'pointer',
          color: '#0366d6',
          fontWeight: hovered ? 'bold' : 'normal',
        }}
      >
        [{footnoteLabel}]
      </sup>
      {/* Hidden span to store footnote data for HTML serialization */}
      <span style={{ display: 'none' }} data-footnote-id={footnoteId} data-footnote-label={footnoteLabel} />
    </NodeViewWrapper>
  );
}

function FootnoteDefinitionComponent({ node, selected }: FootnoteNodeProps) {
  const footnoteId = node.attrs.footnoteId;
  const contentRef = (element: HTMLDivElement | null) => {
    if (element && !element.hasChildNodes()) {
      element.setAttribute('data-placeholder', 'Footnote content...');
    }
  };

  return (
    <NodeViewWrapper
      as="div"
      className="footnote-definition"
      style={{
        backgroundColor: selected ? '#e8f0fe' : 'transparent',
        padding: '4px',
        borderRadius: '4px',
        marginTop: '0.5em',
        marginLeft: '1em',
        fontSize: '0.875em',
        color: '#666',
      }}
    >
      <sup style={{ color: '#0366d6', marginRight: '0.5em', cursor: 'pointer' }}>[{footnoteId}]</sup>
      <div contentEditable={true} suppressContentEditableWarning ref={contentRef} />
    </NodeViewWrapper>
  );
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    footnote: {
      insertFootnote: (props: { id: string; label?: string }) => ReturnType;
      insertFootnoteDefinition: (props: { id: string; content?: string }) => ReturnType;
    };
  }
}

export const FootnoteReference = Node.create({
  name: 'footnoteReference',

  addAttributes() {
    return {
      footnoteId: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-footnote-id'),
        renderHTML: (attributes) => ({
          'data-footnote-id': attributes.footnoteId,
        }),
      },
      footnoteLabel: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-footnote-label'),
        renderHTML: (attributes) => ({
          'data-footnote-label': attributes.footnoteLabel,
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
        tag: 'sup[data-footnote-id]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'sup',
      mergeAttributes(
        { 'data-footnote-id': node.attrs.footnoteId },
        { 'data-footnote-label': node.attrs.footnoteLabel },
        HTMLAttributes
      ),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(FootnoteNodeComponent);
  },

  addCommands() {
    return {
      insertFootnote:
        ({ id, label }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              footnoteId: id,
              footnoteLabel: label || id,
            },
          });
        },
    };
  },
});

export const FootnoteDefinition = Node.create({
  name: 'footnoteDefinition',

  content: 'block+',

  addAttributes() {
    return {
      footnoteId: {
        default: '',
        parseHTML: (element) => element.getAttribute('data-footnote-id'),
        renderHTML: (attributes) => ({
          'data-footnote-id': attributes.footnoteId,
        }),
      },
    };
  },

  group: 'block',

  parseHTML() {
    return [
      {
        tag: 'div[data-footnote-definition]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(
        { 'data-footnote-id': node.attrs.footnoteId },
        { 'data-footnote-definition': '' },
        HTMLAttributes
      ),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(FootnoteDefinitionComponent);
  },

  addCommands() {
    return {
      insertFootnoteDefinition:
        ({ id, content }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              footnoteId: id,
              footnoteContent: content || '',
            },
            content: content ? [{ type: 'text', text: content }] : [],
          });
        },
    };
  },
});

export default {
  FootnoteReference,
  FootnoteDefinition,
};
