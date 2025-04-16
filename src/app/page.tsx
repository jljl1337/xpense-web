import { redirect } from "next/navigation";

import { isLoggedIn } from "@/lib/db/auth";

export default async function Home() {
  if (!(await isLoggedIn())) {
    redirect("/login");
  }
  redirect("/books");
}
