"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

export const dynamic = "force-dynamic";

const AdminDashboard = dynamic(() => import("./AdminDashboard"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-zinc-500 font-mono text-[10px] uppercase tracking-widest animate-pulse">
        Initializing_Admin_System...
      </p>
    </div>
  ),
});

export default function AdminPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center">
           <div className="w-10 h-10 border-4 border-zinc-800 border-t-red-600 rounded-full animate-spin"></div>
        </div>
      }
    >
      <AdminDashboard />
    </Suspense>
  );
}