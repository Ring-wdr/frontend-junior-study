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
} from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { EventLoopVisualizer } from '../../../src/weeks/week1/components/event-loop-visualizer';

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
    fireEvent.click(nextButton);
    expect(screen.getByText(/Step 2\/12: Pop Call Stack/)).toBeInTheDocument();
  });

  test('Run All button executes all steps automatically', () => {
    render(<EventLoopVisualizer />);
    const runAllButton = screen.getByTestId('event-loop-run-all');

    fireEvent.click(runAllButton);

    act(() => {
      rs.advanceTimersByTime(10_000);
    });

    expect(screen.getByText('Timeout')).toBeInTheDocument();
    expect(
      screen.getByText(/Step 12\/12: Pop Call Stack - Done!/),
    ).toBeInTheDocument();
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
