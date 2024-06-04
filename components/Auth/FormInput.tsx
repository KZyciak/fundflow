"use client";
import {
  Control,
  Controller,
  FieldError,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { useState } from "react";

declare type FormInputProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: string;
  placeholder: string;
  error?: FieldError | undefined;
};

export const FormInput = <T extends FieldValues>({
  name,
  control,
  type,
  placeholder,
  label,
  error,
}: FormInputProps<T>) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex w-full flex-col">
            <label className="mb-2">{label}</label>
            <input
              type={type}
              placeholder={placeholder}
              className="rounded-md border-[1px] border-lightBorderColor bg-activeElementBackgroundColor px-3 py-2 transition-all duration-100 placeholder:text-grayColor focus:border-AccentLimeColor focus:outline-none"
              {...field}
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
            />
            {error && (
              <p className="mt-1 text-[13px] text-red-600">{error.message}</p>
            )}
          </div>
        )}
      />
    </>
  );
};
