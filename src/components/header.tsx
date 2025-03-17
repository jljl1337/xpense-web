import Link from "next/link";

import { Separator } from "@/components/ui/separator";

import { HeaderDropdown } from "@/components/header-dropdown";
import { ThemeDropdown } from "@/components/theme-dropdown";

export async function Header() {
  return (
    <header className="flex-none flex flex-col">
      <nav className="flex flex-1 items-center justify-between m-3">
        {/* Landing page text */}
        <div>
          <Link href="/">
            <h1 className="text-2xl">Xpense</h1>
          </Link>
        </div>
        {/* Dropdown buttons */}
        <div className="flex justify-end gap-3">
          <ThemeDropdown />
          <HeaderDropdown isLogged={false} />
        </div>
      </nav>
      <Separator />
    </header>
  );
}
