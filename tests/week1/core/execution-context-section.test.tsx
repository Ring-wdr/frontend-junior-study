import { afterEach, describe, expect, test } from '@rstest/core';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { ExecutionContextSection } from '../../../src/weeks/week1/components/execution-context-section';

describe('ExecutionContextSection', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders the badge, subsections and environment record kinds', () => {
    render(<ExecutionContextSection />);

    const section = screen.getByTestId('execution-context-section');
    expect(within(section).getByText('Core')).toBeInTheDocument();
    expect(
      within(section).getByRole('heading', {
        level: 3,
        name: 'What an execution context holds',
      }),
    ).toBeInTheDocument();
    for (const name of [
      'LexicalEnvironment',
      'VariableEnvironment',
      'Declarative',
      'Function',
      'Object',
      'Global',
      'Module',
    ]) {
      expect(
        within(section).getByRole('heading', { level: 4, name }),
      ).toBeInTheDocument();
    }
  });

  test('creation phase shows var as undefined and let as uninitialized', () => {
    render(<ExecutionContextSection />);

    expect(screen.getByTestId('hoisting-binding-a')).toHaveTextContent(
      'undefined',
    );
    expect(screen.getByTestId('hoisting-binding-b')).toHaveTextContent(
      '<uninitialized>',
    );
    expect(screen.getByTestId('hoisting-binding-fn')).toHaveTextContent(
      'ƒ fn()',
    );
    expect(screen.getByTestId('hoisting-output')).toHaveTextContent(
      'No output yet',
    );
    expect(screen.getByTestId('hoisting-prev')).toBeDisabled();
  });

  test('stepping through initializes bindings in source order', () => {
    render(<ExecutionContextSection />);
    const next = screen.getByTestId('hoisting-next');

    fireEvent.click(next);
    expect(screen.getByTestId('hoisting-output')).toHaveTextContent(
      '> undefined',
    );

    fireEvent.click(next);
    fireEvent.click(next);
    expect(screen.getByTestId('hoisting-binding-a')).toHaveTextContent('1');
    expect(screen.getByTestId('hoisting-binding-b')).toHaveTextContent(
      '<uninitialized>',
    );

    fireEvent.click(next);
    expect(screen.getByTestId('hoisting-description')).toHaveTextContent(
      'ReferenceError',
    );

    fireEvent.click(next);
    expect(screen.getByTestId('hoisting-binding-b')).toHaveTextContent('2');

    fireEvent.click(next);
    expect(screen.getByTestId('hoisting-output')).toHaveTextContent('> 3');
    expect(next).toBeDisabled();
    expect(screen.getByTestId('hoisting-progress')).toHaveTextContent(
      'Step 7/7',
    );
  });

  test('reset returns to the creation phase', () => {
    render(<ExecutionContextSection />);

    fireEvent.click(screen.getByTestId('hoisting-next'));
    fireEvent.click(screen.getByTestId('hoisting-reset'));

    expect(screen.getByTestId('hoisting-progress')).toHaveTextContent(
      'Step 1/7',
    );
    expect(screen.getByText('Creation phase')).toBeInTheDocument();
  });
});
