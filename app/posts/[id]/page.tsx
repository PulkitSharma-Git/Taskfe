"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiRequest } from "@/lib/api";
import type { PostItem } from "@/types";

export default function PostDetailsPage() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<PostItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await apiRequest<PostItem>(`/posts/${params.id}`);
        setPost(result);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.id]);

  if (loading) return <div className="text-sm text-zinc-500">Loading post…</div>;
  if (!post) return <div className="text-sm text-zinc-500">Post not found.</div>;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <Link href="/" className="text-sm text-zinc-500">← Back to feed</Link>
      <h1 className="mt-4 text-3xl font-semibold">{post.title}</h1>
      <p className="mt-2 text-sm text-zinc-500">By {post.author.username}</p>
      <p className="mt-6 text-lg leading-8 text-zinc-700">{post.content}</p>
      <div className="mt-6 flex gap-4 text-sm text-zinc-600">
        <span>Likes: {post.likesCount}</span>
        <span>Views: {post.viewsCount}</span>
      </div>
    </div>
  );
}
