import { runUserCode } from '../../../lib/local-runner.js';

export const runtime = 'nodejs';

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const code = typeof body.code === 'string' ? body.code : '';
  if (!code.trim()) {
    return Response.json({ error: 'code_required' }, { status: 400 });
  }

  const result = await runUserCode(code);
  return Response.json(result);
}
