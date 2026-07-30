"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiRequest } from "@/lib/api";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await apiRequest("/posts", { method: "POST", body: JSON.stringify({ title, content }) });
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create post.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <h1 className="text-2xl font-semibold tracking-tight">Create a post</h1>
      <p className="mt-2 text-sm text-zinc-600">Share a clear update with your audience.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-xl border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-900" placeholder="Title" />
        <textarea value={content} onChange={(event) => setContent(event.target.value)} className="min-h-40 w-full rounded-xl border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-900" placeholder="Write something thoughtful..." />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button className="rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">Publish</button>
      </form>
    </div>
  );
}
