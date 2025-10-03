# 🧠 AI Code Debugger
A cloud-native, multi-model AI debugger that analyzes code, explains errors, and delivers delightful output — complete with syntax highlighting, animated animal loading screens, and exportable results.

![Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-black?logo=vercel)
![License](https://img.shields.io/github/license/nikhxxt/ai-code-debugger)
![Stars](https://img.shields.io/github/stars/nikhxxt/ai-code-debugger?style=social)

---

## 🔗 Live Demo

👉 link

---

## 🚀 Features

-  Debug code using GPT-4, Claude, Mixtral, Gemini, and more via OpenRouter  
-  Animated animal loading GIFs for emotional engagement  
-  Syntax highlighting with `react-syntax-highlighter`  
-  Copy output and 📤 export as JSON  
-  Model selector with fallback to `openrouter/auto`  
-  Tailwind-powered red–white–black theme  

---

## 📦 Installation

```bash
git clone https://github.com/nikhxxt/ai-code-debugger.git
cd ai-code-debugger
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

Run locally:

```bash
npm run dev
```

---

## 🧩 Supported Models

| Model Name     | Model ID                             |
|----------------|--------------------------------------|
| Auto           | `openrouter/auto`                    |
| GPT-4          | `openrouter/openai/gpt-4`            |
| GPT-3.5        | `openrouter/openai/gpt-3.5-turbo`    |
| Claude 2.1     | `openrouter/anthropic/claude-2.1`    |
| Claude 3 Opus  | `openrouter/anthropic/claude-3-opus` |
| Mixtral        | `openrouter/mistral/mixtral`         |
| Gemini Pro     | `openrouter/google/gemini-pro`       |
| Command R+     | `openrouter/cohere/command-r-plus`   |

---

## 🛠️ Tech Used

- Next.js 14 – App Router, Server Actions, and Client Components
- TypeScript – Type-safe React components and API integration
- Tailwind CSS – Utility-first styling with custom red–white–black theme
- OpenRouter API – Multi-model AI access (GPT-4, Claude, Mixtral, Gemini, etc.)
- Vercel – Cloud-native deployment and edge performance
- React Syntax Highlighter – Code output with vscDarkPlus theme
- Animated GIF Loader – Rotating animal GIFs for emotional engagement
- Clipboard + Blob API – Copy and export debug output as JSON
- ESLint + Prettier – Code quality and formatting (optional but recommended)

## 📤 Export Format

```json
{
  "input": "your code here",
  "output": "AI debug response"
}
```

---

## 📄 License

MIT © [nikhxxt](https://github.com/nikhxxt)

---

