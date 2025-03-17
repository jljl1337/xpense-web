import { redirect } from "next/navigation";

import { isLoggedIn } from "@/lib/db/auth";

export default async function Account() {
  if (!(await isLoggedIn())) {
    redirect("/");
  }

  return (
    <div className="h-full flex items-center justify-center">
      <h1>Account</h1>
    </div>
  );
}
