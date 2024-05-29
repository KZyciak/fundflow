import { HeaderBox } from "@/components/HomePage/HeaderBox";
import { MaxWidthWrapper } from "@/components/HomePage/MaxWidthWrapper";
import { TotalBalanceBox } from "@/components/HomePage/TotalBalanceBox";
import { RightSidebar } from "@/components/Sidebars/RightSidebar";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const loggedIn = await getLoggedInUser();

  const accounts = await getAccounts({ userId: loggedIn.$id });

  if (!accounts) return;

  const accountsData = accounts?.data;

  const appwriteItemId = (id as string) || accountsData[0]?.appwriteItemId;

  const account = await getAccount({ appwriteItemId });

  console.log({ account, accountsData });

  return (
    <section className="flex h-screen">
      <MaxWidthWrapper>
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
        <div>RECENT TRANSACTIONS</div>
      </MaxWidthWrapper>
      <RightSidebar
        user={loggedIn}
        transactions={accounts?.transactions}
        banks={accountsData?.slice(0, 2)}
      />
    </section>
  );
};

export default Home;
