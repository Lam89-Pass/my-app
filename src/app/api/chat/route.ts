import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API Key gak kebaca." }, { status: 500 });
    }

    // PAKAI URL INI: Pake v1beta + gemini-1.5-flash-latest (Paling tembus 2026)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const googleResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: `Anda adalah asisten AI Salam. Jawab singkat: ${message}` }],
          },
        ],
      }),
    });

    const data = await googleResponse.json();

    if (!googleResponse.ok) {
      console.log("=== DIAGNOSA ERROR GOOGLE ===");
      console.log(JSON.stringify(data, null, 2));

      // Kalo Google beneran mampus, kasih jawaban template biar web lu gak keliatan error di browser
      return NextResponse.json({
        text: "Maaf Boss, koneksi AI lagi sibuk. Tapi tenang, Pintu Login 'SysExpOwn Login' tetep aktif!",
      });
    }

    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "AI lagi mikir...";
    return NextResponse.json({ text: aiText });
  } catch (error: any) {
    return NextResponse.json({ text: "Lagi maintenance sebentar, Boss." });
  }
}
