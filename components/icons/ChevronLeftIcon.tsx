import { cn } from "@/libs/utils";
import React from "react";

export function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      className={cn("text-text-tertiary", className)}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.2733 4.94667L7.21998 8L10.2733 11.06L9.33332 12L5.33332 8L9.33332 4L10.2733 4.94667Z" />
    </svg>
  );
}
