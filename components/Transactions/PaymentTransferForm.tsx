"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createTransfer } from "@/lib/actions/dwolla.actions";
import { createTransaction } from "@/lib/actions/transaction.actions";
import { getBank, getBankByAccountId } from "@/lib/actions/user.actions";
import { decryptId } from "@/lib/utils";

import { BankDropdown } from "./BankDropdown";
import { Button } from "../ui/MyButton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(4, "Transfer note is too short"),
  amount: z.string().min(4, "Amount is too short"),
  senderBank: z.string().min(4, "Please select a valid bank account"),
  shareableId: z.string().min(8, "Please select a valid sharable Id"),
});

const PaymentTransferForm = ({ accounts }: PaymentTransferFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      senderBank: "",
      shareableId: "",
    },
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const receiverAccountId = decryptId(data.shareableId);
      const receiverBank = await getBankByAccountId({
        accountId: receiverAccountId,
      });
      const senderBank = await getBank({ documentId: data.senderBank });

      const transferParams = {
        sourceFundingSourceUrl: senderBank.fundingSourceUrl,
        destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
        amount: data.amount,
      };
      // create transfer
      const transfer = await createTransfer(transferParams);

      // create transfer transaction
      if (transfer) {
        const transaction = {
          name: data.name,
          amount: data.amount,
          senderId: senderBank.userId.$id,
          senderBankId: senderBank.$id,
          receiverId: receiverBank.userId.$id,
          receiverBankId: receiverBank.$id,
          email: data.email,
        };

        const newTransaction = await createTransaction(transaction);

        if (newTransaction) {
          form.reset();
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Submitting create transfer request failed: ", error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="mt-8 flex flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="senderBank"
          render={() => (
            <FormItem>
              <div className="flex flex-col items-center justify-start gap-6 md:flex-row">
                <div>
                  <FormLabel>Select Source Bank</FormLabel>
                  <FormDescription>
                    Select the bank account you want to transfer funds from
                  </FormDescription>
                </div>
                <div className="relative w-full">
                  <FormControl>
                    <BankDropdown
                      accounts={accounts}
                      setValue={form.setValue}
                      otherStyles="!w-full"
                    />
                  </FormControl>
                  <FormMessage className="absolute text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col items-center gap-6 md:flex-row">
                <div>
                  <FormLabel>Transfer Note (Optional)</FormLabel>
                  <FormDescription>
                    Please provide any additional information or instructions
                    related to the transfer
                  </FormDescription>
                </div>
                <div className="relative w-full">
                  <FormControl>
                    <Textarea
                      placeholder="Write a short note here"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 absolute text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="my-4">
          <h2 className="text-lg text-AccentLimeColor">Bank account details</h2>
          <p className="text-grayColor">
            Enter the bank account details of the recipient
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <FormLabel>Recipient&apos;s Email Address</FormLabel>
                <div className="relative md:w-[80%]">
                  <FormControl>
                    <Input placeholder="ex: johndoe@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage className="absolute text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shareableId"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <FormLabel>Receiver&apos;s Plaid Sharable Id</FormLabel>
                <div className="relative md:w-[80%]">
                  <FormControl>
                    <Input
                      placeholder="Enter the public account number"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <FormLabel>Amount</FormLabel>
                <div className="relative md:w-[80%]">
                  <FormControl>
                    <Input
                      placeholder="ex: 5.00"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="absolute text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="mt-5 flex w-full justify-end">
          <div className="w-44">
            <Button type="submit">
              {isLoading ? "Sending..." : "Transfer Funds"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default PaymentTransferForm;
