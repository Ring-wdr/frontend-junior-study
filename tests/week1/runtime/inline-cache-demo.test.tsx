import { afterEach, describe, expect, test } from '@rstest/core';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { InlineCacheDemo } from '../../../src/weeks/week1/components/inline-cache-demo';

const state = () => screen.getByTestId('ic-state');

describe('InlineCacheDemo', () => {
  afterEach(() => {
    cleanup();
  });

  test('starts uninitialized with an empty cache', () => {
    render(<InlineCacheDemo />);

    expect(state()).toHaveTextContent('Uninitialized');
    expect(screen.getByText('Not called yet')).toBeInTheDocument();
  });

  test('repeated calls with one shape stay monomorphic', () => {
    render(<InlineCacheDemo />);
    const same = screen.getByTestId('ic-call-same');

    fireEvent.click(same);
    fireEvent.click(same);
    fireEvent.click(same);

    expect(state()).toHaveTextContent('Monomorphic');
    expect(screen.getByTestId('ic-entries').children).toHaveLength(1);
    expect(screen.getByText('3 calls')).toBeInTheDocument();
  });

  test('two to four shapes are polymorphic, five are megamorphic', () => {
    render(<InlineCacheDemo />);
    const fresh = screen.getByTestId('ic-call-new');

    fireEvent.click(fresh);
    fireEvent.click(fresh);
    expect(state()).toHaveTextContent('Polymorphic');

    fireEvent.click(fresh);
    fireEvent.click(fresh);
    expect(state()).toHaveTextContent('Polymorphic');
    expect(screen.getByTestId('ic-entries').children).toHaveLength(4);

    fireEvent.click(fresh);
    expect(state()).toHaveTextContent('Megamorphic');
    expect(screen.getByTestId('ic-overflow')).toBeInTheDocument();
  });

  test('reset clears the feedback', () => {
    render(<InlineCacheDemo />);

    fireEvent.click(screen.getByTestId('ic-call-new'));
    fireEvent.click(screen.getByTestId('ic-reset'));

    expect(state()).toHaveTextContent('Uninitialized');
  });
});
