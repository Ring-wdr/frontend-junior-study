import { afterEach, describe, expect, rs, test } from '@rstest/core';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import type React from 'react';
import { ScopeClosureSection } from '../../../src/page/week1/components/scope-closure-section';

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

describe('ScopeClosureSection', () => {
  afterEach(() => {
    cleanup();
  });
  test('renders section with badge and title', () => {
    render(<ScopeClosureSection />);

    const section = screen.getByTestId('scope-closure-section');
    expect(within(section).getByText('Closures')).toBeInTheDocument();
    expect(within(section).getByText('Scope')).toBeInTheDocument();
  });

  test('renders closure demo with code block', () => {
    render(<ScopeClosureSection />);

    const section = screen.getByTestId('scope-closure-section');
    expect(within(section).getByText('function createCounter()')).toBeInTheDocument();
    expect(within(section).getByText('Create Counter')).toBeInTheDocument();
  });

  test('initially shows empty state message', () => {
    render(<ScopeClosureSection />);

    const section = screen.getByTestId('scope-closure-section');
    expect(
      within(section).getByText('Click "Create Counter" to see closures in action!'),
    ).toBeInTheDocument();
  });

  test('clicking Create Counter creates a counter', () => {
    render(<ScopeClosureSection />);

    const section = screen.getByTestId('scope-closure-section');
    const createButton = within(section).getByTestId('closure-create-counter');
    fireEvent.click(createButton);

    expect(within(section).getByText('counter1')).toBeInTheDocument();
  });

  test('creating multiple counters shows all counters', () => {
    render(<ScopeClosureSection />);

    const section = screen.getByTestId('scope-closure-section');
    const createButton = within(section).getByTestId('closure-create-counter');

    fireEvent.click(createButton);
    fireEvent.click(createButton);
    fireEvent.click(createButton);

    expect(within(section).getByText('counter1')).toBeInTheDocument();
    expect(within(section).getByText('counter2')).toBeInTheDocument();
    expect(within(section).getByText('counter3')).toBeInTheDocument();
  });

  test('shows explanation when counter is created', () => {
    render(<ScopeClosureSection />);

    const section = screen.getByTestId('scope-closure-section');
    const createButton = within(section).getByTestId('closure-create-counter');
    fireEvent.click(createButton);

    expect(
      within(section).getByText('Each counter has its own closure!'),
    ).toBeInTheDocument();
  });

  test('reset button clears all counters', () => {
    render(<ScopeClosureSection />);

    const section = screen.getByTestId('scope-closure-section');
    const createButton = within(section).getByTestId('closure-create-counter');
    fireEvent.click(createButton);
    fireEvent.click(createButton);

    expect(within(section).getByText('counter1')).toBeInTheDocument();

    const resetButton = within(section).getByTestId('closure-reset');
    fireEvent.click(resetButton);

    expect(
      within(section).getByText('Click "Create Counter" to see closures in action!'),
    ).toBeInTheDocument();
    expect(within(section).queryByText('counter1')).not.toBeInTheDocument();
  });
});
