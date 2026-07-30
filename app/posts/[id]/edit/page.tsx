"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiRequest } from "@/lib/api";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const post = await apiRequest<{ title: string; content: string }>(`/posts/${params.id}`);
        setTitle(post.title);
        setContent(post.content);
      } catch {
        setError("Unable to load post.");
      }
    };
    load();
  }, [params.id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await apiRequest(`/posts/${params.id}`, { method: "PUT", body: JSON.stringify({ title, content }) });
      router.push(`/posts/${params.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update post.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold">Edit post</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded border border-zinc-300 px-3 py-2" />
        <textarea value={content} onChange={(event) => setContent(event.target.value)} className="min-h-40 w-full rounded border border-zinc-300 px-3 py-2" />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button className="rounded bg-zinc-900 px-4 py-2 text-white">Save changes</button>
      </form>
    </div>
  );
}
