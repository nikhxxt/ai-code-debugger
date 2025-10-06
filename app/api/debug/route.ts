import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { code, model, language } = await req.json();
    const apiKey = process.env.OPENROUTER_API_KEY;
    const fallbackModel = 'openai/gpt-3.5-turbo';

    if (!apiKey) {
      throw new Error('API key not found. Set OPENROUTER_API_KEY in Vercel environment variables.');
    }

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

    // 🔍 Primary model request
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    // 🔁 Fallback if model fails or credits error
    if (!res.ok || data.error?.code === 402 || data.error?.message?.includes('Insufficient credits')) {
      console.warn('⚠️ Primary model failed:', data.error?.message || res.status);

      const fallbackRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers,
        body: JSON.stringify({ ...payload, model: fallbackModel }),
      });

      const fallbackData = await fallbackRes.json();

      if (!fallbackRes.ok || fallbackData.error) {
        console.error('❌ Fallback model failed:', fallbackData.error?.message || fallbackRes.status);
        return NextResponse.json({
          output: `❌ Both models failed.\nPrimary: ${data.error?.message || res.status}\nFallback: ${fallbackData.error?.message || fallbackRes.status}`,
        });
      }

      const fallbackOutput = fallbackData.choices?.[0]?.message?.content || '⚠️ Fallback model gave no response.';
      return NextResponse.json({ output: fallbackOutput });
    }

    const output = data.choices?.[0]?.message?.content || '⚠️ No response from AI';
    return NextResponse.json({ output });
  } catch (err: any) {
    console.error('Error in /api/debug:', err);
    return NextResponse.json({ error: `❌ API Error: ${err.message}` }, { status: 500 });
  }
}
