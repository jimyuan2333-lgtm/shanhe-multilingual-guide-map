export const MAP_SIZE = {
  width: 1394,
  height: 1128
};

export const mapZones = [
  {
    id: "old-town",
    name: { zh: "古镇文化区", en: "Old Town Culture Area" },
    x: 34,
    y: 52,
    color: "#8a5a2d"
  },
  {
    id: "heritage",
    name: { zh: "非遗演艺区", en: "Heritage Performance Area" },
    x: 47,
    y: 58,
    color: "#b86932"
  },
  {
    id: "riverside-night",
    name: { zh: "滨水夜游区", en: "Riverside Night Tour Area" },
    x: 66,
    y: 56,
    color: "#7451a6"
  },
  {
    id: "mountain",
    name: { zh: "山地观景区", en: "Mountain View Area" },
    x: 75,
    y: 17,
    color: "#23745c"
  },
  {
    id: "east-bank",
    name: { zh: "东岸休闲区", en: "East Bank Leisure Area" },
    x: 80,
    y: 54,
    color: "#247f9e"
  },
  {
    id: "tea-valley",
    name: { zh: "茶山花谷区", en: "Tea Hill Flower Valley" },
    x: 80,
    y: 78,
    color: "#cf7d2f"
  }
];

export const typeDisplayLabels = {
  service: { zh: "游客服务", en: "Visitor Service" },
  attraction: { zh: "核心景点", en: "Attraction" },
  culture: { zh: "文化体验", en: "Culture" },
  performance: { zh: "演艺非遗", en: "Performance" },
  heritage: { zh: "非遗体验", en: "Heritage" },
  waterfront: { zh: "滨水景点", en: "Waterfront" },
  landmark: { zh: "地标桥梁", en: "Landmark" },
  transport: { zh: "交通接驳", en: "Transport" },
  nature: { zh: "自然观景", en: "Nature" },
  dining: { zh: "餐饮休闲", en: "Dining" },
  accommodation: { zh: "住宿", en: "Accommodation" },
  photo: { zh: "拍照点", en: "Photo Spot" },
  shopping: { zh: "文创购物", en: "Shopping" },
  night: { zh: "夜游", en: "Night Tour" },
  history: { zh: "历史遗址", en: "History" },
  family: { zh: "亲子研学", en: "Family" },
  education: { zh: "研学教育", en: "Education" },
  experience: { zh: "体验项目", en: "Experience" }
};

export const poiAliases = {
  visitor_center: ["游客中心", "服务中心", "入口", "ticket", "visitor", "service", "information", "help"],
  welcome_plaza: ["迎宾", "入口广场", "gate", "welcome", "plaza"],
  hexi_ancient_street: ["河西", "古街", "old street", "ancient street", "heritage street"],
  old_teahouse: ["茶馆", "茶", "tea", "teahouse"],
  herbal_pharmacy: ["药铺", "中医", "草药", "pharmacy", "herbal", "medicine"],
  shanhe_academy: ["书院", "研学", "academy", "school", "education"],
  opera_house: ["戏楼", "演出", "川剧", "戏曲", "opera", "show", "performance", "theater"],
  heritage_workshop: ["非遗", "工坊", "剪纸", "扎染", "heritage", "workshop", "craft"],
  ancient_wharf: ["码头", "游船", "船", "boat", "cruise", "wharf", "pier"],
  night_pier: ["夜游码头", "夜游", "游船", "night cruise", "pier"],
  yunxi_water_street: ["水街", "美食", "河岸", "food", "riverside", "water street"],
  wind_rain_bridge: ["风雨桥", "桥", "bridge", "photo"],
  moon_bridge: ["月影桥", "桥", "夜景", "bridge", "night"],
  east_market: ["东市", "商街", "咖啡", "购物", "market", "shopping", "coffee"],
  tea_valley: ["茶山", "花谷", "亲子", "flower", "tea", "valley", "family"]
};

export const facilityAliases = {
  restroom: ["厕所", "卫生间", "洗手间", "toilet", "bathroom", "wc", "restroom", "nearest restroom"],
  parking: ["停车场", "停车", "parking", "car park", "park"],
  service: ["服务点", "咨询", "service", "information"],
  firstAid: ["急救", "医疗", "first aid", "medical", "emergency"],
  security: ["安保", "警务", "security", "police", "help"],
  charging: ["充电", "充电站", "power", "charging", "battery"],
  nursing: ["母婴", "亲子", "nursing", "baby", "family care"],
  accessible: ["无障碍", "轮椅", "accessible", "wheelchair"],
  dining: ["餐饮", "吃饭", "美食", "food", "dining", "restaurant", "coffee"],
  accommodation: ["住宿", "酒店", "民宿", "hotel", "homestay", "stay"]
};

export function normalizeOpen(open) {
  if (typeof open !== "string") return open;
  const known = {
    "全天开放": { zh: "全天开放", en: "Open all day" },
    "24小时": { zh: "24小时", en: "24 hours" }
  };
  return known[open] || { zh: open, en: open };
}

const keywordDictionary = {
  游客服务: "visitor service",
  多语咨询: "multilingual support",
  应急协助: "emergency assistance",
  入口形象: "entrance image",
  牌坊: "town gate",
  扫码导览: "QR guide",
  古街巷: "old lanes",
  商铺: "shops",
  生活记忆: "daily memory",
  茶文化: "tea culture",
  慢生活: "slow lifestyle",
  地方饮食: "local food",
  书院: "academy",
  地方文脉: "local heritage",
  教育: "education",
  地方戏曲: "local opera",
  川剧: "Sichuan Opera",
  非遗演艺: "heritage performance",
  剪纸: "paper-cutting",
  扎染: "tie-dye",
  木雕: "woodcarving",
  糖画: "sugar painting",
  水路交通: "water transport",
  游船: "cruise",
  夜游: "night tour",
  桥梁: "bridge",
  打卡: "photo check-in",
  最高点: "highest viewpoint",
  全景: "panorama",
  文创: "creative products",
  咖啡: "coffee",
  特色零售: "local retail"
};

export function normalizeKeywords(keywords) {
  if (!keywords) return { zh: [], en: [] };
  if (!Array.isArray(keywords)) return keywords;
  return {
    zh: keywords,
    en: keywords.map((item) => keywordDictionary[item] || item)
  };
}

export function getReadableType(item, lang, facilityLabels) {
  if (item.distance) return facilityLabels[item.type]?.[lang] || item.type;
  const firstType = item.type?.split(/[\/_]/)?.[0];
  return typeDisplayLabels[firstType]?.[lang] || firstType || "";
}

export function parseDistanceMeters(distance) {
  const text = typeof distance === "string" ? distance : distance?.zh || "";
  const value = Number(text.replace(/[^\d.]/g, ""));
  if (!Number.isFinite(value)) return 99999;
  return text.includes("公里") || text.toLowerCase().includes("km") ? value * 1000 : value;
}
