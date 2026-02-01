"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowLeft, Terminal, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clue, setClue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  // Kredensial Hardcoded (Ganti sesuai keinginanmu)
  const ADMIN_EMAIL = "sysexp404@gmail.com";
  const ADMIN_PASS = "owner123";
  const ADMIN_CLUE = "SysExp404";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    // Simulasi delay biar terlihat seperti proses sistem
    setTimeout(() => {
      if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASS && clue === ADMIN_CLUE) {
        // Jika benar, buat cookie agar middleware.ts tetap mengizinkan masuk
        // Middleware kamu mengecek 'admin_token'
        document.cookie = `admin_token=local_auth_success; path=/; SameSite=Strict`;

        router.push("/admin");
        router.refresh();
      } else {
        setErrorMsg("SysExp: Akses Ditolak. Identitas atau Clue salah.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white font-mono">
      <Link href="/" className="absolute top-8 left-8 text-zinc-600 hover:text-white transition-all flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]">
        <ArrowLeft size={14} /> Back to Entry
      </Link>

      <div className="w-full max-w-[380px]">
        <div className="mb-8 text-center">
          <div className="inline-flex p-4 rounded-2xl bg-red-600/10 border border-red-600/20 mb-4">
            <Lock className="text-red-600" size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tighter uppercase italic">Internal Access Only</h1>
        </div>

        <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-[2rem] backdrop-blur-md shadow-2xl">
          {errorMsg && (
            <div className="mb-6 p-3 border border-red-900/50 bg-red-900/20 text-red-500 text-[10px] flex items-center gap-2 animate-shake">
              <ShieldAlert size={14} />
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-[9px] uppercase text-zinc-500 ml-1">Identity</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-red-600 outline-none transition-all placeholder:text-zinc-800"
                placeholder="Email Address"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase text-zinc-500 ml-1">Access Token</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-red-600 outline-none transition-all placeholder:text-zinc-800"
                placeholder="Password"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase text-zinc-500 ml-1">System Clue</label>
              <input
                type="text"
                value={clue}
                onChange={(e) => setClue(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-red-600 outline-none transition-all placeholder:text-zinc-800"
                placeholder="Clue Code"
                required
              />
            </div>

            <button disabled={loading} className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all uppercase text-[10px] tracking-[0.2em] mt-2 disabled:opacity-50">
              {loading ? "Decrypting..." : "Execute Login"}
            </button>
          </form>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-[8px] text-zinc-700 uppercase tracking-[0.4em]">
          <Terminal size={10} />
          Terminal Session 404
        </div>
      </div>
    </div>
  );
}
