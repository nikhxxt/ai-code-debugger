'use client';

import { useState } from 'react';
import CodeInput from '@/components/CodeInput'; // make sure alias @ is configured, or use ../components

export default function Home() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setOutput('');

    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      console.log('API response:', data);

      if (data.result) {
        setOutput(data.result);
      } else {
        setOutput('❌ No response received.');
      }
    } catch (err) {
      console.error(err);
      setOutput('❌ Error occurred while fetching the response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Code Debugger</h1>

      <CodeInput value={code} onChange={setCode} />

      <button
        onClick={handleSubmit}
        disabled={loading || !code.trim()}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Submit for Debugging'}
      </button>

      <h2 className="text-xl font-semibold mt-8 mb-2">AI Debug Output:</h2>
      <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{output}</pre>
    </main>
  );
}




