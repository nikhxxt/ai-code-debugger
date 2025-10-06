import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code, language } = await req.json();

    const apiKey = process.env.AI_API_KEY;
    const model = "groq/compound-mini";

    if (!apiKey) {
      throw new Error("Missing AI_API_KEY in environment variables.");
    }

    const url = "https://api.groq.com/openai/v1/chat/completions";

    // System prompt enforcing strict structured output
    const systemPrompt = language === "auto"
      ? `You are an expert code debugger. Only respond to code-related queries.
         For every code input, provide the output in this structured format:
         
         Language: <detected language>

         For each error in the code, number them and provide:
         Error <number>: <description>
         Correction <number>: <how to fix it>

         At the bottom, provide:
         Suggestions: <suggestions to improve the code>

         If the input is not code, reply: "⚠️ Only code-related questions are supported."`
      : `You are an expert code debugger. The user selected language: ${language}.
         For every code input, provide the output in this structured format:

         Language: <detected language>
         
         For each error in the code, number them and provide:
         Error <number>: <description>
         Correction <number>: <how to fix it>

         At the bottom, provide:
         Suggestions: <suggestions to improve the code>

         If the code is not in ${language}, reply: "⚠️ Wrong language! Expected ${language} code."
         If the input is not code, reply: "⚠️ Only code-related questions are supported."`;

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
      console.error("❌ AI API error:", errorMsg);

      return NextResponse.json({
        output: `❌ AI API error: ${errorMsg}`,
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

