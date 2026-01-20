import React from "react";

export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Spinner */}
      <div className="relative h-16 w-16 mb-6" aria-label="Loading">
        <span className="absolute inset-0 rounded-full border-4 border-white/20" />
        <span className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin" />
      </div>

      {/* Label */}
      <p className="text-sm text-white/80">Loading, please wait…</p>

      {/* Optional progress bar */}
      <div className="mt-4 w-64 h-1.5 bg-white/10 rounded overflow-hidden">
        <div className="h-full w-1/3 bg-white/70 animate-[indeterminate_1.2s_ease-in-out_infinite]" />
      </div>

      {/* Keyframes for indeterminate bar */}
      <style jsx>{`
        @keyframes indeterminate {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(50%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
}
