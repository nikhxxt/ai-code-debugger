'use client';

import { useState } from 'react';
import CodeInput from '../components/CodeInput'; // Adjust if your path differs
import OutputBox from '../components/OutputBox'; // Optional output display

export default function Home() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      setOutput(data.result || 'No output');
    } catch (err) {
      setOutput('Error occurred while debugging');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">AI Code Debugger</h1>
      
      <CodeInput value={code} onChange={setCode} />

      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Debugging...' : 'Debug Code'}
      </button>

      {output && (
        <OutputBox output={output} />
      )}
    </main>
  );
}
