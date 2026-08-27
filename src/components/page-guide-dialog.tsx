"use client";

import { BookOpenText } from "lucide-react";
import * as React from "react";
import Markdown from "react-markdown";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const sections = ["页面目标", "信息结构", "交互原则"];

const guide = `
# 仪表板为什么这样设计

Open Rights Guard 将版权维护的关键结果集中在一处，让复杂的执行过程变成清晰、可查看的进展。

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
          <DialogTitle className="sr-only">仪表板设计说明</DialogTitle>

          <div className="grid min-h-0 flex-1 lg:grid-cols-[minmax(0,1fr)_220px]">
            <article className="overflow-y-auto px-8 py-10 sm:px-12 lg:px-14">
              <Markdown
                components={{
                  h1: ({ children }) => (
                    <h1 className="max-w-2xl pr-8 text-3xl font-semibold tracking-tight sm:text-4xl">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2
                      id={String(children)}
                      className="scroll-mt-8 pt-10 text-xl font-semibold tracking-tight"
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

            <aside className="hidden border-l bg-muted/10 px-6 py-10 lg:block">
              <nav className="sticky top-0" aria-label="文章目录">
                <p className="mb-4 text-xs font-medium text-muted-foreground">
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
            </aside>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
