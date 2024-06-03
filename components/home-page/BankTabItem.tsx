"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { cn, formUrlQuery } from "@/lib/utils";

export const BankTabItem = ({ account, appwriteItemId }: BankTabItemProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isActive = appwriteItemId === account?.appwriteItemId;

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account?.appwriteItemId,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div onClick={handleBankChange}>
      <p
        className={cn(
          `text-grayColor hover:text-textWhiteColor border-elementBackgroundColor rounded-md border-[1px] px-3 py-2 duration-300`,
          {
            " text-textWhiteColor border-lightBorderColor bg-activeElementBackgroundColor":
              isActive,
          },
        )}
      >
        {account.name}
      </p>
    </div>
  );
};
