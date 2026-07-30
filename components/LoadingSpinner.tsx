export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-6 text-sm text-zinc-500">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900" />
      <span className="ml-3">Loading…</span>
    </div>
  );
}
