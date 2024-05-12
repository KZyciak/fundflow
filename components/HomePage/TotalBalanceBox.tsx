import { AnimatedCounter } from "./AnimatedCounter";
import { DoughnutChart } from "./DoughnutChart";

export const TotalBalanceBox = ({
  accounts = [],
  totalBanks,
  totalCurrentBalance,
}: TotlaBalanceBoxProps) => {
  return (
    <section className="flex w-full rounded-xl p-4 bg-darkGrey h-28 md:h-36 gap-7 items-center justify-start">
      <div className="flex max-w-[85px] items-center sm:max-w-[100px] size-full">
        <DoughnutChart accounts={accounts} />
      </div>
      <div className="flex flex-col gap-2 xl:gap-4">
        <h2 className="font-semibold"> Bank Accounts: {totalBanks}</h2>
        <div className="flex flex-col xl:gap-2">
          <p className="text-sm text-textGrey">Total Current Balance: </p>
          <div className="font-bold text-xl">
            <AnimatedCounter amount={totalCurrentBalance} />
          </div>
        </div>
      </div>
    </section>
  );
};
