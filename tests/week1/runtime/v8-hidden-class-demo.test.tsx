import { afterEach, describe, expect, rs, test } from '@rstest/core';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { V8HiddenClassDemo } from '../../../src/weeks/week1/components/v8-hidden-class-demo';

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

describe('V8HiddenClassDemo', () => {
  afterEach(() => {
    cleanup();
  });
  test('renders buttons correctly', () => {
    render(<V8HiddenClassDemo />);
    expect(
      screen.getByRole('button', { name: /Good Pattern/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Bad Pattern/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Reset/i })).toBeInTheDocument();
  });

  test('Good Pattern shows shared hidden class message', () => {
    render(<V8HiddenClassDemo />);
    const goodButton = screen.getByTestId('v8-good-pattern');

    fireEvent.click(goodButton);

    expect(screen.getByText(/Monomorphic \(Optimized\)/)).toBeInTheDocument();
    expect(
      screen.getByText(/All objects share the same Hidden Class/),
    ).toBeInTheDocument();
    expect(screen.getAllByText('HC1')).toHaveLength(3);
  });

  test('Bad Pattern shows different hidden class message', () => {
    render(<V8HiddenClassDemo />);
    const badButton = screen.getByTestId('v8-bad-pattern');

    fireEvent.click(badButton);

    expect(screen.getByText(/Polymorphic \(Slow\)/)).toBeInTheDocument();
    expect(screen.getByText(/Different Hidden Classes/)).toBeInTheDocument();
    expect(screen.getAllByText('HC1').length).toBeGreaterThan(0);
    expect(screen.getByText('HC2')).toBeInTheDocument();
    expect(screen.getByText('HC3')).toBeInTheDocument();
  });

  test('Reset button clears objects', async () => {
    render(<V8HiddenClassDemo />);
    const goodButton = screen.getByTestId('v8-good-pattern');
    fireEvent.click(goodButton);

    expect(screen.getAllByText('HC1').length).toBeGreaterThan(0);

    const resetButton = screen.getByTestId('v8-reset');
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(screen.queryAllByText('HC1')).toHaveLength(0);
    });
  });
});
