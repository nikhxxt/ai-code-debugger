// app/layout.tsx
import '../styles/globals.css'; // ⚠️ Ensure the path matches where your CSS file is
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}

