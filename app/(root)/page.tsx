import { HeaderBox } from "@/components/HomePage/HeaderBox";
import { MaxWidthWrapper } from "@/components/HomePage/MaxWidthWrapper";
import { TotalBalanceBox } from "@/components/HomePage/TotalBalanceBox";

const Home = () => {
  const loggedIn = { firstName: "Kacper" };
  return (
    <section className="text-zinc-50">
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
      </MaxWidthWrapper>
    </section>
  );
};

export default Home;
