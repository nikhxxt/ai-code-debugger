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
      className="w-full max-w-2xl h-48 p-4 bg-gray-900 text-white placeholder-gray-400 rounded resize-none border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

