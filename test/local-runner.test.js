import assert from 'node:assert/strict';
import test from 'node:test';
import { runUserCode } from '../lib/local-runner.js';

test('runUserCode captures stdout', async () => {
  const result = await runUserCode('console.log(2 + 2)');
  assert.equal(result.provider, 'local-unsafe');
  assert.equal(result.stdout, '4\n');
  assert.equal(result.stderr, '');
  assert.equal(result.exitCode, 0);
});

test('runUserCode reports errors', async () => {
  const result = await runUserCode('throw new Error("boom")');
  assert.equal(result.exitCode, 1);
  assert.match(result.stderr, /boom/);
});
