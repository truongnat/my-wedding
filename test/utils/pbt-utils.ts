import * as fc from 'fast-check';

/**
 * Property-based testing utilities for the wedding website
 */

/**
 * Arbitrary for generating valid guest names
 */
export const guestNameArbitrary = fc
  .string({ minLength: 1, maxLength: 100 })
  .filter((s) => s.trim().length > 0);

/**
 * Arbitrary for generating valid email addresses
 */
export const emailArbitrary = fc.emailAddress();

/**
 * Arbitrary for generating valid guest messages
 */
export const guestMessageArbitrary = fc
  .string({ minLength: 1, maxLength: 500 })
  .filter((s) => s.trim().length > 0);

/**
 * Arbitrary for generating future dates (for countdown timer)
 */
export const futureDateArbitrary = fc
  .date({ min: new Date(), max: new Date('2030-12-31') })
  .filter((d) => d > new Date());

/**
 * Arbitrary for generating past dates
 */
export const pastDateArbitrary = fc.date({
  min: new Date('2000-01-01'),
  max: new Date(),
});

/**
 * Arbitrary for generating valid RSVP data
 */
export const rsvpDataArbitrary = fc.record({
  name: guestNameArbitrary,
  email: emailArbitrary,
  attending: fc.boolean(),
  guests: fc.integer({ min: 0, max: 10 }),
  dietaryRestrictions: fc.option(fc.string({ maxLength: 200 }), {
    nil: undefined,
  }),
  message: fc.option(fc.string({ maxLength: 500 }), { nil: undefined }),
});

/**
 * Arbitrary for generating image alt text
 */
export const altTextArbitrary = fc
  .string({ minLength: 1, maxLength: 200 })
  .filter((s) => s.trim().length > 0);

/**
 * Arbitrary for generating non-negative integers
 */
export const nonNegativeIntegerArbitrary = fc.integer({ min: 0 });

/**
 * Configuration for property-based tests
 * Run at least 100 iterations as specified in the design document
 */
export const pbtConfig: fc.Parameters<unknown> = {
  numRuns: 100,
  verbose: true,
};
