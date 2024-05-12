import Image from "next/image";

import { Sidebar } from "@/components/Sidebar/Sidebar";
import { MobileNav } from "@/components/Sidebar/MobileNav";
import Logo from "@/public/icons/logo.svg";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = { firstName: "Kacper", lastName: "Wozignój" };

  return (
    <main className="flex h-screen w-full font-inter">
      <Sidebar user={loggedIn} />
      <div className="size-full flex flex-col ">
        <div className="sm:hidden flex justify-between items-center p-4">
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
