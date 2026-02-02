"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

// BANTAI PAKE DYNAMIC IMPORT
const AdminDashboard = dynamic(() => import("./AdminDashboardClean"), {
  ssr: false,
});

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse">SYSTEM_INITIALIZING...</p>
        </div>
      }
    >
      <AdminDashboard />
    </Suspense>
  );
}
