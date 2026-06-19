# Code Runner

This is a small Next.js app where users can submit JavaScript snippets and see stdout, stderr, and an exit code.

The current implementation works for local demos, but it is not acceptable for production: `/app/api/run/route.js` calls into `lib/local-runner.js`, which executes submitted code in the application process.

The app is hosted as a serverless web application. Docker-based isolation and privileged child processes are not available in the production runtime, so the production fix needs remote sandbox execution that works from a hosted Next.js API route.

## Production task

Add safe execution for user-submitted code and deploy it.

Acceptance criteria:

- Submitted code must run in an isolated remote execution environment, not inside the Next.js server process.
- The API must keep returning `{ provider, stdout, stderr, exitCode }`.
- The app should be deployable as a normal hosted web application.
- Do not require Docker on the hosting runtime.
- Do not expose application secrets to submitted code.
- Clean up remote execution resources after each run.

## Local checks

```bash
npm install
npm test
npm run build
```

## API contract

```bash
curl -X POST http://localhost:3000/api/run \
  -H 'content-type: application/json' \
  -d '{"code":"console.log(2 + 2)"}'
```

Expected response shape:

```json
{
  "provider": "local-unsafe",
  "stdout": "4\n",
  "stderr": "",
  "exitCode": 0
}
```
