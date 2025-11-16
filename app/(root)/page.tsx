"use client";

import PodcastCard from "@/components/podcast/PodcastCard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const podcasts = useQuery(api.podcasts.getTrendingPodcasts);

  return (
    <section className="mt-9 flex flex-col gap-9 md:overflow-hidden">
      <article className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending podcast</h1>
        <div className="podcast_grid">
          {podcasts?.map((podcast) => (
            <PodcastCard
              key={podcast._id}
              podcastId={podcast._id}
              imgUrl={podcast.imageUrl as string}
              description={podcast.podcastDescription}
              title={podcast.podcastTitle}
            />
          ))}
        </div>
      </article>
    </section>
  );
}
