'use client';

import { useState } from 'react';
import CodeInput from '../components/CodeInput';
import OutputBox from '../components/OutputBox';

export default function Page() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDebug = async () => {
    if (!code.trim()) return;

    setLoading(true);
    setOutput('');

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openrouter/auto',
          messages: [
            {
              role: 'system',
              content: 'You are an expert Python debugger. Find and explain the bug in the following code.'
            },
            {
              role: 'user',
              content: code
            }
          ]
        })
      });

      const data = await response.json();

      if (data.error) {
        setOutput(`❌ API Error: ${data.error.message || 'Unknown error'}`);
      } else {
        const reply = data.choices?.[0]?.message?.content || 'No response';
        setOutput(reply);
      }
    } catch (err: any) {
      setOutput(`❌ Fetch Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">🧠 AI Code Debugger</h1>
      <CodeInput value={code} onChange={setCode} />
      <button
        onClick={handleDebug}
        disabled={loading}
        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white disabled:opacity-50"
      >
        {loading ? 'Debugging...' : 'Find Bugs'}
      </button>
      <OutputBox output={output} />
    </main>
  );
}





