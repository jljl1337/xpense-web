import { redirect } from "next/navigation";

import { isLoggedIn } from "@/lib/db/auth";

export default async function Book() {
  if (!(await isLoggedIn())) {
    redirect("/");
  }

  return (
    <div className="h-full flex items-center justify-center">
      <h1>Book</h1>
    </div>
  );
}
