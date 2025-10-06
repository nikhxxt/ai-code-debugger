'use client';

import { useEffect, useState } from 'react';

const gifs = [
  'https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif', // cat
  'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif',   // dog
  'https://media.giphy.com/media/13borq7Zo2kulO/giphy.gif',      // panda
  'https://media.giphy.com/media/5xaOcLGvzHxDKjufnLW/giphy.gif', // bunny
  'https://media.giphy.com/media/3oEduSbSGpGaRX2Vri/giphy.gif',  // hamster
  'https://media.giphy.com/media/3o6ZtpxSZbQRRnwCKQ/giphy.gif',  // duck
  'https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif',  // baby sloth
  'https://media.giphy.com/media/3o6ZsY8jvYyU8Z1xkU/giphy.gif',  // piglet
  'https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif',  // koala
  'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif'    // puppy repeat for variety
];

function shuffle(array: string[]) {
  return array.sort(() => Math.random() - 0.5);
}

export default function LoadingAnimal() {
  const [gifList, setGifList] = useState<string[]>([]);
  const [gifIndex, setGifIndex] = useState(0);

  useEffect(() => {
    setGifList(shuffle(gifs)); // shuffle on mount
    const interval = setInterval(() => {
      setGifIndex((prev) => (prev + 1) % gifs.length);
    }, 3000); // rotate every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <img
        src={gifList[gifIndex]}
        alt="Cute animal loading"
        className="w-32 h-32 rounded-full shadow-lg"
      />
      <p className="mt-2 text-red-400 font-semibold animate-pulse">
        🐾 Hang tight... Debugging in progress
      </p>
    </div>
  );
}
