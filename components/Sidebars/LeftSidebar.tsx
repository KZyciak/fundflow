"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { Footer } from "./Footer";
import { PlaidLink } from "../Plaid/PlaidLink";

import Logo from "@/public/icons/logo.svg";

import { AiFillHome, AiFillDollarCircle } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const sidebarLinks = [
  {
    Icon: AiFillHome,
    route: "/",
    label: "Home",
  },
  {
    Icon: AiFillDollarCircle,
    route: "/my-banks",
    label: "My Banks",
  },
  {
    Icon: FaClipboardList,
    route: "/transaction-history",
    label: "Transaction History",
  },
  {
    Icon: FaMoneyBillTransfer,
    route: "/payment-transfer",
    label: "Transfer Funds",
  },
];

export const LeftSidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="fixed left-0 top-0 hidden h-screen flex-col justify-between border-r-[1px] border-borderColor bg-elementBackgroundColor p-4 text-sm lg:flex lg:w-[240px]">
      <nav className="flex size-full flex-col">
        <Link href="/" className="m-2 flex cursor-pointer items-center gap-2">
          <Image src={Logo} alt="Logo" width={35} height={35} />
          <h1 className="font-mono text-2xl lg:block">
            Fund<span className="text-AccentLimeColor">Flow</span>
          </h1>
        </Link>
        <div className="my-6 flex size-full flex-col justify-between">
          <div>
            {sidebarLinks.map((item) => {
              const isActive =
                pathname === item.route ||
                pathname.startsWith(`${item.route}/`);
              return (
                <Link
                  key={item.label}
                  href={item.route}
                  className={cn(
                    "flex rounded-md border-[1px] border-elementBackgroundColor px-3 py-2 text-grayColor duration-300 hover:text-textWhiteColor",
                    {
                      "border-lightBorderColor bg-activeElementBackgroundColor text-textWhiteColor":
                        isActive,
                    },
                  )}
                >
                  <div className="flex items-center justify-center gap-4">
                    <item.Icon />
                    <p className="hidden text-[15px] lg:block">{item.label}</p>
                  </div>
                </Link>
              );
            })}
          </div>

          <PlaidLink user={user} variant="secondary" />
        </div>
      </nav>
      <Footer user={user} />
    </section>
  );
};
