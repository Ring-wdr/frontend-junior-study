import { afterEach, describe, expect, rs, test } from '@rstest/core';
import { cleanup, render, screen, within } from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { OptimizationSection } from '../../../src/weeks/week1/components/optimization-section';

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

describe('OptimizationSection', () => {
  afterEach(() => {
    cleanup();
  });
  test('renders the badge but leaves the title to the MDX heading', () => {
    render(<OptimizationSection />);

    const section = screen.getByTestId('optimization-section');
    expect(within(section).getByText('Advanced')).toBeInTheDocument();
    expect(
      within(section).queryByText('V8 Hidden Classes'),
    ).not.toBeInTheDocument();
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
