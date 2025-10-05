import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { code, model } = await req.json();

    const res = await fetch('https://api.openrouter.ai/v1/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        input: code,
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenRouter API error: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({ output: data.output || '⚠️ No response from AI' });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
