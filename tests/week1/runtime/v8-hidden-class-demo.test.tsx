import { describe, expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen } from '@testing-library/react';
import type React from 'react';
import type { ComponentProps } from 'react';
import { V8HiddenClassDemo } from '../../../src/page/week1/components/v8-hidden-class-demo';

// Mock framer-motion
rs.mock('framer-motion', async () => {
  const actual = await rs.importActual('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    motion: {
      div: ({ children, ...props }: ComponentProps<'div'>) => (
        <div {...props}>{children}</div>
      ),
    },
  };
});

describe('V8HiddenClassDemo', () => {
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
    expect(screen.getByText('HC1')).toBeInTheDocument();
    expect(screen.getByText('HC2')).toBeInTheDocument();
    expect(screen.getByText('HC3')).toBeInTheDocument();
  });

  test('Reset button clears objects', () => {
    render(<V8HiddenClassDemo />);
    const goodButton = screen.getByTestId('v8-good-pattern');
    fireEvent.click(goodButton);

    expect(screen.getByText('HC1')).toBeInTheDocument();

    const resetButton = screen.getByTestId('v8-reset');
    fireEvent.click(resetButton);

    expect(screen.queryByText('HC1')).not.toBeInTheDocument();
  });
});
