import type { Metadata } from "next";
import { Geist, Geist_Mono, Onest } from "next/font/google";

import "./globals.css";
import { Toaster } from "sonner";

const onest = Onest({ subsets: ["latin"], weight: ["400", "500", "600"] });
const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Better Auth UI By JB",
  description: "Created by JB",
  creator: "jbwebdeveloper",
  openGraph: {
    siteName: "Better Auth UI Components",
    url: "/",
    images: [
      {
        url: "https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfUNp55KfHlbxM69AvE1HPOaYKR4rqd8ygiztf",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@Mjohnbaptist", // Twitter username
    images: [
      "https://14j7oh8kso.ufs.sh/f/HLxTbDBCDLwfUNp55KfHlbxM69AvE1HPOaYKR4rqd8ygiztf",
    ],
  },
  icons: {
    icon: [
      {
        url: "/images/favicon.ico",
        sizes: "any",
      },
    ],
    apple: {
      url: "/images/apple-touch-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${onest.className}`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
