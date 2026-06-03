export const routes = [
  {
    id: "quick-90",
    key: "A",
    color: "#e47b28",
    duration: { zh: "90分钟", en: "90 min" },
    name: { zh: "90分钟速览路线", en: "90-Minute Highlights Route" },
    feature: {
      zh: "适合团队游客、商务考察、时间紧张游客。",
      en: "Best for tour groups, business inspections, and time-limited visitors."
    },
    nodes: [
      "visitor_center",
      "welcome_plaza",
      "hexi_ancient_street",
      "town_square",
      "opera_house",
      "ancient_wharf",
      "wind_rain_bridge",
      "east_market"
    ]
  },
  {
    id: "classic-cultural",
    key: "B",
    color: "#217c57",
    duration: { zh: "3小时", en: "3 hours" },
    name: { zh: "3小时经典文化路线", en: "3-Hour Classic Culture Route" },
    feature: {
      zh: "最适合展示文化讲解、多语导览和景区语言服务能力。",
      en: "Ideal for demonstrating cultural interpretation, multilingual guides, and scenic language services."
    },
    nodes: [
      "visitor_center",
      "hexi_ancient_street",
      "old_teahouse",
      "shanhe_academy",
      "stone_gallery",
      "town_square",
      "opera_house",
      "heritage_workshop",
      "ancient_wharf",
      "yunxi_water_street"
    ]
  },
  {
    id: "half-day",
    key: "C",
    color: "#8b5a2b",
    duration: { zh: "半日", en: "Half day" },
    name: { zh: "半日深度游路线", en: "Half-Day In-depth Route" },
    feature: {
      zh: "适合旅游团、研学团、外籍深度游客。",
      en: "Designed for tour groups, study groups, and international visitors seeking deeper experiences."
    },
    nodes: [
      "visitor_center",
      "hexi_ancient_street",
      "city_wall_ruins",
      "west_gate",
      "shanhe_academy",
      "opera_square",
      "heritage_workshop",
      "ancient_wharf",
      "night_pier",
      "east_market"
    ]
  },
  {
    id: "mountain-view",
    key: "D",
    color: "#34986b",
    duration: { zh: "3小时", en: "3 hours" },
    name: { zh: "山地观景路线", en: "Mountain View Route" },
    feature: {
      zh: "适合年轻游客、摄影游客、自然景观游客。",
      en: "Suited to young visitors, photographers, and nature-view lovers."
    },
    nodes: [
      "visitor_center",
      "town_square",
      "cableway",
      "lanyue_pavilion",
      "spruce_trail",
      "yunding_viewpoint",
      "photo_deck",
      "wind_pavilion",
      "cableway"
    ]
  },
  {
    id: "night-riverside",
    key: "E",
    color: "#7c4da8",
    duration: { zh: "夜游", en: "Night tour" },
    name: { zh: "滨水夜游路线", en: "Riverside Night Route" },
    feature: {
      zh: "适合展示夜间经济、夜游导览、灯光打卡和水岸消费场景。",
      en: "Highlights night economy, lighting check-ins, riverside spending, and night guide scenarios."
    },
    nodes: [
      "east_market",
      "moon_bridge",
      "yunxi_water_street",
      "river_lantern_square",
      "ancient_wharf",
      "night_pier",
      "wind_rain_bridge",
      "river_view_terrace"
    ]
  },
  {
    id: "family-study",
    key: "F",
    color: "#d6a82c",
    duration: { zh: "半日", en: "Half day" },
    name: { zh: "亲子研学路线", en: "Family Study Route" },
    feature: {
      zh: "适合亲子游客、研学团队、学校实践活动。",
      en: "For families, study groups, and school field activities."
    },
    nodes: [
      "visitor_center",
      "heritage_workshop",
      "sugar_painting",
      "nature_classroom",
      "tea_museum",
      "flower_trail",
      "riverside_homestay"
    ]
  },
  {
    id: "international-friendly",
    key: "G",
    color: "#cf5b34",
    duration: { zh: "3小时", en: "3 hours" },
    name: { zh: "国际游客友好路线", en: "International Visitor-friendly Route" },
    feature: {
      zh: "每个点位提供英文介绍、文化背景解释、AI语音导览和国际游客提示。",
      en: "Each stop provides English introductions, cultural background, AI audio guides, and international visitor tips."
    },
    nodes: [
      "visitor_center",
      "hexi_ancient_street",
      "shanhe_academy",
      "opera_house",
      "heritage_workshop",
      "ancient_wharf",
      "wind_rain_bridge",
      "east_market"
    ]
  }
];

export const recommendRules = [
  {
    routeId: "night-riverside",
    matches: ["夜游", "Night tour", "夜游演艺", "Night shows"],
    reason: {
      zh: "你选择了夜游或夜间演艺偏好，滨水夜游路线能集中展示灯光、游船、河灯活动和水岸消费场景。",
      en: "Your choices point to night experiences, so this route highlights lighting, cruises, river lanterns, and riverside leisure."
    }
  },
  {
    routeId: "family-study",
    matches: ["亲子游客", "Families", "研学团队", "Study groups", "非遗体验", "Heritage experiences"],
    reason: {
      zh: "该路线把非遗体验、糖画互动、自然课堂和茶文化串联起来，适合亲子和研学场景。",
      en: "This route connects heritage workshops, sugar painting, nature education, and tea culture for family and study visits."
    }
  },
  {
    routeId: "mountain-view",
    matches: ["摄影游客", "Photographers", "自然观景", "Nature views"],
    reason: {
      zh: "山地观景路线包含索道、观景台和摄影平台，适合自然景观与摄影需求。",
      en: "The mountain route includes the cableway, viewpoints, and photo decks for nature and photography needs."
    }
  },
  {
    routeId: "international-friendly",
    matches: ["国际游客", "International visitors"],
    reason: {
      zh: "国际游客友好路线覆盖核心文化点位，并强调英文介绍、AI语音导览和国际游客提示。",
      en: "The international-friendly route covers core cultural stops with English content, AI audio, and visitor tips."
    }
  },
  {
    routeId: "classic-cultural",
    matches: ["3小时", "3 hours", "历史文化", "History & culture"],
    reason: {
      zh: "3小时经典文化路线最能展示古镇文化讲解、双语内容和语言资产复用价值。",
      en: "The 3-hour culture route best demonstrates interpretation, bilingual content, and reusable language assets."
    }
  },
  {
    routeId: "quick-90",
    matches: ["1小时", "1 hour"],
    reason: {
      zh: "速览路线覆盖游客中心、古街、戏楼、码头和东市商街，适合时间紧张的快速展示。",
      en: "The highlights route covers service, old street, opera, wharf, and market areas for a compact visit."
    }
  }
];
