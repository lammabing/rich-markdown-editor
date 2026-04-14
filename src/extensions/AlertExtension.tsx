import { Node, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';

export type AlertType = 'note' | 'tip' | 'warning' | 'danger' | 'info';

interface AlertNodeProps {
  node: any;
  selected: boolean;
  updateAttributes: (attrs: Record<string, any>) => void;
}

const alertConfig: Record<AlertType, { icon: string; title: string; color: string; bg: string; border: string }> = {
  note: {
    icon: '📝',
    title: 'Note',
    color: '#1e40af',
    bg: '#dbeafe',
    border: '#3b82f6',
  },
  tip: {
    icon: '💡',
    title: 'Tip',
    color: '#166534',
    bg: '#dcfce7',
    border: '#22c55e',
  },
  warning: {
    icon: '⚠️',
    title: 'Warning',
    color: '#854d0e',
    bg: '#fef9c3',
    border: '#eab308',
  },
  danger: {
    icon: '🚨',
    title: 'Danger',
    color: '#991b1b',
    bg: '#fee2e2',
    border: '#ef4444',
  },
  info: {
    icon: 'ℹ️',
    title: 'Info',
    color: '#0e7490',
    bg: '#cffafe',
    border: '#06b6d4',
  },
};

function AlertNodeComponent({ node, selected }: AlertNodeProps) {
  const alertType: AlertType = node.attrs.alertType || 'note';
  const config = alertConfig[alertType];

  return (
    <NodeViewWrapper
      as="div"
      className={`alert-node alert-${alertType}`}
      style={{
        backgroundColor: selected ? '#e8f0fe' : config.bg,
        borderLeft: `4px solid ${config.border}`,
        borderRadius: '6px',
        padding: '1em',
        margin: '1em 0',
        boxShadow: selected ? '0 0 0 2px #3b82f6' : 'none',
        transition: 'box-shadow 0.2s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5em',
          marginBottom: '0.5em',
          fontWeight: '600',
          color: config.color,
          fontSize: '0.875em',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        <span>{config.icon}</span>
        <span>{config.title}</span>
      </div>
      <div
        contentEditable
        suppressContentEditableWarning
        style={{
          color: config.color,
          lineHeight: '1.6',
        }}
      />
    </NodeViewWrapper>
  );
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    alert: {
      insertAlert: (props: { alertType?: AlertType }) => ReturnType;
      setAlertType: (props: { alertType: AlertType }) => ReturnType;
    };
  }
}

export const AlertExtension = Node.create({
  name: 'alert',

  group: 'block',

  content: 'block+',

  addAttributes() {
    return {
      alertType: {
        default: 'note',
        parseHTML: (element) => element.getAttribute('data-alert-type') as AlertType,
        renderHTML: (attributes) => ({
          'data-alert-type': attributes.alertType,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-alert-type]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(
        { 'data-alert-type': node.attrs.alertType },
        HTMLAttributes
      ),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(AlertNodeComponent);
  },

  addCommands() {
    return {
      insertAlert:
        ({ alertType = 'note' }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              alertType,
            },
            content: [{ type: 'paragraph' }],
          });
        },
      setAlertType:
        ({ alertType }) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, { alertType });
        },
    };
  },
});

export default AlertExtension;
