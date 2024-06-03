"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  onClick?: () => void;
  type: "button" | "submit" | "reset";
}

export const Button = ({ children, onClick, type, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      onClick={onClick}
      type={type}
      className="bg-AccentLimeColor text-textBlackColor hover:bg-AccentLimeColor/80 w-full rounded-lg px-3 py-2 font-semibold duration-300 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
};
