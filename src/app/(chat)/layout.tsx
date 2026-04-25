import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Welcome to my agent",
  title: "My Agent!",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
