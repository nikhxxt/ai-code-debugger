// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'AI Code Debugger',
  description: 'Debug and review your code using AI',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}
