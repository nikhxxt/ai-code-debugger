// components/CodeInput.tsx
import React from 'react';

interface CodeInputProps {
  value: string;
  onChange: (value: string) => void;
}

const CodeInput: React.FC<CodeInputProps> = ({ value, onChange }) => {
  return (
    <textarea
      className="w-full p-2 border rounded"
      rows={10}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Paste your code here..."
    />
  );
};

export default CodeInput;

