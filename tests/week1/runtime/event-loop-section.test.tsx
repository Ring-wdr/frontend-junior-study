import { afterEach, describe, expect, rs, test } from '@rstest/core';
import { cleanup, render, screen, within } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { EventLoopSection } from '../../../src/weeks/week1/components/event-loop-section';

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

describe('EventLoopSection', () => {
  afterEach(() => {
    cleanup();
  });
  test('renders the badge but leaves the title to the MDX heading', () => {
    render(<EventLoopSection />);

    const section = screen.getByTestId('event-loop-section');
    expect(within(section).getByText('Runtime')).toBeInTheDocument();
    expect(
      within(section).queryByText('Event Loop Visualizer'),
    ).not.toBeInTheDocument();
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
