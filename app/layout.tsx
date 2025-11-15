import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/context/LanguageContext";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Transaction Séance - Blockchain Archaeology",
  description: "Invoke the spirits of forgotten transactions on Base. Each ghost is unique and based on real blockchain data.",

  // Farcaster Frame metadata
  openGraph: {
    title: "Transaction Séance",
    description: "Invoke the spirits of forgotten transactions on Base",
    images: ["/api/og"],
  },
  other: {
    // Farcaster Mini App metadata (nueva especificación)
    'fc:miniapp': JSON.stringify({
      version: "1",
      image: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og`,
      button: {
        title: "🕯️ Invoke Spirit",
        action: {
          type: "launch_miniapp",
          url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
          name: "Transaction Séance",
          splashImageUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/splash`,
          splashBackgroundColor: "#1a0b2e"
        }
      }
    }),
    // Mantener fc:frame para compatibilidad con apps antiguas
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/og`,
    'fc:frame:button:1': '🕯️ Invoke Spirit',
    'fc:frame:button:1:action': 'post',
    'fc:frame:post_url': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/frame`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#1a0b2e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </Providers>
      </body>
    </html>
  );
}
