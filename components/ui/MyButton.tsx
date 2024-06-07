import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
  className?: string;
}

export const Button = ({
  children,
  onClick,
  type,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      onClick={onClick}
      type={type}
      className={cn(
        "w-full rounded-lg bg-AccentLimeColor px-3 py-2 font-semibold text-textBlackColor duration-500 hover:bg-purple-700 hover:text-textWhiteColor disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
};
