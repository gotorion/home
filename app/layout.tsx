import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
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
        className={`${playfairDisplay.variable} ${sourceSerif.variable} antialiased`}
      >
        <header className="border-b border-black/6 bg-transparent dark:border-white/6">
          <div className="mx-auto nav-container px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <Link
              href="/"
              className="flex items-center gap-3 text-2xl lg:text-3xl font-bold text-shadow-lg"
            >
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden">
                <Image
                  src="/avatar.png"
                  alt="Jimmy的头像"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              Jimmy
            </Link>
            <nav className="flex flex-wrap gap-3 text-sm">
              <a href="#about" className="hover:underline">
                关于我
              </a>
              <a href="#contact" className="hover:underline">
                联系
              </a>
            </nav>
          </div>
        </header>

        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
