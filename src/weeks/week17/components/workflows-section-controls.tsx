'use client';

import type { ReactNode } from 'react';

interface ChipProps {
  selected: boolean;
  onSelect: () => void;
  children: ReactNode;
}

export const Chip = ({ selected, onSelect, children }: ChipProps) => (
  <button
    type="button"
    aria-pressed={selected}
    onClick={onSelect}
    className={`min-w-0 rounded-lg border px-3 py-2 text-left text-xs font-semibold leading-snug break-words transition-colors ${
      selected
        ? 'border-teal-600 bg-teal-600 text-white'
        : 'border-gray-200 bg-white text-gray-700 hover:bg-teal-50'
    }`}
  >
    <span aria-hidden="true" className={selected ? '' : 'invisible'}>
      {'✓ '}
    </span>
    {children}
  </button>
);

interface PrevNextProps {
  index: number;
  total: number;
  onChange: (next: number) => void;
  prevLabel: string;
  nextLabel: string;
}

export const PrevNext = ({
  index,
  total,
  onChange,
  prevLabel,
  nextLabel,
}: PrevNextProps) => (
  <div className="mt-4 flex items-center justify-between gap-2">
    <button
      type="button"
      onClick={() => onChange(index - 1)}
      disabled={index <= 0}
      className="rounded-md border border-teal-200 bg-white px-3 py-1.5 text-xs font-medium text-teal-700 hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {'← '}
      {prevLabel}
    </button>
    <span className="text-xs tabular-nums text-gray-500">{`${index + 1} / ${total}`}</span>
    <button
      type="button"
      onClick={() => onChange(index + 1)}
      disabled={index >= total - 1}
      className="rounded-md bg-teal-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {nextLabel}
      {' →'}
    </button>
  </div>
);
