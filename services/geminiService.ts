
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const callGemini = async (prompt: string, fallbackMessage: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                thinkingConfig: { thinkingBudget: 0 },
                maxOutputTokens: 20,
            }
        });
        
        const text = response.text.trim();
        // Return Gemini response, or fallback if empty. Remove quotes.
        return text.replace(/^"|"$/g, '') || fallbackMessage;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return fallbackMessage;
    }
};

export const generateSuccessMessage = async (): Promise<string> => {
    const prompt = "You are the AI for a futuristic smart lock. Generate an 'access granted' message. Rules: Max 4 words, creative, no quotes. Examples: Welcome, agent; Identity confirmed; Access granted";
    return callGemini(prompt, "Access Granted");
};

export const generateFailureMessage = async (): Promise<string> => {
    const prompt = "You are the AI for a futuristic smart lock. Generate an 'access denied' message. Rules: Max 5 words, creative, no quotes. Examples: Access denied; Unauthorized user; Code rejected";
    return callGemini(prompt, "Access Denied");
};