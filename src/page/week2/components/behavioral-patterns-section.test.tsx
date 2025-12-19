import { describe, expect, it } from '@rstest/core';
import { render, screen } from '@testing-library/react';

import { BehavioralPatternsSection } from './behavioral-patterns-section';

describe('BehavioralPatternsSection', () => {
  it('should render the section with correct badge', () => {
    render(<BehavioralPatternsSection />);

    expect(screen.getByText('Design Patterns')).toBeInTheDocument();
  });

  it('should render the main title', () => {
    const { container } = render(<BehavioralPatternsSection />);

    expect(container.textContent).toContain('Behavioral Patterns');
  });

  it('should render the description', () => {
    const { container } = render(<BehavioralPatternsSection />);

    expect(container.textContent).toContain(
      'Patterns concerned with algorithms and the assignment of responsibilities between objects.',
    );
  });

  it('should render Observer Pattern subsection', () => {
    const { container } = render(<BehavioralPatternsSection />);

    expect(container.textContent).toContain('Observer Pattern');
  });

  it('should display Observer Pattern description', () => {
    const { container } = render(<BehavioralPatternsSection />);

    expect(container.textContent).toContain('Lets you define a subscription mechanism');
  });

  it('should display Observer Pattern examples', () => {
    const { container } = render(<BehavioralPatternsSection />);

    expect(container.textContent).toContain('Common in JS:');
  });

  it('should render Strategy Pattern card', () => {
    const { container } = render(<BehavioralPatternsSection />);

    expect(container.textContent).toContain('Strategy Pattern');
    expect(container.textContent).toContain('Interchangeable algorithms');
  });

  it('should render State Pattern card', () => {
    const { container } = render(<BehavioralPatternsSection />);

    expect(container.textContent).toContain('State');
    expect(container.textContent).toContain(
      'Lets an object alter its behavior when its internal state changes',
    );
  });

  it('should render Command Pattern card', () => {
    const { container } = render(<BehavioralPatternsSection />);

    expect(container.textContent).toContain('Command');
    expect(container.textContent).toContain('Turns a request into a stand-alone object');
  });

  it('should render Template Method Pattern card', () => {
    const { container } = render(<BehavioralPatternsSection />);

    expect(container.textContent).toContain('Template Method');
    expect(container.textContent).toContain('Defines the skeleton of an algorithm');
  });

  it('should have green badge color', () => {
    const { container } = render(<BehavioralPatternsSection />);

    const badge = container.querySelector('[class*="bg-green"]');
    expect(badge).toBeTruthy();
  });

  it('should render all pattern cards', () => {
    const { container } = render(<BehavioralPatternsSection />);

    const cards = container.querySelectorAll('[class*="bg-gray-50"]');
    expect(cards.length).toBeGreaterThanOrEqual(4);
  });

  it('should display visual indicators for patterns', () => {
    const { container } = render(<BehavioralPatternsSection />);

    // Check for green dots/indicators
    const indicators = container.querySelectorAll('[class*="bg-green-500"]');
    expect(indicators.length).toBeGreaterThan(0);
  });
});
