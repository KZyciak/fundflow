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
      className="mt-8 w-full rounded-lg bg-blue-600 py-[10px] font-semibold text-white duration-300 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  );
};
