"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";
import { MenuButton } from "./button/MenuButton";
import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

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
    <section className="absolute right-0 top-0 z-40 h-screen w-full">
      <MenuButton isActive={isActive} setIsActive={toggleMenu} />
      {isActive && (
        <div
          onClick={toggleMenu}
          className="fixed z-30 size-full bg-black/50"
        ></div>
      )}
      <AnimatePresence mode="wait">
        {isActive && (
          <div>
            <motion.div
              variants={variants}
              initial="initial"
              animate="enter"
              exit="exit"
              className="absolute right-0 top-0 z-40 h-screen w-[55%] bg-black p-4"
            >
              <nav className="flex flex-col items-center gap-2">
                <Link
                  href="/"
                  className="mx-auto mb-12 mt-2 flex cursor-pointer items-center gap-4"
                >
                  <h1 className="text-lg">FundFlow</h1>
                </Link>
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);
                  return (
                    <Link
                      key={item.label}
                      href={item.route}
                      className={cn(
                        "flex w-full cursor-pointer rounded-lg p-3 hover:bg-highlightGrey",
                        {
                          "bg-blue-600 font-semibold hover:bg-blue-500":
                            isActive,
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
                        <p>{item.label}</p>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
