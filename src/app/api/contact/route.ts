import { NextResponse } from "next/server";
import { supabase } from "@/lib/database/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.type === "VISIT_LOG") {
      const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1467342342204948512/njitltmLGr8nsADbqLp0Ho7MycCqrFKzVqaykvt4OBMTaQ44tB77IWKgBYPsTcFTSuvV";

      const embed = {
        title: "🌐 NEW VISITOR DETECTED",
        color: 3447003,
        fields: [
          { name: "⏰ Waktu", value: body.time, inline: true },
          { name: "📅 Tanggal", value: body.date, inline: true },
          { name: "📍 Activity", value: `Membuka halaman: \`${body.path}\``, inline: false },
          { name: "🖥️ Metadata", value: `\`\`\`${body.userAgent}\`\`\``, inline: false },
        ],
        footer: { text: "SysExp Intelligence Monitoring // Real-time Feed" },
        timestamp: new Date().toISOString(),
      };

      if (DISCORD_WEBHOOK_URL?.startsWith("https")) {
        await fetch(DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ embeds: [embed] }),
        });
      }
      return NextResponse.json({ message: "Visit Log Reported" }, { status: 200 });
    }

    const { name, email, subject, message } = body;
    const { error: dbError } = await supabase.from("contacts").insert([{ name, email, subject, message, is_read: false }]);

    if (dbError) throw dbError;

    const CONTACT_WEBHOOK = "URL_WEBHOOK_DISCORD_KAMU";
    if (CONTACT_WEBHOOK?.startsWith("https")) {
      await fetch(CONTACT_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "📩 PESAN BARU DITERIMA!",
              color: 15548997,
              fields: [
                { name: "👤 Pengirim", value: name, inline: true },
                { name: "📧 Email", value: email, inline: true },
                { name: "📂 Subjek", value: subject, inline: false },
                { name: "💬 Pesan", value: `\`\`\`${message}\`\`\``, inline: false },
              ],
            },
          ],
        }),
      });
    }

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 200 });
}
