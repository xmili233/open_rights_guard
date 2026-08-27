import Link from "next/link"
import {
  Bell,
  BookOpen,
  ChevronRight,
  CircleHelp,
  FileCheck2,
  FolderKanban,
  Gavel,
  LayoutDashboard,
  Library,
  Plus,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { getMockDashboardData } from "@/lib/mock-dashboard"

const navigation = [
  { label: "仪表盘", icon: LayoutDashboard, active: true },
  { label: "维护项目", icon: FolderKanban },
  { label: "新发现", icon: Radar, count: 28 },
  { label: "诉讼进度", icon: Gavel, count: 6 },
]

const libraryNavigation = [
  { label: "作品库", icon: Library },
  { label: "证据库", icon: FileCheck2 },
  { label: "法律知识库", icon: BookOpen },
]

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-black/10 bg-white lg:flex">
      <div className="flex h-16 items-center border-b border-black/10 px-5">
        <Link className="flex items-center gap-2.5 text-sm font-medium" href="/">
          <ShieldCheck className="size-5" strokeWidth={1.75} />
          Open Rights Guard
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-3" aria-label="工作台导航">
        <p className="px-3 pb-2 pt-3 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">工作台</p>
        <div className="space-y-1">
          {navigation.map(({ label, icon: Icon, active, count }) => (
            <div
              className={`flex h-10 items-center gap-3 rounded-md px-3 text-sm ${active ? "bg-neutral-100 font-medium text-black" : "text-neutral-500"}`}
              key={label}
            >
              <Icon className="size-4" strokeWidth={1.75} />
              <span>{label}</span>
              {count && <span className="ml-auto text-xs text-neutral-400">{count}</span>}
            </div>
          ))}
        </div>

        <p className="px-3 pb-2 pt-8 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">资料</p>
        <div className="space-y-1">
          {libraryNavigation.map(({ label, icon: Icon }) => (
            <div className="flex h-10 items-center gap-3 rounded-md px-3 text-sm text-neutral-500" key={label}>
              <Icon className="size-4" strokeWidth={1.75} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </nav>

      <div className="border-t border-black/10 p-3">
        <div className="flex items-center gap-3 rounded-md px-3 py-2">
          <span className="grid size-8 place-items-center rounded-full bg-black text-xs font-medium text-white">林</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">林女士</p>
            <p className="truncate text-xs text-neutral-400">创作者账户</p>
          </div>
          <ChevronRight className="size-4 text-neutral-400" />
        </div>
      </div>
    </aside>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center border-b border-black/10 bg-white/90 px-4 backdrop-blur sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 lg:hidden">
        <ShieldCheck className="size-5" strokeWidth={1.75} />
        <span className="text-sm font-medium">Open Rights Guard</span>
      </div>
      <div className="relative ml-auto hidden w-full max-w-sm md:block">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
        <input
          aria-label="搜索工作台"
          className="h-9 w-full rounded-md border border-black/10 bg-neutral-50 pl-9 pr-3 text-sm outline-none transition focus:border-black/30 focus:bg-white"
          placeholder="搜索作品、案件或线索"
        />
      </div>
      <div className="ml-3 flex items-center gap-1">
        <Button aria-label="通知" size="icon" variant="ghost"><Bell /></Button>
        <Button aria-label="帮助" className="hidden sm:inline-flex" size="icon" variant="ghost"><CircleHelp /></Button>
      </div>
    </header>
  )
}

export default async function DashboardPage() {
  const data = await getMockDashboardData()

  return (
    <div className="min-h-screen bg-neutral-50 text-black">
      <Sidebar />
      <div className="lg:pl-64">
        <Header />
        <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8 lg:py-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-neutral-500">2026 年 8 月 27 日 · 星期四</p>
              <h1 className="mt-2 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">上午好，林女士</h1>
              <p className="mt-2 text-sm text-neutral-500">Agent 正在维护 4 项作品，今天发现 28 条新线索。</p>
            </div>
            <Button className="w-fit rounded-md bg-black text-white hover:bg-neutral-800"><Plus />添加作品</Button>
          </div>

          <section className="mt-8 grid grid-cols-2 overflow-hidden rounded-lg border border-black/10 bg-white xl:grid-cols-4" aria-label="维护摘要">
            {data.summary.map((item) => (
              <div className="border-b border-black/10 p-5 odd:border-r [&:nth-last-child(-n+2)]:border-b-0 xl:border-b-0 xl:border-r xl:last:border-r-0" key={item.label}>
                <p className="text-sm text-neutral-500">{item.label}</p>
                <p className="mt-4 text-3xl font-semibold tracking-[-0.04em]">{item.value}</p>
                <p className="mt-2 text-xs text-neutral-400">{item.note}</p>
              </div>
            ))}
          </section>

          <section className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">正在维护</h2>
                <p className="mt-1 text-sm text-neutral-500">Agent 当前持续监测的作品。</p>
              </div>
              <Button className="hidden sm:inline-flex" size="sm" variant="outline">查看全部 <ChevronRight /></Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {data.protectedWorks.map((work) => (
                <article className="rounded-lg border border-black/10 bg-white p-5" key={work.name}>
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-11 place-items-center rounded-md bg-neutral-100 font-mono text-xs font-medium">{work.mark}</span>
                    <span className="rounded-full border border-black/10 px-2.5 py-1 text-[11px] text-neutral-500">{work.status}</span>
                  </div>
                  <h3 className="mt-7 truncate font-medium">{work.name}</h3>
                  <p className="mt-1 text-xs text-neutral-400">{work.type}</p>
                  <div className="mt-6 h-1 overflow-hidden rounded-full bg-neutral-100">
                    <div className="h-full rounded-full bg-black" style={{ width: `${work.coverage}%` }} />
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
                    <span>{work.channels} 个渠道</span>
                    <span>{work.discoveries} 条线索</span>
                  </div>
                  <p className="mt-5 border-t border-black/10 pt-4 text-xs text-neutral-400">更新于 {work.updatedAt}</p>
                </article>
              ))}
            </div>
          </section>

          <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,.7fr)]">
            <section className="overflow-hidden rounded-lg border border-black/10 bg-white">
              <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
                <div>
                  <h2 className="font-semibold tracking-tight">诉讼最新进度</h2>
                  <p className="mt-1 text-xs text-neutral-400">已投递案件的最近状态。</p>
                </div>
                <Button size="sm" variant="ghost">全部案件 <ChevronRight /></Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="border-b border-black/10 bg-neutral-50 text-xs font-normal text-neutral-400">
                    <tr>
                      <th className="px-5 py-3 font-normal">案件 / 对方</th>
                      <th className="px-5 py-3 font-normal">维护作品</th>
                      <th className="px-5 py-3 font-normal">当前阶段</th>
                      <th className="px-5 py-3 font-normal">更新时间</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.lawsuits.map((lawsuit) => (
                      <tr className="border-b border-black/10 last:border-0" key={lawsuit.caseNo}>
                        <td className="px-5 py-5">
                          <p className="font-medium">{lawsuit.target}</p>
                          <p className="mt-1 font-mono text-[11px] text-neutral-400">{lawsuit.caseNo}</p>
                        </td>
                        <td className="px-5 py-5 text-neutral-600">{lawsuit.work}</td>
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">
                            <span className="text-neutral-600">{lawsuit.stage}</span>
                            <div className="flex gap-1" aria-label={`进度 ${lawsuit.step}/${lawsuit.totalSteps}`}>
                              {Array.from({ length: lawsuit.totalSteps }, (_, index) => (
                                <span className={`h-1.5 w-4 rounded-full ${index < lawsuit.step ? "bg-black" : "bg-neutral-200"}`} key={index} />
                              ))}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5 text-neutral-400">{lawsuit.updatedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="rounded-lg border border-black/10 bg-white">
              <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
                <div>
                  <h2 className="font-semibold tracking-tight">新发现</h2>
                  <p className="mt-1 text-xs text-neutral-400">等待 Agent 继续核验。</p>
                </div>
                <span className="grid size-8 place-items-center rounded-full bg-black text-xs text-white">28</span>
              </div>
              <div>
                {data.discoveries.map((item) => (
                  <article className="flex gap-3 border-b border-black/10 px-5 py-4 last:border-0" key={`${item.source}-${item.title}`}>
                    <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full bg-neutral-100 text-[11px] font-medium">{item.source.slice(0, 1)}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="truncate text-sm font-medium">{item.title}</h3>
                        <span className="shrink-0 text-[11px] text-neutral-400">{item.time}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs text-neutral-400">
                        <span>{item.source}</span><span>·</span><span>可信度 {item.confidence}</span>
                        <span className="ml-auto rounded-full border border-black/10 px-2 py-0.5">{item.priority}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <div className="border-t border-black/10 p-3">
                <Button className="w-full" variant="ghost"><Sparkles />让 Agent 继续处理</Button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
