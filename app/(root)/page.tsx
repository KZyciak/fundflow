import { HeaderBox } from "@/components/HomePage/HeaderBox";
import { MaxWidthWrapper } from "@/components/HomePage/MaxWidthWrapper";
import { TotalBalanceBox } from "@/components/HomePage/TotalBalanceBox";
import { RightSidebar } from "@/components/Sidebars/RightSidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

const Home = async () => {
  const loggedIn = await getLoggedInUser();

  return (
    <section className="flex h-screen">
      <MaxWidthWrapper>
        <HeaderBox
          type="greeting"
          title="Welcome"
          user={loggedIn.name}
          subtext="Access and manage your account and transactions efficiently."
        />
        <TotalBalanceBox
          accounts={[]}
          totalBanks={1}
          totalCurrentBalance={1250.5}
        />
        <div>RECENT TRANSACTIONS</div>
      </MaxWidthWrapper>
      <RightSidebar user={loggedIn} transactions={[]} banks={[{}, {}]} />
    </section>
  );
};

export default Home;
