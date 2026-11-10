'use client';

import {
  Children,
  createContext,
  isValidElement,
  type ReactNode,
  useContext,
} from 'react';
import { cn } from '../../lib/utils';

interface StablePanelsProps {
  index: number;
  children: ReactNode;
  className?: string;
  scroll?: boolean;
}

const NestedPanelsContext = createContext(false);

export const StablePanels = ({
  index,
  children,
  className,
  scroll = true,
}: StablePanelsProps) => {
  const nested = useContext(NestedPanelsContext);
  const panels = Children.toArray(children);
  const capped = scroll && !nested;

  return (
    <NestedPanelsContext.Provider value={true}>
      <div className={cn('grid min-w-0', className)}>
        {panels.map((panel, panelIndex) => {
          const active = panelIndex === index;
          return (
            <div
              key={isValidElement(panel) ? panel.key : String(panel)}
              aria-hidden={!active}
              inert={!active}
              className={cn(
                'col-start-1 row-start-1 min-w-0 transition-opacity duration-200',
                capped &&
                  'max-h-[30rem] overflow-y-auto [scrollbar-gutter:stable] [scrollbar-width:thin]',
                active ? 'opacity-100' : 'invisible opacity-0',
              )}
            >
              {panel}
            </div>
          );
        })}
      </div>
    </NestedPanelsContext.Provider>
  );
};
