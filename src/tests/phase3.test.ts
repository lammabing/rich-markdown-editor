import { describe, it, expect, vi } from 'vitest';
import { commandItems, slashCommand } from '../extensions/slashCommand';

describe('Phase 3: Math Commands', () => {
  it('has inline math command', () => {
    const inlineMath = commandItems.find(c => c.title === 'Inline Math');

    expect(inlineMath).toBeDefined();
    expect(inlineMath?.category).toBe('math');
    expect(inlineMath?.aliases).toEqual(
      expect.arrayContaining(['math', 'equation', 'latex', 'formula'])
    );
  });

  it('has block math command', () => {
    const blockMath = commandItems.find(c => c.title === 'Block Math');

    expect(blockMath).toBeDefined();
    expect(blockMath?.category).toBe('math');
    expect(blockMath?.aliases).toEqual(
      expect.arrayContaining(['display-math', 'block-equation'])
    );
  });

  it('inline math command inserts math with displayMode false', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      insertMath: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const inlineMath = commandItems.find(c => c.title === 'Inline Math');
    inlineMath?.command(mockEditor as any);

    expect(mockEditor.insertMath).toHaveBeenCalledWith({
      latex: 'x^2',
      displayMode: false,
    });
  });

  it('block math command inserts math with displayMode true', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      insertMath: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const blockMath = commandItems.find(c => c.title === 'Block Math');
    blockMath?.command(mockEditor as any);

    expect(mockEditor.insertMath).toHaveBeenCalledWith({
      latex: 'E = mc^2',
      displayMode: true,
    });
  });
});

describe('Phase 3: Highlight Command', () => {
  it('has highlight command', () => {
    const highlight = commandItems.find(c => c.title === 'Highlight');

    expect(highlight).toBeDefined();
    expect(highlight?.category).toBe('markup');
    expect(highlight?.aliases).toContain('mark');
  });

  it('highlight command toggles highlight', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      toggleHighlight: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const highlight = commandItems.find(c => c.title === 'Highlight');
    highlight?.command(mockEditor as any);

    expect(mockEditor.toggleHighlight).toHaveBeenCalled();
  });

  it('highlight has proper description', () => {
    const highlight = commandItems.find(c => c.title === 'Highlight');

    expect(highlight?.description).toBe('Highlight text with background color');
  });
});

describe('Phase 3: CriticMarkup Commands', () => {
  it('has deletion command', () => {
    const deletion = commandItems.find(c => c.title === 'Deletion');

    expect(deletion).toBeDefined();
    expect(deletion?.category).toBe('markup');
    expect(deletion?.aliases).toEqual(
      expect.arrayContaining(['delete', 'remove'])
    );
  });

  it('has insertion command', () => {
    const insertion = commandItems.find(c => c.title === 'Insertion');

    expect(insertion).toBeDefined();
    expect(insertion?.category).toBe('markup');
    expect(insertion?.aliases).toEqual(
      expect.arrayContaining(['add', 'insert'])
    );
  });

  it('deletion command toggles critic deletion', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      toggleCriticDeletion: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const deletion = commandItems.find(c => c.title === 'Deletion');
    deletion?.command(mockEditor as any);

    expect(mockEditor.toggleCriticDeletion).toHaveBeenCalled();
  });

  it('insertion command toggles critic insertion', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      toggleCriticInsertion: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const insertion = commandItems.find(c => c.title === 'Insertion');
    insertion?.command(mockEditor as any);

    expect(mockEditor.toggleCriticInsertion).toHaveBeenCalled();
  });
});

describe('Phase 3: Footnote Command', () => {
  it('has footnote command', () => {
    const footnote = commandItems.find(c => c.title === 'Footnote');

    expect(footnote).toBeDefined();
    expect(footnote?.category).toBe('markup');
    expect(footnote?.aliases).toEqual(
      expect.arrayContaining(['note', 'reference'])
    );
  });

  it('footnote command inserts footnote reference', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      insertFootnote: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const footnote = commandItems.find(c => c.title === 'Footnote');
    footnote?.command(mockEditor as any);

    expect(mockEditor.insertFootnote).toHaveBeenCalledWith({
      id: '1',
      label: '1',
    });
  });

  it('footnote has proper description', () => {
    const footnote = commandItems.find(c => c.title === 'Footnote');

    expect(footnote?.description).toBe('Insert footnote reference');
  });
});

describe('Phase 3: Slash Command Filtering', () => {
  const mockEditor = { state: {}, commands: {} } as any;

  it('filters math commands', () => {
    const result = slashCommand.items?.({ query: 'math', editor: mockEditor });

    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.length).toBeGreaterThan(0);
    expect(items.some(item => item.title === 'Inline Math')).toBe(true);
    expect(items.some(item => item.title === 'Block Math')).toBe(true);
  });

  it('filters by latex alias', () => {
    const result = slashCommand.items?.({ query: 'latex', editor: mockEditor });

    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.length).toBeGreaterThan(0);
    expect(items.some(item => item.title === 'Inline Math')).toBe(true);
  });

  it('filters highlight command', () => {
    const result = slashCommand.items?.({ query: 'highlight', editor: mockEditor });

    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.length).toBeGreaterThan(0);
    expect(items.some(item => item.title === 'Highlight')).toBe(true);
  });

  it('filters by mark alias', () => {
    const result = slashCommand.items?.({ query: 'mark', editor: mockEditor });

    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.length).toBeGreaterThan(0);
    expect(items.some(item => item.title === 'Highlight')).toBe(true);
  });

  it('filters deletion command', () => {
    const result = slashCommand.items?.({ query: 'deletion', editor: mockEditor });

    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.some(item => item.title === 'Deletion')).toBe(true);
  });

  it('filters insertion command', () => {
    const result = slashCommand.items?.({ query: 'insertion', editor: mockEditor });

    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.some(item => item.title === 'Insertion')).toBe(true);
  });

  it('filters footnote command', () => {
    const result = slashCommand.items?.({ query: 'footnote', editor: mockEditor });

    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.some(item => item.title === 'Footnote')).toBe(true);
  });

  it('filters by note alias', () => {
    const result = slashCommand.items?.({ query: 'note', editor: mockEditor });

    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.some(item => item.title === 'Footnote')).toBe(true);
  });
});

describe('Phase 3: Command Categories', () => {
  it('has math category commands', () => {
    const mathCommands = commandItems.filter(c => c.category === 'math');

    expect(mathCommands.length).toBe(2);
    expect(mathCommands.map(c => c.title)).toEqual(
      expect.arrayContaining(['Inline Math', 'Block Math'])
    );
  });

  it('has markup category commands', () => {
    const markupCommands = commandItems.filter(c => c.category === 'markup');

    expect(markupCommands.length).toBe(4);
    expect(markupCommands.map(c => c.title)).toEqual(
      expect.arrayContaining(['Highlight', 'Deletion', 'Insertion', 'Footnote'])
    );
  });

  it('all Phase 3 commands have required properties', () => {
    const phase3Commands = commandItems.filter(
      c => c.category === 'math' || c.category === 'markup'
    );

    phase3Commands.forEach(command => {
      expect(command).toHaveProperty('title');
      expect(command).toHaveProperty('description');
      expect(command).toHaveProperty('category');
      expect(command).toHaveProperty('command');
      expect(typeof command.command).toBe('function');
    });
  });
});
