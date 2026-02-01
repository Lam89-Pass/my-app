export const getGeminiResponse = async (userMsg: string): Promise<string> => {
  try {
    const trimmed = userMsg?.trim();
    if (!trimmed) return "Ketik sesuatu dulu ya 😊";

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: trimmed }),
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      console.error("API Error:", data.error);
      return "Sistem AI lagi down, tapi Pintu Login lu tetep aman.";
    }

    if (!data.text || typeof data.text !== "string") {
      return "Hmm, AI-nya diam nih. Coba lagi sebentar ya.";
    }

    return data.text;
  } catch (error) {
    console.error("Critical Error:", error);
    return "Sistem AI lagi down, tapi Pintu Login lu tetep aman.";
  }
};