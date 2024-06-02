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
            <label
              className={`mx-4 py-1 duration-300 ${
                isActive ? "text-textLight" : "text-textGrey"
              }`}
            >
              {label}
            </label>
            <input
              type={type}
              placeholder={placeholder}
              className="rounded-xl bg-highlightGrey px-4 py-[10px] ring-1 ring-transparent transition-colors duration-300 ease-in-out placeholder:text-lightGrey hover:bg-grey focus:bg-grey focus:outline-none focus:ring-blue-600"
              {...field}
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
            />
            {error && (
              <p className="mx-4 mt-1 text-[13px] text-lightRed">
                {error.message}
              </p>
            )}
          </div>
        )}
      />
    </>
  );
};
