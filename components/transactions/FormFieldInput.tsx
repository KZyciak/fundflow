import { ControllerRenderProps, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type FormFieldComponentProps = {
  label: string;
  otherProps?: any;
  description?: string;
  placeholder?: string;
  type?: "input" | "textarea";
  accounts?: Account[]; // Type this appropriately based on your accounts type
  otherStyles?: string;
};

export const FormFieldInput = ({
  label,
  otherProps,
  description,
  placeholder,
  type = "input",
}: FormFieldComponentProps) => {
  return (
    <div>
      <FormItem>
        <div>
          <FormLabel>{label}</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
          <div className="flex w-full flex-col">
            <FormControl>
              {type === "input" && (
                <Input
                  placeholder={placeholder}
                  className="input-class"
                  {...otherProps}
                />
              )}
              {type === "textarea" && (
                <Textarea
                  placeholder={placeholder}
                  className="input-class"
                  {...otherProps}
                />
              )}
            </FormControl>
            <FormMessage className="text-red-500" />
          </div>
        </div>
      </FormItem>
    </div>
  );
};
