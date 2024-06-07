export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-center w-full bg-backgroundColor md:h-screen">
      {children}
    </main>
  );
}
