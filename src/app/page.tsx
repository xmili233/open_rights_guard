import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  ArrowRight,
  Check,
  FileCheck2,
  FileText,
  Gavel,
  Scale,
  Search,
  Send,
  Store,
  Video,
} from "lucide-react";
import {
  SiBaidu,
  SiBilibili,
  SiEbay,
  SiEtsy,
  SiGoogle,
  SiInstagram,
  SiPinterest,
  SiTaobao,
  SiTiktok,
  SiVimeo,
  SiXiaohongshu,
  SiYoutube,
} from "react-icons/si";

import { Footer2 } from "@/block/footer2/footer2";
import { Navbar1 } from "@/block/navbar1/navbar1";
import { Pricing28 } from "@/block/pricing28/pricing28";
import { Testimonial19 } from "@/block/testimonial19/testimonial19";
import { PageGuideDialog } from "@/components/page-guide-dialog";
import { Button } from "@/components/ui/button";

const channels = [
  { name: "淘宝", type: "电商平台", icon: SiTaobao },
  { name: "eBay", type: "跨境电商", icon: SiEbay },
  { name: "Etsy", type: "创意电商", icon: SiEtsy },
  { name: "小红书", type: "内容社区", icon: SiXiaohongshu },
  { name: "Google", type: "搜索引擎", icon: SiGoogle },
  { name: "百度", type: "搜索引擎", icon: SiBaidu },
  { name: "抖音", type: "短视频", icon: SiTiktok },
  { name: "哔哩哔哩", type: "流媒体", icon: SiBilibili },
  { name: "YouTube", type: "流媒体", icon: SiYoutube },
  { name: "Instagram", type: "社交媒体", icon: SiInstagram },
  { name: "Pinterest", type: "图片社区", icon: SiPinterest },
  { name: "Vimeo", type: "视频平台", icon: SiVimeo },
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
    monthlyPrice: "¥299",
    yearlyPrice: "¥2,988",
    description: {
      monthly: "适合独立创作者持续维护个人作品。",
      yearly: "适合独立创作者长期维护，年付更划算。",
    },
    tagline: "独立创作者的持续保护",
    features: ["维护 20 项原创作品", "全渠道持续监测", "侵权证据自动固化", "每月 5 个处置案件"],
    buttonText: "开始试用",
    buttonUrl: "#contact",
  },
  {
    name: "工作室版",
    monthlyPrice: "¥899",
    yearlyPrice: "¥8,988",
    description: {
      monthly: "适合创作团队与小型品牌协同管理版权。",
      yearly: "适合稳定创作团队，年付节省日常维护成本。",
    },
    tagline: "创作团队与小型品牌",
    features: ["维护 200 项原创作品", "全渠道高频监测", "侵权证据自动固化", "法律文书生成", "每月 20 个处置案件", "3 位团队成员"],
    buttonText: "选择工作室版",
    buttonUrl: "#contact",
    highlighted: true,
    highlightedLabel: "最受欢迎",
  },
  {
    name: "企业版",
    monthlyPrice: "¥1,999",
    yearlyPrice: "¥19,990",
    description: {
      monthly: "适合品牌、内容平台与专业机构全面维护版权资产。",
      yearly: "适合拥有长期维权需求的企业与专业机构。",
    },
    tagline: "品牌与专业机构",
    features: ["不限原创作品数量", "多平台高频监测", "法律文书生成与投递", "案件全流程持续推进", "企业成员协作", "专属法律知识库"],
    buttonText: "联系顾问",
    buttonUrl: "#contact",
  },
];

function DashboardPreview() {
  return (
    <section id="top" className="border-y bg-muted/30 py-24 md:py-32">
      <div className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">您的版权，我们全权维护。</h1>
          <p className="mt-5 text-lg text-muted-foreground">从全网发现、证据固定到法律处置持续推进。您只需决定，先处理谁。</p>
        </div>
        <div id="dashboard" className="mt-14 scroll-mt-24 overflow-hidden rounded-xl border bg-background shadow-2xl shadow-black/10">
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

      <div className="platform-rail container relative mx-auto mt-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent md:w-40" />
        <div className="platform-track items-center py-8">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center gap-16 pr-16"
              aria-hidden={copy === 1}
            >
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <div
                    key={channel.name}
                    className="flex min-w-28 items-center justify-center gap-3 text-foreground"
                    aria-label={`${channel.name}，${channel.type}`}
                  >
                    <Icon className="size-8 shrink-0" aria-hidden="true" />
                    <span className="text-sm font-medium whitespace-nowrap">{channel.name}</span>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto mt-14 grid gap-8 md:grid-cols-3">
        {capabilities.map(({ icon: Icon, title, description }) => (
          <div key={title} className="pt-6">
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

export default async function Home() {
  const guide = await readFile(
    path.join(process.cwd(), "docs/homepage-design.md"),
    "utf8",
  );

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
      <DashboardPreview />
      <Coverage />
      <LegalAgent />
      <div id="testimonials">
        <Testimonial19 heading="把维权从负担，变成可查看的结果。" description="示例客户如何使用 Open Rights Guard 管理数字版权" testimonials={testimonials} />
      </div>
      <div id="pricing" className="border-t">
        <Pricing28 heading="按需要选择保护范围" plans={pricingPlans} />
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
      <PageGuideDialog
        guide={guide}
        storageKey="open-rights-guard:page-guide:homepage"
      />
    </main>
  );
}
