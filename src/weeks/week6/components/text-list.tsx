'use client';

import { cn } from '../../../lib/utils';

interface TextListProps {
  items: string[];
  ordered?: boolean;
  className?: string;
}

export const TextList = ({
  items,
  ordered = false,
  className,
}: TextListProps) => {
  const List = ordered ? 'ol' : 'ul';

  return (
    <List
      className={cn(
        'space-y-2 pl-5 text-sm text-gray-700',
        ordered ? 'list-decimal' : 'list-disc',
        className,
      )}
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </List>
  );
};
