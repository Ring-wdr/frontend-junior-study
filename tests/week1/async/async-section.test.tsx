import { afterEach, describe, expect, rs, test } from '@rstest/core';
import { cleanup, render, screen, within } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { AsyncSection } from '../../../src/weeks/week1/components/async-section';

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

describe('AsyncSection', () => {
  afterEach(() => {
    cleanup();
  });
  test('renders the badge but leaves the title to the MDX heading', () => {
    render(<AsyncSection />);

    const section = screen.getByTestId('async-section');
    expect(within(section).getByText('Async')).toBeInTheDocument();
    expect(
      within(section).queryByText('Promise Visualizer'),
    ).not.toBeInTheDocument();
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
