import { afterEach, describe, expect, test } from '@rstest/core';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { AtomicMapDemo } from '../../src/weeks/week6/components/atomic-map-demo';

const counts = () => [
  screen.getByTestId('atomic-scoped-count').textContent,
  screen.getByTestId('atomic-count').textContent,
  screen.getByTestId('atomic-saved').textContent,
];

describe('AtomicMapDemo', () => {
  afterEach(() => {
    cleanup();
  });

  test('a single component has nothing to deduplicate', () => {
    render(<AtomicMapDemo />);

    expect(counts()).toEqual(['8', '8', '0']);
    expect(screen.getByTestId('atomic-map')).toHaveTextContent(
      "display: 'x3nfvp2'",
    );
  });

  test('a similar component adds one atomic rule', () => {
    render(<AtomicMapDemo />);
    fireEvent.click(screen.getByTestId('atomic-toggle-Badge'));

    expect(counts()).toEqual(['15', '9', '6']);
    expect(screen.getByTestId('atomic-sheet')).toHaveTextContent(
      '.x6s0dn4 { align-items: center }used in 2',
    );
  });

  test('all three components emit 13 declarations instead of 21', () => {
    render(<AtomicMapDemo />);
    fireEvent.click(screen.getByTestId('atomic-toggle-Badge'));
    fireEvent.click(screen.getByTestId('atomic-toggle-Card'));

    expect(counts()).toEqual(['21', '13', '8']);
  });

  test('deselecting everything shows the empty hint', () => {
    render(<AtomicMapDemo />);
    fireEvent.click(screen.getByTestId('atomic-toggle-Button'));

    expect(counts()).toEqual(['0', '0', '0']);
    expect(
      screen.getByText('Select a component to see the result.'),
    ).toBeInTheDocument();
  });
});
