import type { Metadata } from "next";
import { Geist, Geist_Mono, Onest } from "next/font/google";

import "./globals.css";
import { Toaster } from "sonner";

const onest = Onest({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Better Auth UI By JB",
  description: "Created by JB",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={onest.className}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
