import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { useState } from 'react';

interface EmojiNodeProps {
  node: any;
  selected: boolean;
  updateAttributes: (attrs: Record<string, any>) => void;
}

// Common emoji list for quick selection
const commonEmojis = [
  '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂',
  '🙂', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗',
  '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭',
  '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏',
  '👍', '👎', '👏', '🙌', '🙏', '💪', '🎉', '🔥',
  '❤️', '💔', '💯', '✨', '⭐', '🌟', '💡', '✅',
];

function EmojiNodeComponent({ node, selected, updateAttributes }: EmojiNodeProps) {
  const [showPicker, setShowPicker] = useState(false);

  const emoji = node.attrs.emoji || '😀';

  const onEmojiSelect = (newEmoji: string) => {
    updateAttributes({ emoji: newEmoji });
    setShowPicker(false);
  };

  return (
    <NodeViewWrapper
      as="span"
      className="emoji-node"
      contentEditable={false}
      style={{
        display: 'inline-block',
        position: 'relative',
      }}
    >
      <span
        onClick={() => setShowPicker(!showPicker)}
        style={{
          cursor: 'pointer',
          fontSize: '1.5em',
          lineHeight: 1,
          padding: '2px 4px',
          borderRadius: '4px',
          backgroundColor: selected ? '#e8f0fe' : 'transparent',
          display: 'inline-block',
        }}
        title="Click to change emoji"
      >
        {emoji}
      </span>
      {/* Hidden span to store emoji data for HTML serialization */}
      <span style={{ display: 'none' }} data-emoji-value={emoji} />
      {showPicker && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            zIndex: 1000,
            marginTop: '4px',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: '4px',
            maxWidth: '300px',
          }}
        >
          {commonEmojis.map((emojiOption) => (
            <button
              key={emojiOption}
              onClick={() => onEmojiSelect(emojiOption)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1.25em',
                padding: '4px',
                borderRadius: '4px',
                transition: 'background-color 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {emojiOption}
            </button>
          ))}
        </div>
      )}
    </NodeViewWrapper>
  );
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    emoji: {
      insertEmoji: (props: { emoji: string }) => ReturnType;
    };
  }
}

export const EmojiExtension = Node.create({
  name: 'emoji',

  group: 'inline',

  inline: true,

  atom: true,

  selectable: true,

  addAttributes() {
    return {
      emoji: {
        default: '😀',
        parseHTML: (element) => element.getAttribute('data-emoji') || element.textContent || '😀',
        renderHTML: (attributes) => ({
          'data-emoji': attributes.emoji,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-emoji]',
      },
      {
        tag: 'span.emoji',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(
        { 'data-emoji': node.attrs.emoji },
        { class: 'emoji' },
        HTMLAttributes
      ),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(EmojiNodeComponent);
  },

  addCommands() {
    return {
      insertEmoji:
        ({ emoji }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              emoji,
            },
          });
        },
    };
  },
});

export default EmojiExtension;
