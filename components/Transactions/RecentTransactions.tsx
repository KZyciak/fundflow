import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BankTabItem } from "../Home-page/BankTabItem";
import BankInfo from "../Home-page/BankInfo";
import { TransactionsTable } from "./TransactionsTable";

export const RecentTransactions = ({
  accounts,
  transactions = [],
  appwriteItemId,
  page,
  variant,
}: RecentTransactionsProps) => {
  return (
    <section>
      <header className="flex items-center justify-between pb-6">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        {variant === "full" && (
          <Link
            href={`/transaction-history/?id=${appwriteItemId}`}
            className="rounded-md border-[1px] border-borderColor px-2 py-1 text-sm text-grayColor duration-300 hover:border-lightBorderColor hover:bg-activeElementBackgroundColor hover:text-textWhiteColor"
          >
            View all
          </Link>
        )}
      </header>
      <div className="h-full">
        <Tabs defaultValue={appwriteItemId}>
          <TabsList className="m-0 p-0">
            {accounts.map((account: Account) => (
              <TabsTrigger
                key={account.id}
                value={account.appwriteItemId}
                className="m-0 p-0 "
              >
                <BankTabItem
                  key={account.id}
                  account={account}
                  appwriteItemId={appwriteItemId}
                />
              </TabsTrigger>
            ))}
          </TabsList>

          {accounts.map((account: Account) => (
            <TabsContent
              key={account.id}
              value={account.appwriteItemId}
              className=""
            >
              <BankInfo
                account={account}
                appwriteItemId={appwriteItemId}
                type="full"
              />

              <TransactionsTable transactions={transactions} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
