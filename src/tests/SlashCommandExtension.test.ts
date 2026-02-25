import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SlashCommandExtension } from '../extensions/SlashCommandExtension';

// Mock TipTap dependencies
vi.mock('@tiptap/core', () => ({
  Extension: {
    create: vi.fn((config) => config),
  },
}));

vi.mock('@tiptap/suggestion', () => ({
  default: vi.fn(),
}));

describe('SlashCommandExtension', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('has correct name', () => {
    expect(SlashCommandExtension.name).toBe('slashCommand');
  });

  it('has addOptions method', () => {
    expect(SlashCommandExtension.addOptions).toBeDefined();
    expect(typeof SlashCommandExtension.addOptions).toBe('function');
  });

  it('has addProseMirrorPlugins method', () => {
    expect(SlashCommandExtension.addProseMirrorPlugins).toBeDefined();
    expect(typeof SlashCommandExtension.addProseMirrorPlugins).toBe('function');
  });

  describe('addOptions', () => {
    it('returns default suggestion configuration', () => {
      const options = SlashCommandExtension.addOptions!();
      
      expect(options).toHaveProperty('suggestion');
      expect(options.suggestion).toHaveProperty('char', '/');
      expect(options.suggestion).toHaveProperty('command');
      expect(options.suggestion).toHaveProperty('items');
      expect(options.suggestion).toHaveProperty('render');
    });

    it('suggestion char is forward slash', () => {
      const options = SlashCommandExtension.addOptions!();
      expect(options.suggestion.char).toBe('/');
    });

    it('suggestion render returns required methods', () => {
      const options = SlashCommandExtension.addOptions!();
      const render = options.suggestion.render();
      
      expect(render).toHaveProperty('onStart');
      expect(render).toHaveProperty('onUpdate');
      expect(render).toHaveProperty('onKeyDown');
      expect(render).toHaveProperty('onExit');
    });
  });

  describe('addProseMirrorPlugins', () => {
    it('returns array with Suggestion plugin', () => {
      const mockThis = {
        editor: { mock: 'editor' },
        options: {
          suggestion: { char: '/', command: vi.fn(), items: vi.fn(), render: vi.fn() },
        },
      };

      const plugins = SlashCommandExtension.addProseMirrorPlugins!.call(mockThis as any);
      
      expect(Array.isArray(plugins)).toBe(true);
      expect(plugins.length).toBe(1);
    });
  });
});
