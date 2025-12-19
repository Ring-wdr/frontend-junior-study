import { describe, expect, it } from '@rstest/core';
import { render, screen } from '@testing-library/react';

import { StructuralPatternsSection } from './structural-patterns-section';

describe('StructuralPatternsSection', () => {
  it('should render the section with correct badge', () => {
    render(<StructuralPatternsSection />);

    expect(screen.getByText('Design Patterns')).toBeInTheDocument();
  });

  it('should render the main title', () => {
    const { container } = render(<StructuralPatternsSection />);

    expect(container.textContent).toContain('Structural Patterns');
  });

  it('should render the description', () => {
    const { container } = render(<StructuralPatternsSection />);

    expect(container.textContent).toContain(
      'Patterns concerned with how classes and objects are composed to form larger structures.',
    );
  });

  it('should render Decorator Pattern subsection', () => {
    const { container } = render(<StructuralPatternsSection />);

    expect(container.textContent).toContain('Decorator Pattern');
  });

  it('should display Decorator Pattern description', () => {
    const { container } = render(<StructuralPatternsSection />);

    expect(container.textContent).toContain('Attaches additional responsibilities to an object');
  });

  it('should display Decorator Pattern concept', () => {
    const { container } = render(<StructuralPatternsSection />);

    expect(container.textContent).toContain('Concept');
    expect(container.textContent).toContain('@Decorators');
  });

  it('should render Adapter Pattern card', () => {
    const { container } = render(<StructuralPatternsSection />);

    expect(container.textContent).toContain('Adapter Pattern');
    expect(container.textContent).toContain('Collaborate with incompatible interfaces');
  });

  it('should render Proxy Pattern card', () => {
    const { container } = render(<StructuralPatternsSection />);

    expect(container.textContent).toContain('Proxy Pattern');
    expect(container.textContent).toContain('A placeholder to control access');
  });

  it('should render Facade Pattern card', () => {
    const { container } = render(<StructuralPatternsSection />);

    expect(container.textContent).toContain('Facade Pattern');
    expect(container.textContent).toContain('Simplified interface for complex subsystems');
  });

  it('should render Bridge Pattern card', () => {
    const { container } = render(<StructuralPatternsSection />);

    expect(container.textContent).toContain('Bridge Pattern');
    expect(container.textContent).toContain('Connecting Abstractions');
  });

  it('should include code examples for decorators', () => {
    const { container } = render(<StructuralPatternsSection />);

    // Check for @Component, @readonly, @LogExecution in code blocks
    const text = container.textContent;
    expect(text).toContain('@Component');
    expect(text).toContain('@readonly');
    expect(text).toContain('@LogExecution');
  });

  it('should have indigo badge color', () => {
    const { container } = render(<StructuralPatternsSection />);

    const badge = container.querySelector('[class*="bg-indigo"]');
    expect(badge).toBeTruthy();
  });

  it('should render all pattern visualizers', () => {
    const { container } = render(<StructuralPatternsSection />);

    // Check for multiple pattern cards
    const cards = container.querySelectorAll('[class*="bg-gray-50"]');
    expect(cards.length).toBeGreaterThanOrEqual(4);
  });
});
