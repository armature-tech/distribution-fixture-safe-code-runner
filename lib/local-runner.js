import vm from 'node:vm';

export async function runUserCode(code) {
  const stdout = [];
  const stderr = [];
  const sandbox = {
    console: {
      log: (...args) => stdout.push(`${args.map(String).join(' ')}\n`),
      error: (...args) => stderr.push(`${args.map(String).join(' ')}\n`),
    },
    setTimeout,
    clearTimeout,
  };

  try {
    vm.runInNewContext(code, sandbox, { timeout: 1000 });
    return {
      provider: 'local-unsafe',
      stdout: stdout.join(''),
      stderr: stderr.join(''),
      exitCode: 0,
    };
  } catch (error) {
    return {
      provider: 'local-unsafe',
      stdout: stdout.join(''),
      stderr: `${error instanceof Error ? error.message : String(error)}\n`,
      exitCode: 1,
    };
  }
}
