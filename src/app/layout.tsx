import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";

import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xpense",
  description: "A simple expense tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col h-screen w-screen">
            <Header />
            <main className="flex-1 overflow-hidden">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
