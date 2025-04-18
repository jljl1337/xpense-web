import Image from "next/image";
import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import { HeaderDropdown } from "@/components/header/header-dropdown";
import { ThemeDropdown } from "@/components/header/theme-dropdown";
import { isLoggedIn } from "@/lib/db/auth";

export async function Header() {
  const isLogged = await isLoggedIn();

  return (
    <header className="flex-none flex flex-col">
      <nav className="flex flex-1 items-center justify-between m-3">
        <Link href="/">
          <Image
            src="/icon.png"
            alt="Logo of Xpense"
            width={38}
            height={38}
            priority
          />
        </Link>
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
