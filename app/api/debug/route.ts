import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { code, model, language } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;
    const fallbackModel = 'openai/gpt-3.5-turbo';

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

    const payload = {
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: code },
      ],
    };

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };

    // 🛰️ Primary model request
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    // 🔁 Fallback if model fails or credits error
    if (!res.ok || data.error?.code === 402 || data.error?.message?.includes('Insufficient credits')) {
      const fallbackRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...payload, model: fallbackModel }),
      });

      const fallbackData = await fallbackRes.json();
      const fallbackOutput = fallbackData.choices?.[0]?.message?.content || '⚠️ Fallback model failed to respond.';
      return NextResponse.json({ output: fallbackOutput });
    }

    const output = data.choices?.[0]?.message?.content || '⚠️ No response from AI';
    return NextResponse.json({ output });
  } catch (err: any) {
    console.error('Error in /api/debug:', err);
    return NextResponse.json({ error: `❌ API Error: ${err.message}` }, { status: 500 });
  }
}


