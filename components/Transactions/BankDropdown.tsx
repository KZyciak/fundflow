"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { formUrlQuery, formatAmount } from "@/lib/utils";

import { AiFillDollarCircle } from "react-icons/ai";

export const BankDropdown = ({
  accounts = [],
  setValue,
  otherStyles,
}: BankDropdownProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selected, setSeclected] = useState(accounts[0]);

  const handleBankChange = (id: string) => {
    const account = accounts.find((account) => account.appwriteItemId === id)!;

    setSeclected(account);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: id,
    });
    router.push(newUrl, { scroll: false });

    if (setValue) {
      setValue("senderBank", id);
    }
  };

  return (
    <Select
      defaultValue={selected.id}
      onValueChange={(value) => handleBankChange(value)}
    >
      <SelectTrigger className="flex items-center justify-between border-lightBorderColor bg-activeElementBackgroundColor ">
        <div className="flex items-center gap-3">
          <AiFillDollarCircle />
          <div className="flex flex-col items-center justify-start gap-1">
            <p className="text-[15px] font-semibold text-AccentLimeColor">
              {selected.name}
            </p>
            <p className="w-full text-start">
              {formatAmount(selected.currentBalance)}
            </p>
          </div>
        </div>
      </SelectTrigger>
      <SelectContent
        align="end"
        className="border-lightBorderColor bg-activeElementBackgroundColor text-textWhiteColor"
      >
        <SelectGroup>
          <SelectLabel className="text-grayColor">
            Select a bank to display
          </SelectLabel>
          {accounts.map((account: Account) => (
            <SelectItem
              key={account.id}
              value={account.appwriteItemId}
              className="focus:bg-lightBorderColor focus:text-textWhiteColor"
            >
              <div>
                <p>{account.name}</p>
                <p>{formatAmount(account.currentBalance)}</p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
