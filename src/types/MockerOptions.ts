import { ErrorType } from './ErrorType';

export interface MockerOptions {
  errorType: ErrorType;
  delay?: number; // Optional delay in milliseconds
  statusCode?: number; // For 'server-error' type
  statusText?: string; // For 'server-error' type
}
