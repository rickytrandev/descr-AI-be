import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "AI Product Description Generator",
  description: "An AI-powered tool that generates rich and engaging product descriptions for e-commerce platforms, utilizing images, titles, brands, and SEO keywords.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="m-6">
        {children}
      </body>
    </html>
  );
}
