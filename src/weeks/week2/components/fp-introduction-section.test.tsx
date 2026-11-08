import { describe, expect, it } from '@rstest/core';
import { render, screen } from '@testing-library/react';

import { FpIntroductionSection } from './fp-introduction-section';

describe('FpIntroductionSection', () => {
  it('should render the section with correct badge', () => {
    render(<FpIntroductionSection />);

    expect(screen.getByText('Functional Programming')).toBeInTheDocument();
  });

  it('should render the main title', () => {
    const { container } = render(<FpIntroductionSection />);

    expect(container.textContent).toContain('Introduction to FP');
  });

  it('should render the description', () => {
    const { container } = render(<FpIntroductionSection />);

    expect(container.textContent).toContain(
      'Programming paradigm where programs are constructed by applying',
    );
  });

  it('should render Immutability subsection', () => {
    const { container } = render(<FpIntroductionSection />);

    expect(container.textContent).toContain('Immutability');
  });

  it('should display Immutability concept', () => {
    const { container } = render(<FpIntroductionSection />);

    expect(container.textContent).toContain(
      'Data is never modified; instead, a new copy with changes is created',
    );
  });

  it('should render Core Concepts info box', () => {
    const { container } = render(<FpIntroductionSection />);

    expect(container.textContent).toContain('Core Concepts');
  });

  it('should display Pure Functions concept', () => {
    const { container } = render(<FpIntroductionSection />);

    expect(container.textContent).toContain('Pure Functions');
    expect(container.textContent).toContain(
      'Given the same input, always return the same output',
    );
  });

  it('should display Higher-Order Functions concept', () => {
    const { container } = render(<FpIntroductionSection />);

    expect(container.textContent).toContain('Higher-Order Functions');
    expect(container.textContent).toContain(
      'Functions that take others as args',
    );
  });

  it('should render Currying section', () => {
    const { container } = render(<FpIntroductionSection />);

    expect(container.textContent).toContain('Currying');
    expect(container.textContent).toContain(
      'Function taking multiple args to Sequence of functions',
    );
  });

  it('should render Monads (Maybe) section', () => {
    const { container } = render(<FpIntroductionSection />);

    expect(container.textContent).toContain('Monads (Maybe)');
    expect(container.textContent).toContain('Safe chainable computations');
  });

  it('should display handling nulls concept', () => {
    const { container } = render(<FpIntroductionSection />);

    expect(container.textContent).toContain('Handling Nulls');
  });

  it('should have orange badge color', () => {
    const { container } = render(<FpIntroductionSection />);

    const badge = container.querySelector('[class*="bg-orange"]');
    expect(badge).toBeTruthy();
  });

  it('should render visualizer demo boxes', () => {
    const { container } = render(<FpIntroductionSection />);

    // Check for demo sections
    const boxes = container.querySelectorAll('[class*="bg-gray-50"]');
    expect(boxes.length).toBeGreaterThanOrEqual(2);
  });

  it('should display orange colored indicators', () => {
    const { container } = render(<FpIntroductionSection />);

    const indicators = container.querySelectorAll('[class*="bg-orange-500"]');
    expect(indicators.length).toBeGreaterThan(0);
  });

  it('should have blue indicator for Monad section', () => {
    const { container } = render(<FpIntroductionSection />);

    const blueIndicator = container.querySelector('[class*="bg-blue-500"]');
    expect(blueIndicator).toBeTruthy();
  });
});
