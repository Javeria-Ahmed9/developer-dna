"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const examples = ["torvalds", "gaearon", "sindresorhus", "tj"];

export default function Home() {
  const [text, setText] = useState<string>("");
  const router = useRouter();

  const handleClick = () => {
    if (text.trim() !== "") router.push(`/analyze/${text.trim()}`);
  };


  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-4 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-100 h-100 bg-purple-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-xl text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          Powered by Groq + LLaMA 3.3
        </div>

        {/* Title */}
        <h1 className="text-6xl font-black text-white mb-4 tracking-tight leading-none">
          Developer{" "}
          <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            DNA
          </span>
        </h1>

        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          Enter any GitHub username and AI will decode their{" "}
          <span className="text-gray-200">developer personality</span>,
          strengths, and coding style.
        </p>

        {/* Search box */}
        <div className="relative mb-4">
          <form onSubmit={(e) => { e.preventDefault(); handleClick(); }} className="flex gap-2 bg-white/5 border border-white/10 rounded-2xl p-2 focus-within:border-blue-500/50 transition-colors">
            <span className="flex items-center pl-3 text-gray-500 text-lg select-none">
              github.com/
            </span>
            <input
              onChange={(e) => setText(e.target.value)}
              value={text}
              type="text"
              placeholder="username"
              className="flex-1 bg-transparent text-white outline-none placeholder-gray-600 text-lg"
            />
            <button
              type="submit"
              disabled={!text.trim()}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-medium transition-colors cursor-pointer text-sm"
            >
              Analyze →
            </button>
          </form>
        </div>

        {/* Example profiles */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-gray-600 text-xs">Try:</span>
          {examples.map((ex) => (
            <button
              key={ex}
              onClick={() => router.push(`/analyze/${ex}`)}
              className="text-xs text-gray-500 hover:text-blue-400 transition-colors cursor-pointer"
            >
              {ex}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}