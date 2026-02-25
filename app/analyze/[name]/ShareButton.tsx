"use client";

import { useState } from "react";

export default function ShareButton({ username }: { username: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/analyze/${username}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white px-5 py-2.5 rounded-xl text-sm transition-colors cursor-pointer"
    >
      {copied ? "✓ Copied!" : "Share Profile"}
    </button>
  );
}
