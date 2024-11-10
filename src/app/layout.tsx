import type { Metadata } from "next";

import "./globals.css";
import TopNav from "@/components/TopNav";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read about how our coworking and coliving space came to be",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <TopNav />
        <div className="flex justify-center mt-20">
          <div className="w-1/2">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
