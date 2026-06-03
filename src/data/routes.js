export const routes = [
  {
    id: "quick-90",
    key: "A",
    color: "#e47b28",
    style: "quick",
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
    ],
    path: [
      [19, 72], [22, 68], [26, 62], [30, 55], [34, 49], [40, 52],
      [48, 52], [53, 54], [56, 56], [52, 62], [47, 67], [53, 63],
      [60, 49], [69, 51], [77, 53]
    ]
  },
  {
    id: "classic-cultural",
    key: "B",
    color: "#217c57",
    style: "culture",
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
    ],
    path: [
      [19, 72], [24, 66], [29, 59], [32, 47], [35, 42], [36, 40],
      [42, 36], [48, 31], [51, 35], [53, 38], [50, 45], [48, 52],
      [52, 54], [56, 56], [50, 57], [41, 55], [42, 61], [47, 67],
      [55, 62], [63, 56], [70, 48]
    ]
  },
  {
    id: "half-day",
    key: "C",
    color: "#8b5a2b",
    style: "deep",
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
    ],
    path: [
      [19, 72], [24, 66], [30, 56], [32, 47], [28, 39], [26, 33],
      [22, 39], [32, 43], [42, 36], [48, 31], [55, 44], [58, 61],
      [50, 58], [41, 55], [45, 64], [47, 67], [54, 70], [60, 69],
      [66, 62], [72, 56], [77, 53]
    ]
  },
  {
    id: "mountain-view",
    key: "D",
    color: "#0f766e",
    style: "mountain",
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
    ],
    path: [
      [19, 72], [28, 65], [40, 58], [48, 52], [52, 44], [56, 37],
      [62, 27], [66, 18], [72, 23], [76, 18], [78, 12], [75, 20],
      [70, 14], [64, 24], [56, 37], [52, 44]
    ]
  },
  {
    id: "night-riverside",
    key: "E",
    color: "#7651c7",
    style: "night",
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
    ],
    path: [
      [77, 53], [76, 47], [74, 41], [71, 45], [70, 48], [68, 51],
      [66, 52], [60, 58], [52, 63], [47, 67], [54, 70], [60, 69],
      [62, 60], [60, 49], [72, 44], [82, 40]
    ]
  },
  {
    id: "family-study",
    key: "F",
    color: "#e47b28",
    style: "family",
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
    ],
    path: [
      [19, 72], [27, 68], [36, 62], [41, 55], [39, 59], [48, 64],
      [60, 69], [72, 72], [84, 76], [80, 78], [76, 79], [71, 82],
      [60, 78], [48, 72], [39, 70]
    ]
  },
  {
    id: "international-friendly",
    key: "G",
    color: "#2477b3",
    style: "international",
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
    ],
    path: [
      [19, 72], [25, 65], [32, 47], [39, 39], [48, 31], [52, 43],
      [56, 56], [49, 57], [41, 55], [45, 64], [47, 67], [54, 61],
      [60, 49], [69, 51], [77, 53]
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
