
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this environment, we assume it's always present.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const evaluateSpokenAnswer = async (userAnswer: string, correctAnswer: string): Promise<boolean> => {
  try {
    const prompt = `Je bent een strikte jury in een quizspel. De correcte definitie is: "${correctAnswer}". De speler zei: "${userAnswer}". Betekent het antwoord van de speler exact hetzelfde? Antwoord met alleen het woord "ja" of "nee".`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          temperature: 0,
          thinkingConfig: { thinkingBudget: 0 } // For fast yes/no answers
      }
    });

    const resultText = response.text.trim().toLowerCase();
    return resultText === 'ja';

  } catch (error) {
    console.error("Error evaluating answer with Gemini:", error);
    // In case of an API error, fall back to a simpler check or fail gracefully.
    // For this game, we'll be strict and say it's incorrect on API failure.
    return false;
  }
};

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
