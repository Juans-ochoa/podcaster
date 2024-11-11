import { api } from "@/convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
import { GeneratePodcastProps } from "@/types";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useAction, useMutation } from "convex/react";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

const useGeneratePodcast = (props: GeneratePodcastProps) => {
  const {
    setAudio,
    voice: { voicePrompt, voiceType },
  } = props;

  const { toast } = useToast();

  const [isGenerating, setIsGenerating] = useState(false);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const { startUpload } = useUploadFiles(generateUploadUrl);

  const getPodcastAudio = useAction(api.openai.generateAudioAction);

  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const generatePodcast = async () => {
    setIsGenerating(true);

    setAudio((prevState) => ({ ...prevState, audioUrl: "" }));

    if (!voicePrompt) {
      toast({
        title: "Please provide a voice type to generate voice podcast",
      });
      return setIsGenerating(false);
    }

    try {
      const response = await getPodcastAudio({
        voice: voiceType,
        input: voicePrompt,
      });

      const blob = new Blob([response], { type: "audio/mpeg" });
      const fileName = `podcast-${Date.now()}.mp3`;
      const file = new File([blob], fileName, { type: "audio/mpeg" });

      const uploaded = await startUpload([file]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const storageId = (uploaded[0].response as any).storageId;

      const audioUrl = await getAudioUrl({ storageId });
      setAudio((prevState) => ({ ...prevState, audioUrl: audioUrl! }));
      setIsGenerating(false);

      toast({
        title: "Podcast generated successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error creating a podcast",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generatePodcast,
  };
};

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const {
    voice: { voicePrompt },
    audio: { audioUrl },
    setVoice,
    setAudio,
  } = props;
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);

  return (
    <section className="mt-5">
      <article className="flex flex-col gap-2.5">
        <Label className="text-16 font-bold text-white-1">
          AI Prompt to generate Podcast
        </Label>
        <Textarea
          className="input-class font-light  focus-visible:ring-offset-orange-1"
          placeholder="Provide text to generate audio"
          rows={5}
          value={voicePrompt}
          onChange={(e) =>
            setVoice((prevState) => ({
              ...prevState,
              voicePrompt: e.target.value,
            }))
          }
        />
      </article>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="button"
          onClick={generatePodcast}
          className="text-16 text-white-1 bg-orange-1 font-bold w-full"
        >
          {isGenerating ? (
            <>
              Generating <Loader size={24} className="ml-2 animate-spin" />
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>
      {audioUrl && (
        <audio
          controls
          src={audioUrl}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) =>
            setAudio((prevState) => ({
              ...prevState,
              audioDuration: e.currentTarget.duration,
            }))
          }
        />
      )}
    </section>
  );
};

export default GeneratePodcast;
