"use client";
import GeneratePodcast from "@/components/GeneratePodcast";
import GenerateThumbnail from "@/components/GenerateThumbnail";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { toast } from "@/hooks/use-toast";
import { AudioState, ImageState, VoiceState } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
  podcastTranscription: z.string().min(10),
});

const CreatePodcast = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [image, setImage] = useState<ImageState>({
    imageStorageId: null,
    imageUrl: "",
  });

  const [audio, setAudio] = useState<AudioState>({
    audioUrl: "",
    audioStorageId: null,
    audioDuration: 0,
  });

  const [voice, setVoice] = useState<VoiceState>({
    voiceType: "",
    voicePrompt: "",
    voiceUrl: "",
  });

  const createPodcast = useMutation(api.podcasts.createPodcast);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
      podcastTranscription: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if (!audio.audioUrl || !image.imageUrl) {
      toast({
        title: "Please generate audio and image",
      });
      setIsSubmitting(false);
      throw new Error("Please generate audio and image");
    }

    try {
      await createPodcast({
        audioStorageId: audio.audioStorageId!,
        podcastTitle: data.podcastTitle,
        podcastDescription: data.podcastDescription,
        audioUrl: audio.audioUrl,
        imageUrl: image.imageUrl,
        imageStorageId: image.imageStorageId!,
        views: 0,
        audioDuration: audio.audioDuration,
        podcastTranscription: data.podcastTranscription,
      });

      toast({ title: "Podcast created" });
      router.push("/");
    } catch (e) {
      console.log(e);
      toast({
        title: "Something was wrong, podcast was not created",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create Podcast</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex flex-col w-full"
        >
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="podcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="input-class focus-visible:ring-offset-orange-1"
                      placeholder="Podcast AI..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="podcastDescription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="input-class focus-visible:ring-offset-orange-1"
                      placeholder="Write a short podcast description..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="podcastTranscription"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2.5">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Transcription
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="input-class focus-visible:ring-offset-orange-1"
                      placeholder="Write a transcription of your podcast here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            ></FormField>
          </div>
          <div>
            <GeneratePodcast
              image={image}
              audio={audio}
              voice={voice}
              setImage={setImage}
              setAudio={setAudio}
              setVoice={setVoice}
            />
            <GenerateThumbnail image={image} setImage={setImage} />
          </div>
          <div className="mt-10 w-full">
            <Button
              type="submit"
              className="text-16 text-white-1 bg-orange-1 font-extrabold w-full transition-all duration-200 hover:bg-orange-600"
            >
              {isSubmitting ? (
                <>
                  Submitting <Loader size={24} className="ml-2 animate-spin" />
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;
