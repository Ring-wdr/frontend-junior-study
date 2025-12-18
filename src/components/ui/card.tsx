import type React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
