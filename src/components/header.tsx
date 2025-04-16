import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import { HeaderDropdown } from "@/components/header-dropdown";
import { ThemeDropdown } from "@/components/theme-dropdown";
import { isLoggedIn } from "@/lib/db/auth";

export async function Header() {
  const isLogged = await isLoggedIn();

  return (
    <header className="flex-none flex flex-col">
      <nav className="flex flex-1 items-center justify-between m-3">
        <div className="flex items-center gap-9">
          <Link href="/">
            <Image
              className="invert dark:invert-0"
              src="/icon.png"
              alt="logo"
              width={38}
              height={38}
              priority
            />
          </Link>
          <Link href="/books">
            <h2 className="text-xl">Books</h2>
          </Link>
        </div>
        {/* Dropdown buttons */}
        <div className="flex justify-end gap-3">
          <ThemeDropdown />
          <HeaderDropdown isLogged={isLogged} />
        </div>
      </nav>
      <Separator />
    </header>
  );
}
