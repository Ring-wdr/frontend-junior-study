import { afterEach, describe, expect, rs, test } from '@rstest/core';
import { cleanup, render, screen, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import { OptimizationSection } from '../../../src/weeks/week1/components/optimization-section';

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

describe('OptimizationSection', () => {
  afterEach(() => {
    cleanup();
  });
  test('renders section with badge and title', () => {
    render(<OptimizationSection />);

    const section = screen.getByTestId('optimization-section');
    expect(within(section).getByText('V8 Hidden Classes')).toBeInTheDocument();
    expect(within(section).getByText('Advanced')).toBeInTheDocument();
  });

  test('renders description', () => {
    render(<OptimizationSection />);

    const section = screen.getByTestId('optimization-section');
    expect(
      within(section).getByText(
        'Visualize how V8 optimizes objects with consistent shapes.',
      ),
    ).toBeInTheDocument();
  });

  test('renders V8HiddenClassDemo component', () => {
    render(<OptimizationSection />);

    const section = screen.getByTestId('optimization-section');
    expect(within(section).getByTestId('v8-good-pattern')).toBeInTheDocument();
    expect(within(section).getByTestId('v8-bad-pattern')).toBeInTheDocument();
    expect(within(section).getByTestId('v8-reset')).toBeInTheDocument();
  });

  test('displays key takeaway section', () => {
    render(<OptimizationSection />);

    const section = screen.getByTestId('optimization-section');
    expect(within(section).getByText('Key Takeaway')).toBeInTheDocument();
    // Check that takeaway contains expected keywords (text may be split)
    expect(
      within(section).getAllByText(/Always/i).length +
        within(section).getAllByText(/exact same order/i).length,
    ).toBeGreaterThanOrEqual(2);
  });
});
