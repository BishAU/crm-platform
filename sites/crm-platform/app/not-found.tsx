'use client';

export default function NotFound() {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url('/images/oceanwater.png.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="bg-white/90 p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page Not Found</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}