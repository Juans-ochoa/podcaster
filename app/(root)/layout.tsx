import LeftSidebar from "@/components/LeftSidebar";
import MobileNav from "@/components/MobileNav";
import RightSidebar from "@/components/RightSidebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <main className="realtive flex bg-black-3">
        <LeftSidebar />
        <section className="flex min-h-screen flex-1 px-4 sm:px-14">
          <article className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4 md:hidden">
            <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
            <MobileNav />
          </article>
          <article className="flex flex-1 flex-col md:pb-14 pt-4">
            {children}
          </article>
        </section>
        <RightSidebar />
      </main>
    </div>
  );
}
