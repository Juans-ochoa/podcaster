'use client';

import { api } from '@/convex/_generated/api';
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../Header';
import Carousel from '../Carousel';

export const RightSidebar = () => {
  const { user } = useUser();
  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);

  return (
    <aside className="right_sidebar flex p-6">
      <SignedIn>
        <Link href={`/profile/${user?.id}`} className="flex gap-3 pb-12">
          <UserButton />
          <div className="flex w-full items-center justify-between">
            <h2 className="text-16 truncate font-semibold text-white-1">
              {user?.firstName} {user?.lastName}
            </h2>
            <Image
              src="/icons/right-arrow.svg"
              width={24}
              height={24}
              alt="arrow"
            />
          </div>
        </Link>
      </SignedIn>
      <section>
        <Header headerTitle="Fans like You" />
        {topPodcasters !== undefined && (
          <Carousel fansLikeDetail={topPodcasters} />
        )}
      </section>
      <section className="flex flex-col gap-8 pt-12">
        <Header headerTitle="Top Podcastrs" />
        <div className="flex flex-col gap-6"></div>
      </section>
    </aside>
  );
};
