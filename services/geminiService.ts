
import { GoogleGenAI, Chat, Type } from "@google/genai";
import { Quiz } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are 'Nevada Realty Whiz', an expert AI tutor specializing in preparing users for the Nevada real estate licensing exam. Your tone is encouraging, friendly, and professional. You break down complex topics into simple, digestible pieces. When asked to start a lesson, provide a concise overview of the topic. When asked to create a quiz, generate 5 challenging multiple-choice questions in the specified JSON format. Your primary goal is to help the user learn and feel confident for their exam. All of your knowledge must be specific to Nevada real estate laws and practices.`;

export const geminiService = {
  startChat: (history?: any[]) => {
    const chat: Chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: systemInstruction,
      },
      history: history || [],
    });
    return chat;
  },

  generateQuiz: async (topic: string): Promise<Quiz | null> => {
    try {
      const prompt = `Generate a 5-question multiple-choice quiz about "${topic}" for a Nevada real estate exam prep student. Provide one correct answer and three plausible incorrect answers for each question. Also, provide a brief explanation for why the correct answer is right.`;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctAnswer: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                  },
                  required: ["question", "options", "correctAnswer", "explanation"]
                }
              }
            },
            required: ["questions"]
          }
        },
      });

      const jsonText = response.text.trim();
      const quizData: Quiz = JSON.parse(jsonText);
      return quizData;

    } catch (error) {
      console.error("Error generating quiz:", error);
      return null;
    }
  },
};
