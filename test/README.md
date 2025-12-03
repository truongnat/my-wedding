# Testing Infrastructure

This directory contains the testing infrastructure for the wedding website Next.js application.

## Overview

The testing setup includes:
- **Vitest**: Fast unit test runner with native TypeScript support
- **React Testing Library**: For testing React components
- **fast-check**: Property-based testing library
- **jsdom**: Browser environment simulation

## Test Structure

```
test/
├── utils/
│   ├── test-utils.tsx      # React Testing Library utilities with providers
│   ├── pbt-utils.ts        # Property-based testing utilities and arbitraries
│   ├── mock-utils.ts       # Mock utilities for Supabase and fetch
│   └── index.ts            # Re-exports all utilities
├── setup.test.ts           # Infrastructure verification tests
└── README.md               # This file
```

## Running Tests

```bash
# Run all tests once
bun run test

# Run tests in watch mode
bun run test:watch

# Run tests with UI
bun run test:ui

# Run tests with coverage
bun run test:coverage
```

## Writing Tests

### Unit Tests

```typescript
import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '@/test/utils';
import { MyComponent } from '@/components/my-component';

describe('MyComponent', () => {
  it('should render correctly', () => {
    renderWithProviders(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Property-Based Tests

Property-based tests should run at least 100 iterations and be tagged with the property they validate:

```typescript
import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import { pbtConfig, futureDateArbitrary } from '@/test/utils';

describe('Countdown Timer Properties', () => {
  it('should calculate non-negative time remaining', () => {
    // **Feature: nextjs-migration, Property 2: Countdown Timer Accuracy**
    // **Validates: Requirements 5.2**
    
    fc.assert(
      fc.property(futureDateArbitrary, (futureDate) => {
        const result = calculateTimeRemaining(futureDate);
        return (
          result.days >= 0 &&
          result.hours >= 0 &&
          result.minutes >= 0 &&
          result.seconds >= 0
        );
      }),
      pbtConfig
    );
  });
});
```

## Test Utilities

### renderWithProviders

Renders a component with all necessary providers (QueryClient, etc.):

```typescript
const { queryClient } = renderWithProviders(<MyComponent />);
```

### Arbitraries

Pre-configured fast-check arbitraries for common data types:
- `guestNameArbitrary`: Valid guest names
- `emailArbitrary`: Valid email addresses
- `guestMessageArbitrary`: Valid guest messages
- `futureDateArbitrary`: Future dates for countdown
- `rsvpDataArbitrary`: Complete RSVP data objects

### Mock Utilities

- `createMockSupabaseClient()`: Mock Supabase client
- `mockFetch()`: Mock global fetch
- `resetAllMocks()`: Reset all mocks between tests

## Configuration

### vitest.config.ts

Main Vitest configuration with:
- jsdom environment for browser APIs
- Path aliases matching Next.js config
- Coverage configuration
- Test file patterns

### vitest.setup.ts

Global test setup including:
- React Testing Library cleanup
- Next.js router mocks
- Next.js Image component mocks
- Environment variable mocks

## Best Practices

1. **Use renderWithProviders** for components that need QueryClient
2. **Run property tests with 100+ iterations** as specified in design
3. **Tag property tests** with feature name and property number
4. **Mock external dependencies** (Supabase, fetch, etc.)
5. **Clean up after tests** (automatic with afterEach)
6. **Focus on core logic** - avoid over-testing edge cases
7. **Use descriptive test names** that explain what is being tested

## Property-Based Testing

Property-based tests verify universal properties across many inputs. Each property test should:

1. Reference the correctness property from the design document
2. Run at least 100 iterations (configured in `pbtConfig`)
3. Use appropriate arbitraries from `pbt-utils.ts`
4. Include validation comments with feature and property numbers

Example property test structure:

```typescript
it('property description', () => {
  // **Feature: feature-name, Property N: Property description**
  // **Validates: Requirements X.Y**
  
  fc.assert(
    fc.property(arbitrary, (input) => {
      // Test logic
      return assertion;
    }),
    pbtConfig
  );
});
```

## Troubleshooting

### Tests not running
- Check that test files match pattern `**/*.{test,spec}.{ts,tsx}`
- Verify vitest.config.ts is in project root
- Check for TypeScript errors with `bun run type-check`

### Mock issues
- Ensure mocks are defined in vitest.setup.ts or at test file top
- Use `vi.mock()` before imports
- Reset mocks between tests with `resetAllMocks()`

### Provider issues
- Always use `renderWithProviders` for components using TanStack Query
- Each test gets a fresh QueryClient to avoid state leakage
