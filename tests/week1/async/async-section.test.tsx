import { afterEach, describe, expect, rs, test } from '@rstest/core';
import { cleanup, render, screen, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import { AsyncSection } from '../../../src/weeks/week1/components/async-section';

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

describe('AsyncSection', () => {
  afterEach(() => {
    cleanup();
  });
  test('renders section with badge and title', () => {
    render(<AsyncSection />);

    const section = screen.getByTestId('async-section');
    expect(within(section).getByText('Promise Visualizer')).toBeInTheDocument();
    expect(within(section).getByText('Async')).toBeInTheDocument();
  });

  test('renders description', () => {
    render(<AsyncSection />);

    const section = screen.getByTestId('async-section');
    expect(
      within(section).getByText(
        'Interactively explore how different Promise combinators handle multiple asynchronous tasks.',
      ),
    ).toBeInTheDocument();
  });

  test('displays Promise combinator explanations', () => {
    render(<AsyncSection />);

    const section = screen.getByTestId('async-section');
    // Check for Promise combinator descriptions (text may be in cards/tabs)
    expect(
      within(section).getAllByText(/Wait for all to fulfill/).length +
        within(section).getAllByText(/Rejects immediately if any rejects/)
          .length,
    ).toBeGreaterThanOrEqual(1);

    expect(
      within(section).getAllByText(/Wait for all to finish/).length +
        within(section).getAllByText(/regardless of status/).length,
    ).toBeGreaterThanOrEqual(1);

    expect(
      within(section).getAllByText(/First settled promise/).length +
        within(section).getAllByText(/resolve OR reject/).length,
    ).toBeGreaterThanOrEqual(1);

    expect(
      within(section).getAllByText(/Wait for first fulfilled/).length +
        within(section).getAllByText(/Rejects only if ALL reject/).length,
    ).toBeGreaterThanOrEqual(1);
  });

  test('displays Promise.withResolvers section', () => {
    render(<AsyncSection />);

    const section = screen.getByTestId('async-section');
    expect(
      within(section).getByText('Promise.withResolvers (ES2024)'),
    ).toBeInTheDocument();
    expect(
      within(section).getByText(
        /Returns an object with a new Promise and its resolve\/reject functions/,
      ),
    ).toBeInTheDocument();
  });

  test('displays Promise.resolve section', () => {
    render(<AsyncSection />);

    const section = screen.getByTestId('async-section');
    expect(within(section).getByText('Promise.resolve')).toBeInTheDocument();
    expect(
      within(section).getByText('Creates an immediately fulfilled promise.'),
    ).toBeInTheDocument();
  });

  test('displays Promise.reject section', () => {
    render(<AsyncSection />);

    const section = screen.getByTestId('async-section');
    expect(within(section).getByText('Promise.reject')).toBeInTheDocument();
    expect(
      within(section).getByText('Creates an immediately rejected promise.'),
    ).toBeInTheDocument();
  });

  test('displays AbortController section', () => {
    render(<AsyncSection />);

    const section = screen.getByTestId('async-section');
    expect(
      within(section).getByText('AbortController (Cancel Async Tasks)'),
    ).toBeInTheDocument();
  });
});
