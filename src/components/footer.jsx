import { Brand } from "@/components/logo";
import { Button } from "@/components/ui/button";

const XIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
};

const FacebookIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M14 8.5V6.6c0-.8.2-1.3 1.4-1.3H17V2.2C16.7 2.1 15.7 2 14.6 2 12.2 2 10.6 3.5 10.6 6.1v2.4H8v3.4h2.6V22H14V11.9h2.7l.4-3.4H14z" />
    </svg>
  );
};

const InstagramIcon = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
};

const SOCIAL_LINKS = [
  { label: "X", href: "https://x.com", Icon: XIcon },
  { label: "Facebook", href: "https://facebook.com", Icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
];

export const Footer = () => {
  return (
    <footer className="page-container mt-22 lg:mt-35">
      <div className="head-rule" />
      <div className="grid gap-10 pt-12 pb-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-3.5">
          <Brand />
          <p className="max-w-[32ch] text-[15px] leading-[1.6] text-foreground/82">
            A small online library run by its readers. Add a book, borrow a
            book, return a book.
          </p>
        </div>

        <div className="flex flex-col gap-2.5 text-[15px]">
          <span className="kicker">Contact</span>
          <span>hello@booknook.app</span>
          <span>+1 (555) 014-2290</span>
          <span>12 Reading Lane, Portland</span>
        </div>

        <div className="flex flex-col gap-2.5 text-[15px]">
          <span className="kicker">Follow</span>
          <div className="flex gap-2">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <Button
                key={label}
                asChild
                variant="secondary"
                size="icon"
                className="text-foreground"
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between gap-2 border-t border-foreground/15 pt-4 pb-8 text-[13px] text-foreground/72">
        <span>© 2026 BookNook. All rights reserved.</span>
        <span>Made for readers who share.</span>
      </div>
    </footer>
  );
};
