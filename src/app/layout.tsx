import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { QueryProvider } from "@/providers/react-query.provider";
import { ThemeProvider } from "@/providers/theme.provider";
import "./globals.css";
import { Toaster } from "@/components/ui";

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
      <body className={`${figtree.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
