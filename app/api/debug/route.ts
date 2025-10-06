import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json();
    const provider = process.env.AI_PROVIDER || 'groq';
    const apiKey = process.env.AI_API_KEY;

    const config = {
      groq: {
        url: 'https://api.groq.com/openai/v1/chat/completions',
        model: 'llama3-8b-8192',
      },
      openrouter: {
        url: 'https://openrouter.ai/api/v1/chat/completions',
        model: 'openai/gpt-3.5-turbo',
      },
      together: {
        url: 'https://api.together.xyz/v1/chat/completions',
        model: 'togethercomputer/llama-2-70b-chat',
      },
    };

    const { url, model } = config[provider];

    if (!apiKey) {
      throw new Error('Missing AI_API_KEY in environment variables.');
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

    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      console.error(`❌ ${provider} API error:`, data.error?.message || res.status);
      return NextResponse.json({
        output: `❌ ${provider} API error: ${data.error?.message || res.status}`,
      });
    }

    const output = data.choices?.[0]?.message?.content || '⚠️ No response from AI';
    return NextResponse.json({ output });
  } catch (err: any) {
    console.error('Error in /api/debug:', err);
    return NextResponse.json({ error: `❌ API Error: ${err.message}` }, { status: 500 });
  }
}
