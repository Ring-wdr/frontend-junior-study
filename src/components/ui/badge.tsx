import type React from 'react';

export const Badge = ({
  children,
  color = 'blue',
}: {
  children: React.ReactNode;
  color?: 'blue' | 'purple' | 'green' | 'orange';
}) => {
  const colors = {
    blue: 'bg-blue-50 text-blue-700',
    purple: 'bg-purple-50 text-purple-700',
    green: 'bg-green-50 text-green-700',
    orange: 'bg-orange-50 text-orange-700',
  };
  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-medium ${colors[color]}`}
    >
      {children}
    </span>
  );
};
