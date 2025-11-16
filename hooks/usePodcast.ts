import { api } from '@/convex/_generated/api';
import { AudioState, ImageState, VoiceState } from '@/types';
import { useMutation } from 'convex/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from './use-toast';

const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
  podcastTranscription: z.string().min(10),
});

export const usePodcast = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [image, setImage] = useState<ImageState>({
    imageStorageId: null,
    imageUrl: '',
  });

  const [audio, setAudio] = useState<AudioState>({
    audioUrl: '',
    audioStorageId: null,
    audioDuration: 0,
  });

  const [voice, setVoice] = useState<VoiceState>({
    voiceType: '',
    voicePrompt: '',
    voiceUrl: '',
  });

  const createPodcast = useMutation(api.podcasts.createPodcast);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: '',
      podcastDescription: '',
      podcastTranscription: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if (!audio.audioUrl || !image.imageUrl) {
      toast({
        title: 'Please generate audio and image',
      });
      setIsSubmitting(false);
      throw new Error('Please generate audio and image');
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

      toast({ title: 'Podcast created' });
      router.push('/');
    } catch (e) {
      console.log(e);
      toast({
        title: 'Something was wrong, podcast was not created',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    form,
    onSubmit,
    voice,
    setVoice,
    image,
    audio,
    setImage,
    setAudio,
    isSubmitting,
  };
};
