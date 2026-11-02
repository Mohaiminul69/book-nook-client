export const Spinner = ({ className = "" }) => {
  return (
    <span
      aria-hidden="true"
      className={`inline-block size-9 animate-spin rounded-full border-[3px] border-neutral-200 border-t-cyan [animation-duration:0.8s] ${className}`}
    />
  );
};

export const LoadingState = ({ label = "Loading…" }) => {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-4 py-30"
    >
      <Spinner />
      <span className="text-base text-foreground/75 italic">{label}</span>
    </div>
  );
};
