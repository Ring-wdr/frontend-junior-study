import { afterEach, describe, expect, test } from '@rstest/core';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react';
import { V8PipelineSection } from '../../../src/weeks/week1/components/v8-pipeline-section';

const advance = (times: number) => {
  const next = screen.getByTestId('v8-pipeline-next');
  for (let i = 0; i < times; i++) fireEvent.click(next);
};

describe('V8PipelineSection', () => {
  afterEach(() => {
    cleanup();
  });

  test('renders the badge and starts at the parser', () => {
    render(<V8PipelineSection />);

    const section = screen.getByTestId('v8-pipeline-section');
    expect(within(section).getByText('V8')).toBeInTheDocument();
    expect(screen.getByTestId('v8-tier-0')).toHaveAttribute(
      'data-active',
      'true',
    );
    expect(screen.getByTestId('v8-pipeline-feedback')).toHaveTextContent(
      '(none yet)',
    );
  });

  test('feedback is collected in Ignition before tiering up', () => {
    render(<V8PipelineSection />);

    advance(2);
    expect(screen.getByTestId('v8-tier-1')).toHaveAttribute(
      'data-active',
      'true',
    );
    expect(screen.getByTestId('v8-pipeline-feedback')).toHaveTextContent(
      'Smi + Smi',
    );

    advance(3);
    expect(screen.getByTestId('v8-tier-4')).toHaveAttribute(
      'data-active',
      'true',
    );
    expect(screen.getByTestId('v8-pipeline-stage-title')).toHaveTextContent(
      'TurboFan',
    );
  });

  test('a new type deoptimizes back to Ignition', () => {
    render(<V8PipelineSection />);

    advance(6);

    expect(screen.getByTestId('v8-pipeline-stage-title')).toHaveTextContent(
      'Deoptimization',
    );
    expect(screen.getByTestId('v8-tier-1')).toHaveAttribute(
      'data-active',
      'true',
    );
    expect(screen.getByTestId('v8-tier-4')).toHaveAttribute(
      'data-active',
      'false',
    );
    expect(screen.getByTestId('v8-pipeline-feedback')).toHaveTextContent(
      'Smi + Smi, String + String',
    );
    expect(screen.getByTestId('v8-pipeline-next')).toBeDisabled();
  });
});
