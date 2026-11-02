import { Source_Serif_4 } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/toast";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: {
    default: "BookNook",
    template: "BookNook | %s",
  },
  description:
    "BookNook is a small online library. Add a book, borrow a book, return a book.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className={`${sourceSerif.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
};

export default RootLayout;
