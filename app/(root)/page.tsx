import { HeaderBox } from "@/components/HomePage/HeaderBox";
import { MaxWidthWrapper } from "@/components/HomePage/MaxWidthWrapper";
import { TotalBalanceBox } from "@/components/HomePage/TotalBalanceBox";
import { RightSidebar } from "@/components/Sidebars/RightSidebar";

const Home = () => {
  const loggedIn = {
    firstName: "Kacper",
    lastName: "Wozignój",
    email: "kacper.wozignoj@gmail.com",
  };
  return (
    <section className="flex h-screen">
      <MaxWidthWrapper>
        <HeaderBox
          type="greeting"
          title="Welcome"
          user={loggedIn?.firstName || "Guest"}
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
