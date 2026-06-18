# Implementation Plan: CI Email Feedback Notifications

## Objective

Add SMTP email feedback notifications to the GitHub Actions CI workflow so the configured recipient receives a message after each integration run finishes.

The implementation must satisfy `specs/ci-email-feedback-notifications/spec.md` without committing any email credentials to source control.

## Technology Constraints

- GitHub Actions must run the notification as part of the CI workflow.
- GitHub Secrets must store all sensitive SMTP values.
- SMTP must be used to send email notifications.
- No email password, token, or SMTP credential may be stored in source code.

## Workflow Architecture

The existing CI workflow is defined in `.github/workflows/ci.yml`.

The workflow should keep the current integration stages:

1. Checkout repository.
2. Setup Node.js.
3. Install dependencies.
4. Run automated tests.
5. Build the TypeScript project.
6. Send CI email feedback notification.

The notification step must be the final step in the CI job and must use:

```yaml
if: always()
```

This ensures GitHub Actions attempts to send the notification even when tests, build, or another previous step fails.

## Secret Management

All SMTP credentials and sensitive email configuration must be stored as GitHub Secrets.

Required secrets:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USERNAME`
- `SMTP_PASSWORD`
- `EMAIL_FROM`
- `EMAIL_TO`

Optional secrets, depending on the chosen SMTP provider or action:

- `SMTP_SECURE`
- `SMTP_TLS`

Rules:

- Secrets must be referenced only with the `secrets.*` GitHub Actions context.
- Secrets must not be echoed or printed in workflow logs.
- No real password, token, or SMTP credential may be committed to `.github/workflows/ci.yml` or any other repository file.
- Non-sensitive message metadata may use GitHub Actions context values such as `github.repository`, `github.ref_name`, `github.sha`, `github.run_id`, and `github.server_url`.

## Success Notification Flow

When dependency installation, automated tests, and TypeScript build complete successfully:

1. The workflow reaches the final notification step.
2. The notification step evaluates the job status.
3. The email subject and body identify the integration as passed.
4. The email is sent through the configured SMTP server.
5. The recipient receives a success email with repository, branch, commit SHA, workflow URL, status, and explanation.

Success explanation:

```text
The CI integration passed. Automated tests and the TypeScript build completed successfully.
```

## Failure Notification Flow

When tests, build, or another required integration step fails:

1. GitHub Actions marks the job as failed.
2. The workflow still reaches the notification step because it uses `if: always()`.
3. The notification step evaluates the job status.
4. The email subject and body identify the integration as failed.
5. The email is sent through the configured SMTP server.
6. The recipient receives a failure email with repository, branch, commit SHA, workflow URL, status, and explanation.

Failure explanation:

```text
The CI integration failed. At least one required step failed; review the workflow run for details.
```

## Email Content Structure

The notification email must include a concise subject and body.

Subject format:

```text
[CI] <repository> - <PASSED|FAILED> on <branch>
```

Body fields:

- Repository: repository name from `github.repository`
- Branch: branch name from `github.ref_name`
- Commit: commit SHA from `github.sha`
- Workflow run: URL built from `github.server_url`, `github.repository`, and `github.run_id`
- Status: `PASSED` or `FAILED`
- Result summary: short explanation based on the final pipeline status

Workflow run URL format:

```text
${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
```

## Implementation Approach

Use a maintained GitHub Action capable of sending SMTP email, or a small workflow script that sends mail using SMTP configuration from GitHub Secrets.

Preferred approach:

- Add a final email notification step to `.github/workflows/ci.yml`.
- Use `if: always()` on that step.
- Use workflow expressions to derive the final status.
- Use GitHub Secrets for all SMTP credentials and email addresses.

The notification implementation must not require application code changes because the feature belongs to the CI workflow, not the Express runtime.

## Validation Strategy

Static validation:

- Review `.github/workflows/ci.yml` to confirm the notification step uses `if: always()`.
- Confirm all SMTP credentials are referenced through `secrets.*`.
- Search the repository to confirm no plaintext email password or token was committed.

Local validation:

- Run `npm test`.
- Run `npm run build`.

CI validation:

- Trigger a workflow run where tests and build pass.
- Confirm the recipient receives a success email.
- Trigger or simulate a workflow run where tests or build fail.
- Confirm the recipient receives a failure email.
- Confirm both emails include repository name, branch name, commit SHA, workflow run URL, final status, and result explanation.

Security validation:

- Confirm workflow logs do not expose SMTP credentials.
- Confirm GitHub Secrets are configured in the repository settings before relying on the notification step.

## Deliverables

- Updated GitHub Actions workflow with a final SMTP notification step.
- GitHub Secrets configured for SMTP and recipient settings.
- Email content that reflects success and failure outcomes.
- Validation evidence that notifications run for both passing and failing CI results.
