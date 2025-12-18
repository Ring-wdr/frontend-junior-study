import type React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      'bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden',
      className,
    )}
  >
    {children}
  </div>
);
