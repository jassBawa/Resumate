export function BackgroundElements() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-blob absolute top-0 -left-4 h-72 w-72 rounded-full bg-purple-300 opacity-20 mix-blend-multiply blur-xl filter dark:bg-purple-900"></div>
      <div className="animate-blob animation-delay-2000 absolute top-0 -right-4 h-72 w-72 rounded-full bg-yellow-300 opacity-20 mix-blend-multiply blur-xl filter dark:bg-yellow-900"></div>
      <div className="animate-blob animation-delay-4000 absolute -bottom-8 left-20 h-72 w-72 rounded-full bg-pink-300 opacity-20 mix-blend-multiply blur-xl filter dark:bg-pink-900"></div>
    </div>
  );
}
