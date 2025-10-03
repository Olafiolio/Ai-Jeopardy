import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this environment, we assume it's always present.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateVictoryPoem = async (): Promise<string> => {
  try {
    const prompt = `Een speler heeft zojuist een AI-thema Jeopardy-spel gewonnen. Ze hebben Generatieve AI, Prompts, Hallucinatie, de DROP-methode, Context Window, Temperature, Tokens, AI Bias en Fine-tuning correct gedefinieerd. Schrijf een kort, leuk en feestelijk gedicht voor hen, feliciteer hen met het worden van een AI-expert. Schrijf in het Nederlands.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          temperature: 0.7,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating victory poem with Gemini:", error);
    return "Een digitale pluim voor jou,\nJe kennis is helder en blauw.\nVan Prompt tot Token, slim en snel,\nJij wint dit AI-spel!";
  }
};
