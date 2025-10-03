'use client';

import { useState, useEffect } from 'react';
import CodeInput from '@/components/CodeInput';

declare global {
  interface Window {
    puter: any;
  }
}

export default function Home() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  // Load Puter.js script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.puter.com/v2/';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setOutput('');

    try {
      const response = await window.puter.ai.chat(
        `Find bugs in this code:\n\n${code}`,
        { model: 'gpt-4.1-nano' }
      );

      setOutput(response);
    } catch (err) {
      console.error(err);
      setOutput('❌ Error occurred while analyzing the code.');
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





