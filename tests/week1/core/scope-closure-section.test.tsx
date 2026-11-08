import { afterEach, describe, expect, rs, test } from '@rstest/core';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import type { ReactNode } from 'react';
import { ScopeClosureSection } from '../../../src/weeks/week1/components/scope-closure-section';

rs.mock('motion/react', async () => {
  const actual =
    await rs.importActual<typeof import('motion/react')>('motion/react');
  const MotionDiv = ({
    children,
    className,
  }: {
    children?: ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>;
  return {
    ...actual,
    AnimatePresence: ({ children }: { children?: ReactNode }) => (
      <>{children}</>
    ),
    motion: new Proxy(actual.motion, {
      get: (target, key, receiver) =>
        key === 'div' ? MotionDiv : Reflect.get(target, key, receiver),
    }),
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
    // Check that code block contains createCounter
    expect(
      within(section).getAllByText(/function/i).length +
        within(section).getAllByText(/createCounter/i).length,
    ).toBeGreaterThanOrEqual(2);
    expect(within(section).getByText('Create Counter')).toBeInTheDocument();
  });

  test('initially shows empty state message', () => {
    render(<ScopeClosureSection />);

    const section = screen.getByTestId('scope-closure-section');
    expect(
      within(section).getByText(
        'Click "Create Counter" to see closures in action!',
      ),
    ).toBeInTheDocument();
  });

  test('clicking Create Counter creates a counter', () => {
    render(<ScopeClosureSection />);

    const section = screen.getByTestId('scope-closure-section');
    const createButton = within(section).getByTestId('closure-create-counter');
    fireEvent.click(createButton);

    const counterTexts = within(section).getAllByText('counter1');
    // Get the rendered counter (not the one in code)
    expect(counterTexts.length).toBeGreaterThan(1);
  });

  test('creating multiple counters shows all counters', () => {
    render(<ScopeClosureSection />);

    const section = screen.getByTestId('scope-closure-section');
    const createButton = within(section).getByTestId('closure-create-counter');

    fireEvent.click(createButton);
    fireEvent.click(createButton);
    fireEvent.click(createButton);

    // Check that all counter labels exist (text appears in code + rendered)
    expect(
      within(section).getAllByText(/counter1/i).length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      within(section).getAllByText(/counter2/i).length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      within(section).getAllByText(/counter3/i).length,
    ).toBeGreaterThanOrEqual(1);
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

    // Verify counters were created
    expect(
      within(section).getAllByText(/counter1/i).length,
    ).toBeGreaterThanOrEqual(1);

    const resetButton = within(section).getByTestId('closure-reset');
    fireEvent.click(resetButton);

    expect(
      within(section).getByText(
        'Click "Create Counter" to see closures in action!',
      ),
    ).toBeInTheDocument();
  });
});
