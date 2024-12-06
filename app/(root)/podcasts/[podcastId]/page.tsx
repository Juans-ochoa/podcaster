"use client";

import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import PodcastDetailPlayer from "@/components/PodcastDetailPlayer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import { use } from "react";

const PodcastDetails = ({
  params,
}: {
  params: Promise<{ podcastId: Id<"podcasts"> }>;
}) => {
  const { podcastId } = use(params);

  const { user } = useUser();

  const podcast = useQuery(api.podcasts.getPodcastById, {
    podcastId: podcastId,
  });

  const similarPodcasts = useQuery(api.podcasts.getPodcastByTitle, {
    podcastId: podcastId,
  });

  const isOwner = user?.id === podcast?.authorId;

  if (!similarPodcasts || !podcast) return <LoaderSpinner />;

  return (
    <section className="flex w-full flex-col">
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Currently Playing</h1>
        <figure className="flex gap-3">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphone"
          />
          <h2 className="text-16 font-bold text-white-1">0</h2>
        </figure>
      </header>
      <PodcastDetailPlayer
        isOwner={isOwner}
        podcastId={podcastId}
        {...podcast}
      />
      <p className="text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center">
        {podcast.podcastDescription}
      </p>

      <div className="flex flex-col gap-4">
        <h2 className="text-18 font-bold text-white-1">Transcription</h2>
        <p className="text-16 font-medium text-white-2">
          {podcast.podcastTranscription}
        </p>
      </div>
      <section className="mt-8 flex flex-col gap-5">
        <h2 className="text-20 font-bold text-white-1">Similar Podcast</h2>
        {similarPodcasts.length > 0 ? (
          similarPodcasts.map(
            ({ _id, imageUrl, podcastTitle, podcastDescription }) => (
              <PodcastCard
                key={_id}
                imgUrl={imageUrl as string}
                title={podcastTitle}
                description={podcastDescription}
                podcastId={_id}
              />
            )
          )
        ) : (
          <EmptyState
            title="No similar podcasts found"
            buttonLink="/discover"
            buttonText="Discover more podcasts"
          />
        )}
      </section>
    </section>
  );
};

export default PodcastDetails;
