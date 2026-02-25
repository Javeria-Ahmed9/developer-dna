import ShareButton from "./ShareButton";

interface DNA {
  archetype: string;
  summary: string;
  strengths: string[];
  blindSpots: string[];
  techStack: string[];
  devStyle: string;
}

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
  bio: string | null;
  location: string | null;
}

export default async function page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ;
  const results = await fetch(`${baseUrl}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: name }),
  });

  if (!results.ok) throw new Error("Could not analyze this user");

  const { dna, user }: { dna: DNA; user: GitHubUser } = await results.json();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      {/* Top nav */}
      <div className="border-b border-white/5 px-6 py-4">
        <a href="/" className="text-gray-500 hover:text-white transition-colors text-sm">
          ← Developer DNA
        </a>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Profile row */}
        <div className="flex items-center gap-5 mb-10">
          <img
            src={user.avatar_url}
            className="h-20 w-20 rounded-full ring-2 ring-white/10"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name || user.login}</h1>
            <p className="text-blue-400 text-sm">@{user.login}</p>
            {user.bio && <p className="text-gray-400 text-sm mt-1 max-w-md">{user.bio}</p>}
            {user.location && <p className="text-gray-600 text-xs mt-1">📍 {user.location}</p>}
          </div>
        </div>

        {/* Archetype hero */}
        <div className="relative rounded-3xl overflow-hidden mb-6 p-px bg-linear-to-br from-blue-500 via-purple-500 to-pink-500">
          <div className="bg-[#0d0d18] rounded-3xl px-8 py-10 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-purple-400 mb-3">Developer Archetype</p>
            <h2 className="text-4xl font-black bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 pb-1">
              {dna.archetype}
            </h2>
            <p className="text-gray-300 leading-relaxed max-w-xl mx-auto text-sm">
              {dna.summary}
            </p>
          </div>
        </div>

        {/* Coding style */}
        <div className="bg-white/3 border border-white/8 rounded-2xl px-6 py-5 mb-6">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Coding Style</p>
          <p className="text-gray-200 italic text-sm leading-relaxed">&ldquo;{dna.devStyle}&rdquo;</p>
        </div>

        {/* Strengths + Blind Spots */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-widest text-emerald-400 mb-4">Strengths</p>
            <ul className="space-y-3">
              {dna.strengths.map((s) => (
                <li key={s} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs shrink-0">✓</span>
                  <span className="text-gray-200">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/3 border border-white/8 rounded-2xl p-6">
            <p className="text-xs uppercase tracking-widest text-amber-400 mb-4">Blind Spots</p>
            <ul className="space-y-3">
              {dna.blindSpots.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 h-5 w-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs shrink-0">!</span>
                  <span className="text-gray-200">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Languages */}
        <div className="bg-white/3 border border-white/8 rounded-2xl p-6 mb-6">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Tech Stack</p>
          <div className="flex flex-wrap gap-2">
            {dna.techStack.map((lang, i) => (
              <span
                key={lang}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border ${
                  i === 0
                    ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                    : i === 1
                    ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                    : "bg-white/5 text-gray-300 border-white/10"
                }`}
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { label: "Followers", value: user.followers.toLocaleString() },
            { label: "Following", value: user.following.toLocaleString() },
            { label: "Repositories", value: user.public_repos.toLocaleString() },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/3 border border-white/8 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3">
          <a
            href="/"
            className="inline-block bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white px-5 py-2.5 rounded-xl text-sm transition-colors"
          >
            ← Analyze another
          </a>
          <ShareButton username={user.login} />
        </div>

      </div>
    </div>
  );
}
