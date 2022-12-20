import axios from "axios";

async function translate(from: "en", to: "pt", text: string) {
  try {
    const res = await axios.post<{ translatedText: string }>(
      `${import.meta.env.VITE_TRANSLATOR_URL}/translate`,
      {
        q: text,
        source: from,
        target: to,
        format: "text",
      }
    );

    return res.data.translatedText;
  } catch (error) {
    console.error(error);
  }
}

export const translatorApi = {
  translate,
};
