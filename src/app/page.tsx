import {
  Activity,
  ArrowRight,
  Bot,
  Check,
  CheckCircle2,
  DatabaseZap,
  Eye,
  FileCheck2,
  Fingerprint,
  Gavel,
  Globe2,
  LockKeyhole,
  Play,
  Radar,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const platformRows = [
  [
    { name: "淘宝", mark: "淘", color: "bg-orange-500" },
    { name: "京东", mark: "JD", color: "bg-red-600" },
    { name: "拼多多", mark: "拼", color: "bg-rose-500" },
    { name: "闲鱼", mark: "闲", color: "bg-amber-400 text-zinc-950" },
    { name: "小红书", mark: "小", color: "bg-red-500" },
    { name: "Amazon", mark: "a", color: "bg-zinc-950" },
  ],
  [
    { name: "百度", mark: "百", color: "bg-blue-600" },
    { name: "Google", mark: "G", color: "bg-white text-blue-600 ring-1 ring-zinc-200" },
    { name: "Bing", mark: "B", color: "bg-cyan-600" },
    { name: "微信", mark: "微", color: "bg-emerald-500" },
    { name: "微博", mark: "微", color: "bg-orange-500" },
    { name: "Reddit", mark: "R", color: "bg-orange-600" },
  ],
  [
    { name: "抖音", mark: "抖", color: "bg-zinc-950" },
    { name: "快手", mark: "快", color: "bg-orange-500" },
    { name: "哔哩哔哩", mark: "B", color: "bg-sky-500" },
    { name: "YouTube", mark: "▶", color: "bg-red-600" },
    { name: "Vimeo", mark: "V", color: "bg-sky-600" },
    { name: "Instagram", mark: "I", color: "bg-fuchsia-600" },
  ],
]

const agentTasks = [
  { label: "确认作品权属", state: "已完成", icon: Fingerprint },
  { label: "跨平台发现侵权", state: "运行中", icon: Radar },
  { label: "固定证据与主体", state: "12 条待复核", icon: FileCheck2 },
  { label: "生成处置方案", state: "Agent 执行", icon: Gavel },
]

const cases = [
  { source: "闲鱼", target: "《增长方法论》课程盗版", status: "材料已投递", tone: "text-emerald-300" },
  { source: "小红书", target: "品牌视觉素材搬运", status: "等待平台回执", tone: "text-amber-300" },
  { source: "百度", target: "网盘聚合页 17 条", status: "证据固定中", tone: "text-sky-300" },
]

function BrandMark() {
  return (
    <div className="flex items-center gap-2.5 font-semibold tracking-tight">
      <span className="grid size-9 place-items-center rounded-xl bg-zinc-950 text-lime-300 shadow-sm">
        <ShieldCheck className="size-5" />
      </span>
      <span>Open Rights Guard</span>
    </div>
  )
}

function PlatformRail({ row, reverse = false }: { row: (typeof platformRows)[number]; reverse?: boolean }) {
  return (
    <div className="platform-rail">
      <div className={reverse ? "platform-track platform-track-reverse" : "platform-track"}>
        {[...row, ...row].map((platform, index) => (
          <div
            className="flex min-w-40 items-center gap-3 rounded-2xl border border-zinc-200/80 bg-white px-4 py-3 shadow-[0_12px_36px_-24px_rgba(24,24,27,0.35)]"
            key={`${platform.name}-${index}`}
          >
            <span className={`grid size-9 place-items-center rounded-xl text-xs font-bold text-white ${platform.color}`}>
              {platform.mark}
            </span>
            <span className="whitespace-nowrap text-sm font-medium text-zinc-700">{platform.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="overflow-hidden bg-[#f7f8f4] text-zinc-950">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-zinc-900/5 bg-[#f7f8f4]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <BrandMark />
          <nav className="hidden items-center gap-7 text-sm text-zinc-600 md:flex" aria-label="主导航">
            <a className="transition-colors hover:text-zinc-950" href="#coverage">全网监测</a>
            <a className="transition-colors hover:text-zinc-950" href="#legal">法律 Agent</a>
            <a className="transition-colors hover:text-zinc-950" href="#console">控制面板</a>
          </nav>
          <Button asChild className="rounded-full bg-zinc-950 px-5 text-white hover:bg-zinc-800">
            <a href="#contact">申请内测</a>
          </Button>
        </div>
      </header>

      <section className="relative px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
        <div className="hero-glow" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.03fr_.97fr]">
          <div>
            <Badge className="mb-6 rounded-full border-lime-300 bg-lime-200/70 px-3 py-1 text-zinc-800 hover:bg-lime-200">
              <Sparkles className="mr-1 size-3.5" /> AI Agent 驱动的数字版权保护
            </Badge>
            <h1 className="max-w-3xl text-balance text-5xl font-semibold leading-[1.03] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              您的版权，
              <span className="relative inline-block">
                我们全权维护。
                <span className="absolute inset-x-0 -bottom-1 -z-10 h-3 -rotate-1 rounded-full bg-lime-300/70" />
              </span>
              <br />
              您只需决定：先解决谁。
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-600 sm:text-xl">
              从全天候巡检、侵权识别、证据固定，到材料生成、投递与进度追踪，
              Agent 持续执行。您只需要确认作品与关键动作。
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-full bg-zinc-950 px-7 text-base text-white hover:bg-zinc-800">
                <a href="#coverage">开始保护版权 <ArrowRight /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-zinc-300 bg-white/70 px-7 text-base">
                <a href="#console"><Play className="fill-zinc-950" /> 看 Agent 如何工作</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-zinc-500">
              <span className="flex items-center gap-2"><Check className="size-4 text-emerald-600" /> 人工最终确认</span>
              <span className="flex items-center gap-2"><Check className="size-4 text-emerald-600" /> 全程可追溯</span>
              <span className="flex items-center gap-2"><Check className="size-4 text-emerald-600" /> 合规采集公开信息</span>
            </div>
          </div>

          <div className="relative lg:pl-4">
            <div className="absolute -inset-8 rounded-full bg-lime-300/20 blur-3xl" aria-hidden="true" />
            <Card className="relative overflow-hidden rounded-[2rem] border-white/80 bg-zinc-950 p-0 text-white shadow-[0_35px_100px_-35px_rgba(24,24,27,0.65)]">
              <CardContent className="p-0">
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                  <div>
                    <p className="text-sm font-medium">Agent 保护任务</p>
                    <p className="mt-1 text-xs text-zinc-500">OR-2026-0827 · 自动执行中</p>
                  </div>
                  <span className="flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
                    <span className="size-1.5 animate-pulse rounded-full bg-emerald-300" /> 在线
                  </span>
                </div>
                <div className="grid gap-3 p-5 sm:grid-cols-2">
                  {agentTasks.map(({ label, state, icon: Icon }, index) => (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4" key={label}>
                      <div className="mb-5 flex items-center justify-between">
                        <span className="grid size-9 place-items-center rounded-xl bg-white/10 text-lime-300"><Icon className="size-4" /></span>
                        <span className="text-xs text-zinc-500">0{index + 1}</span>
                      </div>
                      <p className="text-sm font-medium">{label}</p>
                      <p className="mt-1 text-xs text-zinc-400">{state}</p>
                    </div>
                  ))}
                </div>
                <div className="mx-5 mb-5 flex items-center gap-3 rounded-2xl border border-lime-300/20 bg-lime-300/10 p-4">
                  <Bot className="size-5 text-lime-300" />
                  <p className="text-sm text-zinc-300"><span className="font-medium text-white">下一步：</span>复核 12 条高可信侵权线索</p>
                  <ArrowRight className="ml-auto size-4 text-lime-300" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200/80 bg-white py-24 sm:py-32" id="coverage">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="section-kicker"><Globe2 /> 全渠道持续巡检</p>
              <h2 className="section-title mt-4">侵权不会只发生在一个平台。我们的 Agent 也不会。</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-zinc-600 lg:justify-self-end">
              网店、搜索引擎、社交媒体、流媒体与内容社区统一纳入任务队列。
              Agent 理解文字变体、图片改动和跨平台搬运，把零散线索汇成可处理案件。
            </p>
          </div>
        </div>
        <div className="mt-14 space-y-4">
          {platformRows.map((row, index) => <PlatformRail key={index} row={row} reverse={index === 1} />)}
        </div>
        <div className="mx-auto mt-12 grid max-w-7xl gap-4 px-5 sm:grid-cols-3 sm:px-8">
          {[
            { icon: Radar, value: "7×24", label: "Agent 持续巡检，不依赖人工值守" },
            { icon: Fingerprint, value: "多模态", label: "识别文本、图片与内容变体" },
            { icon: FileCheck2, value: "可追溯", label: "来源、截图、时间与哈希统一留存" },
          ].map(({ icon: Icon, value, label }) => (
            <div className="rounded-2xl border border-zinc-200 bg-[#f7f8f4] p-6" key={value}>
              <Icon className="mb-8 size-5 text-zinc-500" />
              <p className="text-2xl font-semibold tracking-tight">{value}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-5 py-24 sm:px-8 sm:py-32" id="legal">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <Card className="rounded-[2rem] border-zinc-200 bg-white p-3 shadow-[0_30px_90px_-50px_rgba(24,24,27,0.45)]">
              <CardContent className="rounded-[1.4rem] border border-zinc-200 bg-[#fbfbf9] p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs text-zinc-400">LEGAL-DRAFT / 02841</p>
                    <h3 className="mt-5 text-2xl font-semibold tracking-tight">民事起诉状</h3>
                  </div>
                  <Badge className="rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">可进入复核</Badge>
                </div>
                <div className="mt-8 space-y-5 text-sm leading-7 text-zinc-600">
                  <div><span className="font-medium text-zinc-950">原告：</span>原创内容权利人（已核验）</div>
                  <div><span className="font-medium text-zinc-950">被告：</span>侵权经营主体（Agent 已归并）</div>
                  <div>
                    <p className="font-medium text-zinc-950">诉讼请求</p>
                    <div className="mt-2 space-y-2">
                      <div className="h-2 w-full rounded-full bg-zinc-200" />
                      <div className="h-2 w-[86%] rounded-full bg-zinc-200" />
                      <div className="h-2 w-[62%] rounded-full bg-zinc-200" />
                    </div>
                  </div>
                </div>
                <Separator className="my-7" />
                <div className="grid gap-3 sm:grid-cols-3">
                  {["证据目录 17 项", "法条引用 8 条", "主体信息已核验"].map((item) => (
                    <div className="flex items-center gap-2 rounded-xl bg-white p-3 text-xs text-zinc-600 ring-1 ring-zinc-200" key={item}>
                      <CheckCircle2 className="size-4 shrink-0 text-emerald-600" /> {item}
                    </div>
                  ))}
                </div>
                <Button className="mt-6 h-11 w-full rounded-xl bg-zinc-950 text-white hover:bg-zinc-800">
                  确认并投递 <Send />
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="order-1 lg:order-2">
            <p className="section-kicker"><Gavel /> 一键生成与投递</p>
            <h2 className="section-title mt-4">不是一份空白模板。是理解案情的法律 Agent。</h2>
            <p className="mt-6 text-lg leading-8 text-zinc-600">
              Agent 将权属材料、侵权证据、主体关系和适用规则组织成完整案件上下文，
              生成结构完整、引用可追溯、可直接进入专业复核与提交的起诉材料。
            </p>
            <div className="mt-8 space-y-4">
              {[
                { icon: DatabaseZap, title: "全面法律知识库", text: "法条、案例、平台规则与场景经验统一检索。" },
                { icon: FileCheck2, title: "证据与文书同步生成", text: "诉状中的每项主张都能回到对应证据。" },
                { icon: LockKeyhole, title: "关键动作由您确认", text: "AI 准备材料，专业人员复核，您决定是否投递。" },
              ].map(({ icon: Icon, title, text }) => (
                <div className="flex gap-4 rounded-2xl border border-zinc-200 bg-white/70 p-5" key={title}>
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-zinc-950 text-lime-300"><Icon className="size-5" /></span>
                  <div><h3 className="font-medium">{title}</h3><p className="mt-1 text-sm leading-6 text-zinc-600">{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 px-5 py-24 text-white sm:px-8 sm:py-32" id="console">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
            <div>
              <p className="section-kicker !text-lime-300"><Activity /> 统一控制面板</p>
              <h2 className="section-title mt-4 text-white">您查看结果。Agent 负责让事情向前走。</h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-zinc-400 lg:justify-self-end">
              新发现、待确认、已投递和处置结果集中呈现。没有散落的表格和群聊，
              也无需逐项催办——每个案件都有下一步动作和负责人。
            </p>
          </div>

          <div className="mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-[#111214] shadow-2xl">
            <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-lime-300 text-zinc-950"><ShieldCheck className="size-5" /></span>
                <div><p className="text-sm font-medium">版权保护控制台</p><p className="text-xs text-zinc-500">最后同步：刚刚</p></div>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <span className="size-2 rounded-full bg-emerald-400" /> 6 个 Agent 正在执行
              </div>
            </div>
            <div className="grid lg:grid-cols-[1fr_280px]">
              <div className="border-white/10 p-5 sm:p-7 lg:border-r">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { label: "今日新发现", value: "28", note: "+12%" },
                    { label: "待您确认", value: "6", note: "优先处理" },
                    { label: "已投递", value: "41", note: "本月" },
                    { label: "处置完成", value: "87%", note: "近 30 天" },
                  ].map((metric) => (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4" key={metric.label}>
                      <p className="text-xs text-zinc-500">{metric.label}</p>
                      <p className="mt-3 text-2xl font-semibold tracking-tight">{metric.value}</p>
                      <p className="mt-1 text-xs text-lime-300">{metric.note}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                  <div className="grid grid-cols-[1fr_auto] border-b border-white/10 bg-white/[0.035] px-4 py-3 text-xs text-zinc-500 sm:grid-cols-[100px_1fr_140px]">
                    <span className="hidden sm:block">来源</span><span>案件</span><span>状态</span>
                  </div>
                  {cases.map((item) => (
                    <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-white/10 px-4 py-4 text-sm last:border-0 sm:grid-cols-[100px_1fr_140px]" key={item.target}>
                      <span className="hidden text-zinc-400 sm:block">{item.source}</span>
                      <span>{item.target}</span>
                      <span className={`text-xs ${item.tone}`}>{item.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <aside className="p-5 sm:p-7">
                <div className="flex items-center justify-between"><h3 className="text-sm font-medium">Agent 动态</h3><Eye className="size-4 text-zinc-500" /></div>
                <div className="mt-6 space-y-6">
                  {[
                    { time: "10:42", text: "版权线索 Agent 发现 3 个关联账号" },
                    { time: "10:38", text: "证据 Agent 完成页面与主体存证" },
                    { time: "10:31", text: "法律 Agent 更新诉状第 4 项请求" },
                    { time: "10:20", text: "投递 Agent 收到平台受理回执" },
                  ].map((item, index) => (
                    <div className="relative flex gap-3" key={item.time}>
                      {index < 3 && <span className="absolute left-[5px] top-5 h-12 w-px bg-white/10" />}
                      <span className="mt-1.5 size-2.5 shrink-0 rounded-full border-2 border-zinc-950 bg-lime-300 ring-2 ring-lime-300/20" />
                      <div><p className="text-xs text-zinc-500">{item.time}</p><p className="mt-1 text-sm leading-6 text-zinc-300">{item.text}</p></div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-lime-300 px-5 py-20 sm:px-8" id="contact">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-medium text-zinc-700">把重复追踪交给 Agent</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">从今天开始，让每一份创作都被认真保护。</h2>
          </div>
          <Button size="lg" className="h-12 shrink-0 rounded-full bg-zinc-950 px-7 text-base text-white hover:bg-zinc-800">
            申请产品内测 <ArrowRight />
          </Button>
        </div>
      </section>

      <footer className="bg-[#f7f8f4] px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <BrandMark />
          <p>AI 时代下，数字版权的坚强守护者。</p>
          <p>开源项目 · MIT License</p>
        </div>
      </footer>
    </main>
  )
}
