"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AuthFormSchema } from "@/lib/utils";
import { FormInput } from "@/components/Auth/FormInput";
import { signIn, signUp } from "@/lib/actions/user.actions";
import { PlaidLink } from "../plaid/PlaidLink";

export const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = AuthFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };

        const newUser = await signUp(userData);
        setUser(newUser);
      }
      if (type === "sign-in") {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        if (response) {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="rounded-2xl bg-darkGrey p-4 md:p-8">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className=" flex cursor-pointer items-center gap-1">
          <Image
            src="/icons/logo.svg"
            width={50}
            height={50}
            alt="Horizon logo"
          />
          <h1 className="text-black-1 ml-2 text-2xl">FundFlow</h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-2xl font-semibold ">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="pb-5 pt-1 text-base font-normal ">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} />
        </div>
      ) : (
        <>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {type === "sign-up" ? (
              <div className="gap-10 xl:flex">
                <div className="flex flex-col gap-4">
                  <div className="flex gap-5">
                    <FormInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      type="text"
                      placeholder="Enter your first name"
                      error={form.formState.errors.firstName}
                    />
                    <FormInput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      type="text"
                      placeholder="Enter your first last name"
                      error={form.formState.errors.lastName}
                    />
                  </div>
                  <FormInput
                    control={form.control}
                    name="address"
                    label="Address"
                    type="text"
                    placeholder="Enter your address"
                    error={form.formState.errors.address}
                  />
                  <FormInput
                    control={form.control}
                    name="city"
                    label="City"
                    type="text"
                    placeholder="Enter your city"
                    error={form.formState.errors.city}
                  />
                  <div className="flex gap-4">
                    <FormInput
                      control={form.control}
                      name="state"
                      label="State"
                      type="text"
                      placeholder="Example: Dolnośląskie"
                      error={form.formState.errors.state}
                    />
                    <FormInput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      type="text"
                      placeholder="Exmaple: 50528"
                      error={form.formState.errors.postalCode}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <FormInput
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      type="text"
                      placeholder="DD-MM-YYYY"
                      error={form.formState.errors.dateOfBirth}
                    />
                    <FormInput
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      type="text"
                      placeholder="Example: 1234"
                      error={form.formState.errors.ssn}
                    />
                  </div>
                  <FormInput
                    control={form.control}
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    error={form.formState.errors.email}
                  />

                  <FormInput
                    control={form.control}
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    error={form.formState.errors.password}
                  />
                  <button
                    type="submit"
                    className="mt-8 w-full rounded-lg bg-blue-600 py-[10px] font-semibold text-white duration-300 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? <div>Loading...</div> : "Sign Up"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex w-[500px] flex-col gap-4">
                <FormInput
                  control={form.control}
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  error={form.formState.errors.email}
                />

                <FormInput
                  control={form.control}
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  error={form.formState.errors.password}
                />
                <button
                  type="submit"
                  className="mt-4 rounded-lg bg-blue-600 py-3 font-semibold text-white duration-300 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? <div>Loading...</div> : "Sign In"}
                </button>
              </div>
            )}
          </form>
          <footer className="mt-10 flex items-center justify-center">
            <p className="text-sm text-textGrey">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-2 text-blue-600 duration-300 hover:text-blue-500"
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};