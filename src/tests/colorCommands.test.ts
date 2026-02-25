import { describe, it, expect, vi } from 'vitest';
import { commandItems } from '../extensions/slashCommand';

describe('Color Commands Integration', () => {
  const colorCommands = commandItems.filter(item => item.category === 'color');

  it('has all required color commands', () => {
    const colorTitles = colorCommands.map(c => c.title);
    
    const expectedColors = [
      'Red Text',
      'Green Text',
      'Blue Text',
      'Yellow Text',
      'Orange Text',
      'Purple Text',
      'Pink Text',
      'Gray Text',
      'Clear Color',
    ];

    expectedColors.forEach(color => {
      expect(colorTitles).toContain(color);
    });
  });

  it('red command applies correct color', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      setColor: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const redCommand = colorCommands.find(c => c.title === 'Red Text');
    redCommand?.command(mockEditor as any);

    expect(mockEditor.chain).toHaveBeenCalled();
    expect(mockEditor.focus).toHaveBeenCalled();
    expect(mockEditor.setColor).toHaveBeenCalledWith('#dc2626');
    expect(mockEditor.run).toHaveBeenCalled();
  });

  it('green command applies correct color', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      setColor: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const greenCommand = colorCommands.find(c => c.title === 'Green Text');
    greenCommand?.command(mockEditor as any);

    expect(mockEditor.setColor).toHaveBeenCalledWith('#16a34a');
  });

  it('blue command applies correct color', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      setColor: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const blueCommand = colorCommands.find(c => c.title === 'Blue Text');
    blueCommand?.command(mockEditor as any);

    expect(mockEditor.setColor).toHaveBeenCalledWith('#2563eb');
  });

  it('clear color command unsets color', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      unsetColor: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const clearCommand = colorCommands.find(c => c.title === 'Clear Color');
    clearCommand?.command(mockEditor as any);

    expect(mockEditor.unsetColor).toHaveBeenCalled();
  });

  it('all color commands follow same chain pattern', () => {
    colorCommands.forEach(command => {
      const mockEditor = {
        chain: vi.fn().mockReturnThis(),
        focus: vi.fn().mockReturnThis(),
        setColor: vi.fn().mockReturnThis(),
        unsetColor: vi.fn().mockReturnThis(),
        run: vi.fn(),
      };

      command.command(mockEditor as any);

      expect(mockEditor.chain).toHaveBeenCalled();
      expect(mockEditor.focus).toHaveBeenCalled();
      expect(mockEditor.run).toHaveBeenCalled();
    });
  });

  it('color aliases allow quick access', () => {
    const colorAliases = colorCommands
      .filter(c => c.aliases && c.aliases.length > 0)
      .flatMap(c => c.aliases!);

    expect(colorAliases).toEqual(
      expect.arrayContaining(['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'grey', 'clear'])
    );
  });
});
