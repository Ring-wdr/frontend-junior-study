import { afterEach, describe, expect, rs, test } from '@rstest/core';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { MemoryGcSection } from '../../../src/weeks/week1/components/memory-gc-section';

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

const space = (name: string) => screen.getByTestId(`gc-space-${name}`);
const objectsIn = (name: string) =>
  within(space(name)).queryAllByTestId(/^gc-object-/);

describe('MemoryGcSection', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders the badge and collection algorithms', () => {
    render(<MemoryGcSection />);

    const section = screen.getByTestId('memory-gc-section');
    expect(within(section).getByText('Memory')).toBeInTheDocument();
    expect(
      within(section).getByRole('heading', {
        level: 4,
        name: 'Scavenger (Minor GC)',
      }),
    ).toBeInTheDocument();
    expect(
      within(section).getByRole('heading', {
        level: 4,
        name: 'Mark-Compact (Major GC)',
      }),
    ).toBeInTheDocument();
  });

  test('new objects are allocated in the nursery until it is full', () => {
    render(<MemoryGcSection />);
    const allocate = screen.getByTestId('gc-allocate');

    fireEvent.click(allocate);
    expect(objectsIn('nursery')).toHaveLength(3);

    fireEvent.click(allocate);
    expect(objectsIn('nursery')).toHaveLength(6);
    expect(allocate).toBeDisabled();
    expect(screen.getByTestId('gc-status')).toHaveTextContent(
      'The nursery is full',
    );
  });

  test('a scavenge reclaims unreachable objects and moves survivors', () => {
    render(<MemoryGcSection />);

    fireEvent.click(screen.getByTestId('gc-allocate'));
    fireEvent.click(screen.getByTestId('gc-object-2'));
    expect(screen.getByTestId('gc-object-2')).toHaveAttribute(
      'aria-pressed',
      'true',
    );

    fireEvent.click(screen.getByTestId('gc-scavenge'));

    expect(objectsIn('nursery')).toHaveLength(0);
    expect(objectsIn('intermediate')).toHaveLength(2);
    expect(screen.queryByTestId('gc-object-2')).not.toBeInTheDocument();
    expect(screen.getByTestId('gc-status')).toHaveTextContent(
      '1 unreachable reclaimed, 2 survivors moved, 0 promoted',
    );
  });

  test('objects that survive two scavenges are promoted to old space', () => {
    render(<MemoryGcSection />);

    fireEvent.click(screen.getByTestId('gc-allocate'));
    fireEvent.click(screen.getByTestId('gc-scavenge'));
    fireEvent.click(screen.getByTestId('gc-scavenge'));

    expect(objectsIn('old')).toHaveLength(3);
    expect(objectsIn('intermediate')).toHaveLength(0);
  });

  test('only a major GC reclaims unreachable objects in old space', () => {
    render(<MemoryGcSection />);

    fireEvent.click(screen.getByTestId('gc-allocate'));
    fireEvent.click(screen.getByTestId('gc-scavenge'));
    fireEvent.click(screen.getByTestId('gc-scavenge'));
    fireEvent.click(screen.getByTestId('gc-object-1'));

    fireEvent.click(screen.getByTestId('gc-scavenge'));
    expect(objectsIn('old')).toHaveLength(3);

    fireEvent.click(screen.getByTestId('gc-major'));
    expect(objectsIn('old')).toHaveLength(2);
    expect(screen.getByTestId('gc-status')).toHaveTextContent(
      'reclaimed 1 unreachable objects',
    );
  });
});
