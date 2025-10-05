// app/api/debug/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Get the code and model from the frontend
    const { code, model } = await req.json();

    // Check environment variable
    const apiKey = process.env.OPENROUTER_API_KEY || process.env.openrotenapik;
    if (!apiKey) {
      throw new Error('API key not found. Set OPENROUTER_API_KEY in Vercel environment variables.');
    }

    // Call OpenRouter API
    const res = await fetch('https://api.openrouter.ai/v1/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        input: code,
      }),
    });

    // Throw if API returns error
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`OpenRouter API error: ${res.status} - ${text}`);
    }

    // Parse JSON and return output
    const data = await res.json();
    return NextResponse.json({ output: data.output || '⚠️ No response from AI' });
  } catch (err: any) {
    console.error('Error in /api/debug:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

