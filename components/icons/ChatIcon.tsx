import { cn } from "@/libs/utils";
import React from "react";

export function ChatIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-text-tertiary", className)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.337 21.718C5.15841 21.7005 4.98061 21.6758 4.804 21.644C4.67429 21.6208 4.553 21.5638 4.45233 21.4787C4.35167 21.3937 4.27518 21.2836 4.23057 21.1597C4.18596 21.0357 4.17481 20.9021 4.19823 20.7724C4.22165 20.6428 4.27883 20.5215 4.364 20.421C4.77426 19.9373 5.05442 19.3571 5.178 18.735C5.201 18.62 5.156 18.418 4.924 18.192C3.274 16.587 2.25 14.41 2.25 12C2.25 6.97 6.678 3 12 3C17.322 3 21.75 6.97 21.75 12C21.75 17.03 17.322 21 12 21C11.167 21 10.357 20.903 9.583 20.721C8.31785 21.5161 6.82381 21.8669 5.337 21.718Z"
      />
    </svg>
  );
}
