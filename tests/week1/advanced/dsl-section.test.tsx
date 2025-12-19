import { afterEach, describe, expect, test } from '@rstest/core';
import { cleanup, render, screen, within } from '@testing-library/react';
import { DslSection } from '../../../src/page/week1/components/dsl-section';

describe('DslSection', () => {
  afterEach(() => {
    cleanup();
  });
  test('renders section with badge and title', () => {
    render(<DslSection />);

    const section = screen.getByTestId('dsl-section');
    expect(
      within(section).getByText('Domain-Specific Language'),
    ).toBeInTheDocument();
    expect(within(section).getByText('DSL')).toBeInTheDocument();
  });

  test('renders description', () => {
    render(<DslSection />);

    const section = screen.getByTestId('dsl-section');
    expect(
      within(section).getByText(
        'Mini-languages tailored for specific problem domains.',
      ),
    ).toBeInTheDocument();
  });

  test('displays "What is a DSL?" section', () => {
    render(<DslSection />);

    const section = screen.getByTestId('dsl-section');
    expect(within(section).getByText('What is a DSL?')).toBeInTheDocument();
    expect(
      within(section).getByText(
        /Unlike General Purpose Languages \(GPL\) like Java or Python/,
      ),
    ).toBeInTheDocument();
  });

  test('displays DSL types', () => {
    render(<DslSection />);

    const section = screen.getByTestId('dsl-section');
    expect(within(section).getByText('Internal DSL:')).toBeInTheDocument();
    expect(within(section).getByText('External DSL:')).toBeInTheDocument();
  });

  test('displays JSX as Internal DSL example', () => {
    render(<DslSection />);

    const section = screen.getByTestId('dsl-section');
    expect(
      within(section).getByText(/React JSX \(Internal DSL\)/),
    ).toBeInTheDocument();
    expect(
      within(section).getByText(/JSX is a DSL for defining UI structure/),
    ).toBeInTheDocument();
  });

  test('displays SQL as External DSL example', () => {
    render(<DslSection />);

    const section = screen.getByTestId('dsl-section');
    expect(
      within(section).getByText(/SQL \(External DSL\)/),
    ).toBeInTheDocument();
  });
});
