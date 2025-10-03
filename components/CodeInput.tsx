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
      placeholder="Paste your code here..."
      className="w-full h-48 p-4 bg-white text-black placeholder-gray-600 rounded-lg border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 font-mono resize-none shadow-md"
    />
  );
}


