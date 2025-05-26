import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export interface PaginationInfo {
  total: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const extractPagination = (headers: any): PaginationInfo => {
  return {
    total: Number(headers["x-pagination-total"]) || 0,
    currentPage: Number(headers["x-pagination-page"]) || 1,
    perPage: Number(headers["x-pagination-limit"]) || 20,
    totalPages: Number(headers["x-pagination-pages"]) || 1,
  };
};

export const cleanParams = <T extends Record<string, any>>(params: T) => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  );
};
