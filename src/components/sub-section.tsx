import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

interface SubSectionProps {
  title: string;
  icon?: boolean;
  iconColor?: 'purple' | 'blue' | 'pink' | 'green' | 'orange' | 'red';
  children: ReactNode;
  className?: string;
  divider?: boolean;
}

const iconColorMap: Record<string, string> = {
  purple: 'bg-purple-500',
  blue: 'bg-blue-500',
  pink: 'bg-pink-500',
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
};

export function SubSection({
  title,
  icon = false,
  iconColor = 'purple',
  children,
  className,
  divider = false,
}: SubSectionProps) {
  return (
    <>
      {divider && <hr className="border-gray-100" />}
      <section className={className}>
        <h3
          className={cn(
            'mb-3 text-base font-semibold text-gray-900',
            icon && 'flex items-center gap-2',
          )}
        >
          {icon && (
            <span
              className={cn(
                'w-1.5 h-1.5 rounded-full',
                iconColorMap[iconColor],
              )}
            />
          )}
          {title}
        </h3>
        {children}
      </section>
    </>
  );
}
