import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { QueryProvider, RTKProvider, ThemeProvider } from "@/providers";
import "./globals.css";
import { Toaster } from "@/components/ui";
import { env } from "@/config/env";

const figtree = Figtree({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Devotel - Todo App Challenge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {env.NODE_ENV === "development" && (
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        )}
      </head>
      <body className={`${figtree.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RTKProvider>
            <QueryProvider>{children}</QueryProvider>
          </RTKProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
