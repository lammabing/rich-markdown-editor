import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SlashCommandList } from '../components/SlashCommand/SlashCommandList';

describe('SlashCommandList', () => {
  const mockCommand = vi.fn();
  
  const mockItems = [
    {
      title: 'Bold',
      description: 'Make text bold',
      category: 'format' as const,
    },
    {
      title: 'Italic',
      description: 'Make text italic',
      category: 'format' as const,
    },
    {
      title: 'Red Text',
      description: 'Apply red color to text',
      category: 'color' as const,
    },
    {
      title: 'Heading 1',
      description: 'Large section heading',
      category: 'blocks' as const,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders command items grouped by category', () => {
    render(
      <SlashCommandList 
        items={mockItems} 
        command={mockCommand} 
      />
    );

    // Check category headers
    expect(screen.getByText('Format')).toBeInTheDocument();
    expect(screen.getByText('Colors')).toBeInTheDocument();
    expect(screen.getByText('Blocks')).toBeInTheDocument();

    // Check item titles
    expect(screen.getByText('Bold')).toBeInTheDocument();
    expect(screen.getByText('Italic')).toBeInTheDocument();
    expect(screen.getByText('Red Text')).toBeInTheDocument();
    expect(screen.getByText('Heading 1')).toBeInTheDocument();
  });

  it('displays item descriptions', () => {
    render(
      <SlashCommandList 
        items={mockItems} 
        command={mockCommand} 
      />
    );

    expect(screen.getByText('Make text bold')).toBeInTheDocument();
    expect(screen.getByText('Make text italic')).toBeInTheDocument();
    expect(screen.getByText('Apply red color to text')).toBeInTheDocument();
    expect(screen.getByText('Large section heading')).toBeInTheDocument();
  });

  it('calls command function when item is clicked', () => {
    render(
      <SlashCommandList 
        items={mockItems} 
        command={mockCommand} 
      />
    );

    const boldButton = screen.getByText('Bold').closest('button');
    fireEvent.click(boldButton!);

    expect(mockCommand).toHaveBeenCalledWith(mockItems[0]);
    expect(mockCommand).toHaveBeenCalledTimes(1);
  });

  it('selects first item by default', () => {
    const { container } = render(
      <SlashCommandList 
        items={mockItems} 
        command={mockCommand} 
      />
    );

    const firstItem = container.querySelector('.slash-command-item.is-selected');
    expect(firstItem).toBeInTheDocument();
    expect(firstItem?.textContent).toContain('Bold');
  });

  it('shows no results message when items array is empty', () => {
    render(
      <SlashCommandList 
        items={[]} 
        command={mockCommand} 
      />
    );

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('displays category icons', () => {
    const { container } = render(
      <SlashCommandList 
        items={mockItems} 
        command={mockCommand} 
      />
    );

    // Check for emoji icons
    const icons = container.querySelectorAll('.category-icon');
    expect(icons.length).toBeGreaterThan(0);
  });
});
