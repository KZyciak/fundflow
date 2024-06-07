export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex-center w-full bg-gradient-to-r from-purple-700 to-blue-700 md:h-screen">
      {children}
    </main>
  );
}
