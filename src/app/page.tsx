import {
  ArrowRight,
  Check,
  FileText,
  Radar,
  Send,
  ShieldCheck,
} from "lucide-react"

import { Button } from "@/components/ui/button"

const platforms = [
  ["淘", "淘宝"],
  ["JD", "京东"],
  ["拼", "拼多多"],
  ["闲", "闲鱼"],
  ["小", "小红书"],
  ["G", "Google"],
  ["百", "百度"],
  ["抖", "抖音"],
  ["B", "哔哩哔哩"],
  ["YT", "YouTube"],
]

const cases = [
  ["课程盗版链接", "证据固定中"],
  ["品牌素材搬运", "材料已投递"],
  ["网盘聚合页面", "等待平台回执"],
]

function Logo() {
  return (
    <a className="flex items-center gap-2.5 text-sm font-medium" href="#top">
      <ShieldCheck className="size-5" strokeWidth={1.75} />
      Open Rights Guard
    </a>
  )
}

export default function Home() {
  return (
    <main id="top" className="bg-white text-black">
      <header className="border-b border-black/10 bg-white/90 backdrop-blur">
        <div className="page-shell flex h-16 items-center justify-between px-5 sm:px-8">
          <Logo />
          <nav className="hidden items-center gap-7 text-sm text-neutral-500 md:flex" aria-label="主导航">
            <a href="#coverage">监测</a>
            <a href="#legal">处置</a>
            <a href="#console">进度</a>
          </nav>
          <Button asChild size="sm" className="rounded-md bg-black px-4 text-white hover:bg-neutral-800">
            <a href="#contact">申请试用</a>
          </Button>
        </div>
      </header>

      <section className="site-grid border-b border-black/10">
        <div className="page-shell flex min-h-[720px] flex-col items-center justify-center px-5 py-24 text-center sm:px-8">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500">
            AI copyright protection
          </p>
          <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-7xl lg:text-[92px]">
            版权维权，交给 Agent。
          </h1>
          <p className="mt-7 text-lg text-neutral-500 sm:text-xl">您只需决定，先处理谁。</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-md bg-black px-6 text-white hover:bg-neutral-800">
              <a href="#contact">开始保护 <ArrowRight /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-md border-black/15 bg-white px-6">
              <a href="#console">查看工作台</a>
            </Button>
          </div>

          <div className="mt-20 w-full max-w-4xl overflow-hidden rounded-xl border border-black/10 bg-white text-left shadow-[0_24px_80px_-50px_rgba(0,0,0,.35)]">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <span className="font-mono text-xs text-neutral-500">PROTECTION / ACTIVE</span>
              <span className="flex items-center gap-2 text-xs"><span className="size-1.5 rounded-full bg-black" />持续运行</span>
            </div>
            <div className="grid divide-y divide-black/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {[
                ["01", "发现", "扫描公开渠道"],
                ["02", "取证", "固定页面与主体"],
                ["03", "处置", "生成材料并投递"],
              ].map(([number, title, text]) => (
                <div className="p-6" key={number}>
                  <span className="font-mono text-xs text-neutral-400">{number}</span>
                  <p className="mt-8 font-medium">{title}</p>
                  <p className="mt-1 text-sm text-neutral-500">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="coverage" className="border-b border-black/10">
        <div className="page-shell px-5 py-24 sm:px-8 sm:py-32">
          <p className="eyebrow"><Radar /> 全网监测</p>
          <h2 className="section-title">所有渠道，持续发现。</h2>
          <p className="section-copy">网店、搜索引擎、社交媒体与流媒体，统一监测。</p>
        </div>
        <div className="platform-rail border-t border-black/10">
          <div className="platform-track">
            {[...platforms, ...platforms].map(([mark, name], index) => (
              <div className="flex min-w-48 items-center justify-center gap-3 border-r border-black/10 px-8 py-8" key={`${name}-${index}`}>
                <span className="grid size-9 place-items-center rounded-full border border-black/15 font-mono text-xs font-medium">{mark}</span>
                <span className="text-sm font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="legal" className="border-b border-black/10">
        <div className="page-shell grid lg:grid-cols-2">
          <div className="flex flex-col justify-center px-5 py-24 sm:px-8 sm:py-32 lg:border-r lg:border-black/10 lg:pr-16">
            <p className="eyebrow"><FileText /> 法律 Agent</p>
            <h2 className="section-title">从证据到投递，一次完成。</h2>
            <p className="section-copy">基于法律知识库组织证据、生成文书，并进入投递流程。</p>
            <div className="mt-8">
              <Button className="rounded-md bg-black text-white hover:bg-neutral-800">查看生成结果 <ArrowRight /></Button>
            </div>
          </div>

          <div className="site-grid flex items-center px-5 py-20 sm:px-12 lg:py-24">
            <div className="mx-auto w-full max-w-md border border-black/15 bg-white p-7 shadow-[0_24px_80px_-55px_rgba(0,0,0,.45)] sm:p-9">
              <div className="flex items-start justify-between border-b border-black/10 pb-6">
                <div>
                  <p className="font-mono text-[11px] text-neutral-400">LEGAL DRAFT / 02841</p>
                  <h3 className="mt-4 text-xl font-medium">民事起诉状</h3>
                </div>
                <span className="rounded-full border border-black/15 px-2.5 py-1 text-[11px]">可提交</span>
              </div>
              <div className="space-y-5 py-7 text-sm">
                {["权利主体已核验", "侵权主体已归并", "证据目录 17 项", "适用规则 8 条"].map((item) => (
                  <div className="flex items-center gap-3" key={item}><Check className="size-4" />{item}</div>
                ))}
              </div>
              <Button className="h-11 w-full rounded-md bg-black text-white hover:bg-neutral-800">确认并投递 <Send /></Button>
            </div>
          </div>
        </div>
      </section>

      <section id="console" className="border-b border-black/10">
        <div className="page-shell px-5 py-24 sm:px-8 sm:py-32">
          <p className="eyebrow"><ShieldCheck /> 控制台</p>
          <h2 className="section-title">您看结果，Agent 推进。</h2>
          <p className="section-copy">新发现、已投递、等待回执，一处查看。</p>

          <div className="mt-14 overflow-hidden rounded-xl border border-black/10 bg-white">
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 sm:px-7">
              <span className="text-sm font-medium">版权保护工作台</span>
              <span className="text-xs text-neutral-500">刚刚更新</span>
            </div>
            <div className="grid border-b border-black/10 sm:grid-cols-3">
              {[["28", "新发现"], ["6", "待确认"], ["41", "已投递"]].map(([value, label]) => (
                <div className="border-b border-black/10 p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0" key={label}>
                  <p className="text-3xl font-medium tracking-tight">{value}</p>
                  <p className="mt-1 text-sm text-neutral-500">{label}</p>
                </div>
              ))}
            </div>
            <div>
              {cases.map(([title, status]) => (
                <div className="grid gap-2 border-b border-black/10 px-5 py-5 text-sm last:border-0 sm:grid-cols-[1fr_auto] sm:px-7" key={title}>
                  <span>{title}</span>
                  <span className="text-neutral-500">{status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-black text-white">
        <div className="page-shell flex flex-col items-start justify-between gap-8 border-white/15 px-5 py-20 sm:px-8 lg:flex-row lg:items-center">
          <h2 className="max-w-3xl text-balance text-4xl font-medium tracking-[-0.045em] sm:text-5xl">让侵权停止消耗你的时间。</h2>
          <Button size="lg" className="rounded-md bg-white text-black hover:bg-neutral-200">申请试用 <ArrowRight /></Button>
        </div>
      </section>

      <footer className="bg-black text-white">
        <div className="page-shell flex flex-col gap-4 border-t border-white/15 px-5 py-7 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Logo />
          <p>AI 时代下，数字版权的坚强守护者。</p>
          <p>MIT License</p>
        </div>
      </footer>
    </main>
  )
}
