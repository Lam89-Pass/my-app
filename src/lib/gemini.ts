export const getGeminiResponse = async (userMsg: string): Promise<string> => {
  try {
    const trimmed = userMsg?.trim();
    if (!trimmed) return "Ketik sesuatu dulu ya...";

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: trimmed }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error:", data.error);
      return data.error || "Sistem AI sedang bermasalah.";
    }

    return data.text;
  } catch (error) {
    console.error("Fetch Error:", error);
    return "Gagal terhubung ke server.";
  }
};
