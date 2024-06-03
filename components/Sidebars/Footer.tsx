import { useRouter } from "next/navigation";

import { logoutAccount } from "@/lib/actions/user.actions";
import { IoLogOut } from "react-icons/io5";

export const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();
  const handleLogOut = async () => {
    router.push("/sign-in");
    await logoutAccount();
  };

  return (
    <footer className="flex items-center justify-between">
      <div className="w-full overflow-hidden">
        <h1 className="mb-1 truncate">{`${user.firstName} ${user.lastName}`}</h1>
        <p className="text-grayColor truncate text-xs">{user.email}</p>
      </div>
      <div
        onClick={handleLogOut}
        className="text-grayColor hover:text-textWhiteColor cursor-pointer text-xl duration-300"
      >
        <IoLogOut />
      </div>
    </footer>
  );
};
