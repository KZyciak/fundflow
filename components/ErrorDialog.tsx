import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDialog } from "@/lib/hooks/useDialog";

interface ErrorDialogProps {
  title: string;
  description: string;
  buttonText: string;
}

export const ErrorDialog = ({
  title,
  description,
  buttonText,
}: ErrorDialogProps) => {
  const { isOpen, onClose } = useDialog();

  return (
    <AlertDialog onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-AccentLimeColor">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="rounded-md border-[1px] border-lightBorderColor bg-activeElementBackgroundColor duration-300 hover:bg-lightBorderColor">
            {buttonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
