'use client';

import { useState } from 'react';

const DEFAULT_CODE = `console.log("hello from user code");\nconsole.log(2 + 2);`;

export default function Page() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function runCode(event) {
    event.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/run', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      setResult(await response.json());
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="workspace">
        <div>
          <p className="eyebrow">JavaScript runner</p>
          <h1>Run a snippet</h1>
        </div>
        <form onSubmit={runCode}>
          <textarea
            aria-label="Code"
            spellCheck="false"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Running...' : 'Run'}
          </button>
        </form>
        {result && (
          <section className="result" aria-live="polite">
            <div><strong>Provider</strong><span>{result.provider}</span></div>
            <div><strong>Exit</strong><span>{result.exitCode}</span></div>
            <pre>{result.stdout || result.stderr || result.error || '(no output)'}</pre>
          </section>
        )}
      </section>
    </main>
  );
}
