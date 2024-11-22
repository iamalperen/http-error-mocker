# HTTP Error Mocker

[![npm version](https://badge.fury.io/js/http-error-mocker.svg)](https://badge.fury.io/js/http-error-mocker)
[![CI](https://github.com/yourusername/http-error-mocker/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/http-error-mocker/actions)

Mocking HTTP errors and network conditions for testing purposes.

## Features

- Mock server errors (e.g., 500 Internal Server Error)
- Mock network errors (e.g., network disconnects)
- Mock timeouts
- Configure delays to mimic latency
- Works in both browser and Node.js environments
- TypeScript support

## Installation

```bash
npm install http-error-mocker
```

## Usage

### Basic Example

```typescript
import { HttpErrorMocker } from 'http-error-mocker';

const mocker = new HttpErrorMocker();

// Mock a server error for specific endpoints
mocker.mock((url) => url.includes('/api/error'), {
  errorType: 'server-error',
  statusCode: 500,
});

// Start intercepting fetch calls
mocker.start();

// Your code that makes fetch calls
fetch('/api/error')
    .then((response) => {
        console.log(response.status); // 500
    })
    .catch((error) => {
        console.error(error);
    });

// Stop intercepting when done
mocker.stop();
```

### Mock a Network Error

```typescript
mocker.mock((url) => url.includes('/api/error'), {
  errorType: 'network-error',
});
```

### Mock a Timeout

```typescript
mocker.mock((url) => url.includes('/api/error'), { errorType: 'timeout' });
```

### Mock a Delay

```typescript
mocker.mock((url) => url.includes('/api/error'), { delay: 3000 });
```

### Mock a Random Error

```typescript
mocker.mock((url) => url.includes('/api/error'), { errorType: 'random' });
```

## API

```typescript
mocker.mock(condition: ErrorCondition, options: MockerOptions): void;
```

Defines a condition under which to mock an error.

- condition: A function that receives the URL and options of the fetch call and returns a boolean indicating whether to mock the error.
- options: Configuration for the type of error to mock.

```typescript
mocker.start(): void;
```

Starts intercepting fetch calls.

```typescript
mocker.stop(): void;
```

Stops intercepting fetch calls.

```typescript
mocker.reset(): void;
```

Resets the mocker to its initial state.

## Mocker Options

- errorType: 'timeout' | 'server-error' | 'network-error'
- statusCode: number
- statusText: string
- delay: number

## Polyfill for globalThis

If your environment doesn't support globalThis, the package includes a polyfill. Ensure it's imported before other code.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue.

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

## 🌟 Support

If you like this project, please give it a ⭐ on GitHub! You can also follow me for more projects.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

Thanks to the developers of [TypeScript](https://www.typescriptlang.org/), [Jest](https://jestjs.io/), and [Husky](https://typicode.github.io/husky/#/).

## Contact

For any inquiries or feedback, please contact [Alperen Talaslıoğlu](https://github.com/iamalperen).
