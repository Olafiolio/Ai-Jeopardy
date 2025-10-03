
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this environment, we assume it's always present.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getDeeperExplanation = async (concept: string): Promise<string> => {
  try {
    const prompt = `Leg het AI-concept "${concept}" in het Nederlands uit in eenvoudige bewoordingen voor een beginner. Geef ook één praktisch voorbeeld uit de echte wereld. Houd het antwoord kort en bondig (ongeveer 2-3 zinnen).`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          temperature: 0.7,
      }
    });

    return response.text;
  } catch (error) {
    console.error(`Error generating explanation for ${concept}:`, error);
    return "Kon op dit moment geen uitleg genereren. Probeer het later opnieuw.";
  }
};

export const generateVictoryPoem = async (score: number, correctCount: number, totalCount: number, categories: string[]): Promise<string> => {
  try {
    const prompt = `Een speler heeft zojuist een AI-thema Jeopardy-spel voltooid.
    - Eindscore: ${score}
    - Correcte antwoorden: ${correctCount} van de ${totalCount}
    - De categorieën waren: ${categories.join(', ')}.
    
    Schrijf een kort (4-6 regels), leuk en feestelijk gedicht voor hen in het Nederlands. Feliciteer hen met hun prestatie en het leren over AI. Pas de toon aan op basis van de score. Een hoge score krijgt een zeer lovend gedicht, een lage score een bemoedigend gedicht.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
          temperature: 0.8,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Error generating victory poem with Gemini:", error);
    return "Een digitale pluim voor jou,\nJe kennis is helder en blauw.\nVan Prompt tot Token, slim en snel,\nJij wint dit AI-spel!";
  }
};
