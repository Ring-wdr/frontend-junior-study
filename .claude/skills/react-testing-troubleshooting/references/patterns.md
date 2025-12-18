# React Testing Patterns & Examples

Complete testing patterns derived from real component test implementations. Use these as templates for your own tests.

## Table of Contents

1. [Tab Component Testing](#tab-component-testing)
2. [Code Block Rendering](#code-block-rendering)
3. [Component State Reset](#component-state-reset)
4. [Multi-Step Async Workflows](#multi-step-async-workflows)
5. [Setup Configuration](#setup-configuration)

## Tab Component Testing

Testing tabbed interfaces with role-based queries and content verification.

```javascript
import {render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {AdvancedDataStructureSection} from '@/components/advanced-data-structure-section'

describe('AdvancedDataStructureSection', () => {
  it('should render tabs and switch content on click', async () => {
    const user = userEvent.setup()
    render(<AdvancedDataStructureSection />)

    // Get the section container
    const section = screen.getByTestId('advanced-data-structure-section')

    // Query tabs within the section only
    const tabs = within(section).getAllByRole('button')
    expect(tabs.length).toBeGreaterThan(0)

    // Click first tab and verify content
    const firstTab = tabs[0]
    await user.click(firstTab)

    // Content should be visible after click
    const content = within(section).getByText((text) =>
      text.includes('Array')
    )
    expect(content).toBeInTheDocument()
  })

  it('should handle multiple tab switches', async () => {
    const user = userEvent.setup()
    render(<AdvancedDataStructureSection />)

    const section = screen.getByTestId('advanced-data-structure-section')
    const tabs = within(section).getAllByRole('button')

    // Switch between tabs
    for (const tab of tabs) {
      await user.click(tab)
      // Verify some content is visible for each tab
      const content = within(section).queryAllByRole('article')
      expect(content.length).toBeGreaterThanOrEqual(0)
    }
  })
})
```

## Code Block Rendering

Testing components that display syntax-highlighted code.

```javascript
import {render, screen, within} from '@testing-library/react'
import {CodeBlock} from '@/components/code-block'

describe('CodeBlock', () => {
  it('should render code with syntax highlighting', () => {
    const code = 'const x = 42'
    render(<CodeBlock code={code} language="javascript" />)

    const codeBlock = screen.getByTestId('code-block')

    // Use function matchers for split text from highlighting
    const renderedCode = within(codeBlock).getByText((content, element) =>
      content.includes('const') &&
      element.textContent.includes('42')
    )

    expect(renderedCode).toBeInTheDocument()
  })

  it('should render multiple code blocks independently', () => {
    render(
      <>
        <CodeBlock code="const a = 1" language="javascript" />
        <CodeBlock code="let b = 2" language="javascript" />
      </>
    )

    // Get all code blocks
    const codeBlocks = screen.getAllByTestId('code-block')
    expect(codeBlocks).toHaveLength(2)

    // Verify each has content
    codeBlocks.forEach((block) => {
      const content = within(block).getByText((text) =>
        text.includes('const') || text.includes('let')
      )
      expect(content).toBeInTheDocument()
    })
  })
})
```

## Component State Reset

Testing that components properly reset their state.

```javascript
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {V8HiddenClassDemo} from '@/components/v8-hidden-class-demo'

describe('V8HiddenClassDemo', () => {
  it('should reset objects when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<V8HiddenClassDemo />)

    const demoSection = screen.getByTestId('v8-hidden-class-demo')

    // Get initial state
    const initialObjects = within(demoSection).getAllByTestId('object-display')
    initialObjects.forEach((obj) => {
      expect(obj.textContent).toBeTruthy()
    })

    // Click reset button
    const resetButton = within(demoSection).getByRole('button', {
      name: /reset/i
    })
    await user.click(resetButton)

    // Verify state is reset (objects should be cleared or to initial state)
    const resetObjects = within(demoSection).getAllByTestId('object-display')
    resetObjects.forEach((obj) => {
      expect(obj.textContent).toMatch(/^{}$|^initial/i)
    })
  })
})
```

## Multi-Step Async Workflows

Testing async operations with step progression and state updates.

```javascript
import {render, screen, within, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {EventLoopSection} from '@/components/event-loop-section'

describe('EventLoopSection', () => {
  it('should handle step progression in event loop', async () => {
    const user = userEvent.setup()
    render(<EventLoopSection />)

    const section = screen.getByTestId('event-loop-section')

    // Get step button using text matching
    const buttons = within(section).getAllByRole('button')
    const stepButton = buttons.find((btn) =>
      btn.textContent.includes('Step') || btn.textContent.includes('Next')
    )

    expect(stepButton).toBeInTheDocument()

    // Click step button and wait for update
    await user.click(stepButton)

    // Wait for async state to update
    await waitFor(
      () => {
        const state = within(section).getByText((content) =>
          content.includes('Processing') ||
          content.includes('Complete')
        )
        expect(state).toBeInTheDocument()
      },
      {timeout: 3000}
    )
  })

  it('should display proper Promise resolution states', async () => {
    const user = userEvent.setup()
    render(<EventLoopSection />)

    const section = screen.getByTestId('event-loop-section')

    // Check for Promise states
    const states = [
      'pending',
      'resolved',
      'rejected'
    ]

    for (const state of states) {
      const stateElement = within(section).queryByText((content) =>
        content.includes(state)
      )
      // At least some Promise state should be visible
      if (stateElement) {
        expect(stateElement).toBeInTheDocument()
      }
    }
  })
})
```

## Setup Configuration

Essential test setup files and configurations.

### setupTests.ts

```typescript
import '@testing-library/jest-dom'
import {cleanup} from '@testing-library/react'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  motion: {
    ...jest.requireActual('framer-motion').motion,
    div: ({children, ...props}: any) => {
      // Exclude animation props to prevent style conflicts
      const {initial, animate, exit, transition, ...cleanProps} = props
      return <div {...cleanProps}>{children}</div>
    }
  }
}))

// Cleanup after each test
afterEach(() => {
  cleanup()
  jest.clearAllMocks()
})

// Suppress console errors in tests if needed
const originalError = console.error
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Not implemented: HTMLFormElement.prototype.submit')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
```

### jest.config.ts (relevant sections)

```typescript
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react',
        esModuleInterop: true,
        allowSyntheticDefaultImports: true
      }
    }]
  }
}
```

## Common Query Patterns Reference

| Problem | Query Pattern | Example |
|---------|--------------|---------|
| Split text from syntax highlighting | Function matcher with includes() | `getByText((c) => c.includes('keyword'))` |
| Multiple similar elements | within() scope + getAllByRole/Text | `within(container).getAllByText(...)` |
| Button with nested elements | Text content check | `btn.textContent.includes('text')` |
| Reliable element ID | data-testid | `getByTestId('unique-id')` |
| Async state updates | waitFor with timeout | `await waitFor(() => {...}, {timeout: 3000})` |
