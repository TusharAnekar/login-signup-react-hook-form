"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "password must be at least 8 character long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    ),
});

export default function Login() {
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur", // Trigger validation on blur
    defaultValues: {
      email: "", // Initialize email with an empty string
      password: "", // Initialize password with an empty string
    },
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
  }
  return (
    <div>
      <Form {...loginForm}>
        <form onSubmit={loginForm.handleSubmit(onSubmit)}>
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className={`${fieldState.error && "text-black"}`}>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    {...field}
                    className={`${
                      fieldState.error
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-primary"
                    }`}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={loginForm.control}
            name="password"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className={`${fieldState.error && "text-black"}`}>
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Password"
                    {...field}
                    className={`${
                      fieldState.error
                        ? "border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:ring-primary"
                    }`}
                  ></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <Link href={"/signup"}>Signup</Link>
    </div>
  );
}
