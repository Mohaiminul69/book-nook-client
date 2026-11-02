import { Suspense } from "react";
import { LoginForm, LoginFormWithRedirect } from "@/components/auth/login-form";

export const metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <Suspense fallback={<LoginForm from={null} />}>
      <LoginFormWithRedirect />
    </Suspense>
  );
};

export default LoginPage;
