"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Spinner } from "@/ui/spinner";
import { Button } from "./button";

export default function LogoutButton() {
  const [isFormSubmitting, SetIsFormSubmitting] = useState(false);

  return (
    <Button
      onClick={() => {
        authClient.signOut(undefined, {
          onRequest: () => {
            SetIsFormSubmitting(true);
          },
          onError: (ctx) => {
            SetIsFormSubmitting(false);
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            SetIsFormSubmitting(false);
            toast.success("See you soon!");
          },
        });
      }}
      size="lg"
      variant={"destructive"}
      disabled={isFormSubmitting}
    >
      {isFormSubmitting && <Spinner />}
      {!isFormSubmitting && <LogOut />}
      logout
    </Button>
  );
}
