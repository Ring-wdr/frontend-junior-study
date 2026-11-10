'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { KeyboardEvent } from 'react';

interface TabListProps {
  items: string[];
  selected: number;
  onSelect: (index: number) => void;
  ariaLabel: string;
  idPrefix: string;
}

export const tabId = (prefix: string, index: number) =>
  `${prefix}-tab-${index}`;
export const panelId = (prefix: string) => `${prefix}-panel`;

export const TabList = ({
  items,
  selected,
  onSelect,
  ariaLabel,
  idPrefix,
}: TabListProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = items.length - 1;
    let next = selected;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      next = selected === last ? 0 : selected + 1;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      next = selected === 0 ? last : selected - 1;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = last;
    } else {
      return;
    }
    event.preventDefault();
    onSelect(next);
    const tabs =
      event.currentTarget.querySelectorAll<HTMLElement>('[role="tab"]');
    tabs[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible"
    >
      {items.map((label, idx) => {
        const active = idx === selected;
        return (
          <button
            key={label}
            id={tabId(idPrefix, idx)}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={panelId(idPrefix)}
            tabIndex={active ? 0 : -1}
            onClick={() => onSelect(idx)}
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              active
                ? 'border-purple-600 bg-purple-600 text-white'
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="tabular-nums opacity-70">{idx + 1}</span>
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};

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
  <div className="flex items-center justify-between gap-2">
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
      className="inline-flex items-center gap-1 rounded-md bg-purple-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {nextLabel}
      <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
    </button>
  </div>
);
