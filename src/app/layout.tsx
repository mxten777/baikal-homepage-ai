import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BAIKAL Public CMS",
    template: "%s | BAIKAL Public CMS",
  },
  description: "공공기관 홈페이지 통합 관리 시스템",
  keywords: ["공공기관", "CMS", "홈페이지", "관리시스템", "BAIKAL"],
  authors: [{ name: "BAIKAL AI" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "BAIKAL Public CMS",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased bg-white text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
