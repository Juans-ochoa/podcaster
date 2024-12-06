"use client";

import { PodcastProps, ProfileCardProps } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoaderSpinner from "./LoaderSpinner";
import { Button } from "./ui/button";

const ProfileCard = ({
  podcastData,
  imageUrl,
  userFirstName,
}: ProfileCardProps) => {
  const [randomPodcast, setRandomPodcast] = useState<PodcastProps | null>(null);

  const playRandomPodcast = () => {
    const randomIndex = Math.floor(Math.random() * podcastData.podcasts.length);

    setRandomPodcast(podcastData.podcasts[randomIndex]);
  };

  useEffect(() => {
    if (randomPodcast) {
    }
  }, [randomPodcast]);

  if (!imageUrl) return <LoaderSpinner />;

  return (
    <div className="mt-6 flex flex-col gap-6 max-md:items-center md:flex-row">
      <Image
        src={imageUrl}
        width={250}
        height={250}
        alt="Podcaster"
        className="aspect-square rounded-lg"
      />
      <div className="flex flex-col justify-center max-md:items-center">
        <div className="flex flex-col gap-2.5">
          <figure className="flex gap-2 max-md:justify-center">
            <Image
              src="/icons/verified.svg"
              width={15}
              height={15}
              alt="Verified"
            />
            <h3 className="text-14 font-medium text-white-2">
              Verified Creator
            </h3>
          </figure>
          <h2 className="text-32 font-extrabold tracking[-0.32px] text-white-1">
            {userFirstName}
          </h2>
        </div>
        <figure className="flex gap-3 py-6">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="Headphones"
          />
          <h3 className="text-16 font-semibold text-white-2">
            {podcastData?.listeners} &nbsp;
            <span className="font-normal text-white-2">monthly listeners</span>
          </h3>
        </figure>
        {podcastData?.podcasts.length > 0 && (
          <Button
            className="text-16 bg-orange-1 font-extrabold text-white-1"
            onClick={playRandomPodcast}
          >
            <Image
              src="/icons/Play.svg"
              width={20}
              height={20}
              alt="Random play"
            />{" "}
            &nbsp; Play a random podcast
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
