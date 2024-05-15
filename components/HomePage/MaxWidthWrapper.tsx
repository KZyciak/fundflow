import { cn } from "@/lib/utils";

export const MaxWidthWrapper = ({
  className,
  children,
}: MaxWidthWrapperProps) => {
  return (
    <div className={cn("mx-auto h-full w-full p-4 md:p-8", className)}>
      {children}
    </div>
  );
};
