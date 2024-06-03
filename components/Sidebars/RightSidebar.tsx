import Link from "next/link";
import Image from "next/image";

import plusIcon from "@/public/icons/plus.svg";
import { BankCard } from "./BankCard";
import { PlaidLink } from "../plaid/PlaidLink";

export const RightSidebar = ({
  user,
  transactions,
  banks,
}: RightSidebarProps) => {
  return (
    <aside className="bg-elementBackgroundColor border-borderColor hidden w-[35%] flex-col border-l-[1px] 2xl:flex">
      <div className="right-sidebar-gradient h-[120px] w-full"></div>
      <div id="profile" className="relative flex px-5 max-xl:justify-center">
        <div className="border-lightBorderColor bg-activeElementBackgroundColor absolute -top-8 flex size-14 items-center justify-center rounded-full border-4 p-2">
          <span className="text-AccentLimeColor text-2xl font-bold">
            {user.firstName[0]}
          </span>
        </div>
        <div className="flex flex-col pt-8">
          <h1 className="text-2xl font-semibold text-textLight">
            {`${user.firstName} ${user.lastName}`}
          </h1>
          <p className="text-grayColor text-sm">{user.email}</p>
        </div>
      </div>

      <section id="banks" className="mt-10 px-5">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">My Banks</h1>
          <PlaidLink user={user} />
        </div>
        {banks.length > 0 && (
          <div className="relative -left-3 top-0 mt-10 flex flex-col items-center justify-center gap-5">
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
