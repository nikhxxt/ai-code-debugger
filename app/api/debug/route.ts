import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { code, model, language } = await req.json();

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error('API key not found. Set OPENROUTER_API_KEY in Vercel environment variables.');
    }

    // 🔍 Basic mismatch detection (example: Python syntax in Java mode)
    const isPythonCode = code.includes('int("') || code.includes('print(');
    if (language !== 'auto' && language === 'java' && isPythonCode) {
      return NextResponse.json({
        output: `⚠️ **Note:** The selected language is **Java**, but the submitted code appears to be **Python**. Please confirm your language selection.`,
      });
    }

    // 🧠 Dynamic system prompt based on language
    const systemPrompt =
      language === 'auto'
        ? 'You are an expert code debugger. Detect the language automatically and help the user fix their code.'
        : `You are an expert code debugger. The language is ${language}. Help the user fix their code.`;

    // 🛰️ Call OpenRouter API
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: code,
          },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`OpenRouter API error: ${res.status} - ${text}`);
    }

    const data = await res.json();
    const output = data.choices?.[0]?.message?.content || '⚠️ No response from AI';
    return NextResponse.json({ output });
  } catch (err: any) {
    console.error('Error in /api/debug:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

