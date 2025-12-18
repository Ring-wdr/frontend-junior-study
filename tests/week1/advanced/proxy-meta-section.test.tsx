import { describe, expect, rs, test } from '@rstest/core';
import { fireEvent, render, screen, within } from '@testing-library/react';
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
    expect(within(section).getByText('const target =')).toBeInTheDocument();
    expect(within(section).getByText('const handler =')).toBeInTheDocument();
    expect(within(section).getByText('const proxy = new Proxy(target, handler);')).toBeInTheDocument();
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

    expect(within(section).getByText(/Trap Triggered → Reflect.get/)).toBeInTheDocument();
  });

  test('clicking read secret shows blocked message', () => {
    render(<ProxyMetaSection />);

    const section = screen.getByTestId('proxy-meta-section');
    const readSecretButton = within(section).getByText("Read 'secret'");
    fireEvent.click(readSecretButton);

    expect(within(section).getByText(/Blocked access to 'secret'/)).toBeInTheDocument();
  });

  test('clicking set message shows set log entry', () => {
    render(<ProxyMetaSection />);

    const section = screen.getByTestId('proxy-meta-section');
    const setButton = within(section).getByText("Set 'message'");
    fireEvent.click(setButton);

    expect(within(section).getByText(/Trap Triggered → Reflect.set/)).toBeInTheDocument();
  });
});
