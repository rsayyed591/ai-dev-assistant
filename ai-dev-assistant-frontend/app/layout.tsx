import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

// Import Raleway instead of Fredoka
const raleway = Raleway({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"] 
});

export const metadata: Metadata = {
  title: "Rephraser | By Rehan",
  description: "AI Dev Assistant API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.className} text-white min-h-screen flex flex-col antialiased`}>
        <div className="bg-pattern" />
        {children}
      </body>
    </html>
  );
}