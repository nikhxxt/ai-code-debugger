


'use client';

import { useState } from 'react';
import OutputBox from '@/components/OutputBox';
import LoadingAnimal from '@/components/LoadingAnimal';
import ModelSelector from '@/components/ModelSelector';

export default function HomePage() {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [model, setModel] = useState('openrouter/auto');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setOutput('');

    try {
      const res = await fetch('https://api.openrouter.ai/v1/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          input: code,
        }),
      });

      const data = await res.json();
      setOutput(data.output || '⚠️ No response from AI');
    } catch (err: any) {
      console.error(err);
      setOutput(`❌ API Error: ${err.message}`);
    }

    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-4">🐞 AI Code Debugger</h1>

      <ModelSelector model={model} setModel={setModel} />

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        className="w-full h-40 p-3 border border-red-400 rounded mb-4 text-black font-mono"
      />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded mb-4"
      >
        🧠 Debug with AI
      </button>

      {loading ? <LoadingAnimal /> : output && <OutputBox output={output} code={code} />}
    </main>
  );
}




