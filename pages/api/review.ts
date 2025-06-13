import { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end("Method not allowed");
  }

  const { code } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // or gpt-4 if you have access
      messages: [
        { role: "system", content: "You are an expert programming assistant. Review and debug the code. Suggest improvements and give time/space complexity if applicable." },
        { role: "user", content: code },
      ],
    });

    const result = completion.choices[0].message.content;
    res.status(200).json({ result });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ result: "Error reviewing code." });
  }
}
