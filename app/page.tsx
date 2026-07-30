"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PostCard } from "@/components/PostCard";
import { apiRequest } from "@/lib/api";
import type { PostItem } from "@/types";

export default function HomePage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [sort, setSort] = useState("latest");
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const result = await apiRequest<PostItem[]>(`/posts?sort=${sort}`);
      setPosts(result);
    } catch (error) {
      console.error(error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [sort]);

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Social feed</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">A calm place to share ideas.</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
              Create posts, follow the latest conversations, and keep an eye on what earns the most engagement.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700">
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="liked">Most Liked</option>
              <option value="viewed">Most Viewed</option>
              <option value="trending">Trending</option>
            </select>
          </div>
        </div>
      </section>

      {loading ? <div className="text-sm text-zinc-500">Loading posts…</div> : null}
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onRefresh={loadPosts} />
        ))}
      </div>
    </div>
  );
}
