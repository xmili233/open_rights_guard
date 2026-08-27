"use client";

import {
  AssistantRuntimeProvider,
  ComposerPrimitive,
  MessagePrimitive,
  type ThreadMessageLike,
  ThreadPrimitive,
  useExternalStoreRuntime,
} from "@assistant-ui/react";
import { AudioLines, Mic, Plus, Sparkles } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

type DemoMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const initialMessages: DemoMessage[] = [
  {
    id: "demo-1",
    role: "assistant",
    content:
      "我已检查当前环节的 12 项证据。商品页、销售记录和店铺主体信息均已完成固化。",
  },
  {
    id: "demo-2",
    role: "user",
    content: "销售记录截图不够完整，请补充近 30 天销量和评价页面。",
  },
  {
    id: "demo-3",
    role: "assistant",
    content:
      "可以。我会补充近 30 天销量、评价页和对应时间戳，并保留当前证据。补充完成后，新文件会直接出现在右侧列表。",
  },
];

const convertMessage = (message: DemoMessage): ThreadMessageLike => ({
  id: message.id,
  role: message.role,
  content: [{ type: "text", text: message.content }],
});

const UserMessage = () => (
  <MessagePrimitive.Root className="flex justify-end px-4 py-2">
    <div className="max-w-[85%] rounded-2xl bg-neutral-900 px-3.5 py-2.5 text-sm leading-5 text-white">
      <MessagePrimitive.Content />
    </div>
  </MessagePrimitive.Root>
);

const AssistantMessage = () => (
  <MessagePrimitive.Root className="flex gap-3 px-4 py-3">
    <div className="grid size-7 shrink-0 place-items-center rounded-full bg-neutral-900 text-white">
      <Sparkles className="size-3.5" />
    </div>
    <div className="min-w-0 flex-1 pt-1 text-sm leading-6 text-foreground">
      <MessagePrimitive.Content />
    </div>
  </MessagePrimitive.Root>
);

function CaseAgentRuntime({ children }: { children: React.ReactNode }) {
  const runtime = useExternalStoreRuntime({
    messages: initialMessages,
    convertMessage,
    onNew: async () => {},
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}

export function CaseAgentChat({
  className,
}: {
  className?: string;
}) {
  return (
    <CaseAgentRuntime>
      <ThreadPrimitive.Root
        className={cn(
          "relative flex min-h-0 flex-col overflow-hidden bg-background",
          className,
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 grid place-items-center overflow-hidden"
        >
          <span className="-rotate-12 select-none text-4xl font-semibold tracking-[0.28em] text-foreground/[0.045]">
            演示模式
          </span>
        </div>

        <ThreadPrimitive.Viewport
          autoScroll
          className="relative z-10 min-h-0 flex-1 overflow-y-auto py-2"
        >
          <ThreadPrimitive.Messages>
            {({ message }) =>
              message.role === "user" ? <UserMessage /> : <AssistantMessage />
            }
          </ThreadPrimitive.Messages>
        </ThreadPrimitive.Viewport>

        <div className="relative z-10 bg-background px-4 pt-3 pb-4">
          <ComposerPrimitive.Root className="flex h-14 items-center gap-1 rounded-full border bg-background px-2 shadow-xs focus-within:ring-2 focus-within:ring-ring/30">
            <button
              type="button"
              className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="添加附件"
            >
              <Plus className="size-4" />
            </button>
            <ComposerPrimitive.Input
              placeholder="Ask anything"
              rows={1}
              submitMode="none"
              className="max-h-10 min-h-10 flex-1 resize-none bg-transparent px-1 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              className="grid size-9 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="语音输入"
            >
              <Mic className="size-4" />
            </button>
            <button
              type="button"
              className="grid size-10 shrink-0 place-items-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-neutral-700"
              aria-label="开始语音对话"
            >
              <AudioLines className="size-5" />
            </button>
          </ComposerPrimitive.Root>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            AI 可能会出错，请核对重要信息。
          </p>
        </div>
      </ThreadPrimitive.Root>
    </CaseAgentRuntime>
  );
}
