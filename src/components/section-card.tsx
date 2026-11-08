import type { ReactNode } from 'react';
import type { BadgeColor } from './ui/badge';
import { Badge } from './ui/badge';

interface SectionCardProps {
  badge?: {
    label: string;
    color?: BadgeColor;
    className?: string;
  };
  description?: string;
  children: ReactNode;
  testId?: string;
}

export function SectionCard({
  badge,
  description,
  children,
  testId,
}: SectionCardProps) {
  return (
    <div className="mt-4 text-left" data-testid={testId}>
      {(badge || description) && (
        <div className="mb-5 flex flex-col items-start gap-2">
          {badge && (
            <Badge color={badge.color} className={badge.className}>
              {badge.label}
            </Badge>
          )}
          {description && (
            <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
