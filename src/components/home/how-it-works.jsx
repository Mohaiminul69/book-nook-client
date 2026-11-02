const STEPS = [
  {
    number: "01",
    title: "Find a book",
    text: "Browse All Books and open any title to see who added it and how many copies are left.",
  },
  {
    number: "02",
    title: "Borrow it",
    text: "Confirm with your account. The return date is set seven days out and saved to My Borrows.",
  },
  {
    number: "03",
    title: "Bring it back",
    text: "Press Return Book in My Borrows and the copy goes straight back on the shelf.",
  },
];

export const HowItWorks = () => {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <span className="kicker">How borrowing works</span>
        <h2 className="text-[28px] leading-[1.1] tracking-[-0.015em] lg:text-[44px]">
          Three steps, no late fees
        </h2>
      </div>
      <div className="grid gap-9 lg:grid-cols-3 lg:gap-12">
        {STEPS.map((step) => (
          <div key={step.number} className="flex max-w-[34ch] flex-col gap-3">
            <span className="font-heading text-[64px] leading-none tracking-[-0.03em] lining-nums">
              {step.number}
              <span className="text-cyan">.</span>
            </span>
            <h3 className="text-2xl font-normal tracking-[-0.01em]">
              {step.title}
            </h3>
            <p className="text-base leading-[1.6] text-foreground/82">
              {step.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
