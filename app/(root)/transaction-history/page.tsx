import { HeaderBox } from "@/components/home-page/HeaderBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { RecentTransactions } from "@/components/transactions/RecentTransactions";
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
    <section className="bg-elementBackgroundColor border-borderColor m-6 rounded-lg border-[1px] p-6 md:m-8">
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
    </section>
  );
};

export default TransactionHistory;
