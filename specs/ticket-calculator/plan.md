# Implementation Plan: Concert Ticket Calculator

## Objective

Maintain and validate the existing Concert Ticket Calculator feature as a TypeScript + Express web application with a static browser frontend.

The implementation must satisfy the behavior documented in `specs/ticket-calculator/spec.md` and the API contract documented in `openapi.yaml`.

## Technology Stack

- Node.js
- TypeScript
- Express
- Static HTML/CSS/JavaScript frontend
- Jest
- Supertest
- GitHub Actions

## Architecture

The feature is split into three layers:

1. Static frontend
   - Location: `public/`
   - Responsibilities:
     - render the calculator form
     - collect artist, ticket type, and quantity
     - call the backend API
     - display successful calculation results and validation errors

2. Backend REST API
   - Location: `src/app.ts`
   - Responsibilities:
     - expose `GET /health`
     - expose `POST /tickets/calculate`
     - validate request flow at the API boundary
     - return controlled success and error responses

3. Ticket calculation business logic
   - Location: `src/ticketCalculator.ts`
   - Responsibilities:
     - define supported ticket types
     - define unit prices
     - validate artist, ticket type, and quantity
     - calculate `total = unitPrice * quantity`

This separation keeps the core calculation rules testable without depending on Express route handling.

## Implementation Steps

### Step 1: Confirm specification and contract

Use these artifacts as the source of expected behavior:

- `specs/ticket-calculator/spec.md`
- `openapi.yaml`

The OpenAPI contract must document:

- `GET /health`
- `POST /tickets/calculate`
- calculation request body
- successful calculation response
- validation error responses

### Step 2: Maintain business logic

Implement or preserve ticket calculation in `src/ticketCalculator.ts`.

Rules:

- `GENERAL` has unit price `50000`
- `CAMPO` has unit price `80000`
- `VIP` has unit price `120000`
- artist is required
- quantity must be greater than zero
- ticket type must be one of the supported values

Successful output must include:

- `artist`
- `ticketType`
- `quantity`
- `unitPrice`
- `total`

### Step 3: Maintain REST API

Implement or preserve API routing in `src/app.ts`.

Endpoints:

- `GET /health`
- `POST /tickets/calculate`

The calculation endpoint must delegate business rules to the ticket calculation module and return controlled errors for invalid input.

### Step 4: Maintain static frontend

Implement or preserve the static frontend in:

- `public/index.html`
- `public/styles.css`
- `public/script.js`

The frontend must let the user enter an artist, choose one ticket type, enter a quantity, call `POST /tickets/calculate`, and show either the calculation result or an error.

### Step 5: Validate with automated tests

Use Jest for automated verification.

Unit tests must cover ticket calculation rules, including:

- successful calculation
- invalid quantity
- invalid ticket type

Integration tests must cover API behavior, including:

- `GET /health`
- successful `POST /tickets/calculate`
- invalid quantity response
- invalid ticket type response

Test files are located in `tests/`.

### Step 6: Validate with CI

Use GitHub Actions to run automated quality checks on repository changes.

The CI workflow must run:

- dependency installation
- automated tests
- TypeScript build

Expected project commands:

- `npm test`
- `npm run build`

## Verification Strategy

Local verification:

1. Run automated tests with `npm test`.
2. Run the TypeScript build with `npm run build`.
3. Optionally start the app and verify the frontend can call the API from the browser.

CI verification:

- GitHub Actions must execute tests and build automatically so regressions are caught before merging or delivering changes.

## Deliverables

- Static frontend for the calculator.
- Express API with health and calculation endpoints.
- Isolated ticket calculation business logic.
- OpenAPI contract in `openapi.yaml`.
- Jest unit and integration tests.
- GitHub Actions workflow for tests and TypeScript build.
