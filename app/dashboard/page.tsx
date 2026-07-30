"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import type { DashboardData } from "@/types";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await apiRequest<DashboardData>("/dashboard");
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  if (!data) return <div className="text-sm text-zinc-500">Loading dashboard…</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-sm text-zinc-600">A concise snapshot of your activity and performance.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <p className="text-sm text-zinc-500">Posts</p>
          <p className="mt-2 text-2xl font-semibold">{data.totalPosts}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <p className="text-sm text-zinc-500">Likes</p>
          <p className="mt-2 text-2xl font-semibold">{data.totalLikes}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <p className="text-sm text-zinc-500">Views</p>
          <p className="mt-2 text-2xl font-semibold">{data.totalViews}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <p className="text-sm text-zinc-500">Best Post</p>
          <p className="mt-2 text-sm font-semibold">{data.bestPost?.title ?? "None yet"}</p>
        </div>
      </div>
    </div>
  );
}
