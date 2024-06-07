import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { AuthFormSchema } from "@/lib/utils";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";

const formSchema = AuthFormSchema("sign-up");

interface MyFormFieldProps {
  control: Control<z.infer<typeof formSchema>>;
  name: FieldPath<z.infer<typeof formSchema>>;
  label: string;
  description?: string;
  placeholder?: string;
  type?: "input" | "textarea";
  inputType?: "text" | "password" | "email";
}

export const CustomFormField = (props: MyFormFieldProps) => {
  return (
    <div className="pb-5">
      <FormField
        control={props.control}
        name={props.name}
        render={({ field }) => (
          <FormItem>
            <div className="flex flex-col gap-[6px]">
              <div>
                <FormLabel>{props.label}</FormLabel>
                {props.description && (
                  <FormDescription>{props.description}</FormDescription>
                )}
              </div>
              <div className="relative w-full">
                <FormControl>
                  {props.type === "textarea" ? (
                    <Textarea placeholder={props.placeholder} {...field} />
                  ) : (
                    <Input
                      type={props.inputType || "text"}
                      placeholder={props.placeholder}
                      {...field}
                    />
                  )}
                </FormControl>
                <FormMessage className="text-12 absolute text-red-500" />
              </div>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};
