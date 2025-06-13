import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Code snippet is required' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert software engineer. Review the code for bugs, improvements, and best practices.',
        },
        {
          role: 'user',
          content: `Please review the following code:\n\n${code}`,
        },
      ],
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0]?.message?.content || 'No response';
    res.status(200).json({ result: aiResponse });
  } catch (error: any) {
    console.error('OpenAI Error:', error);
    res.status(500).json({ error: 'Something went wrong while processing your request.' });
  }
}
