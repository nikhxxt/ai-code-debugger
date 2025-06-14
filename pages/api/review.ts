// pages/api/review.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { code } = req.body;

  if (!code || typeof code !== 'string') {
    return res.status(400).json({ error: 'Invalid code input' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert code debugger. Your job is to detect bugs and suggest corrections.',
        },
        {
          role: 'user',
          content: `Here is the code:\n\n${code}\n\nPlease identify bugs and suggest corrected code.`,
        },
      ],
      temperature: 0.2,
    });

    const reply = completion.choices[0].message.content;

    res.status(200).json({ result: reply });
  } catch (error) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
}

