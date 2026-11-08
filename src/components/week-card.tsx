import Link from 'next/link';
import type { ReactNode } from 'react';

interface WeekCardProps {
  week: number;
  href: string;
  badge: string;
  title: string;
  description: string;
}

export function WeekGrid({ children }: { children: ReactNode }) {
  return (
    <div className="not-prose mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {children}
    </div>
  );
}

export function WeekCard({ href, badge, title, description }: WeekCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-gray-200 bg-white p-4 transition-colors hover:border-blue-300 hover:bg-blue-50/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
    >
      <span className="text-xs font-semibold text-blue-600">{badge}</span>
      <span className="mt-1 block text-base font-semibold text-gray-900 group-hover:text-blue-700">
        {title}
      </span>
      <span className="mt-1 block text-sm leading-relaxed text-gray-600">
        {description}
      </span>
    </Link>
  );
}
