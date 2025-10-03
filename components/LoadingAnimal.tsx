export default function LoadingAnimal() {
  return (
    <div className="flex flex-col items-center justify-center mt-6">
      <img
        src="https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif"
        alt="Cute animal loading"
        className="w-32 h-32 rounded-full shadow-lg"
      />
      <p className="mt-2 text-red-400 font-semibold animate-pulse">Hang tight... Debugging in progress 🐾</p>
    </div>
  );
}
