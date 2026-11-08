import {
  afterEach,
  beforeEach,
  describe,
  expect,
  rs,
  test,
} from '@rstest/core';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import type { ReactNode } from 'react';
import { EventLoopVisualizer } from '../../../src/weeks/week1/components/event-loop-visualizer';

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

describe('EventLoopVisualizer', () => {
  beforeEach(() => {
    rs.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    rs.useRealTimers();
  });

  test('renders initial state correctly', () => {
    render(<EventLoopVisualizer />);

    expect(screen.getByText('Click "Next Step" to begin')).toBeInTheDocument();
    expect(screen.getByText('Call Stack')).toBeInTheDocument();
    expect(screen.getByText('Microtask Queue')).toBeInTheDocument();
    expect(screen.getByText('Macrotask Queue')).toBeInTheDocument();
    expect(screen.getByText('Console Output:')).toBeInTheDocument();
  });

  test('Next Step button progresses the visualization', () => {
    render(<EventLoopVisualizer />);

    const nextButton = screen.getByTestId('event-loop-next-step');

    // Step 1: console.log("Start") pushed to call stack
    fireEvent.click(nextButton);
    expect(
      screen.getByText(/Execute: console.log\("Start"\)/),
    ).toBeInTheDocument();
    expect(screen.getAllByText('Start')[0]).toBeInTheDocument(); // In output

    // More clicks to progress...
    fireEvent.click(nextButton); // Pop call stack
    // After popping, the next step message should change
    expect(
      screen.getByText(/Execute: console.log\("Start"\)/).textContent,
    ).toBeTruthy();
  });

  test('Run All button executes all steps automatically', async () => {
    render(<EventLoopVisualizer />);
    const runAllButton = screen.getByTestId('event-loop-run-all');

    fireEvent.click(runAllButton);

    // Fast-forward processing
    act(() => {
      rs.runAllTimers();
    });

    await waitFor(() => {
      expect(screen.getByText('Timeout')).toBeInTheDocument();
    });
  });

  test('Reset button clears the state', () => {
    render(<EventLoopVisualizer />);
    const nextButton = screen.getByTestId('event-loop-next-step');
    fireEvent.click(nextButton);

    expect(
      screen.getByText(/Execute: console.log\("Start"\)/),
    ).toBeInTheDocument();

    const resetButton = screen.getByTestId('event-loop-reset');
    fireEvent.click(resetButton);

    expect(screen.getByText('Click "Next Step" to begin')).toBeInTheDocument();
  });
});
