import { HeaderBox } from "@/components/HomePage/HeaderBox";
import { BankCard } from "@/components/Sidebars/BankCard";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const MyBanks = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });
  return (
    <section>
      <div>
        <HeaderBox
          title="My Bank Accounts"
          subtext="Effortiessly manage your banking activites with ease"
        />
      </div>

      <div className="space-y-4">
        <h2>Your cards</h2>
        <div className="flex flex-wrap gap-6">
          {accounts &&
            accounts.data.map((a: Account) => (
              <BankCard key={a.id} account={a} userName={loggedIn?.firstName} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default MyBanks;
