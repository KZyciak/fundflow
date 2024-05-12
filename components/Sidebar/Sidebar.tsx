"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="bg-darkGrey text-sm rounded-lg m-2 p-4 hidden sm:block">
      <nav className="flex flex-col gap-2">
        <Link
          href="/"
          className="mb-12 mt-2 mx-auto cursor-pointer items-center gap-4 flex"
        >
          <Image
            src="/icons/logo.svg"
            alt="Logo"
            width={34}
            height={34}
            className="size-10"
          />
          <h1 className="hidden lg:block text-lg">FundFlow</h1>
        </Link>
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              key={item.label}
              href={item.route}
              className={cn(
                "cursor-pointer rounded-lg p-3 w-full text-center gap-1 hover:bg-highlightGrey",
                {
                  "bg-lightBlue font-semibold hover:bg-lightBlue": isActive,
                }
              )}
            >
              <div className="flex items-center justify-center gap-2">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  width={24}
                  height={24}
                  className="brightness-[3] invert-0"
                />
                <p className="hidden lg:block">{item.label}</p>
              </div>
            </Link>
          );
        })}
      </nav>
    </section>
  );
};
