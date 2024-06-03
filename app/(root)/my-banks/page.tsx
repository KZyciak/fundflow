import { HeaderBox } from "@/components/home-page/HeaderBox";
import { BankCard } from "@/components/sidebars/BankCard";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });
  return (
    <section className="size-full p-6 md:p-8">
      <div className="bg-elementBackgroundColor border-borderColor rounded-lg border-[1px] p-6">
        <div>
          <HeaderBox
            title="My Bank Accounts"
            subtext="Effortiessly manage your banking activites with ease"
          />
        </div>

        <div className="mt-5 space-y-7">
          <h2 className="text-semibold text-AccentLimeColor text-lg">
            Your cards
          </h2>
          <div className="flex flex-wrap gap-8">
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
