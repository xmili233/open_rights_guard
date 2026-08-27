"use client";

import {
  ArrowUpRight,
  Bell,
  Box,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Download,
  FileCheck2,
  Filter,
  HelpCircle,
  MoreHorizontal,
  PieChartIcon,
  Plus,
  RotateCcw,
  Search,
  ShoppingCart,
} from "lucide-react";
import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip as ShadTooltip,
  TooltipContent as ShadTooltipContent,
  TooltipProvider as ShadTooltipProvider,
  TooltipTrigger as ShadTooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type StatItem = {
  title: string;
  previousValue: number;
  value: number;
  changePercent: number;
  isPositive: boolean;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  format: "currency" | "number";
};

type SalesCategoryItem = {
  name: string;
  value: number;
  percent: number;
  color: string;
};

type RevenueFlowColors = {
  thisYear: string;
  prevYear: string;
};

type OrderStatus = "材料审核" | "待立案" | "审理中" | "已结案";

type Order = {
  id: string;
  orderNumber: string;
  customer: string;
  customerInitials: string;
  products: string[];
  productCount: number;
  status: OrderStatus;
  total: number;
  date: string;
};

const currencyFormatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("zh-CN");

const compactNumberFormatter = new Intl.NumberFormat("zh-CN", {
  notation: "compact",
  maximumFractionDigits: 0,
});

/**
 * Custom hook for hover highlight interaction.
 * Provides stable callback to prevent unnecessary re-renders in chart components.
 */
function useHoverHighlight<T extends string | number>() {
  const [active, setActive] = React.useState<T | null>(null);

  const handleHover = React.useCallback((value: T | null) => {
    setActive(value);
  }, []);

  return { active, handleHover };
}

const mixBase = "var(--background)";

const palette = {
  primary: "var(--primary)",
  secondary: {
    light: `color-mix(in oklch, var(--primary) 75%, ${mixBase})`,
    dark: `color-mix(in oklch, var(--primary) 85%, ${mixBase})`,
  },
  tertiary: {
    light: `color-mix(in oklch, var(--primary) 55%, ${mixBase})`,
    dark: `color-mix(in oklch, var(--primary) 65%, ${mixBase})`,
  },
  quaternary: {
    light: `color-mix(in oklch, var(--primary) 40%, ${mixBase})`,
    dark: `color-mix(in oklch, var(--primary) 45%, ${mixBase})`,
  },
};

const salesCategoryChartConfig = {
  cityLight: { label: "《城市光影》", color: palette.primary },
  mountainSea: { label: "《山海之间》", theme: palette.secondary },
  borderless: { label: "无界系列", theme: palette.tertiary },
  afterSunset: { label: "《日落之后》", theme: palette.quaternary },
} satisfies ChartConfig;

const revenueFlowChartConfig = {
  thisYear: { label: "本期发现", color: palette.primary },
  prevYear: { label: "已完成处置", theme: palette.secondary },
} satisfies ChartConfig;

const statsData: StatItem[] = [
  {
    title: "维护中的作品",
    previousValue: 3,
    value: 4,
    changePercent: 33.3,
    isPositive: true,
    icon: Box,
    format: "number",
  },
  {
    title: "今日新发现",
    previousValue: 21,
    value: 28,
    changePercent: 33.3,
    isPositive: true,
    icon: Search,
    format: "number",
  },
  {
    title: "诉讼进行中",
    previousValue: 5,
    value: 6,
    changePercent: 20,
    isPositive: true,
    icon: ClipboardList,
    format: "number",
  },
  {
    title: "本月已处置",
    previousValue: 34,
    value: 41,
    changePercent: 20.6,
    isPositive: true,
    icon: RotateCcw,
    format: "number",
  },
  {
    title: "待核验线索",
    previousValue: 9,
    value: 12,
    changePercent: 33.3,
    isPositive: true,
    icon: Filter,
    format: "number",
  },
  {
    title: "已固化证据",
    previousValue: 78,
    value: 96,
    changePercent: 23.1,
    isPositive: true,
    icon: FileCheck2,
    format: "number",
  },
];

const dailyTrendData = [
  { day: "8月14日", thisYear: 71, prevYear: 55 },
  { day: "8月15日", thisYear: 78, prevYear: 58 },
  { day: "8月16日", thisYear: 83, prevYear: 61 },
  { day: "8月17日", thisYear: 76, prevYear: 60 },
  { day: "8月18日", thisYear: 89, prevYear: 66 },
  { day: "8月19日", thisYear: 94, prevYear: 70 },
  { day: "8月20日", thisYear: 97, prevYear: 72 },
  { day: "8月21日", thisYear: 92, prevYear: 68 },
  { day: "8月22日", thisYear: 101, prevYear: 72 },
  { day: "8月23日", thisYear: 96, prevYear: 75 },
  { day: "8月24日", thisYear: 118, prevYear: 82 },
  { day: "8月25日", thisYear: 107, prevYear: 91 },
  { day: "8月26日", thisYear: 126, prevYear: 99 },
  { day: "8月27日", thisYear: 129, prevYear: 105 },
];

type TimePeriod = "7days" | "14days";

const periodLabels: Record<TimePeriod, string> = {
  "7days": "近 7 天",
  "14days": "近 14 天",
};

function getDataForPeriod(period: TimePeriod) {
  if (period === "7days") return dailyTrendData.slice(-7);
  return dailyTrendData;
}

const orderStatusData = {
  total: 18,
  processing: { count: 4, percent: 22.2 },
  shipped: { count: 8, percent: 44.5 },
  delivered: { count: 6, percent: 33.3 },
};

const salesCategoryData: SalesCategoryItem[] = [
  {
    name: "《城市光影》",
    value: 102,
    percent: 36,
    color: palette.primary,
  },
  {
    name: "《山海之间》",
    value: 74,
    percent: 26,
    color: `color-mix(in oklch, var(--primary) 80%, ${mixBase})`,
  },
  {
    name: "无界系列",
    value: 63,
    percent: 22,
    color: `color-mix(in oklch, var(--primary) 60%, ${mixBase})`,
  },
  {
    name: "《日落之后》",
    value: 45,
    percent: 16,
    color: `color-mix(in oklch, var(--primary) 42%, ${mixBase})`,
  },
];

const orderStatuses: OrderStatus[] = [
  "材料审核",
  "待立案",
  "审理中",
  "已结案",
];

const orders: Order[] = [
  {
    id: "1",
    orderNumber: "沪0115民初·0827",
    customer: "某电商店铺",
    customerInitials: "商",
    products: ["《城市光影》摄影作品"],
    productCount: 2,
    status: "审理中",
    total: 30000,
    date: "今天 10:24",
  },
  {
    id: "2",
    orderNumber: "京0491民初·1162",
    customer: "某内容聚合站",
    customerInitials: "站",
    products: ["《雨夜霓虹》摄影作品"],
    productCount: 2,
    status: "待立案",
    total: 18000,
    date: "今天 09:12",
  },
  {
    id: "3",
    orderNumber: "杭0192民初·0641",
    customer: "某短视频账号",
    customerInitials: "视",
    products: ["《山海之间》短片"],
    productCount: 3,
    status: "材料审核",
    total: 24000,
    date: "昨天 17:46",
  },
  {
    id: "4",
    orderNumber: "深0305民初·2398",
    customer: "某设计素材库",
    customerInitials: "素",
    products: ["无界系列插画"],
    productCount: 1,
    status: "已结案",
    total: 12000,
    date: "8月25日",
  },
  {
    id: "5",
    orderNumber: "沪0104民初·0914",
    customer: "某品牌公众号",
    customerInitials: "号",
    products: ["《看见上海》组照"],
    productCount: 1,
    status: "审理中",
    total: 36000,
    date: "8月24日",
  },
  {
    id: "6",
    orderNumber: "粤0304民初·1735",
    customer: "某流媒体频道",
    customerInitials: "流",
    products: ["《日落之后》纪录片"],
    productCount: 2,
    status: "待立案",
    total: 50000,
    date: "8月23日",
  },
  {
    id: "7",
    orderNumber: "苏0505民初·2214",
    customer: "某电商旗舰店",
    customerInitials: "商",
    products: ["《城市光影》摄影作品"],
    productCount: 1,
    status: "材料审核",
    total: 22000,
    date: "8月22日",
  },
  {
    id: "8",
    orderNumber: "京0108民初·1840",
    customer: "某知识分享平台",
    customerInitials: "知",
    products: ["《山海之间》短片"],
    productCount: 1,
    status: "审理中",
    total: 28000,
    date: "8月21日",
  },
  {
    id: "9",
    orderNumber: "川0107民初·0953",
    customer: "某图文自媒体",
    customerInitials: "图",
    products: ["无界系列插画"],
    productCount: 2,
    status: "已结案",
    total: 15000,
    date: "8月20日",
  },
  {
    id: "10",
    orderNumber: "浙0106民初·3172",
    customer: "某在线图库",
    customerInitials: "库",
    products: ["《日落之后》纪录片"],
    productCount: 1,
    status: "待立案",
    total: 42000,
    date: "8月19日",
  },
  {
    id: "11",
    orderNumber: "鄂0106民初·1418",
    customer: "某营销服务商",
    customerInitials: "营",
    products: ["《城市光影》摄影作品"],
    productCount: 1,
    status: "审理中",
    total: 26000,
    date: "8月18日",
  },
  {
    id: "12",
    orderNumber: "鲁0202民初·0876",
    customer: "某旅游内容号",
    customerInitials: "旅",
    products: ["《看见上海》组照"],
    productCount: 1,
    status: "材料审核",
    total: 16000,
    date: "8月17日",
  },
  {
    id: "13",
    orderNumber: "闽0203民初·2120",
    customer: "某电商商家",
    customerInitials: "店",
    products: ["无界系列插画"],
    productCount: 1,
    status: "待立案",
    total: 20000,
    date: "8月16日",
  },
  {
    id: "14",
    orderNumber: "湘0103民初·1695",
    customer: "某短视频矩阵",
    customerInitials: "短",
    products: ["《山海之间》短片"],
    productCount: 3,
    status: "已结案",
    total: 32000,
    date: "8月15日",
  },
  {
    id: "15",
    orderNumber: "津0101民初·0742",
    customer: "某品牌官网",
    customerInitials: "官",
    products: ["《城市光影》摄影作品"],
    productCount: 1,
    status: "审理中",
    total: 45000,
    date: "8月14日",
  },
  {
    id: "16",
    orderNumber: "陕0103民初·1288",
    customer: "某资讯客户端",
    customerInitials: "资",
    products: ["《日落之后》纪录片"],
    productCount: 2,
    status: "材料审核",
    total: 19000,
    date: "8月13日",
  },
  {
    id: "17",
    orderNumber: "渝0105民初·2036",
    customer: "某内容工作室",
    customerInitials: "内",
    products: ["《看见上海》组照"],
    productCount: 1,
    status: "待立案",
    total: 27000,
    date: "8月12日",
  },
  {
    id: "18",
    orderNumber: "辽0102民初·0964",
    customer: "某视频网站",
    customerInitials: "视",
    products: ["《山海之间》短片"],
    productCount: 1,
    status: "审理中",
    total: 38000,
    date: "8月11日",
  },
  {
    id: "19",
    orderNumber: "皖0104民初·1551",
    customer: "某素材下载站",
    customerInitials: "素",
    products: ["无界系列插画"],
    productCount: 2,
    status: "已结案",
    total: 14000,
    date: "8月10日",
  },
  {
    id: "20",
    orderNumber: "豫0105民初·1886",
    customer: "某摄影社区",
    customerInitials: "摄",
    products: ["《城市光影》摄影作品"],
    productCount: 1,
    status: "待立案",
    total: 23000,
    date: "8月9日",
  },
];

const DashboardHeader = () => {
  return (
    <header className="flex w-full items-center gap-3 border-b bg-background px-4 py-4 sm:px-6">
      <h1 className="text-xl font-semibold tracking-tight sm:text-[22px]">木林影像企业</h1>
      <div className="ml-auto flex items-center gap-2">
        <div className="relative w-full max-w-[220px] sm:max-w-[260px]">
          <Search
            className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            type="search"
            name="header-search"
            inputMode="search"
            autoComplete="off"
            aria-label="搜索工作台"
            placeholder="搜索作品、线索或案件…"
            className="h-9 w-full pr-14 pl-9 text-sm"
          />
          <kbd className="pointer-events-none absolute top-1/2 right-2 hidden -translate-y-1/2 rounded-md border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-flex">
            {"\u2318"}
            {"\u00a0"}K
          </kbd>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="size-9"
          aria-label="通知"
        >
          <Bell className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-9"
          aria-label="帮助"
        >
          <HelpCircle className="size-4" />
        </Button>
      </div>
    </header>
  );
};

const WelcomeSection = () => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
      <div>
        <p className="text-sm text-muted-foreground sm:text-base">
          <span className="font-medium text-foreground">上午好，林女士。</span>{" "}
          今天发现了{" "}
          <span className="font-medium text-foreground">28 条新线索</span>，
          <span className="font-medium text-foreground">6 个案件</span>正在推进
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 sm:h-9"
          aria-label="导出报告"
        >
          <Download className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">导出报告</span>
        </Button>
        <Button size="sm" className="h-8 gap-2 sm:h-9" aria-label="添加作品">
          <Plus className="size-4" aria-hidden="true" />
          <span className="hidden sm:inline">添加作品</span>
        </Button>
      </div>
    </div>
  );
};

const StatsCards = () => {
  return (
    <div className="rounded-xl border bg-card">
      <div className="grid grid-cols-1 divide-x-0 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-6 lg:divide-x">
        {statsData.map((stat) => {
          const formatter =
            stat.format === "currency" ? currencyFormatter : numberFormatter;

          return (
            <div key={stat.title} className="space-y-2 p-3 sm:p-4">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <stat.icon
                  className="size-4"
                  aria-hidden="true"
                />
                <span className="text-xs font-medium sm:text-sm">
                  {stat.title}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-xl font-semibold tracking-tight sm:text-2xl">
                  {formatter.format(stat.value)}
                </p>
                <div className="flex shrink-0 items-center gap-2 text-[10px] sm:text-xs">
                  <span
                    className={cn(
                      "font-medium",
                      stat.isPositive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400",
                    )}
                  >
                    {stat.isPositive ? "+" : "-"}
                    {stat.changePercent.toFixed(1)}%
                    <span className="hidden sm:inline">
                      ({formatter.format(Math.abs(stat.value - stat.previousValue))})
                    </span>
                  </span>
                  <span className="hidden items-center gap-2 text-muted-foreground sm:inline-flex">
                    <span className="size-1 rounded-full bg-muted-foreground" />
                    <span className="whitespace-nowrap">较昨日</span>
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const OrderStatusChart = () => {
  const { active: activeSegment, handleHover } = useHoverHighlight<number>();

  const orderStatusItems = [
    {
      key: "processing",
      label: "材料准备",
      ...orderStatusData.processing,
      color: palette.primary,
    },
    {
      key: "shipped",
      label: "法院受理",
      ...orderStatusData.shipped,
      color: palette.secondary.light,
    },
    {
      key: "delivered",
      label: "审理执行",
      ...orderStatusData.delivered,
      color: palette.tertiary.light,
    },
  ];

  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Button
            variant="outline"
            size="icon"
            className="size-7 sm:size-8"
            aria-label="案件状态"
          >
            <ShoppingCart className="size-4 text-muted-foreground sm:size-[18px]" />
          </Button>
          <div>
            <span className="text-sm font-medium sm:text-base">
              案件状态
            </span>
            <p className="text-[10px] text-muted-foreground sm:text-xs">
              本月共 {numberFormatter.format(orderStatusData.total)} 个案件
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 sm:size-8"
          aria-label="More options"
        >
          <MoreHorizontal className="size-4 text-muted-foreground" />
        </Button>
      </div>

      <div className="space-y-3">
        <div className="flex h-3 w-full overflow-hidden rounded-full sm:h-4">
          {orderStatusItems.map((item, index) => (
            <ShadTooltipProvider key={item.key}>
              <ShadTooltip>
                <ShadTooltipTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "h-full border-0 p-0 transition-opacity duration-200 motion-reduce:transition-none",
                      activeSegment !== null &&
                        activeSegment !== index &&
                        "opacity-40",
                    )}
                    style={{
                      width: `${item.percent}%`,
                      backgroundColor: item.color,
                    }}
                    onPointerEnter={() => handleHover(index)}
                    onPointerLeave={() => handleHover(null)}
                    onFocus={() => handleHover(index)}
                    onBlur={() => handleHover(null)}
                    aria-label={`${item.label}: ${numberFormatter.format(item.count)} orders (${item.percent}%)`}
                  />
                </ShadTooltipTrigger>
                <ShadTooltipContent
                  side="top"
                  sideOffset={8}
                  className="px-3 py-2"
                >
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.label}</span>
                      <span className="text-muted-foreground tabular-nums">
                        {item.percent}%
                      </span>
                    </div>
                    <span className="text-muted-foreground tabular-nums">
                      {numberFormatter.format(item.count)} 个案件
                    </span>
                  </div>
                </ShadTooltipContent>
              </ShadTooltip>
            </ShadTooltipProvider>
          ))}
        </div>

        <div className="flex items-center justify-between text-[10px] sm:text-xs">
          {orderStatusItems.map((item, index) => (
            <span
              key={item.key}
              className={cn(
                "text-muted-foreground tabular-nums transition-opacity duration-200 motion-reduce:transition-none",
                activeSegment !== null &&
                  activeSegment !== index &&
                  "opacity-40",
              )}
            >
              {item.percent}%
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          {orderStatusItems.map((item, index) => (
            <ShadTooltipProvider key={item.key}>
              <ShadTooltip>
                <ShadTooltipTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "flex items-center gap-1.5 border-0 bg-transparent p-0 transition-opacity duration-200 motion-reduce:transition-none",
                      activeSegment !== null &&
                        activeSegment !== index &&
                        "opacity-40",
                    )}
                    onPointerEnter={() => handleHover(index)}
                    onPointerLeave={() => handleHover(null)}
                    onFocus={() => handleHover(index)}
                    onBlur={() => handleHover(null)}
                  >
                    <span
                      className="size-2.5 rounded-full sm:size-3"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[10px] text-muted-foreground sm:text-xs">
                      {item.label}
                    </span>
                  </button>
                </ShadTooltipTrigger>
                <ShadTooltipContent
                  side="top"
                  sideOffset={8}
                  className="px-3 py-2"
                >
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <span
                        className="size-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.label}</span>
                      <span className="text-muted-foreground tabular-nums">
                        {item.percent}%
                      </span>
                    </div>
                    <span className="text-muted-foreground tabular-nums">
                      {numberFormatter.format(item.count)} 个案件
                    </span>
                  </div>
                </ShadTooltipContent>
              </ShadTooltip>
            </ShadTooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
};

const SalesByCategoryChart = () => {
  const { active: activeSlice, handleHover: setHoveredSlice } =
    useHoverHighlight<number>();
  const totalSales = salesCategoryData.reduce(
    (acc, item) => acc + item.value,
    0,
  );

  return (
    <div id="projects" className="flex flex-1 flex-col gap-4 rounded-xl border bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Button
            variant="outline"
            size="icon"
            className="size-7 sm:size-8"
            aria-label="维护项目"
          >
            <PieChartIcon className="size-4 text-muted-foreground sm:size-[18px]" />
          </Button>
          <div>
            <span className="text-sm font-medium sm:text-base">
              维护项目
            </span>
            <p className="flex items-center gap-1 text-[10px] text-muted-foreground sm:text-xs">
              <ArrowUpRight
                className="size-3 text-emerald-600"
                aria-hidden="true"
              />
              <span className="text-emerald-600">4 项</span>
              <span>持续监测中</span>
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 sm:size-8"
          aria-label="More options"
        >
          <MoreHorizontal className="size-4 text-muted-foreground" />
        </Button>
      </div>

      <div className="flex flex-1 items-center gap-4 sm:gap-6">
        <div className="relative size-[100px] shrink-0 sm:size-[120px]">
          <ChartContainer
            config={salesCategoryChartConfig}
            className="h-full w-full"
          >
            <PieChart>
              <Pie
                data={salesCategoryData}
                cx="50%"
                cy="50%"
                innerRadius="55%"
                outerRadius="90%"
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
                onMouseEnter={(_: unknown, index: number) =>
                  setHoveredSlice(index)
                }
                onMouseLeave={() => setHoveredSlice(null)}
              >
                {salesCategoryData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm font-semibold sm:text-base">
              {compactNumberFormatter.format(totalSales)}
            </span>
            <span className="text-[8px] text-muted-foreground sm:text-[10px]">
              线索
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 sm:gap-3">
          {salesCategoryData.map((item, index) => (
            <div
              key={item.name}
              className={cn(
                "flex items-center justify-between gap-2 transition-opacity duration-200 motion-reduce:transition-none",
                activeSlice !== null && activeSlice !== index && "opacity-50",
              )}
              onMouseEnter={() => setHoveredSlice(index)}
              onMouseLeave={() => setHoveredSlice(null)}
            >
              <div className="flex items-center gap-2">
                <div
                  className="size-2 rounded-full sm:size-2.5"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[10px] text-muted-foreground sm:text-xs">
                  {item.name}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-xs">
                <span className="font-medium tabular-nums">
                  {compactNumberFormatter.format(item.value)}
                </span>
                <span className="text-muted-foreground tabular-nums">
                  {item.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SideChartsSection = () => {
  return (
    <div className="flex w-full flex-col gap-4 xl:w-[410px]">
      <OrderStatusChart />
      <SalesByCategoryChart />
    </div>
  );
};

function CustomTooltip({
  active,
  payload,
  label,
  colors,
}: {
  active?: boolean;
  payload?: Array<{
    dataKey?: string | number;
    value?: number | string;
  }>;
  label?: string | number;
  colors: RevenueFlowColors;
}) {
  if (!active || !payload?.length) return null;

  const thisYear = payload.find((p) => p.dataKey === "thisYear")?.value || 0;
  const prevYear = payload.find((p) => p.dataKey === "prevYear")?.value || 0;
  const diff = Number(thisYear) - Number(prevYear);
  const percentage = prevYear ? Math.round((diff / Number(prevYear)) * 100) : 0;
  return (
    <div className="rounded-lg border border-border bg-popover p-2 shadow-lg sm:p-3">
      <p className="mb-1.5 text-xs font-medium text-foreground sm:mb-2 sm:text-sm">
        {label}
      </p>
      <div className="space-y-1 sm:space-y-1.5">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className="size-2 rounded-full sm:size-2.5"
            style={{ backgroundColor: colors.thisYear }}
          />
          <span className="text-[10px] text-muted-foreground sm:text-sm">
            本期发现：
          </span>
          <span className="text-[10px] font-medium text-foreground sm:text-sm">
            {numberFormatter.format(Number(thisYear))}
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className="size-2 rounded-full sm:size-2.5"
            style={{ backgroundColor: colors.prevYear }}
          />
          <span className="text-[10px] text-muted-foreground sm:text-sm">
            已处置：
          </span>
          <span className="text-[10px] font-medium text-foreground sm:text-sm">
            {numberFormatter.format(Number(prevYear))}
          </span>
        </div>
        <div className="mt-1 border-t border-border pt-1">
          <span
            className={cn(
              "text-[10px] font-medium sm:text-xs",
              diff >= 0 ? "text-emerald-500" : "text-red-500",
            )}
          >
            {diff >= 0 ? "+" : ""}
            {percentage}% 处置差值
          </span>
        </div>
      </div>
    </div>
  );
}

const RevenueFlowChart = () => {
  const [period, setPeriod] = React.useState<TimePeriod>("7days");
  const { active: activeSeries, handleHover } = useHoverHighlight<
    "thisYear" | "prevYear"
  >();

  const legendItems = [
    { key: "thisYear", label: "发现线索", color: palette.primary },
    { key: "prevYear", label: "完成处置", color: palette.secondary.light },
  ] as const;

  const chartData = getDataForPeriod(period);
  const totalRevenue = chartData.reduce((acc, item) => acc + item.thisYear, 0);

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4 rounded-xl border bg-card p-4 sm:gap-6 sm:p-6">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-xl leading-tight font-semibold tracking-tight sm:text-2xl">
            {numberFormatter.format(totalRevenue)} 条
          </p>
          <p className="text-xs text-muted-foreground">
            侵权线索趋势（{periodLabels[period]}）
          </p>
        </div>
        <div className="hidden items-center gap-3 sm:flex sm:gap-5">
          {legendItems.map((item) => (
            <div
              key={item.key}
              className={cn(
                "flex items-center gap-1.5 transition-opacity duration-200 motion-reduce:transition-none",
                activeSeries !== null &&
                  activeSeries !== item.key &&
                  "opacity-40",
              )}
              onMouseEnter={() => handleHover(item.key)}
              onMouseLeave={() => handleHover(null)}
            >
              <div
                className="size-2.5 rounded-full sm:size-3"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[10px] text-muted-foreground sm:text-xs">
                {item.label}
              </span>
            </div>
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 sm:size-8"
              aria-label="选择时间范围"
            >
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>时间范围</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(Object.keys(periodLabels) as TimePeriod[]).map((key) => (
              <DropdownMenuCheckboxItem
                key={key}
                checked={period === key}
                onCheckedChange={() => setPeriod(key)}
              >
                {periodLabels[key]}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="h-[200px] w-full min-w-0 sm:h-[240px] lg:h-[280px]">
        <ChartContainer
          config={revenueFlowChartConfig}
          className="h-full w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="thisYearGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-thisYear)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-thisYear)"
                  stopOpacity={0.05}
                />
              </linearGradient>
              <linearGradient id="prevYearGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-prevYear)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-prevYear)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              dx={-5}
              tickFormatter={(value) => compactNumberFormatter.format(value)}
              width={40}
            />
            <Tooltip
              content={
                <CustomTooltip
                  colors={{
                    thisYear: "var(--color-thisYear)",
                    prevYear: "var(--color-prevYear)",
                  }}
                />
              }
              cursor={{ strokeOpacity: 0.2 }}
            />
            <Area
              type="monotone"
              dataKey="thisYear"
              stroke="var(--color-thisYear)"
              strokeWidth={activeSeries === "thisYear" ? 3 : 2}
              fill="url(#thisYearGradient)"
              fillOpacity={
                activeSeries === null || activeSeries === "thisYear" ? 1 : 0.3
              }
              strokeOpacity={
                activeSeries === null || activeSeries === "thisYear" ? 1 : 0.3
              }
            />
            <Area
              type="monotone"
              dataKey="prevYear"
              stroke="var(--color-prevYear)"
              strokeWidth={activeSeries === "prevYear" ? 3 : 2}
              fill="url(#prevYearGradient)"
              fillOpacity={
                activeSeries === null || activeSeries === "prevYear" ? 1 : 0.3
              }
              strokeOpacity={
                activeSeries === null || activeSeries === "prevYear" ? 1 : 0.3
              }
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
};

const statusStyles: Record<OrderStatus, string> = {
  材料审核: "bg-neutral-100 text-neutral-600 ring-1 ring-inset ring-neutral-300",
  待立案: "bg-neutral-200 text-neutral-700 ring-1 ring-inset ring-neutral-300",
  审理中: "bg-neutral-900 text-white ring-1 ring-inset ring-black",
  已结案: "bg-white text-neutral-500 ring-1 ring-inset ring-neutral-300",
};

const statusDescriptions: Record<OrderStatus, string> = {
  材料审核: "Agent 正在核验权利证明、侵权主体与证据目录。",
  待立案: "起诉材料已生成并投递，正在等待法院受理。",
  审理中: "法院已受理案件，Agent 正在持续跟进审理节点。",
  已结案: "案件已经完成审理或执行，相关材料均已归档。",
};

const caseStages = [
  "证据固化",
  "起诉材料",
  "立案受理",
  "审理裁判",
  "执行结案",
] as const;

const statusStageIndex: Record<OrderStatus, number> = {
  材料审核: 0,
  待立案: 1,
  审理中: 3,
  已结案: 4,
};

const CaseDetailsDialog = ({
  order,
  onOpenChange,
}: {
  order: Order | null;
  onOpenChange: (open: boolean) => void;
}) => {
  const activeStage = order ? statusStageIndex[order.status] : 0;

  return (
    <Dialog open={order !== null} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle className="text-lg">案件详情</DialogTitle>
          <DialogDescription>{order?.orderNumber}</DialogDescription>
        </DialogHeader>

        {order && (
          <div className="border-b px-6 py-5">
            <ol className="grid grid-cols-5" aria-label="案件处理进度">
              {caseStages.map((stage, index) => (
                <li
                  key={stage}
                  className="relative flex min-w-0 flex-col items-center gap-2 text-center"
                >
                  {index > 0 && (
                    <span
                      className={cn(
                        "absolute top-3 right-1/2 h-px w-full",
                        index <= activeStage ? "bg-primary" : "bg-border",
                      )}
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10 grid size-6 place-items-center rounded-full border bg-background text-[10px] font-medium",
                      index <= activeStage &&
                        "border-primary bg-primary text-primary-foreground",
                    )}
                  >
                    {index + 1}
                  </span>
                  <span
                    className={cn(
                      "truncate text-[10px] text-muted-foreground sm:text-xs",
                      index === activeStage && "font-medium text-foreground",
                    )}
                  >
                    {stage}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {order && (
          <div className="grid min-h-0 gap-6 overflow-y-auto px-6 pb-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
            <div className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="text-xs text-muted-foreground">当前进度</p>
                <p className="mt-1 text-sm font-medium">{order.status}</p>
              </div>
              <span
                className={cn(
                  "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium",
                  statusStyles[order.status],
                )}
              >
                {order.status}
              </span>
            </div>

            <dl className="divide-y rounded-lg border px-4">
              {[
                ["侵权主体", order.customer],
                ["维护作品", order.products.join("、")],
                ["请求金额", currencyFormatter.format(order.total)],
                ["关联内容", `${order.productCount} 项`],
                ["更新时间", order.date],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-6 py-3 text-sm">
                  <dt className="shrink-0 text-muted-foreground">{label}</dt>
                  <dd className="text-right font-medium">{value}</dd>
                </div>
              ))}
            </dl>
            </div>

            <section className="rounded-lg border p-5">
              <h3 className="text-sm font-medium">Agent 进展</h3>
              <p className="mt-3 rounded-lg bg-muted p-4 text-sm leading-6 text-muted-foreground">
                {statusDescriptions[order.status]}
              </p>
              <div className="mt-5 space-y-4 border-l pl-4 text-sm">
                <div>
                  <p className="font-medium">最新节点</p>
                  <p className="mt-1 text-muted-foreground">{order.date} · {order.status}</p>
                </div>
                <div>
                  <p className="font-medium">材料状态</p>
                  <p className="mt-1 text-muted-foreground">权利证明、侵权证据和主体信息均已归档</p>
                </div>
              </div>
            </section>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const RecentTransactionsTable = ({ className }: { className?: string }) => {
  const [statusFilter, setStatusFilter] = React.useState<OrderStatus | "all">(
    "all",
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const pageSize = 20;

  const filteredOrders = React.useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter((order) => order.status === statusFilter);
  }, [statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));

  const paginatedOrders = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredOrders.slice(startIndex, startIndex + pageSize);
  }, [filteredOrders, currentPage, pageSize]);

  const selectStatus = (status: OrderStatus | "all") => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const startRow = filteredOrders.length ? (currentPage - 1) * pageSize + 1 : 0;
  const endRow = Math.min(currentPage * pageSize, filteredOrders.length);

  return (
    <div id="cases" className={cn("rounded-xl border bg-card", className)}>
      <div className="flex items-center justify-between gap-3 px-4 pt-4 sm:px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="size-7 shrink-0 sm:size-8"
            aria-label="最新诉讼进度"
          >
            <ClipboardList className="size-4 text-muted-foreground sm:size-[18px]" />
          </Button>
          <span className="text-sm font-medium sm:text-base">
            最新诉讼进度
          </span>
          <span className="ml-1 inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-[10px] font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset sm:text-xs dark:bg-gray-800/50 dark:text-gray-400 dark:ring-gray-400/20">
            {filteredOrders.length}
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 gap-1.5 sm:h-9 sm:gap-2"
            >
              <Filter className="size-3.5 sm:size-4" aria-hidden="true" />
              <span className="hidden sm:inline">筛选</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
            <DropdownMenuLabel>按状态筛选</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={statusFilter === "all"}
              onCheckedChange={() => selectStatus("all")}
            >
              全部状态
            </DropdownMenuCheckboxItem>
            {orderStatuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={statusFilter === status}
                onCheckedChange={() => selectStatus(status)}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="px-4 pt-3 pb-4 sm:px-6">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="text-xs font-medium text-muted-foreground sm:text-sm">
                案件编号
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground sm:text-sm">
                侵权主体
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground sm:text-sm">
                请求金额
              </TableHead>
              <TableHead className="text-xs font-medium text-muted-foreground sm:text-sm">
                最新进度
              </TableHead>
              <TableHead className="w-20 text-left text-xs font-medium text-muted-foreground sm:text-sm">
                详情
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedOrders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-20 text-center text-sm text-muted-foreground"
                >
                  暂无符合条件的案件
                </TableCell>
              </TableRow>
            ) : (
              paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="text-xs font-medium text-muted-foreground sm:text-sm">
                    {order.orderNumber}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground sm:text-sm">
                    {order.customer}
                  </TableCell>
                  <TableCell className="text-xs text-foreground tabular-nums sm:text-sm">
                    {currencyFormatter.format(order.total)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-md px-2 py-1 text-[10px] font-medium sm:text-xs",
                        statusStyles[order.status],
                      )}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-left">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1 px-2"
                      onClick={() => setSelectedOrder(order)}
                      aria-label={`查看案件 ${order.orderNumber} 详情`}
                    >
                      查看
                      <ChevronRight className="size-3.5" aria-hidden="true" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between border-t px-4 py-3 text-[10px] text-muted-foreground sm:px-6 sm:text-xs">
        <span>
          {startRow}-{endRow} of {filteredOrders.length}
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            className="size-7"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="size-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="size-7"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            <ChevronRight className="size-3.5" />
          </Button>
        </div>
      </div>
      <CaseDetailsDialog
        order={selectedOrder}
        onOpenChange={(open) => {
          if (!open) setSelectedOrder(null);
        }}
      />
    </div>
  );
};

const DashboardContent = () => {
  return (
    <main
      id="dashboard-main"
      tabIndex={-1}
      className="w-full flex-1 space-y-4 overflow-auto bg-background p-3 sm:space-y-6 sm:p-4 md:p-6"
    >
      <WelcomeSection />
      <StatsCards />
      <div className="flex flex-col gap-4 sm:gap-6 xl:flex-row">
        <RevenueFlowChart />
        <SideChartsSection />
      </div>
      <RecentTransactionsTable />
    </main>
  );
};

const Dashboard5 = ({ className }: { className?: string }) => {
  return (
    <ShadTooltipProvider>
      <div className={cn("h-svh w-full overflow-hidden bg-background", className)}>
        <a
          href="#dashboard-main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:text-sm focus:text-foreground focus:ring-2 focus:ring-ring"
        >
          跳到主要内容
        </a>
        <div className="flex h-full w-full flex-col items-center justify-start overflow-hidden bg-background">
          <DashboardHeader />
          <DashboardContent />
        </div>
      </div>
    </ShadTooltipProvider>
  );
};

export { Dashboard5 };
