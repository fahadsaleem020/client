import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Welcome to my agent",
  title: "Almost there!",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
