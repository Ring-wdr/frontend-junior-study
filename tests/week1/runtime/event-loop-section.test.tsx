import { afterEach, describe, expect, rs, test } from '@rstest/core';
import { cleanup, render, screen, within } from '@testing-library/react';
import type { ReactNode } from 'react';
import { EventLoopSection } from '../../../src/weeks/week1/components/event-loop-section';

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

describe('EventLoopSection', () => {
  afterEach(() => {
    cleanup();
  });
  test('renders section with badge and title', () => {
    render(<EventLoopSection />);

    const section = screen.getByTestId('event-loop-section');
    expect(
      within(section).getByText('Event Loop Visualizer'),
    ).toBeInTheDocument();
    expect(within(section).getByText('Runtime')).toBeInTheDocument();
  });

  test('renders description', () => {
    render(<EventLoopSection />);

    const section = screen.getByTestId('event-loop-section');
    expect(
      within(section).getByText(
        /Step through the Event Loop to understand how JavaScript handles async/,
      ),
    ).toBeInTheDocument();
  });

  test('displays Key Rule section', () => {
    render(<EventLoopSection />);

    const section = screen.getByTestId('event-loop-section');
    expect(within(section).getByText('Key Rule')).toBeInTheDocument();
    expect(
      within(section).getByText((content) => {
        return (
          content.includes('Microtasks') && content.includes('are processed')
        );
      }),
    ).toBeInTheDocument();
  });

  test('renders EventLoopVisualizer component', () => {
    render(<EventLoopSection />);

    const section = screen.getByTestId('event-loop-section');
    expect(
      within(section).getByTestId('event-loop-next-step'),
    ).toBeInTheDocument();
    expect(
      within(section).getByTestId('event-loop-run-all'),
    ).toBeInTheDocument();
    expect(within(section).getByTestId('event-loop-reset')).toBeInTheDocument();
    expect(within(section).getByText('Call Stack')).toBeInTheDocument();
    expect(within(section).getByText('Microtask Queue')).toBeInTheDocument();
    expect(within(section).getByText('Macrotask Queue')).toBeInTheDocument();
  });

  test('displays sample code', () => {
    render(<EventLoopSection />);

    const section = screen.getByTestId('event-loop-section');
    // Check for console.log (text may be split)
    expect(
      within(section).getAllByText(/console/i).length +
        within(section).getAllByText(/Start/i).length,
    ).toBeGreaterThanOrEqual(2);
    expect(within(section).getAllByText(/setTimeout/i).length).toBeGreaterThan(
      0,
    );
    expect(within(section).getAllByText(/Promise/i).length).toBeGreaterThan(0);
  });
});
