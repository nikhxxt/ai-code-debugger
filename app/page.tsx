// File: app/page.tsx

'use client';

import { useState } from 'react';

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

      const text = await res.text(); // Get raw response
      console.log("🔍 Raw API response:", text);

      try {
        const data = JSON.parse(text); // Try to parse JSON

        if (data.result) {
          setOutput(data.result);
        } else if (data.error) {
          setOutput('❌ Error from API: ' + data.error);
        } else {
          setOutput('⚠️ Unexpected API response format.');
        }
      } catch (err) {
        console.error("❌ JSON parse error:", err);
        setOutput('❌ Could not parse API response:\n' + text);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setOutput('❌ Network or fetch error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Code Debugger</h1>

      <textarea
        className="w-full p-3 border border-gray-300 rounded-md"
        rows={10}
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

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


