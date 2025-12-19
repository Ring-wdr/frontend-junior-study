import { cn } from '../lib/utils';

interface SectionDividerProps {
  variant?: 'line' | 'spacing';
  className?: string;
}

export function SectionDivider({
  variant = 'line',
  className,
}: SectionDividerProps) {
  if (variant === 'spacing') {
    return <div className={cn('h-4', className)} />;
  }

  return <div className={cn('h-px bg-gray-100 border-t border-gray-100', className)} />;
}
