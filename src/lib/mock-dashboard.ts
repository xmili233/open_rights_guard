const dashboardData = {
  summary: [
    { label: "维护中的作品", value: "4", note: "覆盖 19 个渠道" },
    { label: "今日新发现", value: "28", note: "6 条高可信线索" },
    { label: "诉讼进行中", value: "6", note: "2 项等待您确认" },
    { label: "本月已处置", value: "41", note: "处置完成率 87%" },
  ],
  protectedWorks: [
    {
      name: "《增长方法论》课程",
      type: "视频课程",
      mark: "课",
      status: "持续监测",
      channels: 8,
      discoveries: 14,
      updatedAt: "2 分钟前",
      coverage: 86,
    },
    {
      name: "Northstar 品牌视觉",
      type: "品牌素材",
      mark: "NS",
      status: "持续监测",
      channels: 5,
      discoveries: 7,
      updatedAt: "8 分钟前",
      coverage: 72,
    },
    {
      name: "《独立开发手册》",
      type: "数字出版物",
      mark: "书",
      status: "证据整理",
      channels: 4,
      discoveries: 5,
      updatedAt: "24 分钟前",
      coverage: 63,
    },
    {
      name: "春季系列产品图",
      type: "商业摄影",
      mark: "图",
      status: "持续监测",
      channels: 2,
      discoveries: 2,
      updatedAt: "1 小时前",
      coverage: 91,
    },
  ],
  lawsuits: [
    {
      caseNo: "（2026）沪0105民初4821号",
      target: "某知识付费店铺",
      work: "《增长方法论》课程",
      stage: "法院审查",
      step: 3,
      totalSteps: 5,
      updatedAt: "今天 10:42",
    },
    {
      caseNo: "（2026）京0491民初1937号",
      target: "某网盘聚合主体",
      work: "《独立开发手册》",
      stage: "等待立案",
      step: 2,
      totalSteps: 5,
      updatedAt: "昨天 16:08",
    },
    {
      caseNo: "PLATFORM-2026-0284",
      target: "某短视频账号矩阵",
      work: "Northstar 品牌视觉",
      stage: "材料已投递",
      step: 1,
      totalSteps: 5,
      updatedAt: "8 月 25 日",
    },
  ],
  discoveries: [
    { title: "课程切片疑似搬运", source: "抖音", time: "4 分钟前", confidence: "96%", priority: "高" },
    { title: "商品详情页使用品牌主视觉", source: "淘宝", time: "12 分钟前", confidence: "93%", priority: "高" },
    { title: "网盘页面聚合电子书资源", source: "百度", time: "21 分钟前", confidence: "89%", priority: "中" },
    { title: "视频封面使用摄影作品", source: "小红书", time: "37 分钟前", confidence: "84%", priority: "中" },
  ],
}

export async function getMockDashboardData() {
  return dashboardData
}
