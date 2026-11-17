import { afterEach, describe, expect, test } from '@rstest/core';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { AccessibilitySection } from '../../src/weeks/week6/components/accessibility-section';
import { CascadeSection } from '../../src/weeks/week6/components/cascade-section';
import { ComponentSystemsSection } from '../../src/weeks/week6/components/component-systems-section';
import { CssInJsSection } from '../../src/weeks/week6/components/css-in-js-section';
import { CssModulesSection } from '../../src/weeks/week6/components/css-modules-section';
import { DesignSystemSection } from '../../src/weeks/week6/components/design-system-section';
import { MergingSection } from '../../src/weeks/week6/components/merging-section';
import { ResponsiveSection } from '../../src/weeks/week6/components/responsive-section';
import { StylexSection } from '../../src/weeks/week6/components/stylex-section';
import { TailwindSection } from '../../src/weeks/week6/components/tailwind-section';
import { ThemeSection } from '../../src/weeks/week6/components/theme-section';
import { VanillaExtractSection } from '../../src/weeks/week6/components/vanilla-extract-section';

const heading = (section: HTMLElement, name: string | RegExp) =>
  within(section).getByRole('heading', { level: 3, name });

describe('Week 6 sections', () => {
  afterEach(() => {
    cleanup();
  });

  test('token tiers switch only the semantic mapping', () => {
    render(<DesignSystemSection />);
    const section = screen.getByTestId('design-system-section');

    expect(heading(section, 'Three tiers of tokens')).toBeInTheDocument();
    expect(screen.getByTestId('token-semantic-background')).toHaveTextContent(
      'white',
    );

    fireEvent.click(screen.getByTestId('token-theme-dark'));

    expect(screen.getByTestId('token-semantic-background')).toHaveTextContent(
      'gray-900',
    );
    expect(screen.getByTestId('token-semantic-primary')).toHaveTextContent(
      'blue-400',
    );
  });

  test('cascade section lists the four criteria', () => {
    render(<CascadeSection />);
    const section = screen.getByTestId('cascade-section');

    expect(
      heading(section, 'How the cascade picks a winner'),
    ).toBeInTheDocument();
    expect(within(section).getAllByRole('listitem')).toHaveLength(4);
    expect(
      within(section).getByText(/Order of appearance: when everything above/),
    ).toBeInTheDocument();
  });

  test('CSS Modules explains the generated class map', () => {
    render(<CssModulesSection />);
    const section = screen.getByTestId('css-modules-section');

    expect(
      heading(section, 'Compiled output: how class names become a JS object'),
    ).toBeInTheDocument();
    expect(heading(section, 'Duplicates and order')).toBeInTheDocument();
  });

  test('CSS-in-JS explains the runtime pipeline and its limits', () => {
    render(<CssInJsSection />);
    const section = screen.getByTestId('css-in-js-section');

    expect(heading(section, 'What happens at runtime')).toBeInTheDocument();
    expect(heading(section, 'Limits of this design')).toBeInTheDocument();
  });

  test('zero-runtime sections explain their build output', () => {
    render(<VanillaExtractSection />);
    render(<StylexSection />);

    expect(
      heading(
        screen.getByTestId('vanilla-extract-section'),
        'What happens at build time',
      ),
    ).toBeInTheDocument();
    const stylex = screen.getByTestId('stylex-section');
    expect(
      heading(
        stylex,
        'Compiled output: how a style object becomes a class map',
      ),
    ).toBeInTheDocument();
    expect(
      heading(stylex, 'Handling duplicates and conflicts'),
    ).toBeInTheDocument();
    expect(
      within(stylex).getByText("Astryx (Meta's open source design system)"),
    ).toBeInTheDocument();
  });

  test('Tailwind explains the engine and tailwind-merge', () => {
    render(<TailwindSection />);
    const section = screen.getByTestId('tailwind-section');

    expect(heading(section, 'What happens in the build')).toBeInTheDocument();
    expect(
      heading(section, 'Conflicts: why tailwind-merge is needed'),
    ).toBeInTheDocument();
  });

  test('merging section compares all five approaches', () => {
    render(<MergingSection />);
    const section = screen.getByTestId('merging-section');

    for (const name of [
      'CSS Modules',
      'Runtime CSS-in-JS',
      'Vanilla Extract',
      'StyleX',
      'Tailwind',
    ]) {
      expect(
        within(section).getByRole('rowheader', { name }),
      ).toBeInTheDocument();
    }
    expect(within(section).getByTestId('atomic-map-demo')).toBeInTheDocument();
    expect(within(section).getByTestId('merge-playground')).toBeInTheDocument();
  });

  test('component systems section covers shadcn/ui and Astryx', () => {
    render(<ComponentSystemsSection />);
    const section = screen.getByTestId('component-systems-section');

    expect(
      heading(section, 'shadcn/ui: source copied into your project'),
    ).toBeInTheDocument();
    expect(
      heading(section, 'Astryx: shipped as a package'),
    ).toBeInTheDocument();
    expect(
      within(section).getByRole('columnheader', { name: 'Astryx' }),
    ).toBeInTheDocument();

    const tab = screen.getByTestId('component-systems-code-tab-3');
    fireEvent.click(tab);
    expect(tab).toHaveAttribute('aria-pressed', 'true');
    expect(
      screen.getByTestId('component-systems-code-panel-3'),
    ).toHaveTextContent('The @layer declaration on the first line is the key');
  });

  test('theme, responsive and accessibility sections render', () => {
    render(<ThemeSection />);
    render(<ResponsiveSection />);
    render(<AccessibilitySection />);

    expect(
      heading(
        screen.getByTestId('theme-section'),
        'Avoiding the flash on first paint',
      ),
    ).toBeInTheDocument();
    expect(
      heading(
        screen.getByTestId('responsive-section'),
        'Responsive beyond the viewport',
      ),
    ).toBeInTheDocument();
    expect(screen.getByTestId('accessibility-section')).toBeInTheDocument();
  });
});
