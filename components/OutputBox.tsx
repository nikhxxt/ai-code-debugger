import React from 'react';

interface OutputBoxProps {
  output: string;
}

const OutputBox: React.FC<OutputBoxProps> = ({ output }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg border border-gray-700 shadow-lg">
      <h2 className="text-lg font-semibold text-blue-400 mb-2">AI Debug Output:</h2>
      <pre className="whitespace-pre-wrap break-words text-sm font-mono">{output}</pre>
      {output && (
        <button
          onClick={handleCopy}
          className="mt-3 px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm text-white"
        >
          📋 Copy Output
        </button>
      )}
    </div>
  );
};

export default OutputBox;
