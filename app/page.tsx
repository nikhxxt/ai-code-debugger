import CodeInput from "@/components/CodeInput";

export default function Home() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">🧠 AI Code Debugger</h1>
      <p className="text-center mb-6 text-gray-600">Paste your code below and let the AI review and debug it!</p>
      <CodeInput />
    </main>
  );
}
