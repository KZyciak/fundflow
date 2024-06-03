export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="my-8 flex h-screen w-full items-center justify-center bg-backgroundColor">
      <div>{children}</div>
    </main>
  );
}
