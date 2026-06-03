export const SVG_DATA_ASSET = "/assets/shanhe_navigation_map.svg";
export const SVG_MAP_ASSET = "/assets/shanhe-guide-clean.png";
export const POSTER_MAP_ASSET = "/assets/shanhe-guide-poster-full.png";

export const SVG_MAP_SIZE = {
  width: 1536,
  height: 1024
};

const zoneColors = {
  entry: "#f59e0b",
  culture: "#16a34a",
  performance: "#e11d48",
  waterfront: "#0ea5e9",
  eastmarket: "#8b5cf6",
  mountain: "#22c55e",
  tea: "#f97316"
};

const routeDetails = {
  route_short: {
    key: "A",
    style: "quick",
    duration: { zh: "90分钟", en: "90 min" },
    feature: {
      zh: "适合团队游客、商务考察、时间紧张游客。",
      en: "Best for tour groups, business inspections, and time-limited visitors."
    }
  },
  route_classic: {
    key: "B",
    style: "culture",
    duration: { zh: "3小时", en: "3 hours" },
    feature: {
      zh: "最适合展示文化讲解、多语导览和景区语言服务能力。",
      en: "Ideal for demonstrating cultural interpretation, multilingual guides, and scenic language services."
    }
  },
  route_deep: {
    key: "C",
    style: "deep",
    duration: { zh: "半日", en: "Half day" },
    feature: {
      zh: "适合旅游团、研学团、外籍深度游客。",
      en: "Designed for tour groups, study groups, and international visitors seeking deeper experiences."
    }
  },
  route_mountain: {
    key: "D",
    style: "mountain",
    duration: { zh: "3小时", en: "3 hours" },
    feature: {
      zh: "适合年轻游客、摄影游客、自然景观游客。",
      en: "Suited to young visitors, photographers, and nature-view lovers."
    }
  },
  route_night: {
    key: "E",
    style: "night",
    duration: { zh: "夜游", en: "Night tour" },
    feature: {
      zh: "适合展示夜间经济、夜游导览、灯光打卡和水岸消费场景。",
      en: "Highlights night economy, lighting check-ins, riverside spending, and night guide scenarios."
    }
  },
  route_family: {
    key: "F",
    style: "family",
    duration: { zh: "半日", en: "Half day" },
    feature: {
      zh: "适合亲子游客、研学团队、学校实践活动。",
      en: "For families, study groups, and school field activities."
    }
  },
  route_international: {
    key: "G",
    style: "international",
    duration: { zh: "3小时", en: "3 hours" },
    feature: {
      zh: "每个点位提供英文介绍、文化背景解释、AI语音导览和国际游客提示。",
      en: "Each stop provides English introductions, cultural background, AI audio guides, and international visitor tips."
    }
  }
};

export const legacyRouteIdMap = {
  "quick-90": "route_short",
  "classic-cultural": "route_classic",
  "half-day": "route_deep",
  "mountain-view": "route_mountain",
  "night-riverside": "route_night",
  "family-study": "route_family",
  "international-friendly": "route_international"
};

function decodeText(value = "") {
  return value.replaceAll("&amp;", "&");
}

function distance(a, b) {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

function pointKey(point) {
  return `${Number(point[0]).toFixed(2)},${Number(point[1]).toFixed(2)}`;
}

function displayDistanceFromEntry(point) {
  const meters = Math.max(40, Math.round(distance([18, 82], point) * 55));
  if (meters >= 1000) {
    return { zh: `${(meters / 1000).toFixed(1)}公里`, en: `${(meters / 1000).toFixed(1)} km` };
  }
  return { zh: `${meters}米`, en: `${meters} m` };
}

function categoriesFromType(type, isFacility = false) {
  if (isFacility) return ["facilities", type === "parking" ? "transport" : type];
  const firstType = type?.split(/[\/_]/)?.[0];
  const groups = {
    service: ["facilities", "transport"],
    attraction: ["attractions"],
    culture: ["culture"],
    performance: ["performance"],
    heritage: ["performance", "culture"],
    waterfront: ["nature"],
    landmark: ["attractions", "photo"],
    transport: ["transport"],
    nature: ["nature"],
    dining: ["dining"],
    shopping: ["culture"],
    accommodation: ["accommodation"],
    photo: ["photo"],
    history: ["culture", "nature"],
    family: ["nature", "culture"],
    education: ["culture"]
  };
  return groups[firstType] || ["attractions"];
}

function defaultIntro(item, isFacility = false) {
  if (isFacility) {
    return {
      zh: `${item.nameZh}位于可通行路网附近，可通过导航前往。`,
      en: `${item.nameEn} is located near the walkable network and can be reached by navigation.`
    };
  }
  return {
    zh: `${item.nameZh}是山河古镇导览系统中的重要点位，支持多语展示与路线串联。`,
    en: `${item.nameEn} is a key stop in the Shanhe guide system, with multilingual content and route links.`
  };
}

function routePathFromStops(stopIds, poiMap, dataset) {
  const path = [];
  for (let index = 0; index < stopIds.length - 1; index += 1) {
    const from = poiMap.get(stopIds[index]);
    const to = poiMap.get(stopIds[index + 1]);
    const segment = findNetworkPath(from, to, dataset);
    segment.forEach((point) => {
      const last = path[path.length - 1];
      if (!last || pointKey(last) !== pointKey(point)) path.push(point);
    });
  }
  return path;
}

export function parseSvgMapMetadata(svgText) {
  const match = svgText.match(/<metadata id="shanhe-map-data"><!\[CDATA\[([\s\S]*?)\]\]><\/metadata>/);
  if (!match) throw new Error("SVG metadata shanhe-map-data was not found.");
  return JSON.parse(match[1]);
}

export function hydrateSvgMapData(raw, richPois = [], richFacilities = []) {
  const richPoiMap = new Map(richPois.map((item) => [item.id, item]));
  const richFacilityMap = new Map(richFacilities.map((item) => [item.id, item]));

  const zones = raw.zones.map((zone) => ({
    id: zone.id,
    name: { zh: zone.nameZh, en: decodeText(zone.nameEn) },
    x: zone.center[0],
    y: zone.center[1],
    polygon: zone.polygon,
    color: zoneColors[zone.id] || "#236d54"
  }));

  const pois = raw.pois.map((item, index) => {
    const rich = richPoiMap.get(item.id);
    const intro = rich?.intro || defaultIntro(item);
    return {
      ...rich,
      id: item.id,
      name: { zh: item.nameZh, en: decodeText(item.nameEn) },
      type: item.type,
      category: rich?.category || categoriesFromType(item.type),
      x: item.position[0],
      y: item.position[1],
      level: rich?.level || (index < 14 ? 1 : index < 34 ? 2 : 3),
      road: item.road,
      roadIndex: item.roadIndex,
      offset: item.offset,
      stay: rich?.stay || { zh: "15分钟", en: "15 min" },
      open: rich?.open || { zh: "全天开放", en: "Open all day" },
      intro,
      audience: rich?.audience || { zh: "普通游客、国际游客", en: "General and international visitors" },
      keywords: rich?.keywords || { zh: [item.nameZh], en: [decodeText(item.nameEn)] },
      audio: rich?.audio ?? true,
      accessible: rich?.accessible ?? true
    };
  });

  const facilities = raw.facilities.map((item, index) => {
    const rich = richFacilityMap.get(item.id);
    const intro = rich?.intro || defaultIntro(item, true);
    return {
      ...rich,
      id: item.id,
      name: { zh: item.nameZh, en: decodeText(item.nameEn) },
      type: item.type,
      category: categoriesFromType(item.type, true),
      x: item.position[0],
      y: item.position[1],
      level: item.type === "restroom" || item.type === "parking" ? 2 : 3,
      distance: rich?.distance || displayDistanceFromEntry(item.position),
      status: rich?.status || { zh: index % 7 === 0 ? "可用" : "开放", en: index % 7 === 0 ? "Available" : "Open" },
      intro,
      accessible: rich?.accessible ?? item.type !== "photo"
    };
  });

  const poiMap = new Map(pois.map((poi) => [poi.id, poi]));
  const networkDataset = { roads: raw.roads, bridges: raw.bridges };
  const routes = raw.routes.map((route, index) => {
    const details = routeDetails[route.id] || {};
    const networkPath = routePathFromStops(route.pois, poiMap, networkDataset);
    return {
      id: route.id,
      key: details.key || String.fromCharCode(65 + index),
      color: route.color,
      style: details.style || route.id,
      duration: details.duration || { zh: "3小时", en: "3 hours" },
      name: { zh: route.nameZh, en: decodeText(route.nameEn) },
      feature: details.feature || {
        zh: "基于SVG可通行路网生成，避开河流、建筑和山体不可通行区域。",
        en: "Generated from the SVG walkable network, avoiding river, building, and mountain non-walkable areas."
      },
      roads: route.roads,
      nodes: route.pois,
      path: networkPath
    };
  });

  return {
    coordinateSystem: raw.coordinateSystem,
    mapSize: SVG_MAP_SIZE,
    mapAsset: SVG_MAP_ASSET,
    roads: raw.roads,
    bridges: raw.bridges,
    zones,
    pois,
    facilities,
    routes
  };
}

function addEdge(graph, a, b) {
  const aKey = pointKey(a);
  const bKey = pointKey(b);
  if (!graph.has(aKey)) graph.set(aKey, { point: a, links: [] });
  if (!graph.has(bKey)) graph.set(bKey, { point: b, links: [] });
  const weight = distance(a, b);
  graph.get(aKey).links.push({ key: bKey, weight });
  graph.get(bKey).links.push({ key: aKey, weight });
}

function buildGraph(dataset) {
  const graph = new Map();
  const roadPoints = [];
  dataset.roads.forEach((road) => {
    road.points.forEach((point) => roadPoints.push(point));
    for (let index = 0; index < road.points.length - 1; index += 1) {
      addEdge(graph, road.points[index], road.points[index + 1]);
    }
  });
  dataset.bridges.forEach((bridge) => {
    addEdge(graph, bridge.from, bridge.to);
    roadPoints.forEach((point) => {
      if (distance(point, bridge.from) <= 5.2) addEdge(graph, point, bridge.from);
      if (distance(point, bridge.to) <= 5.2) addEdge(graph, point, bridge.to);
    });
  });
  for (let index = 0; index < roadPoints.length; index += 1) {
    for (let next = index + 1; next < roadPoints.length; next += 1) {
      if (distance(roadPoints[index], roadPoints[next]) <= 3.2) addEdge(graph, roadPoints[index], roadPoints[next]);
    }
  }
  return graph;
}

function nearestGraphKey(graph, point) {
  let best = null;
  for (const [key, node] of graph.entries()) {
    const score = distance(point, node.point);
    if (!best || score < best.score) best = { key, score };
  }
  return best?.key;
}

export function findNetworkPath(from, to, dataset) {
  if (!from || !to || !dataset?.roads?.length) return [];
  const graph = buildGraph(dataset);
  const start = nearestGraphKey(graph, [from.x, from.y]);
  const end = nearestGraphKey(graph, [to.x, to.y]);
  if (!start || !end) return [];

  const distances = new Map([[start, 0]]);
  const previous = new Map();
  const queue = new Set(graph.keys());

  while (queue.size) {
    let current = null;
    let currentDistance = Infinity;
    for (const key of queue) {
      const value = distances.get(key) ?? Infinity;
      if (value < currentDistance) {
        current = key;
        currentDistance = value;
      }
    }
    if (!current || current === end) break;
    queue.delete(current);
    for (const link of graph.get(current).links) {
      if (!queue.has(link.key)) continue;
      const nextDistance = currentDistance + link.weight;
      if (nextDistance < (distances.get(link.key) ?? Infinity)) {
        distances.set(link.key, nextDistance);
        previous.set(link.key, current);
      }
    }
  }

  const keys = [];
  let cursor = end;
  while (cursor) {
    keys.unshift(cursor);
    if (cursor === start) break;
    cursor = previous.get(cursor);
  }
  return keys.map((key) => graph.get(key).point);
}
