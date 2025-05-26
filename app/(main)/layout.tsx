"use client";

import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import { ModalProvider } from "@/context/ModalContext";
import { useAuth } from "@/libs/hooks/use-auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getCurrentUser } = useAuth();
  const router = useRouter();
  const currentUser = getCurrentUser();
  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  }, [currentUser, router]);
  return (
    <ModalProvider>
      <Header />
      <div className="flex">
        <Navbar />
        <div className="flex-1 min-h-[calc(100vh-60px)]">{children}</div>
      </div>
    </ModalProvider>
  );
}
