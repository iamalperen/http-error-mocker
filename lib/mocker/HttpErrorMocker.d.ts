import { MockerOptions, ErrorCondition } from '../types';
export declare class HttpErrorMocker {
  private originalFetch;
  private conditions;
  constructor();
  /**
   * Adds a mock condition and options.
   * @param condition - A function that determines when to mock an error.
   * @param options - The error mock options.
   */
  mock(condition: ErrorCondition, options: MockerOptions): void;
  /**
   * Starts intercepting fetch calls.
   */
  start(): void;
  /**
   * Stops intercepting fetch calls and restores the original fetch function.
   */
  stop(): void;
  /**
   * The mocked fetch function.
   * @param input - The input to the fetch call (URL or Request).
   * @param init - The init options for the fetch call.
   * @returns A Promise that resolves to a Response object.
   */
  private mockedFetch;
  /**
   * Helper function to wait for a specified duration.
   * @param ms - The number of milliseconds to wait.
   * @returns A Promise that resolves after the specified duration.
   */
  private delay;
}
