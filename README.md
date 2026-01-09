# @sklv-labs/ts-nestjs-service-boilerplate

A NestJS service boilerplate for quick application development.

## Features

- 🎯 **Type-Safe** - Full TypeScript support with comprehensive type definitions
- 🚀 **Production Ready** - Pre-configured with best practices and optimizations
- 🛠️ **NestJS Native** - Built on top of NestJS with seamless integration
- 📦 **Well Configured** - Pre-configured with ESLint, Prettier, Jest, and TypeScript
- 📁 **Organized Structure** - Server code in `server/src`, docs at root level

## Project Structure

```
.
├── docs/              # Documentation files
├── server/
│   ├── src/          # Application source code
│   │   ├── main.ts   # Application entry point
│   │   └── app.*     # Application modules
│   ├── dist/         # Compiled output
│   ├── tsconfig.json # TypeScript configuration
│   └── jest.config.js # Jest configuration
├── package.json
└── README.md
```

## Installation

```bash
npm install
```

**Note:** This project requires Node.js 24 LTS or higher.

## Development

```bash
# Development mode with hot reload
npm run start:dev

# Debug mode
npm run start:debug

# Build
npm run build

# Production mode
npm run start:prod

# Lint
npm run lint

# Format
npm run format

# Test
npm run test

# Test with coverage
npm run test:cov

# E2E tests
npm run test:e2e

# Type check
npm run type-check
```

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run start:dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Configuration

The application can be configured using environment variables:

- `PORT` - Server port (default: 3000)

## License

MIT © [sklv-labs](https://github.com/sklv-labs)
