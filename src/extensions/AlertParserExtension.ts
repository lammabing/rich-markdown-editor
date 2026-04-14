import { Extension } from '@tiptap/core';
import type { AlertType } from './AlertExtension';

/**
 * Extension that parses alert patterns from markdown content.
 * Converts patterns like "### Note\n\nContent" into Alert nodes.
 */
export const AlertParserExtension = Extension.create({
  name: 'alertParser',

  addStorage() {
    return {
      alertPatterns: [
        { title: 'NOTE', type: 'note' as AlertType },
        { title: 'TIP', type: 'tip' as AlertType },
        { title: 'WARNING', type: 'warning' as AlertType },
        { title: 'DANGER', type: 'danger' as AlertType },
        { title: 'INFO', type: 'info' as AlertType },
      ],
    };
  },

  onBeforeCreate() {
    const { alertPatterns } = this.storage;

    // Transform the content before it's parsed by TipTap
    const originalContent = this.editor.options.content;
    if (typeof originalContent === 'string') {
      let transformed = originalContent;

      for (const pattern of alertPatterns) {
        // Match patterns like "### NOTE" or "### 📝 NOTE" followed by content
        const regex = new RegExp(
          `###\\s+(?:[\\p{Emoji_Presentation}\\p{Extended_Pictographic}]\\s*)?${pattern.title}\\s*\n+([\\s\\S]*?)(?=\n###|<table|<hr|<div|<pre|<ul|<ol|$)`,
          'gi'
        );

        transformed = transformed.replace(regex, (match, content) => {
          const trimmedContent = content.trim();
          if (!trimmedContent) return match;

          // Create alert node HTML
          return `<div data-alert-type="${pattern.type}"><p>${trimmedContent}</p></div>`;
        });
      }

      this.editor.options.content = transformed;
    }
  },
});

export default AlertParserExtension;
