'use client';
import GenerateThumbnail from '@/components/GenerateThumbnail';
import GeneratePodcast from '@/components/podcast/GeneratePodcast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { usePodcast } from '@/hooks/usePodcast';

import { Loader } from 'lucide-react';

const CreatePodcast = () => {
  const {
    form,
    onSubmit,
    image,
    audio,
    voice,
    setImage,
    setAudio,
    setVoice,
    isSubmitting,
  } = usePodcast();

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
                'Submit'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default CreatePodcast;
