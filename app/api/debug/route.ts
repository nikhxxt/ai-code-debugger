// app/api/debug/route.ts
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { code, model } = await req.json();

    const payload = {
      model,
      messages: [
        { role: 'system', content: 'You are a helpful code debugger.' },
        { role: 'user', content: code },
      ],
    };

    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://your-vercel-site.vercel.app',
        'X-Title': 'AI Code Debugger',
      },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    let data;

    try {
      data = JSON.parse(text);
    } catch (err) {
      return new Response(
        JSON.stringify({ output: `❌ Failed to parse JSON: ${text}` }),
        { status: 500 }
      );
    }

    const output = data.choices?.[0]?.message?.content || '⚠️ No output from AI';
    return new Response(JSON.stringify({ output }), { status: 200 });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ output: `❌ API Error: ${err.message}` }),
      { status: 500 }
    );
  }
}
