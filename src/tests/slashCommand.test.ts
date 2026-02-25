import { describe, it, expect, vi } from 'vitest';
import { commandItems, slashCommand } from '../extensions/slashCommand';

describe('commandItems', () => {
  it('contains format commands', () => {
    const formatCommands = commandItems.filter(item => item.category === 'format');
    
    expect(formatCommands.length).toBeGreaterThan(0);
    expect(formatCommands.map(c => c.title)).toEqual(
      expect.arrayContaining(['Bold', 'Italic', 'Strike', 'Underline'])
    );
  });

  it('contains block commands', () => {
    const blockCommands = commandItems.filter(item => item.category === 'blocks');
    
    expect(blockCommands.length).toBeGreaterThan(0);
    expect(blockCommands.map(c => c.title)).toEqual(
      expect.arrayContaining([
        'Heading 1',
        'Heading 2',
        'Heading 3',
        'Bullet List',
        'Numbered List',
        'Blockquote',
        'Code Block',
      ])
    );
  });

  it('contains color commands', () => {
    const colorCommands = commandItems.filter(item => item.category === 'color');
    
    expect(colorCommands.length).toBeGreaterThan(0);
    expect(colorCommands.map(c => c.title)).toEqual(
      expect.arrayContaining([
        'Red Text',
        'Green Text',
        'Blue Text',
        'Yellow Text',
        'Orange Text',
        'Purple Text',
        'Pink Text',
        'Gray Text',
        'Clear Color',
      ])
    );
  });

  it('contains insert commands', () => {
    const insertCommands = commandItems.filter(item => item.category === 'insert');
    
    expect(insertCommands.length).toBeGreaterThan(0);
    expect(insertCommands.map(c => c.title)).toEqual(
      expect.arrayContaining(['Horizontal Rule', 'Hard Break'])
    );
  });

  it('each command has required properties', () => {
    commandItems.forEach(command => {
      expect(command).toHaveProperty('title');
      expect(command).toHaveProperty('description');
      expect(command).toHaveProperty('category');
      expect(command).toHaveProperty('command');
      expect(typeof command.command).toBe('function');
    });
  });

  it('commands have valid category values', () => {
    const validCategories = ['format', 'blocks', 'color', 'insert'];
    
    commandItems.forEach(command => {
      expect(validCategories).toContain(command.category);
    });
  });

  it('color commands have aliases for color names', () => {
    const redCommand = commandItems.find(c => c.title === 'Red Text');
    const greenCommand = commandItems.find(c => c.title === 'Green Text');
    const blueCommand = commandItems.find(c => c.title === 'Blue Text');

    expect(redCommand?.aliases).toContain('red');
    expect(greenCommand?.aliases).toContain('green');
    expect(blueCommand?.aliases).toContain('blue');
  });

  it('heading commands have h1, h2, h3 aliases', () => {
    const h1Command = commandItems.find(c => c.title === 'Heading 1');
    const h2Command = commandItems.find(c => c.title === 'Heading 2');
    const h3Command = commandItems.find(c => c.title === 'Heading 3');

    expect(h1Command?.aliases).toContain('h1');
    expect(h2Command?.aliases).toContain('h2');
    expect(h3Command?.aliases).toContain('h3');
  });
});

describe('slashCommand configuration', () => {
  const mockEditor = { state: {}, commands: {} } as any;

  it('has correct char trigger', () => {
    expect(slashCommand.char).toBe('/');
  });

  it('has command function', () => {
    expect(slashCommand.command).toBeDefined();
    expect(typeof slashCommand.command).toBe('function');
  });

  it('has items function', () => {
    expect(slashCommand.items).toBeDefined();
    expect(typeof slashCommand.items).toBe('function');
  });

  it('has render function', () => {
    expect(slashCommand.render).toBeDefined();
    expect(typeof slashCommand.render).toBe('function');
  });

  describe('items filter', () => {
    it('returns all items when query is empty', () => {
      const result = slashCommand.items?.({ query: '', editor: mockEditor });
      expect(result).toBeDefined();
      const items = result as any[];
      expect(items.length).toBe(commandItems.length);
    });

    it('filters items by title', () => {
      const result = slashCommand.items?.({ query: 'bold', editor: mockEditor });
      
      expect(result).toBeDefined();
      const items = result as any[];
      expect(items.length).toBeGreaterThan(0);
      items.forEach(item => {
        expect(item.title.toLowerCase()).toContain('bold');
      });
    });

    it('filters items by description', () => {
      const result = slashCommand.items?.({ query: 'color', editor: mockEditor });
      
      expect(result).toBeDefined();
      const items = result as any[];
      expect(items.length).toBeGreaterThan(0);
      items.forEach(item => {
        expect(
          item.title.toLowerCase().includes('color') ||
          item.description.toLowerCase().includes('color')
        ).toBe(true);
      });
    });

    it('filters items by aliases', () => {
      const result = slashCommand.items?.({ query: 'red', editor: mockEditor });
      
      expect(result).toBeDefined();
      const items = result as any[];
      expect(items.length).toBeGreaterThan(0);
      expect(items.some(item => item.title === 'Red Text')).toBe(true);
    });

    it('is case insensitive', () => {
      const result = slashCommand.items?.({ query: 'BOLD', editor: mockEditor });
      
      expect(result).toBeDefined();
      const items = result as any[];
      expect(items.length).toBeGreaterThan(0);
      expect(items.some(item => item.title === 'Bold')).toBe(true);
    });

    it('returns empty array when no matches found', () => {
      const result = slashCommand.items?.({ query: 'xyznonexistent', editor: mockEditor });
      expect(result).toBeDefined();
      const items = result as any[];
      expect(items.length).toBe(0);
    });
  });

  describe('command execution', () => {
    it('command function calls props.command with editor', () => {
      const mockEditorInner = {
        chain: vi.fn().mockReturnThis(),
        focus: vi.fn().mockReturnThis(),
        deleteRange: vi.fn().mockReturnThis(),
        run: vi.fn(),
      };
      const mockProps = {
        command: vi.fn(),
      };
      const mockRange = { from: 0, to: 5 };

      slashCommand.command!({ 
        editor: mockEditorInner as any, 
        range: mockRange as any, 
        props: mockProps as any 
      });

      expect(mockProps.command).toHaveBeenCalled();
      expect(mockEditorInner.chain).toHaveBeenCalled();
      expect(mockEditorInner.focus).toHaveBeenCalled();
      expect(mockEditorInner.deleteRange).toHaveBeenCalledWith(mockRange);
      expect(mockEditorInner.run).toHaveBeenCalled();
    });
  });
});
