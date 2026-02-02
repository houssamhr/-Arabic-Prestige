
import { GoogleGenAI, Modality } from "@google/genai";
import { decodeBase64, decodeAudioData } from "./audioUtils";

const API_KEY = process.env.API_KEY || '';

export class VoiceOverService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  async generateVoiceOver(script: string, voiceName: string = 'Fenrir'): Promise<AudioBuffer> {
    const model = "gemini-2.5-flash-preview-tts";
    
    // Custom prompt to guide the model's delivery style
    const styledPrompt = `Perform this Arabic script with a deep, resonant, and warm tone. 
      Deliver it confidently and authoritatively, yet invitingly like a high-end documentary narrator. 
      Use natural pacing with subtle pauses for emphasis. Ensure perfect Tashkeel and crisp pronunciation.
      
      Script: ${script}`;

    try {
      const response = await this.ai.models.generateContent({
        model,
        contents: [{ parts: [{ text: styledPrompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

      if (!base64Audio) {
        throw new Error("No audio data received from the API.");
      }

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      const decodedData = decodeBase64(base64Audio);
      return await decodeAudioData(decodedData, audioContext, 24000, 1);
    } catch (error) {
      console.error("Error generating voice-over:", error);
      throw error;
    }
  }
}

export const voiceOverService = new VoiceOverService();
