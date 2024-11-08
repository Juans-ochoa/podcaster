export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <aside className="text-white-1">Left sidebar</aside>
      <main>{children}</main>
      <aside className="text-white-1"> right sidebar</aside>
    </>
  );
}
