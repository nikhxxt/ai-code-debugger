'use client';

import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface OutputBoxProps {
  output: string;
  code: string;
}

const OutputBox: React.FC<OutputBoxProps> = ({ output, code }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  const handleExport = () => {
    const blob = new Blob([JSON.stringify({ input: code, output }, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'debug-output.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg border border-gray-700 shadow-lg">
      <h2 className="text-lg font-semibold text-blue-400 mb-2">AI Debug Output:</h2>
      <SyntaxHighlighter language="text" style={vscDarkPlus} wrapLines={true}>
        {output}
      </SyntaxHighlighter>

      {output && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm text-white"
          >
            📋 Copy Output
          </button>
          <button
            onClick={handleExport}
            className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm text-white"
          >
            📤 Export JSON
          </button>
        </div>
      )}
    </div>
  );
};

export default OutputBox;
