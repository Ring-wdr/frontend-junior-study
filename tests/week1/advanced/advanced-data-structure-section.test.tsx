import { afterEach, describe, expect, rs, test } from '@rstest/core';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { AdvancedDataStructureSection } from '../../../src/weeks/week1/components/advanced-data-structure-section';

rs.mock('motion/react', () => {
  const motionOnlyProps = new Set([
    'initial',
    'animate',
    'exit',
    'transition',
    'layout',
    'layoutId',
    'variants',
    'whileHover',
    'whileTap',
    'whileInView',
    'viewport',
    'style',
  ]);
  const motion = new Proxy(
    {},
    {
      get:
        (_target, tag: string) =>
        ({
          children,
          ...props
        }: { children?: ReactNode } & Record<string, unknown>) =>
          createElement(
            tag,
            Object.fromEntries(
              Object.entries(props).filter(
                ([key]) => !motionOnlyProps.has(key),
              ),
            ),
            children,
          ),
    },
  );
  return {
    motion,
    AnimatePresence: ({ children }: { children?: ReactNode }) => (
      <>{children}</>
    ),
  };
});

describe('AdvancedDataStructureSection', () => {
  afterEach(() => {
    cleanup();
  });
  test('renders the badge but leaves the title to the MDX heading', () => {
    render(<AdvancedDataStructureSection />);

    const section = screen.getByTestId('advanced-data-structure-section');
    expect(within(section).getByText('Data Structures')).toBeInTheDocument();
    expect(
      within(section).queryByText('Advanced Data Structures'),
    ).not.toBeInTheDocument();
  });

  test('renders description', () => {
    render(<AdvancedDataStructureSection />);

    const section = screen.getByTestId('advanced-data-structure-section');
    expect(
      within(section).getByText('Map, Set, WeakMap, WeakSet, and WeakRef.'),
    ).toBeInTheDocument();
  });

  test('renders tab buttons', () => {
    render(<AdvancedDataStructureSection />);

    const section = screen.getByTestId('advanced-data-structure-section');
    const buttons = within(section).getAllByRole('button');
    expect(buttons.some((btn) => /map/i.test(btn.textContent || ''))).toBe(
      true,
    );
    expect(buttons.some((btn) => /set/i.test(btn.textContent || ''))).toBe(
      true,
    );
    expect(buttons.some((btn) => /WeakMap/i.test(btn.textContent || ''))).toBe(
      true,
    );
  });

  test('displays Map tab content by default', () => {
    render(<AdvancedDataStructureSection />);

    const section = screen.getByTestId('advanced-data-structure-section');
    expect(within(section).getByText('Map vs Object')).toBeInTheDocument();
    // Check that the Map content is displayed (text may be split across elements)
    expect(
      within(section).getAllByText(/Keys/i).length +
        within(section).getAllByText(/any type/i).length,
    ).toBeGreaterThanOrEqual(2);
  });

  test('clicking Set tab shows Set content', async () => {
    render(<AdvancedDataStructureSection />);

    const section = screen.getByTestId('advanced-data-structure-section');
    const buttons = within(section).getAllByRole('button');
    const setTab = buttons.find((btn) => btn.textContent?.trim() === 'Set');
    if (!setTab) throw new Error('Set tab not found');
    fireEvent.click(setTab);

    expect(
      await within(section).findByText(/Stores unique values/i),
    ).toBeInTheDocument();
  });

  test('clicking WeakMap/Ref tab shows Weak References content', async () => {
    render(<AdvancedDataStructureSection />);

    const section = screen.getByTestId('advanced-data-structure-section');
    const buttons = within(section).getAllByRole('button');
    const weakTab = buttons.find((btn) => btn.textContent?.includes('WeakMap'));
    if (!weakTab) throw new Error('WeakMap/Ref tab not found');
    fireEvent.click(weakTab);

    expect(await within(section).findByText(/Keys must/i)).toBeInTheDocument();
    expect(within(section).getAllByText(/WeakMap/i).length).toBeGreaterThan(1);
  });

  test('displays Garbage Collection Visualizer in weak references tab', async () => {
    render(<AdvancedDataStructureSection />);

    const section = screen.getByTestId('advanced-data-structure-section');
    const weakTab = within(section).getByRole('button', {
      name: /WeakMap\/Ref/,
    });
    fireEvent.click(weakTab);

    expect(
      await within(section).findByRole('button', {
        name: /Run Garbage Collector/,
      }),
    ).toBeInTheDocument();
  });
});
