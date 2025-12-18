import type React from 'react';
import { cn } from '../../lib/utils';

const colors = {
  blue: 'bg-blue-50 text-blue-700',
  purple: 'bg-purple-50 text-purple-700',
  green: 'bg-green-50 text-green-700',
  orange: 'bg-orange-50 text-orange-700',
  pink: 'bg-pink-50 text-pink-700',
  indigo: 'bg-indigo-50 text-indigo-700',
  teal: 'bg-teal-50 text-teal-700',
};

export const Badge = ({
  children,
  color = 'blue',
}: {
  children: React.ReactNode;
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'indigo' | 'teal';
}) => {
  return (
    <span
      className={cn('px-2 py-1 rounded-md text-xs font-medium', colors[color])}
    >
      {children}
    </span>
  );
};
