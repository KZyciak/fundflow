import Link from "next/link";
import Image from "next/image";
import { formatAmount } from "@/lib/utils";
import Copy from "./Copy";
import Paypass from "@/public/icons/Paypass.svg";
import MasterCard from "@/public/icons/mastercard.svg";

export const BankCard = ({
  account,
  userName,
  showBalance = true,
}: CreditCardProps) => {
  return (
    <div className="flex flex-col text-sm">
      <Link
        href={`/transaction-history/?id=${account.appwriteItemId}`}
        className="relative flex h-[180px] w-full max-w-[300px] justify-between rounded-[20px] shadow-xl"
      >
        <div className="relative z-10 flex size-full max-w-[228px] flex-col justify-between rounded-l-[20px] bg-gradient-to-r from-purple-700 to-blue-600 p-5">
          <div>
            <h1 className="text-lg font-semibold text-white">{account.name}</h1>
            <p className="font-semibold text-white">
              {formatAmount(account.currentBalance)}
            </p>
          </div>

          <article className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between">
              <h1 className="pb-1 text-[13px]">{userName}</h1>
              <h2>●● / ●●</h2>
            </div>
            <p className="font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● <span className="text-16">{account?.mask}</span>
            </p>
          </article>
        </div>

        <div className="flex size-full flex-1 flex-col items-end justify-between rounded-r-[20px] bg-gradient-to-r from-blue-600 to-blue-700 bg-cover bg-center bg-no-repeat pb-5 pr-6 pt-7">
          <Image src={Paypass} width={20} height={24} alt="pay" />
          <Image
            src={MasterCard}
            width={45}
            height={32}
            alt="mastercard"
            className="ml-5"
          />
        </div>
      </Link>

      {showBalance && <Copy title={account?.shareableId} />}
    </div>
  );
};
