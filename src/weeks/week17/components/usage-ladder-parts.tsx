'use client';

import { Check } from 'lucide-react';
import { type KeyboardEvent, type ReactNode, useState } from 'react';
import { CodeBlock } from '../../../components/ui/code-block';
import { StablePanels } from '../../../components/ui/stable-panels';

export const Label = ({ children }: { children: string }) => (
  <h4 className="mt-4 first:mt-0 font-bold text-sm text-gray-800">
    {children}
  </h4>
);

export const Para = ({ children }: { children: string }) => (
  <p className="mt-3 first:mt-0 text-sm leading-relaxed text-gray-700 break-words">
    {children}
  </p>
);

export const Bullets = ({ items }: { items: string[] }) => (
  <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-gray-700 break-words">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

export const Code = ({
  code,
  language,
}: {
  code: string;
  language: string;
}) => <CodeBlock code={code} language={language} className="mt-3 text-xs" />;

export const DataTable = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) => (
  <div className="mt-3 overflow-x-auto">
    <table className="w-full text-xs">
      <thead>
        <tr className="bg-blue-50">
          {headers.map((header) => (
            <th
              key={header}
              className="px-3 py-2 text-left font-semibold text-blue-800 border-b border-blue-200"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, idx) => (
          <tr
            key={row[0]}
            className={idx % 2 === 0 ? 'bg-white' : 'bg-blue-50/50'}
          >
            {row.map((cell, cellIdx) => (
              <td
                key={`${row[0]}-${headers[cellIdx]}`}
                className={
                  cellIdx === 0
                    ? 'px-3 py-2 font-semibold text-blue-700 border-b border-blue-100 align-top'
                    : 'px-3 py-2 text-gray-600 border-b border-blue-100 align-top break-words'
                }
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export type TabItem = { id: string; label: string };

export const Tabs = ({
  items,
  value,
  onChange,
  label,
  idPrefix,
  children,
}: {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  label: string;
  idPrefix: string;
  children: ReactNode;
}) => {
  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % items.length;
    else if (event.key === 'ArrowLeft')
      next = (index - 1 + items.length) % items.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = items.length - 1;
    else return;
    event.preventDefault();
    onChange(items[next].id);
    document.getElementById(`${idPrefix}-tab-${items[next].id}`)?.focus();
  };

  return (
    <div className="min-w-0">
      <div
        role="tablist"
        aria-label={label}
        className="flex gap-1 overflow-x-auto border-b border-gray-200"
      >
        {items.map((item, index) => {
          const selected = item.id === value;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${idPrefix}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${idPrefix}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => onChange(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`shrink-0 whitespace-nowrap px-3 py-2 text-xs font-semibold sm:text-sm border-b-2 -mb-px transition-colors ${
                selected
                  ? 'border-indigo-600 text-indigo-700'
                  : 'border-transparent text-gray-600 hover:text-indigo-700'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`${idPrefix}-panel`}
        aria-labelledby={`${idPrefix}-tab-${value}`}
        className="pt-4 min-w-0"
      >
        <StablePanels
          index={Math.max(
            0,
            items.findIndex((item) => item.id === value),
          )}
        >
          {children}
        </StablePanels>
      </div>
    </div>
  );
};

export const ChipPanels = ({
  items,
  children,
}: {
  items: TabItem[];
  children: ReactNode;
}) => {
  const [active, setActive] = useState(0);
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={active === index}
            onClick={() => setActive(index)}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
              active === index
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:border-indigo-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="mt-3 min-w-0 rounded-lg border border-gray-200 bg-white p-3">
        <StablePanels index={active}>{children}</StablePanels>
      </div>
    </div>
  );
};

export const Checklist = ({
  items,
  hint,
  doneLabel,
}: {
  items: string[];
  hint: string;
  doneLabel: string;
}) => {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const count = items.filter((_, index) => checked[index]).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="min-w-0 text-xs text-gray-500">{hint}</p>
        <span className="shrink-0 text-xs font-semibold tabular-nums text-indigo-700">
          {count}/{items.length} {doneLabel}
        </span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full bg-indigo-500 transition-all duration-200"
          style={{ width: `${(count / items.length) * 100}%` }}
        />
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((item, index) => {
          const isChecked = Boolean(checked[index]);
          return (
            <li key={item}>
              <button
                type="button"
                aria-pressed={isChecked}
                onClick={() =>
                  setChecked((prev) => ({ ...prev, [index]: !prev[index] }))
                }
                className={`flex w-full items-start gap-3 rounded-lg border p-3 text-left text-sm leading-relaxed transition-colors ${
                  isChecked
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-indigo-300'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                    isChecked
                      ? 'border-emerald-500 bg-emerald-500 text-white'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <Check
                    className={`h-3.5 w-3.5 ${isChecked ? '' : 'invisible'}`}
                  />
                </span>
                <span
                  className={`min-w-0 break-words ${isChecked ? 'line-through decoration-emerald-400' : ''}`}
                >
                  {item}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
