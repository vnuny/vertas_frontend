import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vertas",
  description: "Grow your anduience with Vertas"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased overflow-x-hidden`}>{children}</body>
    </html>
  );
}
