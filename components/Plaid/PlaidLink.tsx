"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/MyButton";
import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { useRouter } from "next/navigation";
import {
  createLinkToken,
  exchangePublicToken,
} from "@/lib/actions/user.actions";
import { ErrorDialog } from "../ui/ErrorDialog";
import { useDialog } from "@/lib/hooks/useDialog";

export const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { onOpen, onClose } = useDialog();

  useEffect(() => {
    const fetchToken = async () => {
      const data = await createLinkToken(user);

      setToken(data?.linkToken);
    };
    fetchToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      onOpen();
      setIsLoading(true);
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });

      router.push("/");
      setIsLoading(false);
      onClose();
    },

    [onClose, onOpen, router, user],
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <div>
      <ErrorDialog
        title="Please wait"
        description="We are adding your bank. Loading..."
      />

      {variant === "primary" ? (
        <Button onClick={() => open()} type="button" disabled={!ready}>
          {isLoading ? "Loading..." : "Connect Bank Account"}
        </Button>
      ) : variant === "secondary" ? (
        <Button onClick={() => open()} type="button" disabled={!ready}>
          {isLoading ? "Loading..." : "Add bank account"}
        </Button>
      ) : (
        <Button onClick={() => open()} type="button" disabled={!ready}>
          {isLoading ? "Loading..." : "Add"}
        </Button>
      )}
    </div>
  );
};
