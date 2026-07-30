"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import type { PostItem } from "@/types";

interface LeaderboardPostItem extends PostItem {
  rank: number;
}

export default function LeaderboardPage() {
  const [posts, setPosts] = useState<LeaderboardPostItem[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await apiRequest<LeaderboardPostItem[]>("/leaderboard");
        setPosts(result);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <h1 className="text-2xl font-semibold tracking-tight">Top posts</h1>
      <p className="mt-2 text-sm text-zinc-600">A simple view of the strongest performers over time.</p>
      <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-zinc-100 text-zinc-600">
            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Likes</th>
              <th className="px-4 py-3">Views</th>
              <th className="px-4 py-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-zinc-200">
                <td className="px-4 py-3">#{post.rank}</td>
                <td className="px-4 py-3">{post.title}</td>
                <td className="px-4 py-3">{post.author.username}</td>
                <td className="px-4 py-3">{post.likesCount}</td>
                <td className="px-4 py-3">{post.viewsCount}</td>
                <td className="px-4 py-3">{post.score.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
