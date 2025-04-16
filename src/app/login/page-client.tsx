"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { signIn } from "@/lib/actions/auth";
import { LOGIN_IN_SCHEMA } from "@/lib/schemas/login-in";

export default function LoginClientPage() {
  const form = useForm<z.infer<typeof LOGIN_IN_SCHEMA>>({
    resolver: zodResolver(LOGIN_IN_SCHEMA),
  });

  const {
    setError,
    formState: { isSubmitting, errors },
  } = form;

  async function OnSubmit(data: z.infer<typeof LOGIN_IN_SCHEMA>) {
    const error = await signIn(data);

    if (error) {
      setError("root", {
        message: error,
      });
    }
  }

  return (
    // <div className="h-full flex items-center justify-center">
    //   <h1>Login</h1>
    // </div>
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(OnSubmit)}>
                  <div className="flex flex-col gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="your@email.com"
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          {/* <FormDescription>
                          </FormDescription> */}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="yourVeryStrongPassword"
                              type="password"
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          {/* <FormDescription>
                          </FormDescription> */}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Loading..." : "Login"}
                    </Button>
                    {errors.root?.message && !isSubmitting && (
                      <div className="text-red-500 text-sm text-center">
                        {errors.root?.message}
                      </div>
                    )}
                    {/* <Button variant="outline" className="w-full">
                    Login with Google
                  </Button> */}
                  </div>
                  {/* <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div> */}
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
