import { Id } from "@/convex/_generated/dataModel";
import { Dispatch, SetStateAction } from "react";

export interface ImageState {
  imagePrompt: string | null;
  imageStorageId: Id<"_storage"> | null;
  imageUrl: string;
}

export interface AudioState {
  audioUrl: string;
  audioStorageId: Id<"_storage"> | null;
  audioDuration: number;
}

export interface VoiceState {
  voiceType: string;
  voicePrompt: string;
}

export interface GeneratePodcastProps {
  image: ImageState;
  audio: AudioState;
  setImage: Dispatch<SetStateAction<ImageState>>;
  setAudio: Dispatch<SetStateAction<AudioState>>;
  voice: VoiceState;
  setVoice: Dispatch<SetStateAction<VoiceState>>;
}
