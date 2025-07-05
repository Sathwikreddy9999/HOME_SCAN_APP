import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Diagnosis, ServiceCategory } from '../types';

if (!process.env.API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const diagnoseIssue = async (imageBase64: string): Promise<Diagnosis> => {
  const prompt = `
    You are Home Scan, an expert home maintenance advisor. Analyze this image of a potential home issue.
    Your task is to identify the problem, suggest a simple DIY solution if one is feasible, and determine the single most appropriate type of professional service needed to fix it.
    
    Respond ONLY with a valid JSON object in the following format. Do not include any other text or markdown fences.
    
    {
      "problem": "A brief, clear description of the issue you see.",
      "diy_solution": "A simple, actionable DIY tip. If not possible, state 'Professional help is strongly recommended due to safety/complexity concerns.'",
      "professional_service_needed": "Choose ONE of the following categories: '${Object.values(ServiceCategory).join("', '")}'"
    }
  `;

  const imagePart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: imageBase64,
    },
  };

  const textPart = {
    text: prompt,
  };

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseMimeType: "application/json",
      }
    });

    let jsonStr = response.text.trim();
    const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[2]) {
      jsonStr = match[2].trim();
    }
    
    const parsedData = JSON.parse(jsonStr);

    // Basic validation
    if (parsedData.problem && parsedData.diy_solution && parsedData.professional_service_needed && Object.values(ServiceCategory).includes(parsedData.professional_service_needed)) {
      return parsedData as Diagnosis;
    } else {
      throw new Error("Invalid diagnosis format from API.");
    }
  } catch (error) {
    console.error("Error diagnosing issue with Gemini API:", error);
    // Fallback error response
    return {
        problem: "Analysis Failed",
        diy_solution: "Could not analyze the image. Please try again with a clear, well-lit photo of the problem area.",
        professional_service_needed: ServiceCategory.Handyman
    };
  }
};
