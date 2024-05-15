import Image from "next/image";

import bgImg from "../../public/background.jpg";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Image
        className="absolute z-0 overflow-hidden object-cover opacity-30"
        src={bgImg}
        alt="Blurred background image"
        fill
      />
      <div className="relative z-10">{children}</div>
    </main>
  );
}
