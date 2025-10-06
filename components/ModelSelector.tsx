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
        <option value="openai/gpt-4">GPT-4</option>
        <option value="openai/gpt-3.5-turbo">GPT-3.5 Turbo</option>
        <option value="anthropic/claude-3-opus">Claude 3 Opus</option>
        <option value="mistral/mixtral-8x7b-instruct">Mixtral 8x7B</option>
        <option value="google/gemini-2.5-pro">Gemini 2.5 Pro</option>
        <option value="cohere/command-r-plus">Command R+</option>
        <option value="meta-llama/llama-3-70b-instruct">LLaMA 3 70B</option>
      </select>
    </div>
  );
};

export default ModelSelector;
