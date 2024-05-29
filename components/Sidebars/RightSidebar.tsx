import Link from "next/link";
import Image from "next/image";

import plusIcon from "@/public/icons/plus.svg";
import { BankCard } from "./BankCard";

export const RightSidebar = ({
  user,
  transactions,
  banks,
}: RightSidebarProps) => {
  return (
    <aside className="m-2 hidden w-[35%] flex-col rounded-xl bg-darkGrey xl:flex">
      <div className="right-sidebar-gradient h-[120px] w-full rounded-t-xl"></div>
      <div id="profile" className="relative flex px-5 max-xl:justify-center">
        <div className="absolute -top-8 flex size-14 items-center justify-center rounded-full border-4 border-lightGrey bg-grey p-2">
          <span className="text-2xl font-bold text-indigo-500">
            {user.firstName[0]}
          </span>
        </div>
        <div className="flex flex-col pt-8">
          <h1 className="text-2xl font-semibold text-textLight">
            {`${user.firstName} ${user.lastName}`}
          </h1>
          <p className="text-sm text-textGrey">{user.email}</p>
        </div>
      </div>

      <section id="banks" className="mt-16 px-5">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold">My Accounts</h1>
          <Link href="/" className="flex gap-2">
            <Image src={plusIcon} alt="plus" width={20} height={20} />
            <span className="text-textGrey duration-300 hover:text-gray-300">
              Add
            </span>
          </Link>
        </div>
        {banks.length > 0 && (
          <div className="relative mt-10 flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-10">
              <BankCard
                key={banks[0].$id}
                account={banks[0]}
                userName={`${user.firstName} ${user.lastName}`}
                showBalance={false}
              />
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0">
                <BankCard
                  key={banks[1].$id}
                  account={banks[1]}
                  userName={`${user.firstName} ${user.lastName}`}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </aside>
  );
};
