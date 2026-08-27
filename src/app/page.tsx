import {
  ArrowRight,
  Check,
  FileCheck2,
  FileText,
  Gavel,
  Scale,
  Search,
  Send,
  ShieldCheck,
  Store,
  Video,
} from "lucide-react";
import Link from "next/link";
import {
  SiBaidu,
  SiBilibili,
  SiEbay,
  SiGoogle,
  SiInstagram,
  SiTaobao,
  SiTiktok,
  SiXiaohongshu,
  SiYoutube,
} from "react-icons/si";

import { Footer2 } from "@/block/footer2/footer2";
import { Navbar1 } from "@/block/navbar1/navbar1";
import { Pricing2 } from "@/block/pricing2/pricing2";
import { Testimonial9 } from "@/block/testimonial9/testimonial9";
import { Button } from "@/components/ui/button";

const channels = [
  { name: "淘宝", type: "电商平台", icon: SiTaobao },
  { name: "京东", type: "电商平台", mark: "JD" },
  { name: "拼多多", type: "电商平台", mark: "拼" },
  { name: "小红书", type: "内容社区", icon: SiXiaohongshu },
  { name: "Google", type: "搜索引擎", icon: SiGoogle },
  { name: "百度", type: "搜索引擎", icon: SiBaidu },
  { name: "抖音", type: "短视频", icon: SiTiktok },
  { name: "哔哩哔哩", type: "流媒体", icon: SiBilibili },
  { name: "YouTube", type: "流媒体", icon: SiYoutube },
  { name: "Instagram", type: "社交媒体", icon: SiInstagram },
  { name: "eBay", type: "跨境电商", icon: SiEbay },
];

const testimonials = [
  ["林女士", "独立摄影师", "以前发现盗图后，我要自己截图、联系平台、反复跟进。现在只需要确认是否处理，后面的证据和进度都能在一个地方看到。", "avatar3.jpg"],
  ["陈先生", "文创品牌负责人", "最有价值的不是多一个监测工具，而是发现以后真的有人把事情推进下去。每个案件到哪一步，都清楚地摆在工作台里。", "avatar7.jpg"],
  ["周女士", "短视频内容创作者", "跨平台搬运一直很难处理。现在从链接发现、证据固定到材料生成连在一起，节省了大量重复沟通。", "avatar12.jpg"],
  ["木林影像", "商业摄影工作室", "团队不需要学习复杂的法律流程。我们只看新发现和关键节点，Agent 会持续完成其余工作。", "avatar18.jpg"],
  ["某设计机构", "原创素材团队", "证据文件和诉讼材料都按案件整理，不再散落在聊天记录和文件夹里。处理状态也更容易向团队同步。", "avatar22.jpg"],
  ["许先生", "品牌法务负责人", "知识库能够覆盖常见版权争议，生成的材料结构完整，法务只需要复核关键事实，而不是从空白文档开始。", "avatar25.jpg"],
].map(([name, role, content, avatar], index) => ({
  id: String(index + 1),
  name,
  role,
  content,
  avatar: `https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/modern/avatars/${avatar}`,
}));

const pricingPlans = [
  {
    name: "创作者版",
    description: "适合独立创作者与小型工作室",
    monthlyPrice: "¥299",
    yearlyPrice: "¥2,988",
    features: ["维护 20 项原创作品", "全渠道持续监测", "侵权证据自动固化", "每月 5 个处置案件"],
    button: { text: "开始试用", url: "#contact" },
  },
  {
    name: "企业版",
    description: "适合品牌、内容平台与专业机构",
    monthlyPrice: "¥1,999",
    yearlyPrice: "¥19,990",
    features: ["不限原创作品数量", "多平台高频监测", "法律文书生成与投递", "案件全流程持续推进", "企业成员协作", "专属法律知识库"],
    button: { text: "联系顾问", url: "#contact" },
    highlighted: true,
  },
];

function Hero() {
  return (
    <section id="top" className="flex min-h-[calc(100svh-72px)] items-center overflow-hidden py-24">
      <div className="container mx-auto">
        <div className="relative isolate flex flex-col items-center gap-6 text-center">
          <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border p-20 mask-[linear-gradient(to_top,transparent,white,white,transparent)] md:size-[1300px] md:p-40">
            <div className="size-full rounded-full border border-border p-20 md:p-40">
              <div className="size-full rounded-full border border-border" />
            </div>
          </div>
          <span className="flex size-16 items-center justify-center rounded-full border bg-background md:size-20">
            <ShieldCheck className="size-7" />
          </span>
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Open Rights Guard · AI 数字版权维护
          </p>
          <h1 className="max-w-5xl text-balance text-[42px] leading-[1.05] font-semibold tracking-[-0.055em] sm:text-5xl md:text-7xl lg:text-[88px] lg:leading-[0.98]">
            <span>您的版权，</span>
            <br className="sm:hidden" />
            <span>我们全权维护。</span>
          </h1>
          <p className="max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
            从全网发现、证据固定到法律处置持续推进。您只需决定，先处理谁。
          </p>
          <div className="flex w-full flex-col justify-center gap-3 pt-4 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="h-12 px-6">
              <a href="#pricing">开始保护 <ArrowRight className="size-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6">
              <Link href="/dashboard">查看工作台</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section id="dashboard" className="border-y bg-muted/30 py-24 md:py-32">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-medium text-muted-foreground">一处掌握全部进展</p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">您看结果，Agent 负责推进。</h2>
          <p className="mt-5 text-lg text-muted-foreground">正在维护的作品、新发现的线索与案件进度，都在同一个工作台持续更新。</p>
        </div>
        <div className="mt-14 overflow-hidden rounded-xl border bg-background shadow-2xl shadow-black/10">
          <div className="flex h-11 items-center gap-2 border-b px-4">
            <span className="size-2.5 rounded-full bg-neutral-300" />
            <span className="size-2.5 rounded-full bg-neutral-300" />
            <span className="size-2.5 rounded-full bg-neutral-300" />
            <span className="ml-3 text-xs text-muted-foreground">Open Rights Guard · 工作台实时预览</span>
          </div>
          <div className="aspect-[4/5] overflow-hidden bg-background md:aspect-[16/9]">
            <iframe src="/dashboard" title="Open Rights Guard 仪表盘预览" tabIndex={-1} aria-hidden="true" loading="lazy" className="pointer-events-none h-full w-full select-none" />
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">产品界面实时渲染 · 预览模式不可操作</p>
      </div>
    </section>
  );
}

function Coverage() {
  const capabilities = [
    { icon: Store, title: "网店与交易平台", description: "持续发现商品页、店铺与交易记录中的疑似侵权。" },
    { icon: Search, title: "搜索与内容社区", description: "覆盖公开搜索结果、文章、图片与用户发布内容。" },
    { icon: Video, title: "视频与流媒体", description: "识别搬运、盗播与未经授权的二次传播。" },
  ];

  return (
    <section id="coverage" className="overflow-hidden py-24 md:py-32">
      <div className="container mx-auto">
        <div className="max-w-3xl">
          <p className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground"><Search className="size-4" /> 全渠道发现</p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">侵权出现在哪里，我们就追踪到哪里。</h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">网店、搜索引擎、内容社区与流媒体统一监测。新的侵权线索自动进入待处理清单。</p>
        </div>
      </div>

      <div className="platform-rail mt-16 border-y">
        <div className="platform-track">
          {[...channels, ...channels].map((channel, index) => {
            const Icon = channel.icon;
            return (
              <div key={`${channel.name}-${index}`} className="flex min-w-56 items-center gap-4 border-r px-7 py-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-lg border bg-background text-sm font-semibold">
                  {Icon ? <Icon className="size-5" /> : channel.mark}
                </span>
                <span>
                  <span className="block text-sm font-medium">{channel.name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{channel.type}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="container mx-auto mt-14 grid gap-8 md:grid-cols-3">
        {capabilities.map(({ icon: Icon, title, description }) => (
          <div key={title} className="border-t pt-6">
            <Icon className="size-5" />
            <h3 className="mt-5 font-medium">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function LegalAgent() {
  const files = [
    { icon: FileText, title: "起诉状正文", detail: "事实、请求与法律依据已生成" },
    { icon: FileCheck2, title: "证据目录", detail: "12 项证据已校验并关联" },
    { icon: Gavel, title: "管辖法院", detail: "上海市浦东新区人民法院" },
  ];

  return (
    <section id="legal" className="border-y bg-muted/30 py-24 md:py-32">
      <div className="container mx-auto grid items-center gap-16 lg:grid-cols-2">
        <div>
          <p className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground"><Scale className="size-4" /> 法律 Agent</p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">一键生成起诉材料，并进入投递流程。</h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">Agent 结合权属、侵权事实、管辖、赔偿与证据规则组织案件材料，生成可直接复核和使用的起诉文书。</p>
          <ul className="mt-8 space-y-4 text-sm">
            {["自动整理权利证明与侵权证据", "匹配案件所需的法律依据与管辖信息", "生成起诉状、证据目录与材料清单", "投递后持续跟进立案、审理与执行节点"].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="grid size-6 place-items-center rounded-full bg-foreground text-background"><Check className="size-3.5" /></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border bg-background p-5 shadow-xl shadow-black/5 md:p-8">
          <div className="flex items-start justify-between border-b pb-6">
            <div>
              <p className="text-xs text-muted-foreground">案件 沪0115民初·0827</p>
              <h3 className="mt-2 text-2xl font-semibold">民事起诉状</h3>
            </div>
            <span className="rounded-full border px-3 py-1 text-xs font-medium">可投递</span>
          </div>
          <div className="space-y-5 py-7">
            {files.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="flex items-center gap-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-muted"><Icon className="size-4" /></span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{title}</span>
                  <span className="mt-1 block truncate text-xs text-muted-foreground">{detail}</span>
                </span>
                <Check className="ml-auto size-4 shrink-0" />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-lg bg-foreground px-5 py-4 text-background">
            <span>
              <span className="block text-sm font-medium">材料已就绪</span>
              <span className="mt-0.5 block text-xs text-background/65">等待您的最终确认</span>
            </span>
            <Send className="size-5" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="flex w-full flex-col">
      <Navbar1
        logo={{ url: "#top", src: "/icon.svg", alt: "Open Rights Guard", title: "Open Rights Guard" }}
        menu={[
          { title: "首页", url: "#top" },
          { title: "工作台", url: "#dashboard" },
          { title: "全网监测", url: "#coverage" },
          { title: "法律 Agent", url: "#legal" },
          { title: "客户评价", url: "#testimonials" },
          { title: "定价", url: "#pricing" },
        ]}
        auth={{ login: { title: "登录工作台", url: "/dashboard" }, signup: { title: "申请试用", url: "#pricing" } }}
      />
      <Hero />
      <DashboardPreview />
      <Coverage />
      <LegalAgent />
      <div id="testimonials">
        <Testimonial9 heading="把维权从负担，变成可查看的结果。" description="示例客户如何使用 Open Rights Guard 管理数字版权" testimonials={testimonials} />
      </div>
      <div id="pricing" className="border-t">
        <Pricing2 heading="按需要选择保护范围" description="从个人作品到企业版权资产，随时升级。" plans={pricingPlans} />
      </div>
      <section id="contact" className="border-t bg-muted/30 py-20">
        <div className="container mx-auto flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">让侵权停止消耗您的时间。</h2>
            <p className="mt-3 text-muted-foreground">从今天开始，让 Agent 持续维护您的数字版权。</p>
          </div>
          <Button size="lg" className="h-12 px-6">申请试用 <ArrowRight className="size-4" /></Button>
        </div>
      </section>
      <Footer2
        logo={{ url: "#top", src: "/icon.svg", alt: "Open Rights Guard", title: "Open Rights Guard" }}
        description="AI 时代下，数字版权的坚强守护者。"
        sections={[
          { title: "产品", links: [{ name: "工作台", href: "#dashboard" }, { name: "全网监测", href: "#coverage" }, { name: "法律 Agent", href: "#legal" }] },
          { title: "能力", links: [{ name: "证据固化", href: "#legal" }, { name: "文书生成", href: "#legal" }, { name: "案件推进", href: "#dashboard" }] },
          { title: "资源", links: [{ name: "客户评价", href: "#testimonials" }, { name: "定价", href: "#pricing" }, { name: "产品演示", href: "/dashboard" }] },
          { title: "公司", links: [{ name: "关于我们", href: "#" }, { name: "联系我们", href: "#contact" }, { name: "服务状态", href: "#" }] },
        ]}
        copyright="© 2026 Open Rights Guard."
        legalLinks={[{ name: "服务条款", href: "#" }, { name: "隐私政策", href: "#" }]}
      />
    </main>
  );
}
