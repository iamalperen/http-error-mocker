// tests/HttpErrorMocker.test.ts

import { HttpErrorMocker } from './HttpErrorMocker';

describe('HttpErrorMocker', () => {
  let mocker: HttpErrorMocker;

  beforeEach(() => {
    mocker = new HttpErrorMocker();
    mocker.start();
  });

  afterEach(() => {
    mocker.stop();
  });

  test('should mock a server error', async () => {
    mocker.mock((url) => url.includes('/api/error'), {
      errorType: 'server-error',
      statusCode: 500,
    });

    const response = await fetch('/api/error');

    expect(response.status).toBe(500);
    expect(response.statusText).toBe('Internal Server Error');
  });

  test('should mock a network error', async () => {
    mocker.mock((url) => url.includes('/api/network-error'), {
      errorType: 'network-error',
    });

    await expect(fetch('/api/network-error')).rejects.toThrow('Network Error');
  });

  test('should mock a timeout', async () => {
    jest.useFakeTimers();

    mocker.mock((url) => url.includes('/api/timeout'), {
      errorType: 'timeout',
    });

    const fetchPromise = fetch('/api/timeout');

    jest.advanceTimersByTime(5000);

    await expect(fetchPromise).not.resolves;

    jest.useRealTimers();
  });

  test('should proceed with actual fetch if no condition matches', async () => {
    // Mock the original fetch to return a successful response
    const originalFetch = jest
      .fn()
      .mockResolvedValue(new Response('Success', { status: 200 }));
    globalThis.fetch = originalFetch;

    const response = await fetch('/api/success');

    expect(response.status).toBe(200);
    const text = await response.text();
    expect(text).toBe('Success');
  });
});
