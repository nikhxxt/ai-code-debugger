'use client';

import React from 'react';

interface LanguageSelectorProps {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, setLanguage }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-blue-600 mb-1">
        📝 Choose Code Language:
      </label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full p-2 border border-blue-400 rounded bg-white text-black"
      >
        <option value="auto">Auto Detect (Universal)</option>
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="csharp">C#</option>
        <option value="php">PHP</option>
        <option value="go">Go</option>
        <option value="ruby">Ruby</option>
        <option value="rust">Rust</option>
        <option value="css">CSS</option>
        <option value="html">HTML</option>
        <option value="bash">Bash</option>
        <option value="json">JSON</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
