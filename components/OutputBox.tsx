import React from 'react';

interface OutputBoxProps {
  output: string;
}

const OutputBox: React.FC<OutputBoxProps> = ({ output }) => {
  return (
    <div className="mt-6 p-4 bg-white rounded shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold mb-2">AI Debug Output:</h2>
      <pre className="whitespace-pre-wrap break-words text-sm text-gray-800">{output}</pre>
    </div>
  );
};

export default OutputBox;
