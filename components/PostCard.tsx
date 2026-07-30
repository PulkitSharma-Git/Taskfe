"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";
import type { PostItem } from "@/types";

interface Props {
  post: PostItem;
  onRefresh?: () => void;
}

export function PostCard({ post, onRefresh }: Props) {
  const router = useRouter();

  const handleLike = async () => {
    try {
      await apiRequest(`/posts/${post.id}/like`, { method: "POST" });
      onRefresh?.();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unable to like post.");
    }
  };

  const handleDelete = async () => {
    try {
      await apiRequest(`/posts/${post.id}`, { method: "DELETE" });
      onRefresh?.();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unable to delete post.");
    }
  };

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-zinc-500">{post.author.username}</p>
          <h2 className="mt-1 text-lg font-semibold text-zinc-900">{post.title}</h2>
        </div>
        <div className="text-sm text-zinc-500">{new Date(post.createdAt).toLocaleDateString()}</div>
      </div>
      <p className="mt-3 text-sm leading-6 text-zinc-700">{post.content}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-zinc-600">
        <span className="rounded-full bg-zinc-100 px-3 py-1">Likes {post.likesCount}</span>
        <span className="rounded-full bg-zinc-100 px-3 py-1">Views {post.viewsCount}</span>
        <button onClick={handleLike} className="rounded-lg border border-zinc-200 px-3 py-1.5 transition hover:bg-zinc-100">
          {post.likedByMe ? "Unlike" : "Like"}
        </button>
        <Link href={`/posts/${post.id}`} className="rounded-lg border border-zinc-200 px-3 py-1.5 transition hover:bg-zinc-100">
          View
        </Link>
        {post.authorId === localStorage.getItem("userId") ? (
          <>
            <Link href={`/posts/${post.id}/edit`} className="rounded-lg border border-zinc-200 px-3 py-1.5 transition hover:bg-zinc-100">
              Edit
            </Link>
            <button onClick={handleDelete} className="rounded-lg border border-zinc-200 px-3 py-1.5 transition hover:bg-zinc-100">
              Delete
            </button>
          </>
        ) : null}
      </div>
    </article>
  );
}
