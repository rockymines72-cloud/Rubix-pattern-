
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const explainAlgorithm = async (algorithm: string, patternName: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Explain this Rubik's Cube algorithm for the pattern "${patternName}": ${algorithm}. 
    Break it down step by step in a way a beginner could understand. 
    Explain what each symbol (like R, U, F') means briefly.`,
    config: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40,
    },
  });
  return response.text;
};

export const cubeChat = async (history: { role: 'user' | 'assistant', content: string }[], message: string) => {
  const ai = getAI();
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are a Rubik's Cube expert and world-class speedcuber. You know all about patterns, algorithms (CFOP, Roux, ZZ), and cubes from 2x2 to 17x17. Help the user with patterns, notation, and tips. Keep it encouraging and technical but clear.",
    },
  });

  // Re-build history format if necessary or just send the message
  // Since chat.sendMessage only takes a string, we assume context is handled by the internal chat object
  const response = await chat.sendMessage({ message });
  return response.text;
};
