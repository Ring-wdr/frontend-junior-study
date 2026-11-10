'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PagerProps {
  index: number;
  total: number;
  onChange: (index: number) => void;
  prevLabel: string;
  nextLabel: string;
}

export const Pager = ({
  index,
  total,
  onChange,
  prevLabel,
  nextLabel,
}: PagerProps) => (
  <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
    <button
      type="button"
      onClick={() => onChange(index - 1)}
      disabled={index <= 0}
      className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
    >
      <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
      {prevLabel}
    </button>
    <span className="text-xs tabular-nums text-gray-500">
      {index + 1} / {total}
    </span>
    <button
      type="button"
      onClick={() => onChange(index + 1)}
      disabled={index >= total - 1}
      className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {nextLabel}
      <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
    </button>
  </div>
);
