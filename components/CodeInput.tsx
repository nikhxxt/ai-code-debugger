"use client";

import { useState } from "react";

export default function CodeInput() {
  const [code, setCode] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    setResponse(data.result);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <textarea
        className="w-full h-64 p-3 border rounded-md shadow-sm resize-none"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Reviewing..." : "Submit to AI"}
      </button>

      {response && (
        <div className="mt-6 p-4 bg-white border rounded-md shadow-sm whitespace-pre-wrap">
          <h3 className="text-xl font-semibold mb-2 text-green-700">AI Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
