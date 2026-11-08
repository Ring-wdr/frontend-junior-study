import { describe, expect, it } from '@rstest/core';
import { render, screen } from '@testing-library/react';

import { OopSolidSection } from './oop-solid-section';

describe('OopSolidSection', () => {
  it('should render the section with correct badge', () => {
    render(<OopSolidSection />);

    expect(screen.getByText('Object-Oriented Programming')).toBeInTheDocument();
  });

  it('should render the main title', () => {
    const { container } = render(<OopSolidSection />);

    expect(container.textContent).toContain('OOP & SOLID Principles');
  });

  it('should render the description', () => {
    const { container } = render(<OopSolidSection />);

    expect(container.textContent).toContain(
      'Core concepts of Object-Oriented Programming and design principles.',
    );
  });

  it('should render Core Concepts section', () => {
    const { container } = render(<OopSolidSection />);

    expect(container.textContent).toContain('Core Concepts');
  });

  it('should display OOP core concepts', () => {
    const { container } = render(<OopSolidSection />);

    expect(container.textContent).toContain('Encapsulation');
    expect(container.textContent).toContain('Inheritance');
    expect(container.textContent).toContain('Polymorphism');
  });

  it('should render SOLID Principles section', () => {
    const { container } = render(<OopSolidSection />);

    expect(container.textContent).toContain('SOLID Principles');
  });

  it('should display all SOLID principles', () => {
    const { container } = render(<OopSolidSection />);

    expect(container.textContent).toContain('Single Responsibility Principle');
    expect(container.textContent).toContain('Open-Closed Principle');
    expect(container.textContent).toContain('Liskov Substitution Principle');
    expect(container.textContent).toContain('Interface Segregation Principle');
    expect(container.textContent).toContain('Dependency Inversion Principle');
  });

  it('should render with blue badge color', () => {
    const { container } = render(<OopSolidSection />);

    // Check that the badge is rendered (component should pass color prop)
    const badge = container.querySelector('[class*="bg-blue"]');
    expect(badge).toBeTruthy();
  });
});
