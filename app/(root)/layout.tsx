import LeftSidebar from "@/components/LeftSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <main className="realtive flex bg-black-3">
        <LeftSidebar />
        {children}
        <aside className="text-white-1"> right sidebar</aside>
      </main>
    </div>
  );
}
