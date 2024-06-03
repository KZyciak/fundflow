"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { MdAccountBalanceWallet } from "react-icons/md";

import {
  cn,
  formUrlQuery,
  formatAmount,
  getAccountTypeColors,
} from "@/lib/utils";

const BankInfo = ({ account, appwriteItemId, type }: BankInfoProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isActive = appwriteItemId === account?.appwriteItemId;

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account?.appwriteItemId,
    });
    router.push(newUrl, { scroll: false });
  };

  const colors = getAccountTypeColors(account?.type as AccountTypes);

  return (
    <div onClick={handleBankChange}>
      <div className="border-AccentLimeColor/20 bg-AccentLimeColor/10 my-5 flex items-center gap-3 rounded-md border-[1px] p-4">
        <MdAccountBalanceWallet className="text-AccentLimeColor text-3xl" />
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-AccentLimeColor text-[16px] font-bold">
              {account.name}
            </h2>
            <p className="text-AccentLimeColor/80">{account.officialName}</p>
          </div>

          <p className="text-AccentLimeColor/80 font-semibold">
            {formatAmount(account.currentBalance)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BankInfo;
