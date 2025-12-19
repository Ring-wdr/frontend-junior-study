import { cn } from '../lib/utils';

interface ContentItem {
  title: string;
  description: string;
}

interface ContentGridProps {
  items: ContentItem[];
  columns?: 'auto' | 1 | 2;
  className?: string;
}

export function ContentGrid({
  items,
  columns = 'auto',
  className,
}: ContentGridProps) {
  const gridClass =
    columns === 1
      ? 'grid-cols-1'
      : columns === 2
        ? 'grid-cols-1 md:grid-cols-2'
        : 'grid-cols-1 md:grid-cols-2';

  return (
    <div className={cn(`grid ${gridClass} gap-4 text-left`, className)}>
      {items.map((item, idx) => (
        <div key={idx} className="p-3">
          <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
          <p className="text-xs text-gray-500">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
