import { cn } from "@/lib/utils";

export const MaxWidthWrapper = ({
  className,
  children,
}: MaxWidthWrapperProps) => {
  return (
    <div
      className={cn(
        "h-full mx-auto w-full max-w-screen-xl md:px-20 px-4",
        className
      )}
    >
      {children}
    </div>
  );
};
