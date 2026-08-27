"use client";

import { Check, Lock } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Pricing28Plan {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  description: { monthly: string; yearly: string };
  buttonText: string;
  buttonUrl: string;
  features: string[];
  tagline: string;
  highlighted?: boolean;
  highlightedLabel?: string;
}

interface Pricing28Props {
  heading: string;
  plans: Pricing28Plan[];
  className?: string;
}

function Pricing28({ heading, plans, className }: Pricing28Props) {
  const [isAnnually, setIsAnnually] = useState(false);

  return (
    <section className={cn("py-24 md:py-32", className)}>
      <div className="container mx-auto px-4 md:px-0">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-4xl font-semibold tracking-tight lg:text-5xl">
            {heading}
          </h2>
        </div>

        <div className="mx-auto mb-12 flex max-w-3xl flex-col items-center justify-center gap-4 text-center sm:flex-row sm:text-left">
          <div className="relative mr-12 flex items-center">
            {[1, 2, 3].map((avatar, index) => (
              <Avatar
                key={avatar}
                className={cn(
                  "size-8 border border-primary",
                  index > 0 && "absolute",
                  index === 1 && "left-6",
                  index === 2 && "left-12",
                )}
              >
                <AvatarImage src={`https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-${avatar}.webp`} />
                <AvatarFallback>用户</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="flex flex-col items-center gap-3 text-sm font-medium sm:flex-row sm:gap-4">
            <span>已有 2,000+ 创作者与品牌使用</span>
            <div className="hidden h-8 w-px bg-border sm:block" />
            <span>可随时升级或取消</span>
          </div>
        </div>

        <div className="flex justify-center">
          <Tabs
            defaultValue="monthly"
            onValueChange={(value) => setIsAnnually(value === "annually")}
          >
            <TabsList>
              <TabsTrigger value="monthly">月付</TabsTrigger>
              <TabsTrigger value="annually">
                <span className="inline-flex items-center gap-1">
                  年付
                  <Badge variant="outline" className="bg-primary px-1.5 text-secondary">
                    省 20%
                  </Badge>
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-10 grid gap-2 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="rounded-2xl border p-6">
              <div className="flex h-full flex-col justify-between gap-5">
                <div>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h3 className="text-xl">{plan.name}</h3>
                    {plan.highlighted && (
                      <Badge>{plan.highlightedLabel ?? "推荐"}</Badge>
                    )}
                  </div>
                  <div className="mb-2 flex items-end gap-2">
                    <span className="text-5xl font-semibold tracking-tight">
                      {isAnnually ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="pb-1 text-muted-foreground">
                      {isAnnually ? "/年" : "/月"}
                    </span>
                  </div>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help border-b border-dashed border-muted-foreground text-sm">
                          {plan.tagline}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        {isAnnually ? plan.description.yearly : plan.description.monthly}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <Button className="mt-6 w-full rounded-full" asChild>
                    <a href={plan.buttonUrl}>{plan.buttonText}</a>
                  </Button>
                  <div className="mt-6">
                    <h4 className="mb-3 text-sm font-medium text-muted-foreground">
                      套餐包含
                    </h4>
                    <ul className="flex flex-col gap-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-2 text-sm">
                          <Check className="mt-0.5 size-4 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center text-muted-foreground">
          <Lock className="size-4" />
          <span className="ml-2 text-sm">安全支付 · 套餐可随时升级</span>
        </div>
      </div>
    </section>
  );
}

export { Pricing28 };
