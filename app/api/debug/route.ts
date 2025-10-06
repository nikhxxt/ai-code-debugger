import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    const model = "groq/compound-mini";

    if (!apiKey) {
      throw new Error("Missing GROQ_API_KEY in environment variables.");
    }

    const url = "https://api.groq.com/openai/v1/chat/completions";

    const systemPrompt =
      language === "auto"
        ? "You are an expert code debugger. Detect the language automatically and help the user fix their code."
        : `You are an expert code debugger. The language is ${language}. Help the user fix their code.`;

    const payload = {
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: code },
      ],
    };

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      const errorMsg = data.error?.message || `HTTP ${res.status}`;
      console.error("❌ Groq API error:", errorMsg);

      return NextResponse.json({
        output: `❌ Groq API error: ${errorMsg}\n\nPlease check your AI_MODEL value in Vercel or visit https://console.groq.com/docs/deprecations for alternatives.`,
      });
    }

    const output = data.choices?.[0]?.message?.content || "⚠️ No response from AI";

    return NextResponse.json({ output });
  } catch (err: any) {
    console.error("Error in /api/debug:", err);
    return NextResponse.json(
      { error: `❌ API Error: ${err.message}` },
      { status: 500 }
    );
  }
}

