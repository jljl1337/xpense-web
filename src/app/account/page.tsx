import { redirect } from "next/navigation";

import { isLoggedIn } from "@/lib/db/auth";

export default async function AccountPage() {
  if (!(await isLoggedIn())) {
    redirect("/login");
  }

  return (
    <div className="h-full flex items-center justify-center">
      <h1>Account</h1>
    </div>
  );
}
