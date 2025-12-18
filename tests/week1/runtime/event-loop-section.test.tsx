import { afterEach, describe, expect, rs, test } from '@rstest/core';
import { cleanup, render, screen, within } from '@testing-library/react';
import type React from 'react';
import type { ComponentProps } from 'react';
import { EventLoopSection } from '../../../src/page/week1/components/event-loop-section';

// Mock framer-motion
rs.mock('framer-motion', async () => {
  const actual = await rs.importActual('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    motion: {
      div: ({ children, ...props }: ComponentProps<'div'>) => {
        // biome-ignore lint: exclude style from props
        const { style, ...divProps } = props;
        return <div {...divProps}>{children}</div>;
      },
    },
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
        return content.includes('Microtasks') && content.includes('are processed');
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
    expect(
      within(section).getByText(/console.log\('Start'\)/),
    ).toBeInTheDocument();
    expect(within(section).getByText(/setTimeout/)).toBeInTheDocument();
    expect(within(section).getByText(/Promise.resolve/)).toBeInTheDocument();
  });
});
