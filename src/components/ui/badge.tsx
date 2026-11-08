import type { ComponentProps } from 'react';
import { cn } from '../../lib/utils';

const colors = {
  blue: 'bg-blue-50 text-blue-700',
  purple: 'bg-purple-50 text-purple-700',
  green: 'bg-green-50 text-green-700',
  orange: 'bg-orange-50 text-orange-700',
  pink: 'bg-pink-50 text-pink-700',
  indigo: 'bg-indigo-50 text-indigo-700',
  teal: 'bg-teal-50 text-teal-700',
  red: 'bg-red-50 text-red-700',
  gray: 'bg-gray-100 text-gray-700',
} as const;

export type BadgeColor = keyof typeof colors;

export const Badge = ({
  children,
  color = 'blue',
  className,
  ...props
}: {
  color?: BadgeColor;
} & ComponentProps<'span'>) => {
  return (
    <span
      {...props}
      className={cn(
        'inline-block rounded-md px-2 py-1 text-xs font-medium',
        colors[color],
        className,
      )}
    >
      {children}
    </span>
  );
};
