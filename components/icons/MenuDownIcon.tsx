import { cn } from "@/libs/utils";

export function MenuDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("text-text-tertiary", className)}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_11_1196"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="16"
        height="16"
      >
        <rect width="16" height="16" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_11_1196)">
        <path
          d="M7.99984 10L4.6665 6.66669H11.3332L7.99984 10Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
