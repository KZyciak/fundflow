import { AnimatedCounter } from "./AnimatedCounter";
import { DoughnutChart } from "./DoughnutChart";

export const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotlaBalanceBoxProps) => {
  return (
    <section className="flex w-full items-center justify-start gap-7 rounded-xl">
      <div className="flex max-w-20 items-center">
        <DoughnutChart accounts={accounts} />
      </div>
      <div className="flex flex-col gap-2 xl:gap-3">
        <h2 className="font-semibold"> Bank Accounts: {totalBanks}</h2>
        <div className="flex flex-col xl:gap-1">
          <p className="text-grayColor text-sm">Total Current Balance: </p>
          <div className="text-xl font-bold">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};
