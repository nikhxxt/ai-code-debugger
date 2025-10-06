'use client';

import { useEffect, useState } from 'react';

const gifs = [
  'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif', // Cat typing
  'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',   // Dog wagging tail
  'https://media.giphy.com/media/5xaOcLGvzHxDKjufnLW/giphy.gif', // Bunny hopping
  'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif'   // Koala waving
];

export default function LoadingAnimal() {
  const [gifIndex, setGifIndex] = useState(() => Math.floor(Math.random() * gifs.length));

  useEffect(() => {
    // Pick a new random gif each time loading starts
    setGifIndex(Math.floor(Math.random() * gifs.length));
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
