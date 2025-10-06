'use client';
import React from 'react';

type CodeInputProps = {
  code: string;
  setCode: (val: string) => void;
};

export default function CodeInput({ code, setCode }: CodeInputProps) {
  return (
    <textarea
      value={code}
      onChange={(e) => setCode(e.target.value)}
      placeholder="Paste your code here..."
      className="w-full h-48 p-4 bg-white text-black placeholder-gray-600 rounded-lg border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono resize-none shadow-md"
    />
  );
}
