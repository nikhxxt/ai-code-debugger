'use client';

import { useEffect, useState } from 'react';

const gifs = [
  'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif',       // Cat typing
  'https://media3.giphy.com/media/efZeeUTH7aRdxZVjJW/giphy.gif',      // Dog head tilt
  'https://media.giphy.com/media/5xaOcLGvzHxDKjufnLW/giphy.gif',      // Bunny hopping
  'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif',       // Koala waving
  'https://media.giphy.com/media/nYSHbwGjFqZi7QnY8A/giphy.gif'        // Fox in nature
];

export default function LoadingAnimal() {
  const [gifIndex, setGifIndex] = useState<number | null>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * gifs.length);
    setGifIndex(randomIndex);
  }, []);

  if (gifIndex === null) return null;

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

