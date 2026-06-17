# Tasks: Concert Ticket Calculator

Generated from:

- `specs/ticket-calculator/spec.md`
- `specs/ticket-calculator/plan.md`
- `openapi.yaml`

## Documentation Tasks

- [x] Define the Concert Ticket Calculator feature specification.
- [x] Document the accepted ticket types and unit prices.
- [x] Document validation rules for artist, ticket type, and quantity.
- [x] Document successful calculation response fields.
- [x] Document `GET /health` and `POST /tickets/calculate` in `openapi.yaml`.
- [x] Create the implementation plan for the existing feature.

Files:

- `specs/ticket-calculator/spec.md`
- `specs/ticket-calculator/plan.md`
- `openapi.yaml`

## Business Logic Tasks

- [x] Create isolated ticket calculation logic.
- [x] Define supported ticket types: `GENERAL`, `CAMPO`, and `VIP`.
- [x] Define unit prices: `50000`, `80000`, and `120000`.
- [x] Validate that artist is required.
- [x] Validate that quantity is greater than zero.
- [x] Validate that ticket type is one of the supported values.
- [x] Calculate `total = unitPrice * quantity`.
- [x] Return `artist`, `ticketType`, `quantity`, `unitPrice`, and `total` for valid input.

Files:

- `src/ticketCalculator.ts`

## Backend API Tasks

- [x] Create the Express application.
- [x] Configure JSON request parsing.
- [x] Serve the static frontend from `public/`.
- [x] Implement `GET /health`.
- [x] Implement `POST /tickets/calculate`.
- [x] Delegate ticket calculation rules to the business logic module.
- [x] Return controlled errors for invalid quantity.
- [x] Return controlled errors for invalid ticket type.
- [x] Return controlled errors for missing artist.
- [x] Create the server entry point.

Files:

- `src/app.ts`
- `src/server.ts`

## Frontend Tasks

- [x] Create the browser-accessible HTML page.
- [x] Add an artist input.
- [x] Add a ticket type selector for `GENERAL`, `CAMPO`, and `VIP`.
- [x] Add a quantity input.
- [x] Add a submit action for calculating tickets.
- [x] Call `POST /tickets/calculate` from the frontend.
- [x] Display successful calculation results.
- [x] Display controlled API validation errors.
- [x] Add frontend styling.

Files:

- `public/index.html`
- `public/styles.css`
- `public/script.js`

## Testing Tasks

### Unit Tests

- [x] Test successful ticket calculation.
- [x] Test unit price selection by ticket type.
- [x] Test total calculation.
- [x] Test invalid quantity validation.
- [x] Test invalid ticket type validation.
- [x] Test missing artist validation.

### Integration Tests

- [x] Test `GET /health`.
- [x] Test successful `POST /tickets/calculate`.
- [x] Test invalid quantity response.
- [x] Test invalid ticket type response.
- [x] Test missing artist response.

Files:

- `tests/app.test.ts`

## Continuous Integration Tasks

- [x] Configure GitHub Actions workflow.
- [x] Install project dependencies in CI.
- [x] Run automated tests in CI.
- [x] Run TypeScript build in CI.

Files:

- `.github/workflows/ci.yml`
- `package.json`

## Verification Tasks

- [ ] Run `npm test` locally after task regeneration.
- [ ] Run `npm run build` locally after task regeneration.
- [ ] Optionally verify the frontend in a browser against the running API.

## Future Improvement Tasks

- [ ] Add end-to-end browser tests for the frontend flow.
- [ ] Add deployment workflow or hosting configuration.
