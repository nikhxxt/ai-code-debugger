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
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'mistral-7b',
          messages: [
            { role: 'system', content: 'You are a helpful AI code debugger.' },
            { role: 'user', content: `Find bugs in this code:\n\n${code}` }
          ]
        })
      });

      const data = await response.json();
      const aiReply = data.choices?.[0]?.message?.content || '❌ No response from AI';
      setOutput(aiReply);
    } catch (err) {
      console.error('AI error:', err);
      setOutput('❌ Error occurred while analyzing the code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🧠 AI Code Debugger</h1>
      <textarea
        rows={10}
        cols={80}
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ width: '100%', fontFamily: 'monospace', marginBottom: '1rem' }}
      />
      <br />
      <button
        onClick={handleSubmit}
        disabled={loading || !code.trim()}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Analyzing...' : 'Find Bugs'}
      </button>
      <h2>🔍 Output</h2>
      <pre style={{ background: '#f4f4f4', padding: '1rem', whiteSpace: 'pre-wrap' }}>
        {output}
      </pre>
    </main>
  );
}







