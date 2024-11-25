import { api } from "@/convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
import { GeneratePodcastProps } from "@/types";
import { useUploadFiles } from "@xixixao/uploadstuff/react";
import { useMutation } from "convex/react";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Input } from "./ui/input";

const useGeneratePodcast = (props: GeneratePodcastProps) => {
  const {
    setAudio,
    voice: { voicePrompt },
  } = props;

  const { toast } = useToast();

  const [isGenerating, setIsGenerating] = useState(false);

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);

  const { startUpload } = useUploadFiles(generateUploadUrl);

  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const generatePodcast = async () => {
    setIsGenerating(true);

    setAudio((prevState) => ({ ...prevState, audioUrl: "" }));

    console.log({ voicePrompt });

    if (!voicePrompt) {
      toast({
        title: "Please provide a voice type to generate voice podcast",
      });
      return setIsGenerating(false);
    }

    try {
      // const binaryAudio = atob(response);
      // const arrayBuffer = Uint8Array.from(binaryAudio, (char) =>
      //   char.charCodeAt(0)
      // ).buffer;

      // const blob = new Blob([response], { type: "audio/mpeg" });
      // const fileName = `podcast-${Date.now()}.mp3`;
      // const file = new File([blob], fileName, { type: "audio/mpeg" });

      console.log(response);

      // const uploaded = await startUpload([file]);

      // // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // const storageId = (uploaded[0].response as any).storageId;

      // const audioUrl = await getAudioUrl({ storageId });
      // setAudio((prevState) => ({ ...prevState, audioUrl: audioUrl! }));
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
    setAudio,
  } = props;

  const { toast } = useToast();
  const generatePodcastUrl = useMutation(api.files.generateUploadUrl);

  const { startUpload } = useUploadFiles(generatePodcastUrl);
  const getAudioUrl = useMutation(api.podcasts.getUrl);

  const audioRef = useRef<HTMLInputElement>(null);

  const [isAudioLoading, setIsAudioLoading] = useState(false);

  const uploadAudio = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { files } = e.target;
    if (!files) return;
    setIsAudioLoading(true);

    try {
      const file = files[0];
      const blob = await file.arrayBuffer().then((ab) => new Blob([ab]));

      const fileName = `podcast-${Date.now()}.mp3`;
      const fileEnd = new File([blob], fileName, { type: "audio/mpeg" });
      const uploaded = await startUpload([fileEnd]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const storageId = (uploaded[0].response as any).storageId;

      const audioUrl = await getAudioUrl({ storageId });

      setAudio((prevState) => ({
        ...prevState,
        audioStorageId: storageId,
        audioUrl: audioUrl!,
      }));

      setIsAudioLoading(false);

      toast({
        title: "Podcast generated successfully",
      });
    } catch (error) {
      console.log(error);
      setIsAudioLoading(false);
      toast({ title: "Error uploading audio", variant: "destructive" });
    }
  };

  return (
    <section className="mt-5">
      <div className="image_div" onClick={() => audioRef?.current?.click()}>
        <Input
          type="file"
          className="hidden"
          ref={audioRef}
          onChange={(e) => uploadAudio(e)}
        />
        {!isAudioLoading ? (
          <Image
            src="/icons/upload-image.svg"
            width={40}
            height={40}
            alt="upload"
          />
        ) : (
          <div className="text-16 flex-center font-medium text-white-1">
            Uploading
            <Loader size={20} className="animate-spin ml-2" />
          </div>
        )}
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-12 font-bold text-orange-1">
            Click to upload audio
          </h2>
          <p className="text-12 font-normal text-gray-1">MP3</p>
        </div>
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
              audioDuration: e.target.duration,
            }))
          }
        />
      )}
    </section>
  );
};

export default GeneratePodcast;
