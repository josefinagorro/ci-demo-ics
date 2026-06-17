# Specification: Concert Ticket Calculator

## Goal

Document the existing Concert Ticket Calculator feature for a TypeScript + Express web application with a static frontend.

The feature lets a user calculate the total cost of concert tickets by entering an artist name, selecting a ticket type, and entering a quantity.

## Scope

In scope:

- Browser-accessible static frontend.
- Ticket calculation API.
- Health check API.
- OpenAPI documentation.
- Automated tests for the main calculation and validation rules.

Out of scope:

- Payment processing.
- Seat selection.
- Artist catalog management.
- Persistence of calculations or orders.

## Functional Requirements

### FR-01: Access frontend

The user must be able to access the application frontend from a browser.

The frontend must provide controls to:

- enter an artist name
- select one ticket type
- enter a quantity
- submit the calculation request
- display either the calculation result or a controlled error

### FR-02: Enter artist

The user must be able to enter an artist name.

The artist field is required. If the artist is empty, the system must return a controlled error.

### FR-03: Select ticket type

The user must be able to select exactly one ticket type.

Allowed ticket types and unit prices are:

- GENERAL: 50000
- CAMPO: 80000
- VIP: 120000

If the ticket type is not one of the allowed values, the system must return a controlled error.

### FR-04: Enter quantity

The user must be able to enter the ticket quantity.

The quantity must be greater than zero. If the quantity is zero, negative, missing, or otherwise invalid, the system must return a controlled error.

### FR-05: Calculate total

For valid input, the system must calculate the ticket total using:

```text
total = unitPrice * quantity
```

The successful calculation response must include:

- artist
- ticketType
- quantity
- unitPrice
- total

### FR-06: Expose health endpoint

The API must expose `GET /health` so clients and automation can verify that the service is running.

### FR-07: Expose calculation endpoint

The API must expose `POST /tickets/calculate` for ticket price calculations.

The endpoint must accept artist, ticket type, and quantity as input and return either a successful calculation result or a controlled validation error.

### FR-08: Document API contract

The API contract must be documented in `openapi.yaml`.

The documented contract must include:

- `GET /health`
- `POST /tickets/calculate`
- successful calculation response fields
- validation error responses

### FR-09: Validate with automated tests

Automated tests must validate the main business and API rules, including:

- successful calculation
- invalid quantity
- invalid ticket type

## API Contract

The authoritative API contract is `openapi.yaml`.

Main endpoints:

- `GET /health`
- `POST /tickets/calculate`

## Acceptance Criteria

- A successful calculation returns `artist`, `ticketType`, `quantity`, `unitPrice`, and `total`.
- Invalid quantity returns a controlled error.
- Invalid ticket type returns a controlled error.
- The frontend can call the API and show the result.
- The API contract is documented in `openapi.yaml`.
- Automated tests validate the main rules.
