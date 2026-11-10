'use client';

import type { KeyboardEvent, ReactNode } from 'react';

interface TabItem {
  label: string;
  icon?: ReactNode;
  danger?: boolean;
}

interface TabListProps {
  items: TabItem[];
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
      className="flex flex-wrap gap-2"
    >
      {items.map((item, idx) => {
        const active = idx === selected;
        const tone = item.danger
          ? active
            ? 'border-red-600 bg-red-600 text-white'
            : 'border-red-300 bg-red-50 text-red-800 hover:bg-red-100'
          : active
            ? 'border-indigo-600 bg-indigo-600 text-white'
            : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50';
        return (
          <button
            key={item.label}
            id={tabId(idPrefix, idx)}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={panelId(idPrefix)}
            tabIndex={active ? 0 : -1}
            onClick={() => onSelect(idx)}
            className={`inline-flex min-w-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-left text-xs font-semibold transition-colors ${tone}`}
          >
            {item.icon}
            <span className="min-w-0 break-words">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};
