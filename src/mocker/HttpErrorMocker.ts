import { MockerOptions, ErrorCondition } from '../types';

export class HttpErrorMocker {
  private originalFetch: typeof fetch;
  private conditions: Array<{
    condition: ErrorCondition;
    options: MockerOptions;
  }> = [];

  constructor() {
    if (typeof globalThis.fetch !== 'function') {
      throw new Error('Fetch API is not available in this environment.');
    }
    // Save the original fetch function
    this.originalFetch = globalThis.fetch.bind(globalThis);
  }

  /**
   * Adds a mock condition and options.
   * @param condition - A function that determines when to mock an error.
   * @param options - The error mock options.
   */
  public mock(condition: ErrorCondition, options: MockerOptions): void {
    this.conditions.push({ condition, options });
  }

  /**
   * Starts intercepting fetch calls.
   */
  public start(): void {
    globalThis.fetch = this.mockedFetch.bind(this) as typeof fetch;
  }

  /**
   * Stops intercepting fetch calls and restores the original fetch function.
   */
  public stop(): void {
    globalThis.fetch = this.originalFetch;
    this.conditions = [];
  }

  /**
   * The mocked fetch function.
   * @param input - The input to the fetch call (URL or Request).
   * @param init - The init options for the fetch call.
   * @returns A Promise that resolves to a Response object.
   */
  private async mockedFetch(
    input: RequestInfo,
    init?: RequestInit,
  ): Promise<Response> {
    const url = typeof input === 'string' ? input : input.url;

    // Check for a matching condition
    const matchedCondition = this.conditions.find(({ condition }) =>
      condition(url, init),
    );

    if (matchedCondition) {
      const { errorType, delay, statusCode, statusText } =
        matchedCondition.options;

      // If a delay is specified, wait for the specified duration
      if (delay) {
        await this.delay(delay);
      }

      // Mock the specified error type
      switch (errorType) {
        case 'timeout':
          // Return a promise that never resolves
          return new Promise(() => {
            /* Never resolves */
          });
        case 'network-error':
          // Reject the promise to simulate a network error
          return Promise.reject(new TypeError('Network Error'));
        case 'server-error':
          // Return a Response object with the specified status code and status text
          return new Response(null, {
            status: statusCode || 500,
            statusText: statusText || 'Internal Server Error',
          });
        default:
          // Throw an error for unsupported error types
          throw new Error(`Unsupported error type: ${errorType}`);
      }
    }

    // If no conditions matched, proceed with the actual fetch
    return this.originalFetch(input, init);
  }

  /**
   * Helper function to wait for a specified duration.
   * @param ms - The number of milliseconds to wait.
   * @returns A Promise that resolves after the specified duration.
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
