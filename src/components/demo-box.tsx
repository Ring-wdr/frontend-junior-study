import type { ReactNode } from 'react';

interface DemoBoxProps {
  children: ReactNode;
  label?: string;
}

export function DemoBox({
  children,
  label = 'Interactive Demo',
}: DemoBoxProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4">
      <div className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wider">
        {label}
      </div>
      {children}
    </div>
  );
}
