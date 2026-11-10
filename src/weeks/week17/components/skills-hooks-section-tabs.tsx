'use client';

import type { KeyboardEvent } from 'react';

interface TabListProps {
  items: string[];
  selected: number;
  onSelect: (index: number) => void;
  ariaLabel: string;
  idPrefix: string;
  tone: 'green' | 'orange' | 'blue' | 'gray';
}

export const tabId = (prefix: string, index: number) =>
  `${prefix}-tab-${index}`;
export const panelId = (prefix: string) => `${prefix}-panel`;

const ACTIVE = {
  green: 'border-green-600 bg-green-600 text-white',
  orange: 'border-orange-600 bg-orange-600 text-white',
  blue: 'border-blue-600 bg-blue-600 text-white',
  gray: 'border-gray-800 bg-gray-800 text-white',
};

export const TabList = ({
  items,
  selected,
  onSelect,
  ariaLabel,
  idPrefix,
  tone,
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
      className="flex flex-wrap gap-2"
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
            className={`min-w-0 rounded-full border px-3 py-1.5 text-left text-xs font-semibold transition-colors ${
              active
                ? ACTIVE[tone]
                : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span className="break-words">{label}</span>
          </button>
        );
      })}
    </div>
  );
};
