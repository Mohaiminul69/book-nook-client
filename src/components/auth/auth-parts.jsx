import { GoogleIcon } from "@/components/auth/google-icon";
import { Button } from "@/components/ui/button";

export const AuthLayout = ({ intro, children }) => {
  return (
    <section className="page-container grid items-start gap-8 pt-9 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-20 lg:pt-16">
      <div className="flex flex-col gap-4">{intro}</div>
      {children}
    </section>
  );
};

export const OrDivider = () => {
  return (
    <div className="flex items-center gap-3 text-[13px] text-foreground/70">
      <span className="flex-1 border-t border-foreground/15" />
      or
      <span className="flex-1 border-t border-foreground/15" />
    </div>
  );
};

export const GoogleButton = ({ onClick, disabled }) => {
  return (
    <Button
      type="button"
      variant="secondary"
      onClick={onClick}
      disabled={disabled}
      className="min-h-12 gap-2.5 text-[15px]"
    >
      <GoogleIcon />
      Continue with Google
    </Button>
  );
};

export const FormError = ({ message }) => {
  if (!message) return null;
  return (
    <span role="alert" className="text-sm text-magenta-700">
      {message}
    </span>
  );
};
