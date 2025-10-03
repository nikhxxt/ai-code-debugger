# 🧠 AI Code Debugger
A cloud-native, multi-model AI debugger that analyzes code, explains errors, and delivers delightful output — complete with syntax highlighting, animated animal loading screens, and exportable results.

![Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-black?logo=vercel)
![Next.js](https://img.shields.io/badge/Next.js-14-blue?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-Responsive-06B6D4?logo=tailwindcss)
![OpenRouter](https://img.shields.io/badge/OpenRouter-MultiModel-FF4A4A?logo=openai)
![License](https://img.shields.io/github/license/nikhxxt/ai-code-debugger)
![Stars](https://img.shields.io/github/stars/nikhxxt/ai-code-debugger?style=social)

---

## 📚 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Supported Models](#-supported-models)
- [Architecture](#-architecture)
- [License](#-license)

---

## 🔗 Live Demo

👉 [ai-code-debugger.vercel.app] (https://ai-code-debugger.vercel.app)](https://ai-code-debugger-8nlim6g7i-niks-projects-20063e2f.vercel.app/)

---

## 🚀 Features

- 🔍 Debug code using GPT-4, Claude, Mixtral, Gemini, and more via OpenRouter  
- 🐾 Animated animal loading GIFs for emotional engagement  
- 🎨 Syntax highlighting with `react-syntax-highlighter`  
- 📋 Copy output and 📤 export as JSON  
- 🧪 Model selector with fallback to `openrouter/auto`  
- 💅 Tailwind-powered red–white–black theme  

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| Frontend     | Next.js 14 (App Router), TypeScript  |
| Styling      | Tailwind CSS                        |
| AI Backend   | OpenRouter API                      |
| Deployment   | Vercel                              |
| UI Features  | React Syntax Highlighter, Animated GIF Loader |
| Utilities    | Clipboard API, Blob Export, ESLint + Prettier |

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

## 🧱 Architecture

```
User Input → Model Selector → /api/debug → OpenRouter API → AI Response
         ↘︎ LoadingAnimal.tsx ↙︎           ↘︎ OutputBox.tsx ↙︎
```

- Stateless client-side form with dynamic model selection  
- Serverless API route (`/api/debug`) handles prompt and fetch  
- Output rendered with syntax highlighting and export options  
- Fully deployed via Vercel — no local setup required  

---

## 📄 License

MIT © [nikhxxt](https://github.com/nikhxxt)

---
