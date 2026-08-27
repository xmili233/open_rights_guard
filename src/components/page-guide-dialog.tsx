"use client";

import { BookOpenText } from "lucide-react";
import * as React from "react";
import Markdown from "react-markdown";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const sections = ["页面目标", "信息结构", "交互原则"];

const guide = `
## 页面目标

仪表板把版权维护、侵权发现和诉讼进度集中在同一个页面，帮助用户快速判断今天最需要关注的事项。

## 信息结构

页面从整体指标开始，再展示近七天趋势，最后落到具体案件。信息由概览逐步进入细节，减少来回查找。

## 交互原则

用户只需要查看结果并在必要时作出判断。证据固化、材料准备和进度跟踪由 Agent 持续执行。
`;

export function PageGuideDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        type="button"
        size="sm"
        className="h-9 rounded-full px-3 shadow-sm"
        aria-label="查看页面设计说明"
        onClick={() => setOpen(true)}
      >
        <BookOpenText className="size-4" />
        <span className="hidden sm:inline">页面说明</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-[min(720px,calc(100vh-2rem))] max-w-5xl p-0">
          <DialogHeader className="border-b px-7 py-5 pr-12">
            <DialogTitle className="text-lg">仪表板设计说明</DialogTitle>
            <DialogDescription>
              了解这个页面的内容层级与使用方式
            </DialogDescription>
          </DialogHeader>

          <div className="grid min-h-0 flex-1 grid-cols-[200px_minmax(0,1fr)]">
            <nav className="border-r bg-muted/20 p-5" aria-label="文章目录">
              <p className="mb-3 text-xs font-medium text-muted-foreground">
                本页内容
              </p>
              <ol className="space-y-1">
                {sections.map((section, index) => (
                  <li key={section}>
                    <a
                      href={`#${section}`}
                      className="flex items-center gap-3 rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="text-xs tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <article className="overflow-y-auto px-10 py-8">
              <Markdown
                components={{
                  h2: ({ children }) => (
                    <h2
                      id={String(children)}
                      className="scroll-mt-8 pt-8 text-xl font-semibold tracking-tight first:pt-0"
                    >
                      {children}
                    </h2>
                  ),
                  p: ({ children }) => (
                    <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground">
                      {children}
                    </p>
                  ),
                }}
              >
                {guide}
              </Markdown>
            </article>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
