"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

const getPasswordRules = (password) => [
  { label: "One uppercase letter", ok: /[A-Z]/.test(password) },
  { label: "One lowercase letter", ok: /[a-z]/.test(password) },
  { label: "At least 6 characters", ok: password.length >= 6 },
];

const RuleItem = ({ rule, tried }) => {
  let mark = "·";
  let color = "text-foreground/72";
  if (rule.ok) {
    mark = "✓";
    color = "text-cyan-700";
  } else if (tried) {
    mark = "✕";
    color = "text-magenta-700";
  }
  return (
    <span className={`flex items-center gap-2 text-sm ${color}`}>
      <span className="w-3.5 text-center">{mark}</span>
      {rule.label}
    </span>
  );
};

export const RegisterForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    photo: "",
    password: "",
  });
  const [tried, setTried] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const rules = getPasswordRules(form.password);
  const passwordValid = rules.every((rule) => rule.ok);

  const updateField = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTried(true);
    if (!form.name.trim() || !form.email.includes("@")) {
      setError("Enter your name and a valid email.");
      return;
    }
    if (form.photo && !/^https?:\/\/\S+$/.test(form.photo)) {
      setError("Enter a valid photo URL.");
      return;
    }
    if (!passwordValid) {
      setError("Password doesn't meet the rules above.");
      notify.error("Registration failed", "Fix the password and try again.");
      return;
    }
    setLoading(true);
    const { error: signUpError } = await authClient.signUp.email({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      image: form.photo.trim() || undefined,
    });
    setLoading(false);
    if (signUpError) {
      const message = signUpError.message || "Could not create your account.";
      setError(message);
      notify.error("Registration failed", message);
      return;
    }
    notify.success("Account created", "Log in with your new account.");
    router.push("/login");
  };

  const handleGoogle = async () => {
    setLoading(true);
    const { error: googleError } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (googleError) {
      setLoading(false);
      notify.error("Google sign up failed", "Please try again.");
    }
  };

  return (
    <AuthLayout
      intro={
        <>
          <span className="kicker">Join the library</span>
          <h1 className="text-[42px] leading-[1.04] tracking-[-0.025em] lg:text-[76px]">
            One card, every <span className="italic">shelf</span>
            <span className="text-magenta">.</span>
          </h1>
          <p className="max-w-[34ch] text-base leading-[1.6] lg:text-lg">
            An account lets you add books, borrow them and keep track of return
            dates.
          </p>
        </>
      }
    >
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex w-full max-w-[420px] flex-col gap-[18px]"
      >
        <h2 className="mb-1 text-[32px] tracking-[-0.015em]">Register</h2>
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Your full name"
            value={form.name}
            onChange={updateField("name")}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={updateField("email")}
          />
        </div>
        <div>
          <Label htmlFor="photo">Photo URL</Label>
          <Input
            id="photo"
            type="url"
            placeholder="https://i.ibb.co/…"
            value={form.photo}
            onChange={updateField("photo")}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            value={form.password}
            onChange={updateField("password")}
            aria-invalid={tried && !passwordValid ? true : undefined}
            aria-describedby="password-rules"
          />
        </div>
        <div id="password-rules" className="-mt-1.5 flex flex-col gap-1.5">
          {rules.map((rule) => (
            <RuleItem key={rule.label} rule={rule} tried={tried} />
          ))}
        </div>
        <FormError message={error} />
        <Button
          type="submit"
          disabled={loading}
          className="min-h-12 text-[15px]"
        >
          Register
        </Button>
        <OrDivider />
        <GoogleButton onClick={handleGoogle} disabled={loading} />
        <span className="text-[15px]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-cyan-700 underline underline-offset-3 hover:text-cyan-600"
          >
            Login
          </Link>
        </span>
      </form>
    </AuthLayout>
  );
};
