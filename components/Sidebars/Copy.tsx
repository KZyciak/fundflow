"use client";
import { useState } from "react";
import { Button } from "../ui/MyButton";

const Copy = ({ title }: { title: string }) => {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(title);
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <>
      <button
        data-state="closed"
        type="button"
        className="mt-4 flex max-w-[310px] gap-4 overflow-hidden "
        onClick={copyToClipboard}
      >
        <p className="text-grayColor line-clamp-1 w-full max-w-full text-xs font-medium">
          {title}
        </p>

        {!hasCopied ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 size-4"
          >
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#B6FF1B"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="mr-2 size-4"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </button>
    </>
  );
};

export default Copy;
