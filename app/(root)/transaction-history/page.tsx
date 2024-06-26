import { HeaderBox } from "@/components/Home-page/HeaderBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { RecentTransactions } from "@/components/Transactions/RecentTransactions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const TransactionHistory = async ({
  searchParams: { id, page },
}: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });
  return (
    <section className="min-h-screen">
      <div className="m-6 rounded-lg border-[1px] border-borderColor bg-elementBackgroundColor p-6 md:m-8">
        <div className="pb-6">
          <HeaderBox
            title="Transaction History"
            subtext="See your bank details and transactions."
          />
        </div>

        <RecentTransactions
          accounts={accountsData}
          transactions={account?.transactions}
          appwriteItemId={appwriteItemId}
          page={currentPage}
        />
      </div>
    </section>
  );
};

export default TransactionHistory;
