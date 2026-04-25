"use client";

import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Bot } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/providers/user.provider";
import { Button } from "@/ui/button";
import { FloatingPaths } from "@/ui/floating-paths";
import { Offline } from "@/ui/offline";
import SignUpForm from "../components/signup-form";

export default function SignUpPage() {
  const router = useRouter();
  const { isLoading, data } = useUser();

  useEffect(() => {
    if (!isLoading && data) {
      router.push("/chat");
    }
  }, [data, isLoading, router]);

  return (
    <Offline fallback="">
      <main className="relative md:h-screen md:overflow-hidden lg:grid lg:grid-cols-2">
        <LeftSide />
        <div className="relative flex min-h-screen flex-col justify-center px-8">
          <BackToHome />

          <div className="mx-auto space-y-4 sm:w-sm w-full">
            <Bot className="min-w-12 min-h-12 lg:hidden" />
            <SignUpForm />
          </div>
        </div>
      </main>
    </Offline>
  );
}

const LeftSide = () => {
  return (
    <div className="relative hidden h-full flex-col p-10 lg:flex dark:bg-blend-color">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
      <Bot className="mr-auto min-w-12 min-h-12" />

      <div className="z-10 mt-auto bg-neutral-900/30 backdrop-blur-lg border border-white/5 rounded-3xl p-3">
        <blockquote className="space-y-2">
          <p>The Dialogflow integration is seamless. We've automated 80% of our flight inquiries without losing the human touch.</p>
          <footer className="font-mono font-semibold text-sm">-My Agent</footer>
        </blockquote>
      </div>
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
    </div>
  );
};

const BackToHome = () => {
  return (
    <Button asChild className="absolute top-7 left-5" variant="ghost">
      <Link href="/">
        <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} data-icon="inline-start" />
        Home
      </Link>
    </Button>
  );
};
