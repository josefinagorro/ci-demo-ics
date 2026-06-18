# Tasks: CI Email Feedback Notifications

Generated from:

- `specs/ci-email-feedback-notifications/spec.md`
- `specs/ci-email-feedback-notifications/plan.md`

No tasks are marked completed because this feature has not been implemented yet.

## Documentation Tasks

- [ ] Confirm the CI email notification specification is reviewed and approved.
- [ ] Confirm the implementation plan is reviewed and approved.
- [ ] Document the required GitHub Secrets names for the repository maintainer.
- [ ] Document the selected SMTP provider settings needed by the workflow.

Files:

- `specs/ci-email-feedback-notifications/spec.md`
- `specs/ci-email-feedback-notifications/plan.md`
- `specs/ci-email-feedback-notifications/tasks.md`

## GitHub Secrets Configuration Tasks

- [ ] Create `SMTP_HOST` as a GitHub Secret.
- [ ] Create `SMTP_PORT` as a GitHub Secret.
- [ ] Create `SMTP_USERNAME` as a GitHub Secret.
- [ ] Create `SMTP_PASSWORD` as a GitHub Secret.
- [ ] Create `EMAIL_FROM` as a GitHub Secret.
- [ ] Create `EMAIL_TO` as a GitHub Secret.
- [ ] Add optional SMTP security secrets if required by the provider, such as `SMTP_SECURE` or `SMTP_TLS`.
- [ ] Verify all secret names used in the workflow match the repository secret names exactly.

Repository configuration:

- GitHub repository settings
- GitHub Actions secrets

## SMTP Email Notification Tasks

- [ ] Select the SMTP notification mechanism for GitHub Actions.
- [ ] Add a final email notification step to `.github/workflows/ci.yml`.
- [ ] Configure the notification step to use SMTP host, port, username, and password from GitHub Secrets.
- [ ] Configure the sender address from `EMAIL_FROM`.
- [ ] Configure the recipient address from `EMAIL_TO`.
- [ ] Configure the notification step with `if: always()`.
- [ ] Ensure the notification step runs after dependency installation, tests, and TypeScript build.
- [ ] Ensure the notification step does not print SMTP credentials in logs.

Files:

- `.github/workflows/ci.yml`

## Success Notification Tasks

- [ ] Detect when the CI job result is successful.
- [ ] Build a success email subject using the repository name, status, and branch name.
- [ ] Build a success email body that includes the repository name.
- [ ] Build a success email body that includes the branch name.
- [ ] Build a success email body that includes the commit SHA.
- [ ] Build a success email body that includes the workflow run URL.
- [ ] Include `PASSED` or an equivalent clear success status in the email.
- [ ] Include a brief explanation that tests and TypeScript build completed successfully.
- [ ] Verify a passing workflow sends the success email to the configured recipient.

Files:

- `.github/workflows/ci.yml`

## Failure Notification Tasks

- [ ] Detect when the CI job result is failed.
- [ ] Ensure the failure notification still runs when tests fail.
- [ ] Ensure the failure notification still runs when TypeScript build fails.
- [ ] Build a failure email subject using the repository name, status, and branch name.
- [ ] Build a failure email body that includes the repository name.
- [ ] Build a failure email body that includes the branch name.
- [ ] Build a failure email body that includes the commit SHA.
- [ ] Build a failure email body that includes the workflow run URL.
- [ ] Include `FAILED` or an equivalent clear failure status in the email.
- [ ] Include a brief explanation that at least one required integration step failed and the workflow run should be reviewed.
- [ ] Verify a failing workflow sends the failure email to the configured recipient.

Files:

- `.github/workflows/ci.yml`

## Email Content Structure Tasks

- [ ] Use the subject format `[CI] <repository> - <PASSED|FAILED> on <branch>`.
- [ ] Include `github.repository` in the email content.
- [ ] Include `github.ref_name` in the email content.
- [ ] Include `github.sha` in the email content.
- [ ] Include the workflow run URL using `github.server_url`, `github.repository`, and `github.run_id`.
- [ ] Include a result summary based on the final pipeline status.
- [ ] Keep the email concise and readable.

Files:

- `.github/workflows/ci.yml`

## Workflow Validation Tasks

- [ ] Run the existing automated tests with `npm test`.
- [ ] Run the TypeScript build with `npm run build`.
- [ ] Validate the GitHub Actions workflow syntax.
- [ ] Trigger a workflow run expected to pass.
- [ ] Confirm the success email is received.
- [ ] Trigger or simulate a workflow run expected to fail.
- [ ] Confirm the failure email is received.
- [ ] Confirm the notification step executes after earlier workflow steps.
- [ ] Confirm the notification step uses `if: always()`.

Files:

- `.github/workflows/ci.yml`
- `package.json`

## Security Verification Tasks

- [ ] Search the repository for plaintext SMTP passwords, email tokens, and provider credentials.
- [ ] Confirm `.github/workflows/ci.yml` references sensitive values only through `secrets.*`.
- [ ] Confirm workflow logs do not expose SMTP secrets.
- [ ] Confirm no email password or token is committed to the repository.
- [ ] Confirm only non-sensitive GitHub context values are used directly in the workflow.
- [ ] Confirm the repository maintainer has configured the required GitHub Secrets before relying on notifications.

Files:

- `.github/workflows/ci.yml`
- GitHub repository secrets configuration
