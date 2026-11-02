import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LoadingState } from "@/components/loading-state";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getBooks } from "@/lib/books";
import { getMyBorrows, getSession } from "@/lib/server-api";
import { initialsOf } from "@/lib/utils";

export const metadata = {
  title: "My Profile",
};

const formatMemberSince = (value) => {
  return new Date(value).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
};

const StatLink = ({ href, count, label }) => {
  return (
    <Link
      href={href}
      className="flex flex-col gap-1 transition-colors hover:text-cyan-700"
    >
      <span className="font-heading text-5xl leading-none">{count}</span>
      <span className="text-[15px]">{label}</span>
    </Link>
  );
};

const ProfileData = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login?from=/profile");
  }
  const { user } = session;

  const [books, borrows] = await Promise.all([
    getBooks({ email: user.email }).catch(() => null),
    getMyBorrows().catch(() => null),
  ]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-7">
        <Avatar className="size-24">
          <AvatarImage src={user.image || undefined} alt={user.name} />
          <AvatarFallback className="bg-cyan-100 font-heading text-4xl text-cyan-800">
            {initialsOf(user.name)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1.5">
          <span className="kicker">My Profile</span>
          <h1 className="text-[38px] leading-[1.05] tracking-[-0.025em] lg:text-[60px]">
            {user.name}
          </h1>
          <span className="text-base text-foreground/75">
            {user.email} · Member since {formatMemberSince(user.createdAt)}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap gap-12">
        <StatLink
          href="/my-books"
          count={books ? books.length : "–"}
          label="Books shared"
        />
        <StatLink
          href="/my-borrows"
          count={borrows ? borrows.length : "–"}
          label="Books borrowed"
        />
      </div>
    </>
  );
};

const ProfilePage = () => {
  return (
    <section className="page-container flex flex-col gap-8 pt-9 lg:pt-16">
      <Suspense fallback={<LoadingState label="Loading profile…" />}>
        <ProfileData />
      </Suspense>
    </section>
  );
};

export default ProfilePage;
