import Image from "next/image";

import { logoutAccount } from "@/lib/actions/user.actions";
import logOutIcon from "@/public/icons/logout.svg";
import { redirect } from "next/navigation";

export const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const handleLogOut = async () => {
    await logoutAccount();
  };

  return (
    <footer className="flex items-center justify-between">
      <div>
        <h1 className="truncate font-normal">{user.firstName}</h1>
        <p className="text-xs text-textGrey">{user.email}</p>
      </div>
      <div onClick={handleLogOut} className="cursor-pointer">
        <Image src={logOutIcon} alt="logout icons" width={26} height={26} />
      </div>
    </footer>
  );
};
