import PodcastPlayer from '@/components/podcast/PodcastPlayer';
import { LeftSidebar, MobileNav, RightSidebar } from '@/components/sidebar';
import { Toaster } from '@/components/ui/toaster';
import Image from 'next/image';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <main className="relative flex bg-black-3">
        <LeftSidebar />
        <section className="flex flex-col min-h-screen flex-1 px-4 sm:px-14">
          <article className="flex h-16 items-center justify-between md:hidden">
            <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
            <MobileNav />
          </article>
          <article className="flex flex-1 flex-col md:pb-14 pt-4">
            <Toaster />
            {children}
          </article>
        </section>
        <RightSidebar />
      </main>
      <PodcastPlayer />
    </div>
  );
}
