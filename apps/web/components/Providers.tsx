"use client"
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react"; // Ensure you import SessionProvider

interface Props {
  children: ReactNode;
}

const Providers = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
