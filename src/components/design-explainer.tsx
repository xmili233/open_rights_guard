"use client"

import { Bot, Layers3, MessageCircleQuestion, MoveRight, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const decisions = [
  {
    title: "先讲结果，不先讲技术",
    description: "首屏直接承诺“全权维护”，让用户先理解得到什么，再了解 Agent 如何完成。",
  },
  {
    title: "用流动平台建立覆盖感",
    description: "渠道不是静态清单，而是一条持续运行的网络，呼应 7×24 小时巡检。",
  },
  {
    title: "把法律能力变成可见文档",
    description: "起诉状、证据目录和投递按钮让抽象的“法律知识库”变成具体交付物。",
  },
  {
    title: "最后展示托管式控制台",
    description: "用户看到进度和结果，Agent 负责下一步执行，强化“只需查看”的产品心智。",
  },
]

export function DesignExplainer() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="查看页面设计说明"
          className="fixed bottom-5 right-5 z-50 size-13 rounded-2xl border border-white/20 bg-zinc-950 text-lime-300 shadow-[0_18px_50px_-14px_rgba(24,24,27,0.8)] hover:bg-zinc-800 sm:bottom-7 sm:right-7"
          size="icon"
        >
          <MessageCircleQuestion className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[92vw] overflow-y-auto border-l-zinc-200 bg-[#f7f8f4] p-0 sm:max-w-md">
        <SheetHeader className="border-b border-zinc-200 bg-white p-6 pr-14 text-left">
          <span className="mb-3 grid size-10 place-items-center rounded-xl bg-zinc-950 text-lime-300">
            <Sparkles className="size-5" />
          </span>
          <SheetTitle className="text-2xl tracking-tight">为什么这个页面这样设计？</SheetTitle>
          <SheetDescription className="mt-2 leading-6">
            这个入口会存在于每个页面，帮助访客理解产品表达和关键设计判断。
          </SheetDescription>
        </SheetHeader>
        <div className="p-6">
          <div className="mb-7 flex items-center gap-3 rounded-2xl border border-lime-300 bg-lime-200/60 p-4 text-sm leading-6 text-zinc-700">
            <Bot className="size-5 shrink-0 text-zinc-950" />
            页面结构遵循一条路径：承诺结果 → 证明覆盖 → 展示交付 → 托管执行。
          </div>
          <div className="space-y-6">
            {decisions.map((decision, index) => (
              <div className="flex gap-4" key={decision.title}>
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-zinc-300 bg-white text-xs font-semibold">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-medium">{decision.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">{decision.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="my-7 h-px bg-zinc-200" />
          <div className="rounded-2xl bg-zinc-950 p-5 text-white">
            <div className="flex items-center gap-2 text-sm font-medium"><Layers3 className="size-4 text-lime-300" /> 视觉原则</div>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              大留白、低噪声、单一荧光绿强调色。界面像一套高效工作系统，而不是传统律所宣传页。
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-lime-300">现代 · 简约 · 高效 <MoveRight className="size-3.5" /></div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
