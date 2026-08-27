import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Open Rights Guard｜AI 数字版权守护者",
  description: "从全网巡检、证据固定到法律材料生成与进度追踪，由 AI Agent 持续维护您的数字版权。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <div className="flex min-h-full w-full flex-col portrait:hidden">
          {children}
        </div>
        <div
          className="fixed inset-0 z-[100] hidden items-center justify-center bg-black px-8 text-center text-white portrait:flex"
          role="alert"
        >
          <div className="max-w-md">
            <p className="text-2xl font-medium tracking-tight">
              当前窗口不适合浏览
            </p>
            <p className="mt-4 text-sm leading-7 text-white/65">
              检测到当前窗口高度大于宽度。为了获得最佳体验，请使用电脑访问，或将手机旋转至横屏后继续查看。
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
