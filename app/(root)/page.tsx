"use client";

import PodcastCard from "@/components/PodcastCard";
import { podcastData } from "@/constants";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

export default function Home() {
  const tasks = useQuery(api.tasks.get);

  return (
    <section className="mt-9 flex flex-col gap-9 md:overflow-hidden">
      <article className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending podcast</h1>
        <div className="flex min-h-10 flex-col items-center justify-between p-4 text-white-1">
          {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
        </div>
        <div className="podcast_grid">
          {podcastData.map((podcast) => (
            <PodcastCard key={podcast.id} {...podcast} />
          ))}
        </div>
      </article>
    </section>
  );
}
