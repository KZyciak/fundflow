import { cn } from "@/lib/utils";

export const MaxWidthWrapper = ({
  className,
  children,
}: MaxWidthWrapperProps) => {
  return (
    <div
      className={cn(
        "mx-auto h-full w-full max-w-screen-xl px-4 md:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
};
