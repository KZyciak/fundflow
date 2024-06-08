import { HeaderBox } from "@/components/Home-page/HeaderBox";
import PaymentTransferForm from "@/components/Transactions/PaymentTransferForm";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Transfer = async () => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({
    userId: loggedIn.$id,
  });

  if (!accounts) return;

  const accountsData = accounts?.data;
  return (
    <section className="min-h-screen">
      <div className="m-6 rounded-lg border-[1px] border-borderColor bg-elementBackgroundColor p-6 md:m-8">
        <HeaderBox
          title="Payment Transfer"
          subtext="Please provide any specific details or notes related to the payment transfer"
        />

        <section className="mt-14">
          <PaymentTransferForm accounts={accountsData} />
        </section>
      </div>
    </section>
  );
};

export default Transfer;
