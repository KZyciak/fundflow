"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { AuthFormSchema } from "@/lib/utils";
import { signIn, signUp } from "@/lib/actions/user.actions";
import { PlaidLink } from "../Plaid/PlaidLink";
import { ErrorDialog } from "../ErrorDialog";
import { useDialog } from "@/lib/hooks/useDialog";
import { CustomFormField } from "../CustomFormField";
import { Form } from "../ui/form";
import { Button } from "../ui/MyButton";
import Logo from "../../public/icons/logo.svg";

export const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { onOpen } = useDialog();

  const formSchema = AuthFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      postalCode: "",
      email: "",
      password: "",
      dateOfBirth: "",
      ssn: "",
      state: "NY",
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
    } catch (error: any) {
      setErrorMessage(error.message);
      onOpen();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mx-auto my-10 w-full min-w-[310px] rounded-2xl bg-elementBackgroundColor p-4 sm:min-w-[500px] md:p-8">
      <ErrorDialog
        title="Error"
        description={
          errorMessage ||
          "An error occurred during the sign-up/sign-in process. Please try again."
        }
        buttonText="Understood!"
      />

      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className=" flex cursor-pointer items-center gap-5">
          <Image
            src={Logo}
            width={50}
            height={50}
            priority
            alt="FundFlow Logo"
          />
          <h1 className="font-mono text-2xl lg:block">
            Fund<span className="text-AccentLimeColor">Flow</span>
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-2xl font-semibold ">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="pb-5 pt-1 text-base font-normal text-grayColor">
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 lg:min-w-[700px]"
            >
              {type === "sign-up" && (
                <div className="gap-10 md:flex">
                  <div className="w-full">
                    <CustomFormField
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="John"
                    />
                    <CustomFormField
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Doe"
                    />
                    <CustomFormField
                      control={form.control}
                      name="address"
                      label="Address"
                      placeholder="Main St 123"
                    />
                    <CustomFormField
                      control={form.control}
                      name="city"
                      label="City"
                      placeholder="New York"
                    />
                    <CustomFormField
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="10001"
                    />
                    {/* hidden */}
                    <div className="hidden">
                      <CustomFormField
                        control={form.control}
                        name="state"
                        label="State"
                        placeholder="NY"
                      />
                    </div>
                    {/* hidden */}
                  </div>
                  <div className="w-full">
                    <CustomFormField
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                    />
                    <CustomFormField
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="1234"
                    />
                    <CustomFormField
                      control={form.control}
                      name="email"
                      label="E-mail"
                      inputType="email"
                      placeholder="Enter your e-mail"
                    />
                    <CustomFormField
                      control={form.control}
                      name="password"
                      inputType="password"
                      label="Password"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
              )}

              {type === "sign-in" && (
                <div>
                  <CustomFormField
                    control={form.control}
                    name="email"
                    label="E-mail"
                    inputType="email"
                    placeholder="Enter your e-mail"
                  />
                  <CustomFormField
                    control={form.control}
                    name="password"
                    label="Password"
                    inputType="password"
                    placeholder="Enter your password"
                  />
                </div>
              )}

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <div>Loading...</div>
                ) : type === "sign-in" ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>
          <footer className="mt-10 flex items-center justify-center">
            <p className="text-textGrey text-sm">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-2 text-AccentLimeColor hover:underline"
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};
