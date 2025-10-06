'use client';
import { useState } from 'react';
import CodeInput from '@/components/CodeInput';
import LanguageSelector from '@/components/LanguageSelector';
import OutputBox from '@/components/OutputBox';
import LoadingAnimal from '@/components/LoadingAnimal';

export default function Home() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('auto');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setOutput('');

    try {
      const res = await fetch('/api/debug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });

      const data = await res.json();
      setOutput(data.output || data.error || '⚠️ No response from server');
    } catch (err) {
      setOutput('❌ Failed to connect to API');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">🐞 AI Code Debugger</h1>
      <LanguageSelector language={language} setLanguage={setLanguage} />
      <CodeInput code={code} setCode={setCode} />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        🧠 Debug with AI
      </button>
      {loading ? <LoadingAnimal /> : <OutputBox output={output} />}
      <p className="text-xs text-gray-500 italic">Using universal AI provider</p>
    </main>
  );
}


