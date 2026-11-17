import { afterEach, describe, expect, test } from '@rstest/core';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MergePlayground } from '../../src/weeks/week6/components/merge-playground';

const pick = (utility: string) =>
  fireEvent.click(screen.getByTestId(`merge-override-${utility}`));
const result = (id: string) => screen.getByTestId(`merge-result-${id}`);

describe('MergePlayground', () => {
  afterEach(() => {
    cleanup();
  });

  test('both strategies agree when nothing is overridden', () => {
    render(<MergePlayground />);

    expect(result('concat')).toHaveAttribute('data-correct', 'true');
    expect(result('merged')).toHaveAttribute('data-correct', 'true');
    expect(screen.getByTestId('merge-concat-paddingInline')).toHaveTextContent(
      '16px',
    );
  });

  test('a shorthand override loses to earlier longhands when concatenated', () => {
    render(<MergePlayground />);
    pick('p-6');

    expect(screen.getByTestId('merge-classes-concat')).toHaveTextContent(
      'px-4 py-2 bg-red-500 p-6',
    );
    expect(result('concat')).toHaveAttribute('data-correct', 'false');
    expect(screen.getByTestId('merge-concat-paddingInline')).toHaveTextContent(
      '16px',
    );
    expect(screen.getByTestId('merge-concat-paddingBlock')).toHaveTextContent(
      '8px',
    );

    expect(screen.getByTestId('merge-classes-merged')).toHaveTextContent(
      'bg-red-500 p-6',
    );
    expect(result('merged')).toHaveAttribute('data-correct', 'true');
    expect(screen.getByTestId('merge-merged-paddingInline')).toHaveTextContent(
      '24px',
    );
  });

  test('a color override earlier in the stylesheet is ignored without merging', () => {
    render(<MergePlayground />);
    pick('bg-blue-500');

    expect(screen.getByTestId('merge-concat-background')).toHaveTextContent(
      'red-500',
    );
    expect(result('concat')).toHaveAttribute('data-correct', 'false');
    expect(screen.getByTestId('merge-merged-background')).toHaveTextContent(
      'blue-500',
    );
    expect(result('merged')).toHaveAttribute('data-correct', 'true');
  });

  test('an override that happens to come later in the stylesheet works either way', () => {
    render(<MergePlayground />);
    pick('px-6');

    expect(result('concat')).toHaveAttribute('data-correct', 'true');
    expect(result('merged')).toHaveAttribute('data-correct', 'true');
    expect(screen.getByTestId('merge-classes-merged')).toHaveTextContent(
      'py-2 bg-red-500 px-6',
    );
  });
});
