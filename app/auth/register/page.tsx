"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest, setAuthToken } from "@/lib/api";
import type { AuthResponse } from "@/types";

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    try {
      const result = await apiRequest<AuthResponse>("/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });
      setAuthToken(result.token);
      localStorage.setItem("userId", result.user.id);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <h1 className="text-2xl font-semibold tracking-tight">Create account</h1>
      <p className="mt-2 text-sm text-zinc-600">Register to publish and track posts.</p>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <input value={username} onChange={(event) => setUsername(event.target.value)} className="w-full rounded-xl border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-900" placeholder="Username" />
        <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-900" placeholder="Email" />
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-zinc-900" placeholder="Password" />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button className="w-full rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">Create account</button>
      </form>
      <p className="mt-4 text-sm text-zinc-600">
        Already have an account? <Link href="/auth/login" className="font-medium text-zinc-900">Login</Link>
      </p>
    </div>
  );
}
