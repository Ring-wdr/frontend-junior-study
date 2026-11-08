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
    <div
      className={cn(`grid ${gridClass} gap-2 text-left sm:gap-4`, className)}
    >
      {items.map((item) => (
        <div key={item.title} className="py-2 sm:p-3">
          <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
          <p className="text-xs text-gray-500">{item.description}</p>
        </div>
      ))}
    </div>
  );
}
