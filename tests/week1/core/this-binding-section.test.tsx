import { afterEach, describe, expect, rs, test } from '@rstest/core';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { createElement, type ReactNode } from 'react';
import { ThisBindingSection } from '../../../src/weeks/week1/components/this-binding-section';

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

describe('ThisBindingSection', () => {
  afterEach(() => {
    cleanup();
  });
  test('renders the badge but leaves the title to the MDX heading', () => {
    render(<ThisBindingSection />);

    const section = screen.getByTestId('this-binding-section');
    expect(within(section).getByText('Core')).toBeInTheDocument();
    expect(within(section).queryByText(/5 Rules of/)).not.toBeInTheDocument();
  });

  test('renders ThisBindingDemo with example buttons', () => {
    render(<ThisBindingSection />);

    const section = screen.getByTestId('this-binding-section');
    expect(
      within(section).getByTestId('this-binding-default'),
    ).toBeInTheDocument();
    expect(
      within(section).getByTestId('this-binding-implicit'),
    ).toBeInTheDocument();
    expect(
      within(section).getByTestId('this-binding-explicit'),
    ).toBeInTheDocument();
    expect(within(section).getByTestId('this-binding-new')).toBeInTheDocument();
    expect(
      within(section).getByTestId('this-binding-arrow'),
    ).toBeInTheDocument();
  });

  test('displays implicit binding by default', () => {
    render(<ThisBindingSection />);

    const section = screen.getByTestId('this-binding-section');
    expect(
      within(section).getByText("Object method call → 'this' is the object"),
    ).toBeInTheDocument();
  });

  test('switching to default binding shows its description', () => {
    render(<ThisBindingSection />);

    const section = screen.getByTestId('this-binding-section');
    const defaultButton = within(section).getByTestId('this-binding-default');
    fireEvent.click(defaultButton);

    expect(
      within(section).getByText(
        'Standalone function call → global object (or undefined in strict mode)',
      ),
    ).toBeInTheDocument();
  });

  test('clicking explicit binding shows explicit binding content', () => {
    render(<ThisBindingSection />);

    const section = screen.getByTestId('this-binding-section');
    const explicitButton = within(section).getByTestId('this-binding-explicit');
    fireEvent.click(explicitButton);

    expect(
      within(section).getByText("call/apply/bind → manually specify 'this'"),
    ).toBeInTheDocument();
  });
});
