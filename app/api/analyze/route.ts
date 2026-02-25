import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });
interface Repo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
}

export async function POST(req: NextRequest) {
  const { username } = await req.json();
  console.log(username);
  const ghHeaders = { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` };
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { headers: ghHeaders }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers: ghHeaders }),
  ]);

  if (!userRes.ok) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const user = await userRes.json();
  const repos: Repo[] = await reposRes.json();

  const totalLanguage: Record<string, number> = {};
  repos.forEach((rep) => {
    if (rep.language) {
      totalLanguage[rep.language] = (totalLanguage[rep.language] || 0) + 1;
    }
  });
  const totalStars = repos.reduce((t, rep) => t + rep.stargazers_count, 0);
  const topRepos = repos
    .slice(0, 20)
    .map((r) => `${r.name}: ${r.description || "no description"}`)
    .join("\n");

  const prompt = `
  You are analyzing a GitHub developer profile. Generate a Developer DNA report.

  Name: ${user.name || username}
  Bio: ${user.bio || "None"}
  Public repos: ${user.public_repos}
  Followers: ${user.followers}
  Total stars: ${totalStars}
  Languages detected: ${JSON.stringify(totalLanguage)}
  Top repo names and descriptions:
  ${topRepos}

  Based on repo names, descriptions, and languages — infer the full tech stack including frameworks, libraries, and tools (e.g. React, Next.js, Node, Tailwind, Firebase, etc.) even if not explicitly listed as a language.
  IMPORTANT: Respond ONLY in English. All fields must be in English. Only include technologies you are confident about — do not guess or speculate.

  Return ONLY valid JSON with this structure:
  {
    "archetype": "creative 2-3 word developer title",
    "summary": "2-3 sentence personality summary",
    "strengths": ["strength 1", "strength 2", "strength 3"],
    "blindSpots": ["blind spot 1", "blind spot 2"],
    "techStack": ["tech1", "tech2", "tech3", "tech4", "tech5"],
    "devStyle": "one sentence about their coding style"
  }
  `;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  const dna = JSON.parse(response.choices[0].message.content!);

  return NextResponse.json({ dna, user });
}
