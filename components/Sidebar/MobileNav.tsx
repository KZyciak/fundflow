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
    <section className="h-screen absolute w-full right-0 top-0 z-40">
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
              className="w-[55%] z-40 h-screen absolute right-0 top-0 bg-black p-4"
            >
              <nav className="flex flex-col gap-2 items-center">
                <Link
                  href="/"
                  className="mb-12 mt-2 mx-auto cursor-pointer items-center gap-4 flex"
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
                        "cursor-pointer rounded-lg p-3 w-full flex hover:bg-highlightGrey",
                        {
                          "bg-lightBlue font-semibold hover:bg-lightBlue":
                            isActive,
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
