export default function BackgroundBlobs() {
  return (
    <>
      <div className="fixed top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-float pointer-events-none z-0" />
      <div
        className="fixed top-1/2 right-0 w-[500px] h-[500px] bg-teal-300 rounded-full mix-blend-multiply filter blur-[150px] opacity-40 animate-float-delayed pointer-events-none z-0"
        style={{ animationDelay: '4s' }}
      />
      <div
        className="fixed bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-float pointer-events-none z-0"
        style={{ animationDelay: '2s' }}
      />
    </>
  );
}
