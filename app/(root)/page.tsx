import { HeaderBox } from "@/components/Home-page/HeaderBox";
import { TotalBalanceBox } from "@/components/Home-page/TotalBalanceBox";
import { RightSidebar } from "@/components/Sidebars/RightSidebar";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { RecentTransactions } from "@/components/Transactions/RecentTransactions";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;

  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ userId: loggedIn.$id });

  if (!accounts) return;

  const accountsData = accounts?.data;
  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  return (
    <section className="flex h-screen overflow-hidden">
      <div className="mx-auto h-full w-full p-2 md:p-8">
        <div className="flex flex-col gap-4 rounded-lg border-[1px] border-borderColor bg-elementBackgroundColor p-6">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn.firstName}
            subtext="Access and manage your account and transactions efficiently."
          />
          <TotalBalanceBox
            accounts={accountsData}
            totalBanks={accounts?.totalBanks}
            totalCurrentBalance={accounts?.totalCurrentBalance}
          />
        </div>
        <div className="mt-8 rounded-lg border-[1px] border-borderColor bg-elementBackgroundColor p-6">
          <RecentTransactions
            variant="full"
            accounts={accountsData}
            transactions={account?.transactions}
            appwriteItemId={appwriteItemId}
            page={currentPage}
          />
        </div>
      </div>
      <RightSidebar
        user={loggedIn}
        transactions={accounts?.transactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  );
};

export default Home;
