import { describe, expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, within } from '@testing-library/react';
import type React from 'react';
import { ThisBindingSection } from '../../../src/page/week1/components/this-binding-section';

// Mock framer-motion
rs.mock('framer-motion', async () => {
  const actual = await rs.importActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
  };
});

describe('ThisBindingSection', () => {
  test('renders section with badge and title', () => {
    render(<ThisBindingSection />);

    const section = screen.getByTestId('this-binding-section');
    expect(within(section).getByText(/5 Rules of/)).toBeInTheDocument();
    expect(within(section).getByText('Core')).toBeInTheDocument();
  });

  test('renders ThisBindingDemo with example buttons', () => {
    render(<ThisBindingSection />);

    const section = screen.getByTestId('this-binding-section');
    expect(within(section).getByTestId('this-binding-default')).toBeInTheDocument();
    expect(within(section).getByTestId('this-binding-implicit')).toBeInTheDocument();
    expect(within(section).getByTestId('this-binding-explicit')).toBeInTheDocument();
    expect(within(section).getByTestId('this-binding-new')).toBeInTheDocument();
    expect(within(section).getByTestId('this-binding-arrow')).toBeInTheDocument();
  });

  test('displays implicit binding by default', () => {
    render(<ThisBindingSection />);

    const section = screen.getByTestId('this-binding-section');
    expect(within(section).getByText("Object method call → 'this' is the object")).toBeInTheDocument();
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
