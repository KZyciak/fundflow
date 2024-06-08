import { HeaderBox } from "@/components/Home-page/HeaderBox";
import { BankCard } from "../../../components/Sidebars/BankCard";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });
  return (
    <section className="min-h-screen p-6 md:p-8">
      <div className="rounded-lg border-[1px] border-borderColor bg-elementBackgroundColor p-6">
        <div className="">
          <HeaderBox
            title="My Bank Accounts"
            subtext="Effortiessly manage your banking activites with ease"
          />
        </div>

        <div className="mt-5 space-y-7">
          <h2 className="text-semibold text-lg text-AccentLimeColor">
            Your cards
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-8 md:justify-normal">
            {accounts &&
              accounts.data.map((a: Account) => (
                <BankCard
                  key={a.id}
                  account={a}
                  userName={loggedIn?.firstName}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyBanks;
