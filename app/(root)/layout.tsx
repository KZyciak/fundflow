import Image from "next/image";

import { Sidebar } from "@/components/Sidebars/Sidebar";
import { MobileNav } from "@/components/Sidebars/MobileNav";
import Logo from "@/public/icons/logo.svg";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) {
    redirect("/sign-in");
  }
  return (
    <main className="flex h-screen w-full font-inter">
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
