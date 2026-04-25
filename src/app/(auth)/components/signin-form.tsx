"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import { Spinner } from "@/ui/spinner";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export default function SigninForm() {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  // const router = useRouter();
  // const { refetchUser } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
      },
      {
        onRequest: () => {
          setIsFormSubmitting(true);
        },
        onError: (ctx) => {
          setIsFormSubmitting(false);
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          form.reset();
          setIsFormSubmitting(false);
          // router.push("/chat");
        },
      },
    );
  }

  return (
    <div>
      <h1 className="text-lg font-semibold">Login to your account</h1>
      <p className="text-muted-foreground mt-1 mb-5">Enter your email below to login to your account</p>
      <form id="signin-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="flex flex-col gap-4">
          <div className="flex flex-col gap-6">
            {/* email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2" data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    autoComplete="email"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* password */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2" data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                  </div>
                  <Input {...field} aria-invalid={fieldState.invalid} id="password" type="password" autoComplete="current-password" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* actions */}
            <FieldGroup className="flex flex-col gap-2 pt-4">
              <Button type="submit" className="w-full" disabled={isFormSubmitting}>
                {isFormSubmitting && <Spinner />}
                Login
              </Button>
              <p className="text-sm text-muted-foreground px-6 text-center">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="underline underline-offset-4 hover:text-primary">
                  Sign up
                </Link>
              </p>
            </FieldGroup>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
}
