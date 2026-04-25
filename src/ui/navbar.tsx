import { Bot } from "lucide-react";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { Button, buttonVariants } from "@/ui/button";
import { Offline } from "@/ui/offline";
import { Online } from "@/ui/online";
import { Skeleton } from "@/ui/skeleton";
import { cn } from "@/utils/cn";
import LogoutButton from "./logout-button";

export default function Navbar({ className, ...props }: ComponentPropsWithoutRef<"nav">) {
  return (
    <nav
      className={cn(
        "bg-neutral-900/30 backdrop-blur-lg border border-white/5 rounded-3xl px-6 py-4 flex flex-columns justify-between items-center shadow-xl mx-auto w-full md:w-2xl",
        className,
      )}
      {...props}
    >
      <Link href="/">
        <Bot size={30} />
      </Link>
      <Offline fallback={<Skeleton className={buttonVariants({ size: "lg" })}>Tuning...</Skeleton>}>
        <Button size="lg" asChild>
          <Link href="/signin">Get Started</Link>
        </Button>
      </Offline>
      <Online fallback="">
        <LogoutButton />
      </Online>
    </nav>
  );
}
