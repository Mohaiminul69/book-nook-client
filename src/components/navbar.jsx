"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandWordmark, Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { href: "/", label: "Home", private: false },
  { href: "/books", label: "All Books", private: false },
  { href: "/add-book", label: "Add Book", private: true },
  { href: "/my-books", label: "My Books", private: true },
  { href: "/my-borrows", label: "My Borrows", private: true },
];

function isActive(pathname, href) {
  if (!pathname) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function DesktopLinkList({ links, pathname }) {
  return links.map((link) => {
    const active = isActive(pathname, link.href);
    return (
      <Link
        key={link.href}
        href={link.href}
        aria-current={active ? "page" : undefined}
        className={`text-[15px] transition-colors hover:text-primary ${active ? "text-primary" : "text-foreground"}`}
      >
        {link.label}
      </Link>
    );
  });
}

function DrawerLinkList({ links, pathname, onNavigate }) {
  return links.map((link) => {
    const active = isActive(pathname, link.href);
    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={`py-3 font-heading text-[26px] tracking-[-0.01em] ${active ? "text-cyan-700" : "text-foreground"}`}
      >
        {link.label}
      </Link>
    );
  });
}

// usePathname must sit inside <Suspense> because cacheComponents is on
function WithPathname({ render }) {
  const pathname = usePathname();
  return render(pathname);
}

function ActiveLinks({ render }) {
  return (
    <Suspense fallback={render(null)}>
      <WithPathname render={render} />
    </Suspense>
  );
}

function initialsOf(name = "") {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function AccountMenu({ user, onLogout }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Account menu"
          className="rounded-full shadow-[0_0_0_2px_var(--background),0_0_0_3px_var(--color-cyan-300)]"
        >
          <Avatar className="size-[38px]">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback className="bg-cyan-100 font-heading text-[15px] text-cyan-800">
              {initialsOf(user.name)}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="w-[248px] rounded-md bg-card p-2 shadow-md ring-0"
      >
        <div className="flex flex-col gap-0.5 px-3 pt-2.5 pb-3">
          <span className="font-heading text-[17px]">{user.name}</span>
          <span className="text-[13px] text-muted-foreground">{user.email}</span>
        </div>
        <DropdownMenuItem asChild className="min-h-10 rounded-md px-3 font-heading text-sm font-semibold">
          <Link href="/profile">My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={onLogout}
          className="min-h-10 rounded-md px-3 font-heading text-sm font-semibold text-magenta-700 focus:text-magenta-700"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function HamburgerIcon() {
  return (
    <span aria-hidden="true" className="flex flex-col gap-1">
      <span className="h-[1.5px] w-4 bg-current" />
      <span className="h-[1.5px] w-4 bg-current" />
      <span className="h-[1.5px] w-4 bg-current" />
    </span>
  );
}

export function Navbar() {
  // Placeholder until BetterAuth is wired in the auth step:
  // this becomes the logged-in user from the session, and onLogout calls signOut.
  const user = null;
  const onLogout = () => {};

  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const links = NAV_LINKS.filter((link) => user || !link.private);

  return (
    <header className="page-container relative z-20">
      <nav className="flex items-center gap-7 py-3.5 lg:py-[22px]">
        <Logo className="mr-auto" />

        <div className="hidden items-center gap-7 lg:flex">
          <ActiveLinks render={(pathname) => <DesktopLinkList links={links} pathname={pathname} />} />
        </div>

        <div className="flex items-center gap-2.5">
          {user && <AccountMenu user={user} onLogout={onLogout} />}

          {!user && (
            <>
              <div className="hidden items-center gap-2.5 lg:flex">
                <Button asChild variant="ghost" className="px-[5px]">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </div>
              <Button asChild className="lg:hidden">
                <Link href="/login">Login</Link>
              </Button>
            </>
          )}

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon-lg" className="lg:hidden" aria-label="Open menu">
                <HamburgerIcon />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-[82%] gap-1.5 border-0 bg-background p-6 sm:max-w-none"
            >
              <div className="flex items-center justify-between pb-5">
                <SheetTitle asChild>
                  <BrandWordmark className="text-foreground" />
                </SheetTitle>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon-lg" className="text-xl font-normal text-foreground" aria-label="Close menu">
                    ×
                  </Button>
                </SheetClose>
              </div>
              <SheetDescription className="sr-only">Site navigation</SheetDescription>

              <ActiveLinks
                render={(pathname) => (
                  <DrawerLinkList links={links} pathname={pathname} onNavigate={closeMenu} />
                )}
              />

              <div className="mt-auto flex flex-col gap-2.5">
                {user ? (
                  <>
                    <span className="text-sm text-foreground/75">Signed in as {user.name}</span>
                    <Button
                      variant="secondary"
                      className="min-h-11"
                      onClick={() => {
                        closeMenu();
                        onLogout();
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild className="min-h-11">
                      <Link href="/login" onClick={closeMenu}>Login</Link>
                    </Button>
                    <Button asChild variant="secondary" className="min-h-11">
                      <Link href="/register" onClick={closeMenu}>Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      <div className="head-rule" />
    </header>
  );
}
