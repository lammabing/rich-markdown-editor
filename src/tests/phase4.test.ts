import { describe, it, expect, vi } from 'vitest';
import { commandItems, slashCommand } from '../extensions/slashCommand';

describe('Phase 4: Alert/Callout Commands', () => {
  const alertTitles = ['Note', 'Tip', 'Warning', 'Danger', 'Info'];

  it('has all alert type commands', () => {
    alertTitles.forEach(title => {
      const command = commandItems.find(c => c.title === title);
      expect(command).toBeDefined();
      expect(command?.category).toBe('blocks');
    });
  });

  it('note command inserts alert with note type', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      insertAlert: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const note = commandItems.find(c => c.title === 'Note');
    note?.command(mockEditor as any);

    expect(mockEditor.insertAlert).toHaveBeenCalledWith({ alertType: 'note' });
  });

  it('tip command inserts alert with tip type', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      insertAlert: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const tip = commandItems.find(c => c.title === 'Tip');
    tip?.command(mockEditor as any);

    expect(mockEditor.insertAlert).toHaveBeenCalledWith({ alertType: 'tip' });
  });

  it('warning command inserts alert with warning type', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      insertAlert: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const warning = commandItems.find(c => c.title === 'Warning');
    warning?.command(mockEditor as any);

    expect(mockEditor.insertAlert).toHaveBeenCalledWith({ alertType: 'warning' });
  });

  it('danger command inserts alert with danger type', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      insertAlert: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const danger = commandItems.find(c => c.title === 'Danger');
    danger?.command(mockEditor as any);

    expect(mockEditor.insertAlert).toHaveBeenCalledWith({ alertType: 'danger' });
  });

  it('info command inserts alert with info type', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      insertAlert: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const info = commandItems.find(c => c.title === 'Info');
    info?.command(mockEditor as any);

    expect(mockEditor.insertAlert).toHaveBeenCalledWith({ alertType: 'info' });
  });

  it('alert commands have proper aliases', () => {
    const note = commandItems.find(c => c.title === 'Note');
    const tip = commandItems.find(c => c.title === 'Tip');
    const warning = commandItems.find(c => c.title === 'Warning');
    const danger = commandItems.find(c => c.title === 'Danger');
    const info = commandItems.find(c => c.title === 'Info');

    expect(note?.aliases).toEqual(expect.arrayContaining(['callout', 'alert-note']));
    expect(tip?.aliases).toEqual(expect.arrayContaining(['hint', 'alert-tip']));
    expect(warning?.aliases).toEqual(expect.arrayContaining(['caution', 'alert-warning']));
    expect(danger?.aliases).toEqual(expect.arrayContaining(['error', 'alert-danger']));
    expect(info?.aliases).toEqual(expect.arrayContaining(['information', 'alert-info']));
  });
});

describe('Phase 4: Emoji Command', () => {
  it('has emoji command', () => {
    const emoji = commandItems.find(c => c.title === 'Emoji');

    expect(emoji).toBeDefined();
    expect(emoji?.category).toBe('insert');
    expect(emoji?.aliases).toEqual(
      expect.arrayContaining(['emoticon', 'smile'])
    );
  });

  it('emoji command inserts default emoji', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      insertEmoji: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const emoji = commandItems.find(c => c.title === 'Emoji');
    emoji?.command(mockEditor as any);

    expect(mockEditor.insertEmoji).toHaveBeenCalledWith({ emoji: '😀' });
  });

  it('emoji has proper description', () => {
    const emoji = commandItems.find(c => c.title === 'Emoji');

    expect(emoji?.description).toBe('Insert an emoji');
  });
});

describe('Phase 4: HTML Block Command', () => {
  it('has HTML block command', () => {
    const htmlBlock = commandItems.find(c => c.title === 'HTML Block');

    expect(htmlBlock).toBeDefined();
    expect(htmlBlock?.category).toBe('blocks');
    expect(htmlBlock?.aliases).toEqual(
      expect.arrayContaining(['html', 'custom-html'])
    );
  });

  it('HTML block command inserts HTML content', () => {
    const mockEditor = {
      chain: vi.fn().mockReturnThis(),
      focus: vi.fn().mockReturnThis(),
      insertHTMLBlock: vi.fn().mockReturnThis(),
      run: vi.fn(),
    };

    const htmlBlock = commandItems.find(c => c.title === 'HTML Block');
    htmlBlock?.command(mockEditor as any);

    expect(mockEditor.insertHTMLBlock).toHaveBeenCalledWith({
      htmlContent: '<p>Your HTML here</p>',
    });
  });

  it('HTML block has proper description', () => {
    const htmlBlock = commandItems.find(c => c.title === 'HTML Block');

    expect(htmlBlock?.description).toBe('Insert custom HTML block');
  });
});

describe('Phase 4: Slash Command Filtering', () => {
  const mockEditor = { state: {}, commands: {} } as any;

  it('filters note callout', () => {
    const result = slashCommand.items?.({ query: 'note', editor: mockEditor });

    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.some(item => item.title === 'Note')).toBe(true);
  });

  it('filters by callout alias', () => {
    const result = slashCommand.items?.({ query: 'callout', editor: mockEditor });

    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.some(item => item.title === 'Note')).toBe(true);
  });

  it('filters tip callout', () => {
    const result = slashCommand.items?.({ query: 'tip', editor: mockEditor });

    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.some(item => item.title === 'Tip')).toBe(true);
  });

  it('filters by hint alias', () => {
    const result = slashCommand.items?.({ query: 'hint', editor: mockEditor });

    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.some(item => item.title === 'Tip')).toBe(true);
  });

  it('filters warning callout', () => {
    const result = slashCommand.items?.({ query: 'warning', editor: mockEditor });

    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.some(item => item.title === 'Warning')).toBe(true);
  });

  it('filters danger callout', () => {
    const result = slashCommand.items?.({ query: 'danger', editor: mockEditor });

    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.some(item => item.title === 'Danger')).toBe(true);
  });

  it('filters info callout', () => {
    const result = slashCommand.items?.({ query: 'info', editor: mockEditor });

    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.some(item => item.title === 'Info')).toBe(true);
  });

  it('filters emoji command', () => {
    const result = slashCommand.items?.({ query: 'emoji', editor: mockEditor });

    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.some(item => item.title === 'Emoji')).toBe(true);
  });

  it('filters HTML block command', () => {
    const result = slashCommand.items?.({ query: 'html', editor: mockEditor });

    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.some(item => item.title === 'HTML Block')).toBe(true);
  });

  it('filters by custom-html alias', () => {
    const result = slashCommand.items?.({ query: 'custom-html', editor: mockEditor });

    expect(result).toBeDefined();
    const items = result as any[];
    expect(items.some(item => item.title === 'HTML Block')).toBe(true);
  });
});

describe('Phase 4: Command Categories', () => {
  it('has all alert commands in blocks category', () => {
    const alertCommands = commandItems.filter(
      c => ['Note', 'Tip', 'Warning', 'Danger', 'Info'].includes(c.title)
    );

    expect(alertCommands.length).toBe(5);
    alertCommands.forEach(cmd => {
      expect(cmd.category).toBe('blocks');
    });
  });

  it('emoji command is in insert category', () => {
    const emoji = commandItems.find(c => c.title === 'Emoji');
    expect(emoji?.category).toBe('insert');
  });

  it('HTML block command is in blocks category', () => {
    const htmlBlock = commandItems.find(c => c.title === 'HTML Block');
    expect(htmlBlock?.category).toBe('blocks');
  });

  it('all Phase 4 commands have required properties', () => {
    const phase4Titles = [
      'Note', 'Tip', 'Warning', 'Danger', 'Info',
      'Emoji', 'HTML Block',
    ];

    const phase4Commands = commandItems.filter(c =>
      phase4Titles.includes(c.title)
    );

    phase4Commands.forEach(command => {
      expect(command).toHaveProperty('title');
      expect(command).toHaveProperty('description');
      expect(command).toHaveProperty('category');
      expect(command).toHaveProperty('command');
      expect(typeof command.command).toBe('function');
    });
  });
});

describe('Phase 4: Alert Types Coverage', () => {
  it('covers all five alert types', () => {
    const alertCommands = commandItems.filter(
      c => ['Note', 'Tip', 'Warning', 'Danger', 'Info'].includes(c.title)
    );

    const alertTypes = alertCommands.map(c => c.title.toLowerCase());

    expect(alertTypes).toContain('note');
    expect(alertTypes).toContain('tip');
    expect(alertTypes).toContain('warning');
    expect(alertTypes).toContain('danger');
    expect(alertTypes).toContain('info');
  });
});
