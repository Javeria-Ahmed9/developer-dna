export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-125 h-125 bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="border-b border-white/5 px-6 py-4">
        <span className="text-gray-600 text-sm">← Developer DNA</span>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 animate-pulse relative z-10">

        {/* Profile row skeleton */}
        <div className="flex items-center gap-5 mb-10">
          <div className="h-20 w-20 rounded-full bg-white/8 shrink-0" />
          <div className="space-y-2.5 flex-1">
            <div className="h-5 w-44 bg-white/8 rounded-lg" />
            <div className="h-3.5 w-28 bg-white/5 rounded-lg" />
            <div className="h-3 w-72 bg-white/4 rounded-lg" />
          </div>
        </div>

        {/* Archetype hero skeleton */}
        <div className="rounded-3xl border border-white/8 bg-white/3 p-10 text-center mb-6">
          <div className="h-2.5 w-36 bg-white/8 rounded-full mx-auto mb-5" />
          <div className="h-9 w-80 bg-white/10 rounded-2xl mx-auto mb-5" />
          <div className="space-y-2 max-w-md mx-auto">
            <div className="h-3 w-full bg-white/5 rounded-full" />
            <div className="h-3 w-5/6 bg-white/4 rounded-full mx-auto" />
            <div className="h-3 w-3/4 bg-white/3 rounded-full mx-auto" />
          </div>
        </div>

        {/* Dev style skeleton */}
        <div className="bg-white/3 border border-white/8 rounded-2xl px-6 py-5 mb-6">
          <div className="h-2.5 w-24 bg-white/8 rounded mb-3" />
          <div className="h-4 w-full bg-white/5 rounded" />
        </div>

        {/* Strengths + blind spots skeleton */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[0, 1].map((i) => (
            <div key={i} className="bg-white/3 border border-white/8 rounded-2xl p-6 space-y-4">
              <div className="h-2.5 w-20 bg-white/8 rounded" />
              {[1, 2, 3].slice(0, i === 1 ? 2 : 3).map((j) => (
                <div key={j} className="flex items-center gap-3">
                  <div className="h-5 w-5 rounded-full bg-white/8 shrink-0" />
                  <div className="h-3 bg-white/5 rounded flex-1" />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Languages skeleton */}
        <div className="bg-white/3 border border-white/8 rounded-2xl p-6 mb-6">
          <div className="h-2.5 w-28 bg-white/8 rounded mb-4" />
          <div className="flex gap-2 flex-wrap">
            {[80, 64, 72, 56, 68].map((w, i) => (
              <div key={i} className={`h-7 w-${w === 80 ? '20' : w === 64 ? '16' : w === 72 ? '18' : w === 56 ? '14' : '17'} bg-white/8 rounded-full`} />
            ))}
          </div>
        </div>

        {/* Stats skeleton */}
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/3 border border-white/8 rounded-2xl p-4 text-center">
              <div className="h-7 w-14 bg-white/8 rounded-lg mx-auto mb-2" />
              <div className="h-2.5 w-20 bg-white/5 rounded mx-auto" />
            </div>
          ))}
        </div>

        {/* Message */}
        <div className="text-center mt-12 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="h-1.5 w-1.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
          <p className="text-gray-600 text-sm">AI is decoding developer DNA...</p>
        </div>

      </div>
    </div>
  );
}
