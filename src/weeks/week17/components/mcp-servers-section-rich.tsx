'use client';

import { Fragment } from 'react';

export const Rich = ({ text }: { text: string }) => {
  const parts = text.split('`');
  return (
    <>
      {parts.map((part, idx) =>
        idx % 2 === 1 ? (
          <code
            // biome-ignore lint/suspicious/noArrayIndexKey: static split of a string
            key={idx}
            className="rounded bg-gray-100 px-1 py-0.5 font-mono text-[0.9em] text-gray-800 break-all"
          >
            {part}
          </code>
        ) : (
          // biome-ignore lint/suspicious/noArrayIndexKey: static split of a string
          <Fragment key={idx}>{part}</Fragment>
        ),
      )}
    </>
  );
};
