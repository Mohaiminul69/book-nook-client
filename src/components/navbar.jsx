"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Menu, UserRound } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
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

function NavLinkList({ links, pathname, vertical = false, onNavigate }) {
  return (
    <ul className={vertical ? "flex flex-col gap-1" : "flex items-center gap-1"}>
      {links.map((link) => {
        const active = isActive(pathname, link.href);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`block rounded-lg px-3.5 py-2.5 text-[15px] transition-colors ${
                active
                  ? "bg-secondary font-semibold text-secondary-foreground"
                  : "font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

// usePathname must sit inside <Suspense> because cacheComponents is on
function ActiveNavLinks(props) {
  const pathname = usePathname();
  return <NavLinkList {...props} pathname={pathname} />;
}

function NavLinks(props) {
  return (
    <Suspense fallback={<NavLinkList {...props} pathname={null} />}>
      <ActiveNavLinks {...props} />
    </Suspense>
  );
}

function UserMenu({ user, onLogout }) {
  const initials = user.name
    ?.split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open profile menu"
          className="rounded-full ring-2 ring-highlight ring-offset-2 ring-offset-background"
        >
          <Avatar className="size-10">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-foreground">{user.name}</span>
          <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <UserRound /> My Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onSelect={onLogout}>
          <LogOut /> Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AuthButtons({ vertical = false }) {
  return (
    <div className={vertical ? "flex flex-col gap-2" : "flex items-center gap-2"}>
      <Button asChild variant="outline" size="lg" className="h-10 px-4 text-[15px]">
        <Link href="/login">Login</Link>
      </Button>
      <Button asChild size="lg" className="h-10 px-4 text-[15px]">
        <Link href="/register">Register</Link>
      </Button>
    </div>
  );
}

export function Navbar() {
  // Placeholder until BetterAuth is wired in the auth step:
  // this becomes the logged-in user from the session, and onLogout calls signOut.
  const user = null;
  const onLogout = () => {};

  const [mobileOpen, setMobileOpen] = useState(false);
  const links = NAV_LINKS.filter((link) => user || !link.private);

  return (
    <header className="sticky top-0 z-40 border-b bg-card/90 backdrop-blur">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />

        <div className="hidden lg:block">
          <NavLinks links={links} />
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <UserMenu user={user} onLogout={onLogout} />
          ) : (
            <div className="hidden sm:block">
              <AuthButtons />
            </div>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon-lg" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 gap-0">
              <SheetHeader>
                <SheetTitle className="font-heading text-xl text-primary">BookNook</SheetTitle>
                <SheetDescription>Browse, borrow and share books.</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-6 px-4">
                <NavLinks links={links} vertical onNavigate={() => setMobileOpen(false)} />
                {!user && <AuthButtons vertical />}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
