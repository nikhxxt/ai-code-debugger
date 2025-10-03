export default function CodeInput({
  value,
  onChange
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Paste your Python code here..."
      className="w-full h-48 p-4 bg-gray-900 text-white placeholder-gray-400 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono resize-none"
    />
  );
}

