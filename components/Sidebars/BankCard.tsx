import Link from "next/link";
import Image from "next/image";
import { formatAmount } from "@/lib/utils";

export const BankCard = ({
  account,
  userName,
  showBalance = true,
}: CreditCardProps) => {
  return (
    <div className="flex flex-col text-sm">
      <Link
        href={`/transaction-history/?id=${account.appwriteItemId}`}
        className="bank-card"
      >
        <div className="bank-card_content">
          <div>
            <h1 className="text-lg font-semibold text-white">{userName}</h1>
            <p className="font-semibold text-white">
              {formatAmount(account.currentBalance)}1200
            </p>
          </div>

          <article className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between">
              <h2 className="text-12 font-semibold text-white">●● / ●●</h2>
            </div>
            <p className="text-14 font-semibold tracking-[1.1px] text-white">
              ●●●● ●●●● ●●●● <span className="text-16">{account?.mask}</span>
            </p>
          </article>
        </div>

        <div className="bank-card_icon">
          <Image src="/icons/Paypass.svg" width={20} height={24} alt="pay" />
          <Image
            src="/icons/visa.svg"
            width={45}
            height={32}
            alt="mastercard"
            className="ml-5"
          />
        </div>

        <Image
          src="/icons/lines.png"
          width={316}
          height={190}
          alt="lines"
          className="absolute left-0 top-0"
        />
      </Link>
    </div>
  );
};
