import { redirect } from "next/navigation";

import LoginClientPage from "@/app/login/page-client";
import { isLoggedIn } from "@/lib/db/auth";

export default async function LoginPage() {
  const isLogged = await isLoggedIn();

  if (isLogged) {
    redirect("/books");
  }

  return <LoginClientPage />;
}
