import { ErrorType } from './ErrorType';
export interface MockerOptions {
  errorType: ErrorType;
  delay?: number;
  statusCode?: number;
  statusText?: string;
}
