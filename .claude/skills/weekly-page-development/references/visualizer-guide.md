# Generative UI / Interactive Visualizer Guide

Comprehensive reference for creating interactive visualizer components that bring educational concepts to life.

## Table of Contents
1. [Overview](#overview)
2. [File Organization](#file-organization)
3. [Visualizer Architecture](#visualizer-architecture)
4. [Import Pattern](#import-pattern)
5. [State Management](#state-management)
6. [Animation Patterns](#animation-patterns)
7. [Interactive Controls](#interactive-controls)
8. [Visual Feedback](#visual-feedback)
9. [Layout Patterns](#layout-patterns)
10. [Integration with Section Components](#integration-with-section-components)
11. [Visualizer Categories](#visualizer-categories)
12. [Complete Examples](#complete-examples)
13. [Best Practices](#best-practices)

---

## Overview

Generative UI (interactive visualizers) are self-contained React components that allow users to visually and interactively experience educational concepts. Each visualizer is embedded inside a `<DemoBox>` within a `<SubSection>` of a section component.

**Key Principles:**
- One visualizer per section (embedded in its section component)
- Self-contained: all state is local (no external state management)
- No new dependencies: use existing `motion/react`, `lucide-react`, `cn()`, Tailwind
- No i18n: visualizer labels are hardcoded in English (matching project convention)
- Typically 100-300 lines of code

**Tech Stack:**
- `motion/react` (Framer Motion 12+) for animations
- `lucide-react` for consistent iconography
- `cn()` utility from `src/lib/utils` (clsx + tailwind-merge) for conditional classNames
- Tailwind CSS for styling
- React hooks (`useState`, `useCallback`, `useEffect`, `useRef`) for state

---

## File Organization

```
src/page/weekN/components/
├── topic-section.tsx              # Section component (uses visualizer)
├── topic-visualizer.tsx           # Visualizer component (new file)
├── another-section.tsx
└── another-visualizer.tsx
```

**Naming Convention:** `[concept]-visualizer.tsx` (kebab-case, suffixed with `-visualizer`)

---

## Visualizer Architecture

Every visualizer follows this structure:

```typescript
// 1. Imports
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Icon1, Icon2, RotateCcw } from 'lucide-react';
import { cn } from '../../../lib/utils';

// 2. Type definitions
type Status = 'idle' | 'running' | 'done';
type DataItem = { id: number; label: string; value: number };

// 3. Constants (data, configs, color maps)
const DATA_ITEMS: DataItem[] = [...];
const STATUS_COLORS: Record<Status, string> = { ... };

// 4. Optional subcomponents (for complex visuals like gauges, charts)
const GaugeMeter = ({ value, max }: { value: number; max: number }) => { ... };

// 5. Main component
export const ConceptVisualizer = () => {
  // State hooks
  const [status, setStatus] = useState<Status>('idle');

  // Handlers
  const handleAction = () => { ... };
  const reset = () => { ... };

  // Render
  return (
    <div className="space-y-5">
      {/* Controls */}
      {/* Visual area */}
      {/* Detail/status area */}
    </div>
  );
};
```

---

## Import Pattern

```typescript
// Animation (always from motion/react, NOT framer-motion)
import { AnimatePresence, motion } from 'motion/react';

// React hooks (only what you need)
import { useState, useCallback, useEffect, useRef } from 'react';

// Icons (select semantically meaningful icons)
import { Play, Pause, RotateCcw, AlertCircle, CheckCircle } from 'lucide-react';

// Utility
import { cn } from '../../../lib/utils';
```

**Important:** Always use `motion/react` (not `framer-motion`) for new visualizers.

---

## State Management

### Simple Toggle
```typescript
const [isActive, setIsActive] = useState(false);
```

### Finite State Machine
```typescript
type Phase = 'idle' | 'running' | 'analyzing' | 'done';
const [phase, setPhase] = useState<Phase>('idle');
```

### List/Collection Management
```typescript
interface ErrorEntry {
  id: number;
  type: string;
  count: number;
}
const [errors, setErrors] = useState<ErrorEntry[]>([]);
const [nextId, setNextId] = useState(1);
```

### Numeric Values (sliders, gauges)
```typescript
const [errorRate, setErrorRate] = useState(0);
const [lcp, setLcp] = useState(1.8);
```

### Timer-Based Flows (use useRef for cleanup)
```typescript
const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
const clearTimeouts = () => {
  for (const t of timeoutsRef.current) clearTimeout(t);
  timeoutsRef.current = [];
};

const runFlow = useCallback(() => {
  clearTimeouts();
  const delays = [100, 700, 1400, 2100];
  const phases: Phase[] = ['incoming', 'analyzing', 'classified', 'action'];
  for (let i = 0; i < phases.length; i++) {
    const t = setTimeout(() => setPhase(phases[i]), delays[i]);
    timeoutsRef.current.push(t);
  }
}, []);
```

### Interval-Based Playback
```typescript
const [isPlaying, setIsPlaying] = useState(false);
const [currentTime, setCurrentTime] = useState(0);

useEffect(() => {
  if (!isPlaying) return;
  const interval = setInterval(() => {
    setCurrentTime((prev) => {
      if (prev >= maxTime) { setIsPlaying(false); return prev; }
      return prev + 1;
    });
  }, 100);
  return () => clearInterval(interval);
}, [isPlaying]);
```

---

## Animation Patterns

### Entry/Exit with AnimatePresence
```typescript
<AnimatePresence mode="wait">
  <motion.div
    key={uniqueKey}  // REQUIRED: triggers re-animation on change
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {content}
  </motion.div>
</AnimatePresence>
```

### Blur Transition (great for masking/reveal)
```typescript
<motion.div
  key={isMasked ? 'masked' : 'raw'}
  initial={{ opacity: 0, filter: 'blur(4px)' }}
  animate={{ opacity: 1, filter: 'blur(0px)' }}
  exit={{ opacity: 0, filter: 'blur(4px)' }}
  transition={{ duration: 0.3, delay: index * 0.05 }}
/>
```

### Spring-Based Width (bar charts)
```typescript
<motion.div
  initial={{ width: 0 }}
  animate={{ width: `${percentage}%` }}
  transition={{ type: 'spring', stiffness: 100, damping: 15 }}
  className="h-3 rounded-full bg-blue-500"
/>
```

### SVG Path Animation (gauges)
```typescript
<motion.path
  d="M 15 75 A 55 55 0 0 1 125 75"
  fill="none"
  stroke={color}
  strokeWidth="10"
  strokeLinecap="round"
  initial={{ pathLength: 0 }}
  animate={{ pathLength: percentage }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
/>
```

### Pulsing Scale (draw attention)
```typescript
<motion.div
  animate={{ scale: isActive ? [1, 1.1, 1] : 1 }}
  transition={{ duration: 0.5 }}
/>
```

### Loading Dots
```typescript
{[0, 1, 2].map((i) => (
  <motion.span
    key={i}
    animate={{ opacity: [0.3, 1, 0.3] }}
    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
    className="w-2 h-2 rounded-full bg-blue-500"
  />
))}
```

### Staggered Entry (lists)
Use `delay: index * 0.05` in transitions for sequential item animation.

---

## Interactive Controls

### Action Buttons
```typescript
<button
  type="button"
  onClick={handleAction}
  disabled={isAnimating}
  className={cn(
    'px-3 py-2 rounded-lg text-xs font-semibold border transition-all',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    isActive
      ? 'bg-blue-600 text-white hover:bg-blue-700'
      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200',
  )}
>
  <Icon className="w-4 h-4" />
  Label
</button>
```

### Reset Button (standard pattern)
```typescript
<button
  type="button"
  onClick={reset}
  className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold bg-gray-100 text-gray-600 hover:bg-gray-200 border border-gray-200 transition-all"
>
  <RotateCcw className="w-3 h-3" />
  Reset
</button>
```

### Toggle Button
```typescript
<button
  type="button"
  onClick={() => setIsActive(!isActive)}
  className={cn(
    'flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all',
    isActive
      ? 'bg-green-600 text-white hover:bg-green-700'
      : 'bg-red-600 text-white hover:bg-red-700',
  )}
>
  {isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
  Feature: {isActive ? 'ON' : 'OFF'}
</button>
```

### Scenario Buttons (grouped)
```typescript
<div className="flex flex-wrap gap-2 justify-center">
  {SCENARIOS.map((s) => (
    <button
      key={s.label}
      type="button"
      onClick={() => applyScenario(s)}
      className={cn(
        'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',
        s.color, // e.g., 'bg-green-100 text-green-700 border-green-200'
      )}
    >
      {s.label}
    </button>
  ))}
</div>
```

### Range Slider
```typescript
<input
  type="range"
  min={0}
  max={15}
  step={0.5}
  value={rate}
  onChange={(e) => setRate(Number(e.target.value))}
  className="w-full accent-pink-500"
/>
```

---

## Visual Feedback

### Status Badge
```typescript
<motion.span
  key={status}
  initial={{ opacity: 0, y: 5 }}
  animate={{ opacity: 1, y: 0 }}
  className={cn(
    'text-[10px] font-semibold px-2 py-0.5 rounded-full',
    STATUS_COLORS[status],
  )}
>
  {status}
</motion.span>
```

### Color-Coded Cards
```typescript
const SEVERITY_COLORS: Record<string, string> = {
  LOW: 'border-gray-200 bg-gray-50 text-gray-700',
  MEDIUM: 'border-yellow-200 bg-yellow-50 text-yellow-800',
  HIGH: 'border-orange-200 bg-orange-50 text-orange-800',
  CRITICAL: 'border-red-200 bg-red-50 text-red-800',
};
```

### Summary/Status Bar
```typescript
<motion.div
  key={isSafe ? 'safe' : 'warning'}
  initial={{ opacity: 0, y: 5 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -5 }}
  className={cn(
    'flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium',
    isSafe
      ? 'bg-green-50 text-green-700 border border-green-200'
      : 'bg-red-50 text-red-700 border border-red-200',
  )}
>
  {isSafe ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
  {isSafe ? 'Safe' : 'Warning: Issues detected'}
</motion.div>
```

### Pipeline/Flow Visualization
```typescript
<div className="flex items-center justify-between px-2">
  {NODES.map((node, i) => {
    const isReached = currentIndex >= i;
    const Icon = node.icon;
    return (
      <div key={node.label} className="flex items-center">
        <div className="flex flex-col items-center">
          <motion.div
            animate={{
              scale: isCurrent ? 1.15 : 1,
              backgroundColor: isReached ? '#3b82f6' : '#e5e7eb',
            }}
            className="w-12 h-12 rounded-full flex items-center justify-center"
          >
            <Icon className={cn('w-5 h-5', isReached ? 'text-white' : 'text-gray-400')} />
          </motion.div>
          <span className={cn('text-[10px] font-semibold mt-1', isReached ? 'text-blue-600' : 'text-gray-400')}>
            {node.label}
          </span>
        </div>
        {i < NODES.length - 1 && (
          <ArrowRight className={cn('w-5 h-5 mx-1', currentIndex > i ? 'text-blue-400' : 'text-gray-200')} />
        )}
      </div>
    );
  })}
</div>
```

---

## Layout Patterns

### Standard Vertical Layout (most common)
```typescript
<div className="space-y-5">
  {/* Controls */}
  <div className="flex flex-wrap gap-2 justify-center">{...buttons}</div>
  {/* Visual area */}
  <div className="...">{...visualization}</div>
  {/* Detail/status */}
  <AnimatePresence>{...details}</AnimatePresence>
</div>
```

### Two-Panel Layout (e.g., event stream)
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div className="...">{/* Interactive area */}</div>
  <div className="...">{/* Log/output area */}</div>
</div>
```

### Dark Terminal/Code Theme
```typescript
<div className="rounded-xl bg-gray-900 p-5 space-y-1">
  <p className="text-xs text-gray-500 font-mono mb-3">{'// comment'}</p>
  {items.map((item) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-800">
      <span className="text-sm text-gray-400 font-mono">{item.field}</span>
      <span className="text-sm font-mono text-green-400">{item.value}</span>
    </div>
  ))}
</div>
```

### Grid Gauge/Metric Display
```typescript
<div className="grid grid-cols-3 gap-4">
  {metrics.map((m) => <GaugeMeter key={m.name} {...m} />)}
</div>
```

---

## Integration with Section Components

### Step 1: Create the Visualizer File
Create `src/page/weekN/components/concept-visualizer.tsx`

### Step 2: Import in Section Component
```typescript
// In concept-section.tsx
import { ConceptVisualizer } from './concept-visualizer';
```

### Step 3: Add DemoBox Import (if not already imported)
```typescript
import { DemoBox } from '../../../components/demo-box';
```

### Step 4: Embed in Section
Insert a `<SubSection>` with `<DemoBox>` containing the visualizer at a logical position (typically after the concept explanation, before code examples):

```typescript
<SubSection title="Interactive Demo Title" icon iconColor="blue">
  <DemoBox label="Interactive Demo">
    <ConceptVisualizer />
  </DemoBox>
</SubSection>
```

### Placement Guidelines
- Place **after** the concept explanation (SubSection with text/cards)
- Place **before** code implementation examples (SubSection with CodeBlock)
- If the section has theory + practice, place between them
- Keep the SubSection title descriptive: "Event Stream Demo", "Classification Flow Simulator"

---

## Visualizer Categories

### Category 1: Toggle/Switch (~100-120 lines)
**Pattern:** Single boolean toggle showing two states
**Example:** Data Masking (masked/unmasked), Feature Flags

```
[Toggle Button] → [Visual Area] → [Status Summary]
```

### Category 2: Trigger + List (~150-220 lines)
**Pattern:** Action buttons that add/modify items in a collection
**Example:** Error Tracker, Event Stream

```
[Trigger Buttons] → [Item List with animations] → [Aggregation/Chart]
```

### Category 3: Scenario Selector + Gauges (~180-260 lines)
**Pattern:** Preset scenario buttons that update numeric visualizations
**Example:** Web Vitals Dashboard, Performance Profiler

```
[Scenario Buttons] → [Gauge/Chart Grid] → [Threshold Legend]
```

### Category 4: Slider + Conditional Rules (~200-270 lines)
**Pattern:** Slider input that triggers different behaviors at thresholds
**Example:** Alert Rule Simulator

```
[Slider + Markers] → [Rule Status List] → [Notification Feed]
```

### Category 5: Timer-Based Flow (~200-270 lines)
**Pattern:** Select input, watch animated pipeline progression
**Example:** Error Classification, Incident Timeline

```
[Selector Buttons] → [Pipeline/Timeline Nodes] → [Phase Detail Card]
```

### Category 6: Playback/Timeline (~220-330 lines)
**Pattern:** Play/pause controls with timeline scrubbing
**Example:** Session Replay Player

```
[Playback Controls] → [Timeline Bar + Markers] → [Current Event Card] → [Event Log]
```

---

## Complete Examples

### Minimal: Toggle Visualizer (~110 lines)
See `src/page/week22/components/data-masking-visualizer.tsx`
- Single `useState<boolean>`
- `AnimatePresence mode="wait"` for swap transitions
- Blur filter animation for masking effect
- Staggered delays per item

### Medium: Pipeline Flow (~270 lines)
See `src/page/week22/components/error-classification-visualizer.tsx`
- `useState` for phase (FSM) + selected item
- `useRef` for timeout cleanup
- `useCallback` for flow runner
- Pipeline node visualization with progressive highlighting
- Phase-specific detail cards with `AnimatePresence`

### Complex: SVG Gauges (~215 lines)
See `src/page/week22/components/web-vitals-visualizer.tsx`
- Multiple `useState` for numeric values
- Subcomponent `GaugeMeter` with SVG arc animation
- `motion.path` for animated gauge fill
- Threshold-based color rating system

### Observer Pattern (~155 lines)
See `src/page/week2/components/observer-visualizer.tsx`
- Dynamic list (add/remove observers)
- `AnimatePresence` for enter/exit
- `motion.button` with `whileTap`/`whileHover`
- Broadcast signal wave animation (scaling circles)

---

## Best Practices

### Do's
- **Always add `type="button"`** on all `<button>` elements
- **Always add `disabled` state** when animations are running to prevent double-trigger
- **Always provide a Reset button** with `<RotateCcw />` icon
- **Use `key` prop on `motion.div`** to trigger re-animation on state change
- **Color-code states semantically** - green=success, red=error, yellow=warning, blue=primary, gray=neutral
- **Include empty/idle states** - show a helpful message when nothing is selected
- **Use `cn()` for conditional classes** - never use string interpolation for complex conditions
- **Keep data in constants** outside the component - static data should not be in state
- **Clean up timeouts/intervals** in `useRef` or `useEffect` cleanup functions
- **Use `text-xs` and `text-[10px]`** for compact UI within visualizers

### Don'ts
- **Don't use external state management** (no Redux, Zustand, Context)
- **Don't add i18n** to visualizer labels (hardcoded English is the convention)
- **Don't add new npm dependencies** - use only existing: `motion/react`, `lucide-react`, `cn()`
- **Don't make API calls** - all data is local/mocked
- **Don't use `framer-motion`** directly - use `motion/react` (Framer Motion 12+)
- **Don't exceed ~330 lines** - split into subcomponents if growing too large
- **Don't use inline styles** when Tailwind classes exist
- **Don't use `setTimeout` without cleanup** - always track refs for timer-based animations

### Icon Selection Guide
Choose icons from `lucide-react` that semantically match the concept:

| Concept | Icons |
|---------|-------|
| Error/Alert | `AlertCircle`, `AlertTriangle`, `Bug`, `ShieldAlert` |
| Success/Safe | `CheckCircle`, `ShieldCheck`, `Check` |
| Play/Pause | `Play`, `Pause`, `RotateCcw` |
| Flow/Process | `ArrowRight`, `Zap`, `Search`, `Shield` |
| Users/Teams | `User`, `Users`, `UserPlus`, `UserMinus` |
| Notifications | `Bell`, `BellRing`, `Hash` |
| Data/IO | `Eye`, `EyeOff`, `Activity`, `Radio` |
| Actions | `Trash2`, `RotateCcw`, `ExternalLink` |
| Code/Dev | `Code`, `FileWarning`, `Globe`, `Type` |

### Responsive Design
- Always use `flex-wrap` on button groups
- Use `grid-cols-1 md:grid-cols-2` or `grid-cols-1 md:grid-cols-3` for responsive grids
- Keep minimum touch target size: `px-3 py-2` for buttons
- Test on mobile widths (< 400px)

### Performance
- Avoid creating new objects/arrays in render - extract to constants or `useMemo`
- Use `AnimatePresence mode="wait"` for sequential transitions (prevents overlap)
- Limit lists to ~20 items max (drop oldest when exceeded)
- Use `useCallback` for handlers passed to child components or used in `useEffect` deps
