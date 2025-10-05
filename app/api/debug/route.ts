import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { code, model } = await req.json();

    // Check both possible env variable names
    const apiKey = process.env.OPENROUTER_API_KEY || process.env.openrotenapik;
    console.log("Using API Key:", apiKey ? "✅ Found" : "❌ Missing");

    if (!apiKey) {
      throw new Error("API key not set. Check Vercel environment variables.");
    }

    const res = await fetch('https://api.openrouter.ai/v1/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, input: code }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`OpenRouter API error: ${res.status} - ${text}`);
    }

    const data = await res.json();
    return NextResponse.json({ output: data.output || '⚠️ No response from AI' });
  } catch (err: any) {
    console.error("Error in /api/debug:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

