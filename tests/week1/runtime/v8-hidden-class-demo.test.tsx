import { afterEach, describe, expect, rs, test } from '@rstest/core';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { V8HiddenClassDemo } from '../../../src/weeks/week1/components/v8-hidden-class-demo';

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

  test('Reset button clears objects', () => {
    render(<V8HiddenClassDemo />);
    const goodButton = screen.getByTestId('v8-good-pattern');
    fireEvent.click(goodButton);

    expect(screen.getAllByText('HC1').length).toBeGreaterThan(0);

    const resetButton = screen.getByTestId('v8-reset');
    fireEvent.click(resetButton);

    expect(screen.queryAllByText('HC1')).toHaveLength(0);
  });
});
