import { describe, expect, it } from '@rstest/core';
import { render, screen } from '@testing-library/react';

import { CreationPatternsSection } from './creation-patterns-section';

describe('CreationPatternsSection', () => {
  it('should render the section with correct badge', () => {
    render(<CreationPatternsSection />);

    expect(screen.getByText('Design Patterns')).toBeInTheDocument();
  });

  it('should render the main title', () => {
    const { container } = render(<CreationPatternsSection />);

    expect(container.textContent).toContain('Creation Patterns');
  });

  it('should render the description', () => {
    const { container } = render(<CreationPatternsSection />);

    expect(container.textContent).toContain(
      'Patterns focused on object creation mechanisms.',
    );
  });

  it('should render Singleton Pattern subsection', () => {
    const { container } = render(<CreationPatternsSection />);

    expect(container.textContent).toContain('Singleton Pattern');
  });

  it('should display Singleton Pattern description', () => {
    const { container } = render(<CreationPatternsSection />);

    expect(container.textContent).toContain('Ensures a class has only one instance');
  });

  it('should render Factory Pattern subsection', () => {
    const { container } = render(<CreationPatternsSection />);

    expect(container.textContent).toContain('Factory Pattern');
  });

  it('should display Factory Method information', () => {
    const { container } = render(<CreationPatternsSection />);

    expect(container.textContent).toContain('Factory Method');
    expect(container.textContent).toContain('Defines an interface for creating an object');
  });

  it('should display Abstract Factory information', () => {
    const { container } = render(<CreationPatternsSection />);

    expect(container.textContent).toContain('Abstract Factory');
    expect(container.textContent).toContain('Provides an interface for creating families');
  });

  it('should render Builder Pattern subsection', () => {
    const { container } = render(<CreationPatternsSection />);

    expect(container.textContent).toContain('Builder Pattern');
  });

  it('should display Builder Pattern description', () => {
    const { container } = render(<CreationPatternsSection />);

    expect(container.textContent).toContain('Separates the construction of a complex object');
  });

  it('should include code examples', () => {
    const { container } = render(<CreationPatternsSection />);

    // Check for code block presence
    const codeBlocks = container.querySelectorAll('[class*="bg-gray"]');
    expect(codeBlocks.length).toBeGreaterThan(0);
  });

  it('should render demo boxes for visualizers', () => {
    const { container } = render(<CreationPatternsSection />);

    // Check for DemoBox elements (should have divs for visualizers)
    const demoDivs = container.querySelectorAll('[class*="border"]');
    expect(demoDivs.length).toBeGreaterThan(0);
  });

  it('should have purple badge color', () => {
    const { container } = render(<CreationPatternsSection />);

    const badge = container.querySelector('[class*="bg-purple"]');
    expect(badge).toBeTruthy();
  });
});
