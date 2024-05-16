"use client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../Button";
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

export const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  const [token, setToken] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      const data = await createLinkToken(user);

      setToken(data?.linkToken);
    };
    fetchToken();
  }, [user]);

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token: string) => {
      await exchangePublicToken({
        publicToken: public_token,
        user,
      });
      router.push("/");
    },

    [router, user],
  );

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <div>
      <Button onClick={() => open()} type="button" disabled={!ready}>
        Connect Bank Account
      </Button>
    </div>
  );
};
