"use client";

import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import SearchBar from "@/components/Searchbar";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { use } from "react";

const Discover = ({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) => {
  const { search } = use(searchParams);

  const podcastData = useQuery(api.podcasts.getPodcastBySearch, {
    search: search || "",
  });

  return (
    <section className="flex flex-col gap-9">
      <SearchBar />
      <div className="flex flex-col gap-9">
        <h1 className="text-20 font-bold text-white-1">
          Discover Trending Podcasts
        </h1>
        {podcastData ? (
          <>
            {podcastData.length > 0 ? (
              <div className="podcast_grid">
                {podcastData?.map(
                  ({ _id, podcastTitle, podcastDescription, imageUrl }) => (
                    <PodcastCard
                      key={_id}
                      imgUrl={imageUrl!}
                      title={podcastTitle}
                      description={podcastDescription}
                      podcastId={_id}
                    />
                  )
                )}
              </div>
            ) : (
              <EmptyState title="No results found" />
            )}
          </>
        ) : (
          <LoaderSpinner />
        )}
      </div>
    </section>
  );
};

export default Discover;
