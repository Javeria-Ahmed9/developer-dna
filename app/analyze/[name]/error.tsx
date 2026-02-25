"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl mb-6">🔍</p>
        <h1 className="text-2xl font-bold text-white mb-2">Developer Not Found</h1>
        <p className="text-gray-500 text-sm mb-8">{error.message}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
