"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import { AiFillHome, AiFillDollarCircle } from "react-icons/ai";
import { FaClipboardList } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";

import { Footer } from "./Footer";
import { cn } from "@/lib/utils";
import { MenuButton } from "./hamburger-icon/MenuButton";
import { PlaidLink } from "../Plaid/PlaidLink";

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

export const MobileNav = ({ user }: MobileNavProps) => {
  const [isActive, setIsActive] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const variants = {
    initial: {
      x: "100%",
    },
    enter: {
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1],
      },
    },
    exit: {
      x: "100%",
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  return (
    <section className="">
      <MenuButton isActive={isActive} setIsActive={toggleMenu} />

      <AnimatePresence mode="wait">
        {isActive && (
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="absolute left-0 top-0 z-30 h-screen w-full bg-backgroundColor/80"
            ></motion.div>
            <motion.div
              variants={variants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="absolute right-0 top-0 z-40 flex h-screen w-[250px] flex-col justify-between border-l-[1px] border-borderColor bg-elementBackgroundColor p-4"
            >
              <nav className="mt-28 flex flex-col gap-2">
                <h1 className="px-3 pb-4 text-[17px] font-semibold">
                  Navigation
                </h1>
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);
                  return (
                    <Link
                      key={item.label}
                      href={item.route}
                      onClick={toggleMenu}
                      className={cn(
                        "flex rounded-md border-[1px] border-elementBackgroundColor px-3 py-2 text-grayColor duration-300 hover:text-textWhiteColor",
                        {
                          "border-lightBorderColor bg-activeElementBackgroundColor text-textWhiteColor":
                            isActive,
                        },
                      )}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <item.Icon />
                        <p>{item.label}</p>
                      </div>
                    </Link>
                  );
                })}
              </nav>
              <div className="flex flex-col gap-6">
                <PlaidLink user={user} />
                <Footer user={user} type="mobile" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
