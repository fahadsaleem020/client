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
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/ui/field";
import { Input } from "@/ui/input";
import { ScrollArea, ScrollBar } from "@/ui/scroll-area";
import { Spinner } from "@/ui/spinner";

const formSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUpForm() {
  const [isFormSubmitting, SetIsFormSubmitting] = useState(false);
  // const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.confirmPassword,
      },
      {
        onRequest: () => {
          SetIsFormSubmitting(true);
        },
        onError: (ctx) => {
          SetIsFormSubmitting(false);
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          form.reset();
          SetIsFormSubmitting(false);
          // router.push("/chat");
        },
      },
    );
  }

  return (
    <div>
      <h1 className="text-lg font-semibold">Create an account</h1>
      <p className="text-muted-foreground mt-1 mb-5">Enter your information below to create your account</p>
      <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className="flex flex-col gap-4">
          <ScrollArea className="h-100">
            <div className="flex flex-col gap-6 pr-4 pl-1">
              {/* name */}
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="space-y-2" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="name">Full Name</FieldLabel>
                    <Input {...field} aria-invalid={fieldState.invalid} id="name" type="text" placeholder="john doe" autoComplete="off" />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

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
                      autoComplete="off"
                    />
                    {!fieldState.invalid && <FieldDescription>We&apos;ll use this to contact you.</FieldDescription>}
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
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input {...field} aria-invalid={fieldState.invalid} id="password" type="password" autoComplete="off" />
                    {!fieldState.invalid && <FieldDescription>Must be at least 8 characters long.</FieldDescription>}
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* confirm password */}
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="space-y-2" data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                    <Input {...field} aria-invalid={fieldState.invalid} id="confirm-password" type="password" autoComplete="off" />
                    {!fieldState.invalid && <FieldDescription>Please confirm your password.</FieldDescription>}
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* actions */}
              <FieldGroup className="flex flex-col gap-2 pt-4 sticky bottom-0 bg-neutral-950">
                <Button type="submit" className="w-full" disabled={isFormSubmitting}>
                  {isFormSubmitting && <Spinner />}
                  Create Account
                </Button>
                <p className="text-sm text-muted-foreground px-6 text-center">
                  Already have an account?{" "}
                  <Link href="/signin" className="underline underline-offset-4 hover:text-primary">
                    Sign in
                  </Link>
                </p>
              </FieldGroup>
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </FieldGroup>
      </form>
    </div>
  );
}
