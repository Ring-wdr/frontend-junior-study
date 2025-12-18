import { afterEach, describe, expect, rs, test } from '@rstest/core';
import { cleanup, render, screen, within } from '@testing-library/react';
import type React from 'react';
import type { ComponentProps } from 'react';
import { OptimizationSection } from '../../../src/page/week1/components/optimization-section';

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
    expect(
      within(section).getByText(
        /Always initialize properties in the exact same order/,
      ),
    ).toBeInTheDocument();
  });
});
