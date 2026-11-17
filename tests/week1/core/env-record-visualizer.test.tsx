import { afterEach, describe, expect, rs, test } from '@rstest/core';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { ScopeClosureSection } from '../../../src/weeks/week1/components/scope-closure-section';

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

const advance = (times: number) => {
  const next = screen.getByTestId('env-record-next');
  for (let i = 0; i < times; i++) fireEvent.click(next);
};

describe('EnvRecordVisualizer', () => {
  afterEach(() => {
    cleanup();
  });

  test('starts with only the global record and counter in the TDZ', () => {
    render(<ScopeClosureSection />);

    expect(screen.getByTestId('env-record-global')).toHaveTextContent(
      '<uninitialized>',
    );
    expect(
      screen.queryByTestId('env-record-createCounter'),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('env-record-call-stack')).toHaveTextContent(
      'Global',
    );
  });

  test('calling createCounter pushes a frame and creates a record', () => {
    render(<ScopeClosureSection />);
    advance(1);

    expect(screen.getByTestId('env-record-call-stack')).toHaveTextContent(
      'createCounter()',
    );
    const record = screen.getByTestId('env-record-createCounter');
    expect(record).toHaveTextContent('count');
    expect(record).toHaveTextContent('[[OuterEnv]] → Global');
  });

  test('the record outlives its execution context', () => {
    render(<ScopeClosureSection />);
    advance(3);

    expect(screen.getByTestId('env-record-call-stack')).not.toHaveTextContent(
      'createCounter()',
    );
    expect(screen.getByTestId('env-record-createCounter')).toHaveTextContent(
      'Kept alive by a closure',
    );
  });

  test('each call gets a new record whose outer is the captured record', () => {
    render(<ScopeClosureSection />);
    advance(4);

    const inner = screen.getByTestId('env-record-increment');
    expect(inner).toHaveTextContent('[[OuterEnv]] → createCounter()');
    expect(
      within(screen.getByTestId('env-record-createCounter')).getByText('1'),
    ).toBeInTheDocument();

    advance(1);
    expect(
      screen.queryByTestId('env-record-increment'),
    ).not.toBeInTheDocument();

    advance(1);
    expect(
      within(screen.getByTestId('env-record-createCounter')).getByText('2'),
    ).toBeInTheDocument();
  });
});

describe('ScopeClosureSection deep dive content', () => {
  afterEach(() => {
    cleanup();
  });

  test('explains the mechanism and the engine view', () => {
    render(<ScopeClosureSection />);

    const section = screen.getByTestId('scope-closure-section');
    expect(
      within(section).getByRole('heading', {
        level: 3,
        name: 'How closures really work',
      }),
    ).toBeInTheDocument();
    expect(
      within(section).getByRole('heading', {
        level: 3,
        name: "The engine's view: V8 Contexts",
      }),
    ).toBeInTheDocument();
    expect(
      within(section).getByText(/They do not hold copies of a variable/),
    ).toBeInTheDocument();
  });

  test('pitfall tabs switch the selected example', () => {
    render(<ScopeClosureSection />);

    const first = screen.getByTestId('closure-pitfalls-tab-0');
    const second = screen.getByTestId('closure-pitfalls-tab-1');
    expect(first).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(second);

    expect(second).toHaveAttribute('aria-pressed', 'true');
    expect(first).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByTestId('closure-pitfalls-panel-1')).toHaveTextContent(
      'CreatePerIterationEnvironment',
    );
  });
});
