"use client";

import { Toaster as Sonner, toast } from "sonner";

const ToastCard = ({ id, kind, title, description }) => {
  return (
    <div className="grid w-full grid-cols-[10px_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 rounded-md bg-card px-[18px] py-4 font-sans text-foreground shadow-lg">
      <span
        aria-hidden="true"
        className={`mt-[7px] size-2 rounded-full ${kind === "error" ? "bg-magenta" : "bg-cyan"}`}
      />
      <div className="flex flex-col gap-1">
        <span className="font-heading text-base">{title}</span>
        {description && (
          <span className="text-sm text-foreground/78">{description}</span>
        )}
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => toast.dismiss(id)}
        className="text-lg leading-none text-foreground/70 hover:text-foreground"
      >
        ×
      </button>
    </div>
  );
};

const show = (kind, title, description) => {
  toast.custom(
    (id) => (
      <ToastCard id={id} kind={kind} title={title} description={description} />
    ),
    { duration: 4000 },
  );
};

export const notify = {
  success: (title, description) => show("success", title, description),
  error: (title, description) => show("error", title, description),
};

export const Toaster = () => {
  return (
    <Sonner
      position="bottom-right"
      offset={24}
      mobileOffset={{ bottom: 24, left: 16, right: 16 }}
      style={{ "--width": "380px" }}
    />
  );
};
