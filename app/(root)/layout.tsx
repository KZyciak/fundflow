import Image from "next/image";

import Logo from "@/public/icons/logo.svg";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LeftSidebar } from "../../components/Sidebars/LeftSidebar";
import { MobileNav } from "../../components/Sidebars/MobileNav";

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
    <main className="min-h-sreen flex font-inter text-textWhiteColor">
      <LeftSidebar user={loggedIn} />
      <div className="flex w-full flex-col bg-backgroundColor lg:ml-[240px]">
        <div className="flex items-center justify-between p-8 lg:hidden">
          <Link href="/" className="flex items-center gap-5">
            <Image src={Logo} alt="Logo" width={40} height={40} />
            <h1 className="font-mono text-2xl lg:block">
              Fund<span className="text-AccentLimeColor">Flow</span>
            </h1>
          </Link>
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
