import { vi } from 'vitest';

/**
 * Mock utilities for testing
 */

/**
 * Mock Supabase client for testing
 */
export function createMockSupabaseClient() {
  return {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          order: vi.fn(() => ({
            data: [],
            error: null,
          })),
          single: vi.fn(() => ({
            data: null,
            error: null,
          })),
        })),
        order: vi.fn(() => ({
          data: [],
          error: null,
        })),
        single: vi.fn(() => ({
          data: null,
          error: null,
        })),
        data: [],
        error: null,
      })),
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => ({
            data: null,
            error: null,
          })),
          data: [],
          error: null,
        })),
        data: null,
        error: null,
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          data: null,
          error: null,
        })),
        data: null,
        error: null,
      })),
      delete: vi.fn(() => ({
        eq: vi.fn(() => ({
          data: null,
          error: null,
        })),
        data: null,
        error: null,
      })),
    })),
    auth: {
      getSession: vi.fn(() => ({
        data: { session: null },
        error: null,
      })),
      signIn: vi.fn(),
      signOut: vi.fn(),
    },
  };
}

/**
 * Mock fetch for API testing
 */
export function mockFetch(response: any, ok = true) {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(response),
      text: () => Promise.resolve(JSON.stringify(response)),
      status: ok ? 200 : 500,
      statusText: ok ? 'OK' : 'Internal Server Error',
    } as Response)
  );
}

/**
 * Reset all mocks
 */
export function resetAllMocks() {
  vi.clearAllMocks();
  vi.resetAllMocks();
}
