import { afterEach, describe, expect, rs, test } from '@rstest/core';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import type React from 'react';
import { ProxyMetaSection } from '../../../src/page/week1/components/proxy-meta-section';

// Mock framer-motion
rs.mock('framer-motion', async () => {
  const actual = await rs.importActual('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    motion: {
      div: ({ children, ...props }: Record<string, unknown>) => {
        // biome-ignore lint: exclude style from props
        const { style, ...divProps } = props;
        return <div {...divProps}>{children}</div>;
      },
    },
  };
});

describe('ProxyMetaSection', () => {
  afterEach(() => {
    cleanup();
  });
  test('renders section with badge and title', () => {
    render(<ProxyMetaSection />);

    const section = screen.getByTestId('proxy-meta-section');
    expect(within(section).getByText('Proxy & Reflect')).toBeInTheDocument();
    expect(within(section).getByText('Meta Programming')).toBeInTheDocument();
  });

  test('renders description', () => {
    render(<ProxyMetaSection />);

    const section = screen.getByTestId('proxy-meta-section');
    expect(
      within(section).getByText('Intercept and redefine fundamental operations.'),
    ).toBeInTheDocument();
  });

  test('renders code example', () => {
    render(<ProxyMetaSection />);

    const section = screen.getByTestId('proxy-meta-section');
    // Check that code example contains expected keywords (text may be split)
    expect(
      within(section).getAllByText(/const/i).length +
        within(section).getAllByText(/target/i).length,
    ).toBeGreaterThanOrEqual(2);
    expect(within(section).getAllByText(/Proxy/i).length).toBeGreaterThan(0);
  });

  test('renders interaction buttons', () => {
    render(<ProxyMetaSection />);

    const section = screen.getByTestId('proxy-meta-section');
    expect(within(section).getByText("Read 'message'")).toBeInTheDocument();
    expect(within(section).getByText("Read 'secret'")).toBeInTheDocument();
    expect(within(section).getByText("Set 'message'")).toBeInTheDocument();
  });

  test('displays proxy logs section', () => {
    render(<ProxyMetaSection />);

    const section = screen.getByTestId('proxy-meta-section');
    expect(within(section).getByText('Proxy Logs')).toBeInTheDocument();
    expect(
      within(section).getByText('Interactions will appear here...'),
    ).toBeInTheDocument();
  });

  test('clicking read message shows log entry', () => {
    render(<ProxyMetaSection />);

    const section = screen.getByTestId('proxy-meta-section');
    const readButton = within(section).getByText("Read 'message'");
    fireEvent.click(readButton);

    // Check for trap trigger and Reflect.get (text may be split)
    expect(
      within(section).getAllByText(/Trap/i).length +
        within(section).getAllByText(/Reflect\.get/i).length,
    ).toBeGreaterThanOrEqual(2);
  });

  test('clicking read secret shows blocked message', () => {
    render(<ProxyMetaSection />);

    const section = screen.getByTestId('proxy-meta-section');
    const readSecretButton = within(section).getByText("Read 'secret'");
    fireEvent.click(readSecretButton);

    // Check for blocked access message
    expect(
      within(section).getAllByText(/Blocked/i).length +
        within(section).getAllByText(/secret/i).length,
    ).toBeGreaterThanOrEqual(2);
  });

  test('clicking set message shows set log entry', () => {
    render(<ProxyMetaSection />);

    const section = screen.getByTestId('proxy-meta-section');
    const setButton = within(section).getByText("Set 'message'");
    fireEvent.click(setButton);

    // Check for trap trigger and Reflect.set (text may be split)
    expect(
      within(section).getAllByText(/Trap/i).length +
        within(section).getAllByText(/Reflect\.set/i).length,
    ).toBeGreaterThanOrEqual(2);
  });
});
