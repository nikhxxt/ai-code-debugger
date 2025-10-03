'use client';

import React from 'react';

interface ModelSelectorProps {
  model: string;
  setModel: (model: string) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ model, setModel }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-red-600 mb-1">
        🤖 Choose AI Model:
      </label>
      <select
        value={model}
        onChange={(e) => setModel(e.target.value)}
        className="w-full p-2 border border-red-400 rounded bg-white text-black"
      >
        <option value="openrouter/auto">Auto (Recommended)</option>
        <option value="openrouter/openai/gpt-4">GPT-4</option>
        <option value="openrouter/openai/gpt-3.5-turbo">GPT-3.5</option>
        <option value="openrouter/anthropic/claude-2.1">Claude 2.1</option>
        <option value="openrouter/anthropic/claude-3-opus">Claude 3 Opus</option>
        <option value="openrouter/mistral/mixtral">Mixtral</option>
        <option value="openrouter/google/gemini-pro">Gemini Pro</option>
        <option value="openrouter/cohere/command-r-plus">Command R+</option>
      </select>
    </div>
  );
};

export default ModelSelector;
