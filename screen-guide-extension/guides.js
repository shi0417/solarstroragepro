// ============================================================
// guides.js — Smart guides with element-finding (not fixed coords)
// Steps define WHAT to find, content.js figures out WHERE it is
// ============================================================

window.SCREENGUIDE_GUIDES = [
  {
    id: "fb-change-page",
    title: "Facebook: 更换主页身份",
    desc: "把广告身份从个人/旧主页换成 SolarStoragePRO 品牌主页",
    urlPattern: /facebook\.com.*ads|adsmanager\.facebook/,
    steps: [
      {
        text: "首先点击左侧绿色的【+ 创建】按钮，开始新建一个广告",
        find: { text: ["创建", "+ 创建", "新建"], tag: ["button", "div", "span", "a"] }
      },
      {
        text: "弹窗中选择【手动创建流量广告系列】选项（带有齿轮图标的那个）",
        find: { text: ["手动创建", "从头开始", "手动"], tag: ["div", "span", "label"] }
      },
      {
        text: "继续点击页面上的【继续】蓝色按钮",
        find: { text: ["继续", "下一步", "Next"], tag: ["button", "div", "span"] }
      },
      {
        text: "在广告编辑页面找到【身份 Identity】区域——这里显示你当前绑定的主页",
        find: { text: ["身份", "Identity", "主页"], tag: ["span", "div", "h", "label"] }
      },
      {
        text: "点击当前主页名称旁边的下拉箭头，打开主页选择菜单",
        find: { text: ["下拉", "▼", "v", "选择主页"], tag: ["div", "span", "button", "i"] }
      },
      {
        text: "如果还没有 SolarStoragePRO 主页，点击底部【创建新主页】",
        find: { text: ["创建新主页", "新建主页", "Create Page", "创建主页"], tag: ["span", "div", "a", "button"] }
      },
      {
        text: "填写主页名称=SolarStoragePRO，类别选 Energy/Manufacturing，然后保存",
        find: { text: ["名称", "主页名称", "Page Name", "Energy"], tag: ["input", "label", "span", "div"] }
      },
      {
        text: "回到广告编辑器，确认身份区域已显示 SolarStoragePRO，然后继续创建广告",
        find: { text: ["继续", "发布", "下一步"], tag: ["button", "div", "span"] }
      },
    ],
  },
  {
    id: "fb-create-ads",
    title: "Facebook: 创建储能广告",
    desc: "为 BESS 调频产品创建面向海外电网客户的 Facebook 广告",
    urlPattern: /facebook\.com.*ads|adsmanager\.facebook|business\.facebook/,
    steps: [
      {
        text: "在 Ads Manager 页面，先点左侧绿色的【+ 创建】按钮新建广告系列",
        find: { text: ["创建", "+ 创建", "新建"], tag: ["button", "div", "span", "a"] }
      },
      {
        text: "选择【流量 Traffic】作为广告目标（B2B 广告初期首选这个）",
        find: { text: ["流量", "Traffic", "流量广告"], tag: ["div", "span", "h", "label"] }
      },
      {
        text: "在广告组层级设置受众：地区=澳洲/欧洲/东南亚，年龄=28-55，兴趣=Renewable Energy",
        find: { text: ["受众", "地区", "国家", "Audience"], tag: ["span", "div", "h", "label"] }
      },
      {
        text: "日预算设为 $20-30 用于测试，选【单日预算】",
        find: { text: ["预算", "Budget", "单日"], tag: ["span", "div", "h", "input"] }
      },
      {
        text: "在广告层级上传产品图，文案突出 200ms 调频响应，链接到 /technology 页面",
        find: { text: ["广告", "Ad", "图片", "Image"], tag: ["span", "div", "h", "button"] }
      },
      {
        text: "最后检查：身份=SolarStoragePRO，受众=B2B，网址正确，点【发布】",
        find: { text: ["发布", "Publish", "广告发布"], tag: ["button", "div", "span"] }
      },
    ],
  },
  {
    id: "fb-install-pixel",
    title: "Facebook: 验证 Meta Pixel",
    desc: "确认网站上的 Pixel 追踪代码正常工作",
    urlPattern: /business\.facebook.*events|facebook\.com.*events_manager/,
    steps: [
      {
        text: "打开 business.facebook.com/events_manager 事件管理工具",
        find: { text: ["事件管理", "Event Manager", "事件"], tag: ["span", "div", "h", "a"] }
      },
      {
        text: "在列表中找到你的 Pixel（SolarStoragePRO Pixel），点击进入详情",
        find: { text: ["SolarStorage", "Pixel", "像素"], tag: ["span", "div", "a"] }
      },
      {
        text: "切换到【测试事件 Test Events】标签页，准备测试",
        find: { text: ["测试", "Test", "测试事件"], tag: ["span", "div", "button", "tab"] }
      },
      {
        text: "在另一个标签页打开 solarstoragepro.com，滚动超过一半页面，等30秒，再点WhatsApp按钮——观察这里是否出现事件",
        find: { text: ["实时事件", "Real-time", "事件日志"], tag: ["span", "div", "h"] }
      },
    ],
  },
];
