"use client";

import Link from "next/link";
import { useState } from "react";
import { setAuthToken } from "@/lib/api";

export function Navbar() {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return Boolean(localStorage.getItem("token"));
  });

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="border-b border-zinc-200 bg-white/90 px-4 py-3 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        <Link href="/" className="text-base font-semibold tracking-tight text-zinc-900">
          Black & White Social
        </Link>
        <div className="flex items-center gap-1 text-sm text-zinc-700">
          <Link href="/" className="rounded-lg px-3 py-2 transition hover:bg-zinc-100">Feed</Link>
          <Link href="/leaderboard" className="rounded-lg px-3 py-2 transition hover:bg-zinc-100">Top Posts</Link>
          <Link href="/posts/new" className="rounded-lg px-3 py-2 transition hover:bg-zinc-100">Create</Link>
          {loggedIn ? (
            <>
              <Link href="/dashboard" className="rounded-lg px-3 py-2 transition hover:bg-zinc-100">Dashboard</Link>
              <Link href="/profile" className="rounded-lg px-3 py-2 transition hover:bg-zinc-100">Profile</Link>
              <button onClick={handleLogout} className="rounded-lg px-3 py-2 transition hover:bg-zinc-100">
                Logout
              </button>
            </>
          ) : (
            <Link href="/auth/login" className="rounded-lg bg-zinc-900 px-3 py-2 font-medium text-white transition hover:bg-zinc-800">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
