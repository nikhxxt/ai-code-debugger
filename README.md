# 🧠 AI Code Debugger
A cloud-native, multi-model AI debugger that analyzes code, explains errors, and delivers delightful output — complete with syntax highlighting, animated animal loading screens, and exportable results.

![Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-black?logo=vercel)
![Next.js](https://img.shields.io/badge/Next.js-14-blue?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-Responsive-06B6D4?logo=tailwindcss)  
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Stars](https://img.shields.io/github/stars/nikhxxt/ai-code-debugger?style=social)

---
  
## 📚 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [License](#-license)

---

## 🔗 Live Demo

👉 [Live Demo](https://ai-code-debugger-git-main-niks-projects-20063e2f.vercel.app?_vercel_share=NXXoUTxICaFRryjrJNVQkY7DNTrXSwEa)

---

## 🚀 Features

- 🔍 Debug code automatically with AI  
- 🐾 Animated animal loading GIFs for engagement  
- 🎨 Syntax highlighting with `react-syntax-highlighter`  
- 📋 Copy output and 📤 export as JSON  
- 🧪 Language selector (auto-detect or select manually)  
- 💅 Tailwind-powered red–white–black theme 

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| Frontend     | Next.js 14 (App Router), TypeScript  |
| Styling      | Tailwind CSS                        |
| AI Backend   | Universal AI API (`AI_API_KEY`)      |
| Deployment   | Vercel                              |
| UI Features  | React Syntax Highlighter, Animated GIF Loader |
| Utilities    | Clipboard API, Blob Export, ESLint + Prettier |

---

## 🧱 Architecture

```
User Input → /api/debug → AI API → AI Response
↘︎ LoadingAnimal.tsx ↙︎ ↘︎ OutputBox.tsx ↙︎

```

- Stateless client-side form with language selection  
- Serverless API route (`/api/debug`) handles prompt and fetch  
- Output rendered with syntax highlighting and export options  
- Fully deployed via Vercel — no local setup required
  
---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).  
See the [LICENSE](./LICENSE) file for details.

---
