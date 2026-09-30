# Playwright E-Commerce Reliability Framework

A Playwright + TypeScript test automation project for an e-commerce application.

The project focuses on building reliable automated tests for critical e-commerce flows while exploring test architecture, API/UI testing, network resilience, test data isolation, and flaky test analysis.

## Tech Stack

- Playwright
- TypeScript
- Node.js

## Application Under Test

Vendure TanStack Storefront

## Current Status

🚧 Project in development.

Current focus:
- Project setup
- Product discovery
- Product filtering

## Getting Started

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Run tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Open the Playwright HTML report:

```bash
npx playwright show-report
```

## Project Goals

- Build maintainable Playwright tests using Page Object Model and fixtures
- Cover critical e-commerce customer journeys
- Combine UI and API testing where appropriate
- Validate application behavior under network failures and delays
- Keep tests independent and safe for parallel execution
- Improve failure diagnostics and investigate flaky tests