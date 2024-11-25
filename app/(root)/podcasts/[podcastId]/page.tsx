"use client";

import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastDetailPlayer from "@/components/PodcastDetailPlayer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";

const PodcastDetails = ({
  params: { podcastId },
}: {
  params: { podcastId: Id<"podcasts"> };
}) => {
  const { user } = useUser();

  const podcast = useQuery(api.podcasts.getPodcastById, { podcastId });

  const similarPodcasts = useQuery(api.podcasts.getPodcastByVoiceType, {
    podcastId,
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
      // isOwner={isOwner} podcastId={podcastId} {...podcast}
      />
      <p className="text-white-2 text-16 pb-8 pt-[45px] font-medium max-md:text-center">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus aut ipsum
        fuga quaerat optio corporis, in, facere autem assumenda, architecto
        consequuntur accusantium nihil enim maxime laboriosam incidunt rerum
        dignissimos labore?
      </p>

      <div className="flex flex-col gap-4">
        <h2 className="text-18 font-bold text-white-1">Description</h2>
        <p className="text-16 font-medium text-white-2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
          odit facere error voluptates. Qui obcaecati totam inventore cum
          accusantium beatae quaerat autem fugit, molestias numquam dolor nemo
          facere debitis placeat!
        </p>
      </div>

      <section className="mt-8 flex flex-col gap-5">
        <h2 className="text-20 font-bold text-white-1">Similar Podcast</h2>
        {/* <PodcastCard
          key={_id}
          imgUrl={imageUrl as string}
          title={podcastTitle}
      description={podcastDescription}
      podcastId={_id}
         /> */}
        <EmptyState
          title="No similar podcasts found"
          buttonLink="/discover"
          buttonText="Discover more podcasts"
        />
      </section>
    </section>
  );
};

export default PodcastDetails;
