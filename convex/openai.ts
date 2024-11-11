import { v } from "convex/values";
import OpenAI from "openai";
import { SpeechCreateParams } from "openai/resources/audio/speech.mjs";
import { action } from "./_generated/server";

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateAudioAction = action({
  args: { input: v.string(), voice: v.string() },
  handler: async (_, { voice, input }) => {
    const mp3 = await openAi.audio.speech.create({
      model: "tts-1",
      voice: voice as SpeechCreateParams["voice"],
      input,
    });

    const buffer = await mp3.arrayBuffer();

    return buffer;
  },
});
