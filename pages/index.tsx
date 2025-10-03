'use client';

import { useState } from 'react';

export default function Page() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setOutput('');

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful AI code debugger. Point out syntax errors and logic flaws.' },
            { role: 'user', content: `Find bugs in this code:\n\n${code}` }
          ]
        })
      });

      const data = await response.json();
      console.log('AI raw response:', data);

      if (data.error) {
        setOutput(`❌ API Error: ${data.error.message}`);
        return;
      }

      const aiReply = data.choices?.[0]?.message?.content?.trim();
      setOutput(aiReply || '❌ AI returned an empty response.');
    } catch (err: any) {
      console.error('AI error:', err);
      setOutput(`❌ Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8 font-sans">
      <h1 className="text-2xl font-bold mb-4">🧠 AI Code Debugger</h1>
      <textarea
        rows={10}
        className="w-full font-mono p-4 border border-gray-300 rounded mb-4"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading || !code.trim()}
        className={`px-4 py-2 text-white rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? 'Analyzing...' : 'Find Bugs'}
      </button>
      <h2 className="text-xl font-semibold mt-6 mb-2">🔍 Output</h2>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{output}</pre>
    </main>
  );
}







