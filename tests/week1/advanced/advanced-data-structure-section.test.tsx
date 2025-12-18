import { afterEach, describe, expect, rs, test } from '@rstest/core';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import type React from 'react';
import type { ComponentProps } from 'react';
import { AdvancedDataStructureSection } from '../../../src/page/week1/components/advanced-data-structure-section';

// Mock framer-motion
rs.mock('framer-motion', async () => {
  const actual = await rs.importActual('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    motion: {
      div: ({ children, ...props }: ComponentProps<'div'>) => {
        // biome-ignore lint: exclude style from props
        const { style, ...divProps } = props;
        return <div {...divProps}>{children}</div>;
      },
    },
  };
});

describe('AdvancedDataStructureSection', () => {
  afterEach(() => {
    cleanup();
  });
  test('renders section with badge and title', () => {
    render(<AdvancedDataStructureSection />);

    const section = screen.getByTestId('advanced-data-structure-section');
    expect(
      within(section).getByText('Advanced Data Structures'),
    ).toBeInTheDocument();
    expect(within(section).getByText('Data Structures')).toBeInTheDocument();
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

  test('clicking Set tab shows Set content', () => {
    render(<AdvancedDataStructureSection />);

    const section = screen.getByTestId('advanced-data-structure-section');
    const buttons = within(section).getAllByRole('button');
    const setTab = buttons.find((btn) => btn.textContent?.trim() === 'set');
    if (!setTab) throw new Error('Set tab not found');
    fireEvent.click(setTab);

    // Check that Set content is displayed (text may be split across elements)
    expect(
      within(section).getAllByText(/Stores/i).length +
        within(section).getAllByText(/unique/i).length,
    ).toBeGreaterThanOrEqual(2);
  });

  test('clicking WeakMap/Ref tab shows Weak References content', () => {
    render(<AdvancedDataStructureSection />);

    const section = screen.getByTestId('advanced-data-structure-section');
    const buttons = within(section).getAllByRole('button');
    const weakTab = buttons.find((btn) => btn.textContent?.includes('WeakMap'));
    if (!weakTab) throw new Error('WeakMap/Ref tab not found');
    fireEvent.click(weakTab);

    // Check that WeakMap/WeakSet content is displayed
    expect(
      within(section).getAllByText(/WeakMap/i).length +
        within(section).getAllByText(/Keys must/i).length,
    ).toBeGreaterThanOrEqual(2);
  });

  test('displays Garbage Collection Visualizer in weak references tab', () => {
    render(<AdvancedDataStructureSection />);

    const section = screen.getByTestId('advanced-data-structure-section');
    const weakTab = within(section).getByRole('button', {
      name: /WeakMap\/Ref/,
    });
    fireEvent.click(weakTab);

    // Check for Garbage Collection Visualizer text
    expect(
      within(section).getAllByText(/Garbage/i).length +
        within(section).getAllByText(/Collection/i).length,
    ).toBeGreaterThanOrEqual(1);
  });
});
