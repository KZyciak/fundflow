"use client";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="m-2 hidden rounded-xl bg-darkGrey p-4 text-sm sm:block lg:w-[270px]">
      <nav className="flex flex-col gap-2">
        <Link
          href="/"
          className="mx-auto mb-12 mt-2 flex cursor-pointer items-center gap-4"
        >
          <Image
            src="/icons/logo.svg"
            alt="Logo"
            width={34}
            height={34}
            className="size-10"
          />
          <h1 className="hidden text-lg lg:block">FundFlow</h1>
        </Link>
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              key={item.label}
              href={item.route}
              className={cn(
                "flex w-full cursor-pointer gap-1 rounded-lg p-3 text-center hover:bg-highlightGrey",
                {
                  "bg-blue-600 font-semibold hover:bg-blue-500": isActive,
                },
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
