import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json();

    const apiKey = process.env.GROQ_API_KEY; // 👈 Use Groq API key directly
    if (!apiKey) {
      throw new Error("Missing GROQ_API_KEY in environment variables.");
    }

    const url = "https://api.groq.com/openai/v1/chat/completions";
    const model = "llama3-8b-8192";

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
      console.error("❌ Groq API error:", data.error?.message || res.status);
      return NextResponse.json({
        output: `❌ Groq API error: ${data.error?.message || res.status}`,
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


