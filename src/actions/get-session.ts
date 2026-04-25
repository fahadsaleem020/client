"use server";

import { headers } from "next/headers";
import type { Session } from "@/providers/user.provider";

export const getSession = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/auth/get-session`, {
    headers: await headers(),
    credentials: "include",
    cache: "no-store",
    method: "GET",
  });

  if (!res.ok) return null;
  return (await res.json()) as Session;
};
