import { describe, expect, test } from '@rstest/core';
import { render } from '@testing-library/react';
import { motion } from 'motion/react';

describe('d', () => {
  test('x', () => {
    console.log('IO', typeof IntersectionObserver, typeof ResizeObserver, typeof window.matchMedia);
    render(<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }}>hi</motion.div>);
    expect(1).toBe(1);
  });
});
