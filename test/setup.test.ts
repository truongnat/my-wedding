import * as fc from 'fast-check';
import { describe, expect, it } from 'vitest';

/**
 * Test to verify testing infrastructure is set up correctly
 */

describe('Testing Infrastructure', () => {
  it('should run basic unit tests', () => {
    expect(true).toBe(true);
  });

  it('should support property-based testing with fast-check', () => {
    fc.assert(
      fc.property(fc.integer(), (n) => {
        return n + 0 === n;
      })
    );
  });

  it('should have access to test utilities', () => {
    expect(typeof fc.assert).toBe('function');
  });
});
