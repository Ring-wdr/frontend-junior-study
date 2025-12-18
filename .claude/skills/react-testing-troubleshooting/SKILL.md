---
name: react-testing-troubleshooting
description: Comprehensive guide for fixing React Testing Library issues in component tests. Use when tests are failing due to DOM query problems, syntax highlighting code splitting, animation/motion library conflicts, async state issues, or test pollution. Covers patterns for handling split text from syntax highlighting, framer-motion mocking, scope-limited queries with within(), and data-testid setup.
---

# React Testing Troubleshooting

## Overview

This skill helps diagnose and fix common React Testing Library issues that arise when testing components with syntax highlighting, animations, complex DOM structures, and async operations. Based on real patterns from component test development, it provides concrete solutions for the most frequent testing failures.

## Common Issues & Solutions

### 1. Syntax-Highlighted Code Text Split Across DOM Nodes

**Problem:** Components using react-syntax-highlighter split text into multiple `<span>` elements, causing text queries to fail.

```javascript
// FAILS
screen.getByText('const foo = "bar"')

// The actual DOM is:
// <span><span className="token">const</span> <span className="punctuation">foo</span> = <span className="string">"bar"</span></span>
```

**Solution:** Use function matchers with keyword-based checks:

```javascript
// PASS - Check for key parts of text
screen.getByText((content, element) =>
  content.includes('const') &&
  content.includes('foo') &&
  element.textContent.includes('"bar"')
)

// Or use getAllByText for multiple elements
const elements = screen.getAllByText((content) =>
  content.includes('keyword')
)
```

### 2. Framer-Motion Animation Styles in Tests

**Problem:** Framer-motion adds opacity, transform styles that interfere with test queries and component rendering.

**Solution:** Mock animation styles in `setupTests.ts`:

```javascript
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    ...jest.requireActual('framer-motion').motion,
    div: ({children, ...props}) => {
      // Remove animation-related props to avoid style conflicts
      const {initial, animate, exit, transition, ...cleanProps} = props
      return <div {...cleanProps}>{children}</div>
    }
  }
}))
```

### 3. Unscoped DOM Queries Causing False Positives

**Problem:** Queries match unexpected elements in the DOM, or fail due to multiple matches.

**Solution:** Use `within()` pattern to scope queries to specific containers:

```javascript
const sectionElement = screen.getByTestId('async-section')
const content = within(sectionElement).getByText('Promise')
const buttons = within(sectionElement).getAllByRole('button')
```

### 4. Test Pollution from Previous Tests

**Problem:** Cleanup hooks missing, causing state to leak between tests.

**Solution:** Add cleanup in `afterEach()`:

```javascript
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})
```

### 5. Missing data-testid Attributes

**Problem:** Cannot reliably query elements by role or text when multiple similar elements exist.

**Solution:** Add `data-testid` to components:

```tsx
export function Card({children, ...props}: CardProps) {
  return (
    <div data-testid={props['data-testid']} {...props}>
      {children}
    </div>
  )
}

// Use in tests
const card = screen.getByTestId('feature-card')
```

### 6. Async State & Event Loop Tests Timing Out

**Problem:** Tests for animation steps or async behavior timeout.

**Solution:** Increase timeout and use proper async patterns:

```javascript
it('should handle animation steps', async () => {
  render(<EventLoopVisualizer />)
  const button = screen.getByRole('button', {name: /step/i})

  fireEvent.click(button)

  // Wait for async updates
  await waitFor(() => {
    expect(screen.getByText(/processing/i)).toBeInTheDocument()
  }, {timeout: 3000})
})
```

### 7. Button/Element Queries with Split Text

**Problem:** Button text is split by elements like `<strong>`, `<code>`, etc.

**Solution:** Query by text content or use getAllByText with length checks:

```javascript
// FAILS - text is split
screen.getByRole('button', {name: 'Click me'})

// PASS - Match any button containing both parts
const buttons = screen.getAllByRole('button')
const myButton = buttons.find(btn =>
  btn.textContent.includes('Click') &&
  btn.textContent.includes('me')
)

// Or use getAllByText
const matches = screen.getAllByText((content, element) =>
  element?.tagName === 'BUTTON' &&
  content.includes('Click')
)
```

## Testing Patterns

See [PATTERNS.md](references/patterns.md) for detailed testing patterns and complete examples for:
- Tab component testing
- Code block rendering verification
- Component state reset assertions
- Multi-step async workflows

## Setup Checklist

1. **Component Setup:** Add `data-testid` props to all components needing test identification
2. **Mock Setup:** Configure framer-motion and animation library mocks in `setupTests.ts`
3. **Test File:** Import `{render, screen, within, cleanup, fireEvent, waitFor}` from testing library
4. **Cleanup:** Add `afterEach(() => cleanup())` to prevent test pollution
5. **Query Patterns:** Use within() for scoped queries, function matchers for split text

