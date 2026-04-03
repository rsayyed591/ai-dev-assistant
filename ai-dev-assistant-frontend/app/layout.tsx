import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"] 
});

export const metadata: Metadata = {
  title: "Rephraser | AI Dev Assistant By Rehan",
  description: "Elevate your writing and streamline your Git workflow with Rephraser. An AI-powered assistant for text rephrasing and conventional commit generation.",
  keywords: ["AI", "Developer Tool", "Commit Generator", "Text Rephraser", "Git", "Conventional Commits"],
  authors: [{ name: "Rehan" }],
  openGraph: {
    title: "Rephraser | AI Dev Assistant",
    description: "AI-powered text rephrasing and conventional commit generation.",
    url: "https://your-deployment-url.com", 
    siteName: "Rephraser",
    images: [
      {
        url: "/og-image.jpeg", 
        width: 1200,
        height: 630,
        alt: "Rephraser App Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rephraser | AI Dev Assistant",
    description: "AI-powered text rephrasing and conventional commit generation by Rehan.",
    images: ["/og-image.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Rephraser",
    "author": { "@type": "Person", "name": "Rehan" },
    "description": "AI-powered developer assistant for rewriting text and generating conventional Git commits.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  };

  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }} />
      </head>
      <body className={`${raleway.className} text-white min-h-screen flex flex-col antialiased`}>
        {children}
      </body>
    </html>
  );
}