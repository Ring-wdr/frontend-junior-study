import { afterEach, describe, expect, rs, test } from '@rstest/core';
import { cleanup, render, screen, within } from '@testing-library/react';
import type React from 'react';
import { AsyncSection } from '../../../src/page/week1/components/async-section';

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
        within(section).getAllByText(/Rejects immediately if any rejects/).length,
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
    expect(within(section).getByText('Promise.withResolvers (ES2024)')).toBeInTheDocument();
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
    expect(within(section).getByText('AbortController (Cancel Async Tasks)')).toBeInTheDocument();
  });
});
