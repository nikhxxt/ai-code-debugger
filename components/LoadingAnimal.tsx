'use client';

import { useEffect, useState } from 'react';

const gifs = [
  'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif', // Cat
  'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',   // Dog
  'https://media.giphy.com/media/13borq7Zo2kulO/giphy.gif',      // Panda
  'https://media.giphy.com/media/5xaOcLGvzHxDKjufnLW/giphy.gif'  // Bunny
];

export default function LoadingAnimal() {
  const [gifIndex, setGifIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setGifIndex((prev) => (prev + 1) % gifs.length);
    }, 3000); // rotate every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <img
        src={gifs[gifIndex]}
        alt="Cute animal loading"
        className="w-32 h-32 rounded-full shadow-lg"
      />
      <p className="mt-2 text-red-400 font-semibold animate-pulse">
        🐾 Hang tight... Debugging in progress
      </p>
    </div>
  );
}
