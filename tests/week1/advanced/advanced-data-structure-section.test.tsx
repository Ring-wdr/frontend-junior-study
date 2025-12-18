import { afterEach, describe, expect, rs, test } from '@rstest/core';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import type React from 'react';
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
      div: ({ children, ...props }: Record<string, unknown>) => {
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
    expect(within(section).getByText('Advanced Data Structures')).toBeInTheDocument();
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
    expect(within(section).getByRole('button', { name: /map/i })).toBeInTheDocument();
    expect(within(section).getByRole('button', { name: /set/i })).toBeInTheDocument();
    expect(within(section).getByRole('button', { name: /WeakMap/i })).toBeInTheDocument();
  });

  test('displays Map tab content by default', () => {
    render(<AdvancedDataStructureSection />);

    const section = screen.getByTestId('advanced-data-structure-section');
    expect(within(section).getByText('Map vs Object')).toBeInTheDocument();
    expect(
      within(section).getByText(/Keys can be any type/),
    ).toBeInTheDocument();
  });

  test('clicking Set tab shows Set content', () => {
    render(<AdvancedDataStructureSection />);

    const section = screen.getByTestId('advanced-data-structure-section');
    const setTab = within(section).getByText('Set');
    fireEvent.click(setTab);

    expect(within(section).getByText('Set (Unique Collection)')).toBeInTheDocument();
    expect(
      within(section).getByText(/Stores unique values of any type/),
    ).toBeInTheDocument();
  });

  test('clicking WeakMap/Ref tab shows Weak References content', () => {
    render(<AdvancedDataStructureSection />);

    const section = screen.getByTestId('advanced-data-structure-section');
    const weakTab = within(section).getByText('WeakMap/Ref');
    fireEvent.click(weakTab);

    expect(within(section).getByText('Weak References (GC Friendly)')).toBeInTheDocument();
    expect(
      within(section).getByText(/WeakMap\/WeakSet: Keys must be objects/),
    ).toBeInTheDocument();
  });

  test('displays Garbage Collection Visualizer in weak references tab', () => {
    render(<AdvancedDataStructureSection />);

    const section = screen.getByTestId('advanced-data-structure-section');
    const weakTab = within(section).getByText('WeakMap/Ref');
    fireEvent.click(weakTab);

    expect(within(section).getByText('Garbage Collection Visualizer')).toBeInTheDocument();
  });
});
