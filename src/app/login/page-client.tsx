"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { signIn } from "@/lib/actions/auth";

async function handleSubmit(_previousState: unknown, formData: FormData) {
  return signIn(formData);
}

export default function LoginClientPage() {
  const [error, action, isPending] = useActionState(handleSubmit, null);

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
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      name="email"
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      disabled={isPending}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      {/* <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </a> */}
                    </div>
                    <Input
                      name="password"
                      id="password"
                      type="password"
                      disabled={isPending}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    formAction={action}
                    disabled={isPending}
                  >
                    {isPending ? "Loading..." : "Login"}
                  </Button>
                  {error && !isPending && (
                    <div className="text-red-500 text-sm text-center">
                      {error}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
