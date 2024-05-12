import Image from "next/image";

import { Sidebar } from "@/components/Sidebars/Sidebar";
import { MobileNav } from "@/components/Sidebars/MobileNav";
import Logo from "@/public/icons/logo.svg";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = {
    firstName: "Kacper",
    lastName: "Wozignój",
    email: "kacper.zyciak@gmail.com",
  };

  return (
    <main className="font-inter flex h-screen w-full">
      <Sidebar user={loggedIn} />
      <div className="flex size-full flex-col ">
        <div className="flex items-center justify-between p-4 sm:hidden">
          <Image src={Logo} alt="Logo" width={30} height={30} />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
