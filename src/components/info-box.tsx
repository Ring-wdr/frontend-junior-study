import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

type InfoBoxVariant = 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'gray';

interface InfoBoxProps {
  variant?: InfoBoxVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<
  InfoBoxVariant,
  { bg: string; border: string; title: string; text: string }
> = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    title: 'text-blue-900',
    text: 'text-blue-800',
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-100',
    title: 'text-green-900',
    text: 'text-green-800',
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    title: 'text-orange-900',
    text: 'text-orange-800',
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-100',
    title: 'text-red-900',
    text: 'text-red-800',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-100',
    title: 'text-purple-900',
    text: 'text-purple-800',
  },
  gray: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    title: 'text-gray-900',
    text: 'text-gray-700',
  },
};

export function InfoBox({
  variant = 'blue',
  title,
  children,
  className,
}: InfoBoxProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        `${styles.bg} p-4 rounded-xl border ${styles.border} text-left`,
        className,
      )}
    >
      {title && (
        <h4 className={cn('font-semibold mb-2', styles.title)}>{title}</h4>
      )}
      <div className={cn('text-sm', styles.text)}>{children}</div>
    </div>
  );
}
