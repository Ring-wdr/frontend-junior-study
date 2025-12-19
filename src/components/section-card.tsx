import { ReactNode } from 'react';
import { Card } from './ui/card';
import { Badge, BadgeColor } from './ui/badge';

interface SectionCardProps {
  badge?: {
    label: string;
    color?: BadgeColor;
    className?: string;
  };
  title: string;
  description: string;
  children: ReactNode;
  testId?: string;
}

export function SectionCard({
  badge,
  title,
  description,
  children,
  testId,
}: SectionCardProps) {
  return (
    <Card className="p-6" data-testid={testId}>
      <div className="flex justify-between items-start mb-6 text-left">
        <div className="w-full">
          {badge && (
            <Badge color={badge.color} className={badge.className}>
              {badge.label}
            </Badge>
          )}
          <h3 className="text-xl font-bold mt-2 text-gray-900">{title}</h3>
          <p className="text-gray-500 text-sm mt-1">{description}</p>
        </div>
      </div>

      {children}
    </Card>
  );
}
