import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import './SlashCommand.css';

export interface SlashCommandListProps {
  items: Array<{
    title: string;
    description: string;
    category: string;
  }>;
  command: (item: any) => void;
}

export const SlashCommandList = forwardRef((props: SlashCommandListProps, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command(item);
    }
  };

  const upHandler = () => {
    setSelectedIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? props.items.length - 1 : newIndex;
    });
  };

  const downHandler = () => {
    setSelectedIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex >= props.items.length ? 0 : newIndex;
    });
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (event.key === 'ArrowUp') {
        upHandler();
        return true;
      }

      if (event.key === 'ArrowDown') {
        downHandler();
        return true;
      }

      if (event.key === 'Enter') {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  // Group items by category
  const groupedItems = props.items.reduce((acc, item, index) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push({ ...item, originalIndex: index });
    return acc;
  }, {} as Record<string, Array<{ title: string; description: string; category: string; originalIndex: number }>>);

  const categoryIcons: Record<string, string> = {
    format: '📝',
    blocks: '📦',
    color: '🎨',
    insert: '🔧',
  };

  const categoryLabels: Record<string, string> = {
    format: 'Format',
    blocks: 'Blocks',
    color: 'Colors',
    insert: 'Insert',
  };

  return (
    <div className="slash-command-menu">
      {Object.entries(groupedItems).map(([category, items]) => (
        <div key={category} className="slash-command-category">
          <div className="slash-command-category-header">
            <span className="category-icon">{categoryIcons[category]}</span>
            <span className="category-label">{categoryLabels[category]}</span>
          </div>
          {items.map((item) => {
            const globalIndex = item.originalIndex;
            const isSelected = selectedIndex === globalIndex;
            return (
              <button
                key={item.title}
                className={`slash-command-item ${isSelected ? 'is-selected' : ''}`}
                onClick={() => selectItem(globalIndex)}
              >
                <div className="slash-command-item-content">
                  <div className="slash-command-item-title">{item.title}</div>
                  <div className="slash-command-item-description">{item.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      ))}
      {props.items.length === 0 && (
        <div className="slash-command-no-results">
          No results found
        </div>
      )}
    </div>
  );
});

SlashCommandList.displayName = 'SlashCommandList';
