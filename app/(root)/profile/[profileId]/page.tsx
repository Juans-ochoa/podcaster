import EmptyState from "@/components/EmptyState";
import LoaderSpinner from "@/components/LoaderSpinner";
import PodcastCard from "@/components/PodcastCard";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { use } from "react";

const Profile = ({ params }: { params: Promise<{ profileId: string }> }) => {
  const { profileId } = use(params);

  const user = useQuery(api.users.getUserById, {
    clerkId: profileId,
  });

  const podcastsData = useQuery(api.podcasts.getPodcastByAuthorId, {
    authorId: profileId,
  });

  if (!user || !podcastsData) return <LoaderSpinner />;

  return (
    <section className="mt-9 flex flex-col">
      <h1 className="text-20 font-bold text-white-1 max-md:text-center">
        Podcaster Profile
      </h1>
      <article className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row"></article>
      <article className="mt-9 flex flex-col gap-5">
        <h2 className="text-20">All Podcasts</h2>
        {podcastsData && podcastsData.podcasts.length > 0 ? (
          <div className="podcast_grid">
            {podcastsData.podcasts.map((podcast) => (
              <PodcastCard
                key={podcast._id}
                imgUrl={podcast.imageUrl!}
                title={podcast.podcastTitle}
                description={podcast.podcastDescription}
                podcastId={podcast._id}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="You have not created any podcasts yet"
            buttonLink="/create-podcast"
            buttonText="Create Podcast"
          />
        )}
      </article>
    </section>
  );
};

export default Profile;
