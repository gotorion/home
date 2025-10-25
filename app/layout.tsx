import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jimmy - 个人主页",
  description: "欢迎来到我的个人主页，这里展示我的项目、技能和联系方式",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b border-black/6 bg-transparent dark:border-white/6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <Link href="/" className="text-lg font-semibold">
              Jimmy
            </Link>
            <nav className="flex flex-wrap gap-3 text-sm">
              <a href="#about" className="hover:underline">
                关于我
              </a>
              <a href="#skills" className="hover:underline">
                技能
              </a>
              <a href="#projects" className="hover:underline">
                项目
              </a>
              <a href="#roadmap" className="hover:underline">
                路线图
              </a>
              <a href="#contact" className="hover:underline">
                联系
              </a>
            </nav>
          </div>
        </header>

  <main className="w-full">
    <div className="floating-container">
      {children}
    </div>
  </main>
      </body>
    </html>
  );
}
