"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { notify } from "@/components/toast";
import {
  AuthLayout,
  FormError,
  GoogleButton,
  OrDivider,
} from "@/components/auth/auth-parts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PAGE_LABELS = {
  "/add-book": "Add Book",
  "/my-books": "My Books",
  "/my-borrows": "My Borrows",
  "/profile": "My Profile",
};

const getSafeRedirect = (from) => {
  if (!from || !from.startsWith("/") || from.startsWith("//")) return null;
  return from;
};

const getPageLabel = (path) => {
  if (!path) return null;
  if (path.startsWith("/books/")) return "Book Details";
  return PAGE_LABELS[path.split("?")[0]] || "that page";
};

export const LoginForm = ({ from }) => {
  const router = useRouter();
  const redirectTo = getSafeRedirect(from);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { data, error: loginError } = await authClient.signIn.email({
      email,
      password,
    });
    if (loginError) {
      setLoading(false);
      setError("Email or password is incorrect.");
      notify.error("Login failed", "Email or password is incorrect.");
      return;
    }
    notify.success("Welcome back", `Logged in as ${data.user.name}.`);
    router.replace(redirectTo || "/");
    router.refresh();
  };

  const handleGoogle = async () => {
    setLoading(true);
    const { error: googleError } = await authClient.signIn.social({
      provider: "google",
      callbackURL: redirectTo || "/",
    });
    if (googleError) {
      setLoading(false);
      notify.error("Google login failed", "Please try again.");
    }
  };

  return (
    <AuthLayout
      intro={
        <>
          <span className="kicker">Welcome back</span>
          <h1 className="text-[42px] leading-[1.04] tracking-[-0.025em] lg:text-[76px]">
            Your shelf is <span className="italic">waiting</span>
            <span className="text-magenta">.</span>
          </h1>
          {redirectTo && (
            <span className="text-base text-cyan-700">
              Log in to continue to {getPageLabel(redirectTo)}.
            </span>
          )}
        </>
      }
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full max-w-[420px] flex-col gap-[18px]"
      >
        <h2 className="mb-1 text-[32px] tracking-[-0.015em]">Login</h2>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            required
          />
        </div>
        <div>
          <div className="flex items-baseline justify-between">
            <Label htmlFor="password">Password</Label>
            <button
              type="button"
              className="text-[13px] text-cyan-700 underline underline-offset-3 hover:text-cyan-600"
            >
              Forget Password?
            </button>
          </div>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            aria-invalid={error ? true : undefined}
            required
          />
        </div>
        <FormError message={error} />
        <Button
          type="submit"
          disabled={loading}
          className="min-h-12 text-[15px]"
        >
          Login
        </Button>
        <OrDivider />
        <GoogleButton onClick={handleGoogle} disabled={loading} />
        <span className="text-[15px]">
          New to BookNook?{" "}
          <Link
            href="/register"
            className="text-cyan-700 underline underline-offset-3 hover:text-cyan-600"
          >
            Register
          </Link>
        </span>
      </form>
    </AuthLayout>
  );
};

export const LoginFormWithRedirect = () => {
  const searchParams = useSearchParams();
  return <LoginForm from={searchParams.get("from")} />;
};
