"use client";

import {
  type AppendMessage,
  AssistantRuntimeProvider,
  ComposerPrimitive,
  MessagePrimitive,
  type ThreadMessageLike,
  ThreadPrimitive,
  useExternalStoreRuntime,
} from "@assistant-ui/react";
import { ArrowUp, Sparkles, X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
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
  const [messages, setMessages] = React.useState(initialMessages);
  const [isRunning, setIsRunning] = React.useState(false);

  const onNew = async (message: AppendMessage) => {
    const text = message.content.find((part) => part.type === "text")?.text;
    if (!text?.trim()) return;

    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: "user", content: text.trim() },
    ]);
    setIsRunning(true);
    await new Promise((resolve) => setTimeout(resolve, 350));
    setMessages((current) => [
      ...current,
      {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          "收到。我会按你的要求重新检查并补充材料。完成后，新增或修改的文件会直接更新在右侧列表。",
      },
    ]);
    setIsRunning(false);
  };

  const runtime = useExternalStoreRuntime({
    messages,
    isRunning,
    convertMessage,
    onNew,
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}

export function CaseAgentChat({
  className,
  onClose,
}: {
  className?: string;
  onClose: () => void;
}) {
  return (
    <CaseAgentRuntime>
      <ThreadPrimitive.Root
        className={cn("flex min-h-0 flex-col bg-background", className)}
      >
        <header className="flex items-center justify-between border-b px-4 py-3">
          <div>
            <p className="text-sm font-semibold">材料助手</p>
            <p className="mt-0.5 text-[11px] text-muted-foreground">
              仅处理当前案件材料
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="关闭材料助手"
          >
            <X className="size-4" />
          </Button>
        </header>

        <ThreadPrimitive.Viewport
          autoScroll
          className="min-h-0 flex-1 overflow-y-auto py-2"
        >
          <ThreadPrimitive.Messages>
            {({ message }) =>
              message.role === "user" ? <UserMessage /> : <AssistantMessage />
            }
          </ThreadPrimitive.Messages>
        </ThreadPrimitive.Viewport>

        <div className="border-t p-3">
          <ComposerPrimitive.Root className="flex items-end gap-2 rounded-2xl border bg-background p-2 shadow-xs focus-within:ring-2 focus-within:ring-ring/30">
            <ComposerPrimitive.Input
              placeholder="描述需要补充或修改的材料…"
              rows={1}
              className="max-h-28 min-h-9 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
            />
            <ComposerPrimitive.Send className="grid size-8 shrink-0 place-items-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-30">
              <ArrowUp className="size-4" />
              <span className="sr-only">发送</span>
            </ComposerPrimitive.Send>
          </ComposerPrimitive.Root>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            演示模式 · 不会提交真实材料
          </p>
        </div>
      </ThreadPrimitive.Root>
    </CaseAgentRuntime>
  );
}
