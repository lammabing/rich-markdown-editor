import { describe, it, expect, vi } from 'vitest';
import { commandItems, slashCommand } from '../extensions/slashCommand';

describe('Phase 2: Tables', () => {
  it('has table insertion command', () => {
    const tableCommand = commandItems.find(c => c.title === 'Table');
    
    expect(tableCommand).toBeDefined();
    expect(tableCommand?.category).toBe('blocks');
    expect(tableCommand?.aliases).toContain('table');
  });

  it('table command inserts 3x3 table with header', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      insertTable: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const tableCommand = commandItems.find(c => c.title === 'Table');
    tableCommand?.command(mockEditor as any);

    expect(mockEditor.insertTable).toHaveBeenCalledWith({
      rows: 3,
      cols: 3,
      withHeaderRow: true,
    });
  });

  it('has column manipulation commands', () => {
    const addColumnRight = commandItems.find(c => c.title === 'Add Column Right');
    const addColumnLeft = commandItems.find(c => c.title === 'Add Column Left');

    expect(addColumnRight).toBeDefined();
    expect(addColumnLeft).toBeDefined();
  });

  it('has row manipulation commands', () => {
    const addRowAbove = commandItems.find(c => c.title === 'Add Row Above');
    const addRowBelow = commandItems.find(c => c.title === 'Add Row Below');

    expect(addRowAbove).toBeDefined();
    expect(addRowBelow).toBeDefined();
  });

  it('has delete table command', () => {
    const deleteTable = commandItems.find(c => c.title === 'Delete Table');

    expect(deleteTable).toBeDefined();
    expect(deleteTable?.aliases).toContain('delete-table');
  });

  it('column right command executes correctly', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      addColumnRight: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const command = commandItems.find(c => c.title === 'Add Column Right');
    command?.command(mockEditor as any);

    expect(mockEditor.addColumnRight).toHaveBeenCalled();
  });

  it('row below command executes correctly', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      addRowBelow: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const command = commandItems.find(c => c.title === 'Add Row Below');
    command?.command(mockEditor as any);

    expect(mockEditor.addRowBelow).toHaveBeenCalled();
  });
});

describe('Phase 2: Task Lists', () => {
  it('has task list command', () => {
    const taskListCommand = commandItems.find(c => c.title === 'Task List');

    expect(taskListCommand).toBeDefined();
    expect(taskListCommand?.category).toBe('blocks');
    expect(taskListCommand?.aliases).toEqual(
      expect.arrayContaining(['todo', 'checkbox', 'task'])
    );
  });

  it('task list command toggles task list', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      toggleTaskList: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const taskListCommand = commandItems.find(c => c.title === 'Task List');
    taskListCommand?.command(mockEditor as any);

    expect(mockEditor.toggleTaskList).toHaveBeenCalled();
  });

  it('task list has proper description', () => {
    const taskListCommand = commandItems.find(c => c.title === 'Task List');

    expect(taskListCommand?.description).toBe('Create a task list with checkboxes');
  });
});

describe('Phase 2: Code Blocks with Syntax Highlighting', () => {
  it('has code block command', () => {
    const codeBlockCommand = commandItems.find(c => c.title === 'Code Block');

    expect(codeBlockCommand).toBeDefined();
    expect(codeBlockCommand?.category).toBe('blocks');
    expect(codeBlockCommand?.aliases).toEqual(
      expect.arrayContaining(['pre', 'code'])
    );
  });

  it('code block command toggles code block', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      toggleCodeBlock: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const codeBlockCommand = commandItems.find(c => c.title === 'Code Block');
    codeBlockCommand?.command(mockEditor as any);

    expect(mockEditor.toggleCodeBlock).toHaveBeenCalled();
  });

  it('code block has updated description mentioning syntax highlighting', () => {
    const codeBlockCommand = commandItems.find(c => c.title === 'Code Block');

    expect(codeBlockCommand?.description).toBe(
      'Insert a code block with syntax highlighting'
    );
  });
});

describe('Phase 2: Slash Command Filtering', () => {
  const mockEditor = { state: {}, commands: {} } as any;

  it('filters table commands', () => {
    const result = slashCommand.items?.({ query: 'table', editor: mockEditor });
    
    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.length).toBeGreaterThan(0);
    expect(items.some(item => item.title === 'Table')).toBe(true);
    expect(items.some(item => item.title === 'Delete Table')).toBe(true);
  });

  it('filters task list commands', () => {
    const result = slashCommand.items?.({ query: 'task', editor: mockEditor });
    
    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.length).toBeGreaterThan(0);
    expect(items.some(item => item.title === 'Task List')).toBe(true);
  });

  it('filters code block commands', () => {
    const result = slashCommand.items?.({ query: 'code', editor: mockEditor });
    
    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.length).toBeGreaterThan(0);
    expect(items.some(item => item.title === 'Code Block')).toBe(true);
  });

  it('filters by todo alias', () => {
    const result = slashCommand.items?.({ query: 'todo', editor: mockEditor });
    
    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.length).toBeGreaterThan(0);
    expect(items.some(item => item.title === 'Task List')).toBe(true);
  });

  it('filters by checkbox alias', () => {
    const result = slashCommand.items?.({ query: 'checkbox', editor: mockEditor });
    
    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.length).toBeGreaterThan(0);
    expect(items.some(item => item.title === 'Task List')).toBe(true);
  });

  it('filters column commands', () => {
    const result = slashCommand.items?.({ query: 'column', editor: mockEditor });
    
    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.length).toBe(2);
    expect(items.some(item => item.title === 'Add Column Right')).toBe(true);
    expect(items.some(item => item.title === 'Add Column Left')).toBe(true);
  });

  it('filters row commands', () => {
    const result = slashCommand.items?.({ query: 'row', editor: mockEditor });
    
    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.length).toBe(2);
    expect(items.some(item => item.title === 'Add Row Above')).toBe(true);
    expect(items.some(item => item.title === 'Add Row Below')).toBe(true);
  });
});
