import type React from 'react';

export const Card = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
  >
    {children}
  </div>
);
