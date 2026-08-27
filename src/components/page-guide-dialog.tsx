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

const subscribeToStorage = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
};

const getServerUnread = () => false;
const subscribeToWindowContext = () => () => {};
const getIsTopLevelPage = () => window.self === window.top;

export function PageGuideDialog({
  guide,
  storageKey,
}: {
  guide: string;
  storageKey: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [readInSession, setReadInSession] = React.useState(false);
  const isTopLevelPage = React.useSyncExternalStore(
    subscribeToWindowContext,
    getIsTopLevelPage,
    () => false,
  );
  const getUnread = React.useCallback(() => {
    try {
      return window.localStorage.getItem(storageKey) !== "read";
    } catch {
      return true;
    }
  }, [storageKey]);
  const storedUnread = React.useSyncExternalStore(
    subscribeToStorage,
    getUnread,
    getServerUnread,
  );
  const unread = storedUnread && !readInSession;
  const sections = Array.from(
    guide.matchAll(/^##\s+(.+)$/gm),
    (match) => match[1].trim(),
  );

  if (!isTopLevelPage) return null;

  const openGuide = () => {
    try {
      window.localStorage.setItem(storageKey, "read");
    } catch {
      // The dialog still works when browser storage is unavailable.
    }
    setReadInSession(true);
    setOpen(true);
  };

  return (
    <>
      <Button
        type="button"
        size="icon"
        className="fixed right-5 bottom-5 z-40 size-12 rounded-full shadow-lg sm:right-6 sm:bottom-6"
        aria-label={unread ? "查看未读的页面设计说明" : "查看页面设计说明"}
        title="页面说明"
        onClick={openGuide}
      >
        <BookOpenText className={`size-5 ${unread ? "guide-unread-spin" : ""}`} />
        {unread && (
          <span
            data-guide-unread-dot
            className="absolute top-0 right-0 size-3 rounded-full border-2 border-background bg-red-500"
            aria-hidden="true"
          />
        )}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-[min(960px,calc(100vh-1.5rem))] max-w-5xl p-0">
          <DialogTitle className="sr-only">页面设计说明</DialogTitle>

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
                  h3: ({ children }) => (
                    <h3 className="max-w-2xl pt-7 text-base font-semibold tracking-tight">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted-foreground">
                      {children}
                    </p>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="mt-5 max-w-2xl border-l-2 border-foreground/20 pl-4 [&>p]:mt-0 [&>p]:text-sm [&>p]:leading-6">
                      {children}
                    </blockquote>
                  ),
                  ul: ({ children }) => (
                    <ul className="mt-3 max-w-2xl list-disc space-y-2 pl-5">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mt-3 max-w-2xl list-decimal space-y-2 pl-5">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="text-[15px] leading-7 text-muted-foreground">
                      {children}
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">
                      {children}
                    </strong>
                  ),
                }}
              >
                {guide}
              </Markdown>
            </article>

            <aside className="hidden bg-muted/10 px-6 py-10 lg:block">
              <nav className="sticky top-0" aria-label="文章目录">
                <p className="mb-4 text-xs font-medium text-muted-foreground">
                  本页内容
                </p>
                <ol className="space-y-1">
                  {sections.map((section) => (
                    <li key={section}>
                      <a
                        href={`#${section}`}
                        className="block rounded-md px-2 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
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
