"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import type { ProfileData } from "@/types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const user = localStorage.getItem("userId");
        if (!user) {
          return;
        }
        const result = await apiRequest<ProfileData>(`/users/${user}`);
        setProfile(result);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  if (!profile) return <div className="text-sm text-zinc-500">Loading profile…</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <h1 className="text-2xl font-semibold tracking-tight">{profile.user.username}</h1>
        <p className="mt-2 text-sm text-zinc-600">{profile.user.email}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-zinc-50 p-4"><p className="text-sm text-zinc-500">Posts</p><p className="mt-1 text-xl font-semibold">{profile.totalPosts}</p></div>
          <div className="rounded-xl bg-zinc-50 p-4"><p className="text-sm text-zinc-500">Likes received</p><p className="mt-1 text-xl font-semibold">{profile.totalLikesReceived}</p></div>
          <div className="rounded-xl bg-zinc-50 p-4"><p className="text-sm text-zinc-500">Views received</p><p className="mt-1 text-xl font-semibold">{profile.totalViewsReceived}</p></div>
        </div>
      </div>
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <h2 className="text-lg font-semibold">User posts</h2>
        <div className="mt-4 space-y-3">
          {profile.posts.map((post) => (
            <div key={post.id} className="rounded-xl border border-zinc-200 p-4">
              <h3 className="font-medium text-zinc-900">{post.title}</h3>
              <p className="mt-1 text-sm text-zinc-600">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
