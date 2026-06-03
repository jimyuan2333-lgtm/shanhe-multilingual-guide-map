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
      [19, 72], [22, 68], [27, 63], [32, 58], [38, 56], [45, 55],
      [48, 52], [52, 54], [56, 56], [52, 60], [48, 65], [47, 67],
      [52, 64], [57, 58], [60, 49], [67, 51], [77, 53]
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
      [19, 72], [22, 68], [27, 63], [32, 58], [34, 52], [36, 47],
      [38, 43], [42, 39], [48, 34], [51, 36], [52, 42], [50, 48],
      [48, 52], [52, 54], [56, 56], [50, 57], [44, 56], [41, 55],
      [42, 61], [47, 67], [53, 64], [60, 58], [70, 48]
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
      [19, 72], [22, 68], [27, 63], [32, 58], [34, 52], [32, 46],
      [29, 41], [26, 36], [22, 39], [30, 42], [38, 43], [46, 36],
      [48, 31], [53, 39], [56, 50], [58, 61], [50, 58], [44, 56],
      [41, 55], [43, 62], [47, 67], [54, 70], [61, 68], [67, 61],
      [72, 56], [77, 53]
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
      [19, 72], [22, 68], [30, 64], [38, 58], [48, 52], [51, 45],
      [55, 38], [60, 30], [66, 22], [72, 23], [76, 18], [78, 12],
      [75, 20], [70, 18], [64, 24], [58, 34], [52, 44]
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
      [77, 53], [76, 48], [74, 44], [71, 45], [70, 48], [68, 51],
      [66, 53], [61, 57], [55, 61], [50, 64], [47, 67], [54, 70],
      [60, 69], [62, 62], [60, 49], [66, 46], [74, 43], [82, 40]
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
      [19, 72], [22, 68], [30, 64], [38, 58], [41, 55], [39, 59],
      [48, 64], [58, 69], [68, 74], [78, 77], [84, 76], [80, 78],
      [76, 79], [71, 82], [62, 80], [51, 75], [39, 70]
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
      [19, 72], [22, 68], [27, 63], [32, 58], [34, 52], [38, 43],
      [45, 36], [48, 31], [52, 43], [56, 56], [50, 57], [44, 56],
      [41, 55], [43, 62], [47, 67], [52, 64], [57, 58], [60, 49],
      [68, 51], [77, 53]
    ]
  }
];

const routeLocales = {
  "quick-90": {
    duration: { ja: "90分", ko: "90분", fr: "90 min", de: "90 Min.", ru: "90 мин", hi: "90 मिनट", ar: "90 دقيقة", th: "90 นาที" },
    name: { ja: "90分ハイライトルート", ko: "90분 핵심 코스", fr: "Parcours express de 90 minutes", de: "90-Minuten-Highlights", ru: "Маршрут на 90 минут", hi: "90 मिनट का मुख्य मार्ग", ar: "مسار أبرز المعالم في 90 دقيقة", th: "เส้นทางไฮไลต์ 90 นาที" },
    feature: { ja: "団体、ビジネス視察、時間の限られた旅行者に適しています。", ko: "단체 방문객, 비즈니스 답사, 시간이 부족한 방문객에게 적합합니다.", fr: "Idéal pour les groupes, les visites professionnelles et les visiteurs pressés.", de: "Geeignet für Gruppen, Geschäftsbesuche und Gäste mit wenig Zeit.", ru: "Подходит для групп, деловых визитов и гостей с ограниченным временем.", hi: "समूहों, व्यावसायिक निरीक्षण और कम समय वाले पर्यटकों के लिए उपयुक्त।", ar: "مناسب للمجموعات والزيارات المهنية والزوار محدودي الوقت.", th: "เหมาะสำหรับกรุ๊ปทัวร์ การดูงาน และผู้มีเวลาจำกัด" }
  },
  "classic-cultural": {
    duration: { ja: "3時間", ko: "3시간", fr: "3 heures", de: "3 Stunden", ru: "3 часа", hi: "3 घंटे", ar: "3 ساعات", th: "3 ชั่วโมง" },
    name: { ja: "3時間クラシック文化ルート", ko: "3시간 클래식 문화 코스", fr: "Parcours culturel classique de 3 heures", de: "Klassische Kulturroute, 3 Stunden", ru: "Классический культурный маршрут на 3 часа", hi: "3 घंटे का क्लासिक सांस्कृतिक मार्ग", ar: "مسار ثقافي كلاسيكي لمدة 3 ساعات", th: "เส้นทางวัฒนธรรมคลาสสิก 3 ชั่วโมง" },
    feature: { ja: "文化解説、多言語ガイド、景区の言語サービス力を示すのに最適です。", ko: "문화 해설, 다국어 안내, 관광지 언어 서비스 역량을 보여주기에 가장 적합합니다.", fr: "Le meilleur choix pour présenter l'interprétation culturelle et les services multilingues.", de: "Ideal, um Kulturvermittlung und mehrsprachige Services zu zeigen.", ru: "Лучше всего демонстрирует культурное сопровождение и многоязычные сервисы.", hi: "सांस्कृतिक व्याख्या, बहुभाषी गाइड और भाषा सेवा क्षमता दिखाने के लिए सर्वोत्तम।", ar: "الأفضل لعرض الشرح الثقافي وخدمات الإرشاد متعددة اللغات.", th: "เหมาะที่สุดสำหรับแสดงการบรรยายวัฒนธรรมและบริการหลายภาษา" }
  },
  "half-day": {
    duration: { ja: "半日", ko: "반나절", fr: "Demi-journée", de: "Halber Tag", ru: "Полдня", hi: "आधा दिन", ar: "نصف يوم", th: "ครึ่งวัน" },
    name: { ja: "半日じっくり周遊ルート", ko: "반나절 심층 코스", fr: "Parcours approfondi d'une demi-journée", de: "Halbtägige Intensivroute", ru: "Углубленный маршрут на полдня", hi: "आधा दिन गहन भ्रमण मार्ग", ar: "مسار معمق لنصف يوم", th: "เส้นทางเจาะลึกครึ่งวัน" },
    feature: { ja: "旅行団、学習団体、深く体験したい海外旅行者向けです。", ko: "관광단, 학습 단체, 심층 체험을 원하는 외국인 방문객에게 적합합니다.", fr: "Pour les groupes touristiques, scolaires et les visiteurs internationaux curieux.", de: "Für Reisegruppen, Studiengruppen und internationale Gäste mit vertieftem Interesse.", ru: "Для туристических групп, учебных групп и иностранных гостей.", hi: "टूर समूहों, शैक्षिक समूहों और गहन अनुभव चाहने वाले विदेशी पर्यटकों के लिए।", ar: "مناسب للمجموعات السياحية والتعليمية والزوار الدوليين المهتمين بالتعمق.", th: "เหมาะกับกรุ๊ปทัวร์ คณะศึกษา และนักท่องเที่ยวต่างชาติที่อยากลงลึก" }
  },
  "mountain-view": {
    duration: { ja: "3時間", ko: "3시간", fr: "3 heures", de: "3 Stunden", ru: "3 часа", hi: "3 घंटे", ar: "3 ساعات", th: "3 ชั่วโมง" },
    name: { ja: "山地展望ルート", ko: "산악 전망 코스", fr: "Parcours panoramique de montagne", de: "Bergpanorama-Route", ru: "Горный обзорный маршрут", hi: "पर्वतीय दृश्य मार्ग", ar: "مسار الإطلالات الجبلية", th: "เส้นทางชมวิวภูเขา" },
    feature: { ja: "若い旅行者、写真愛好家、自然景観を楽しむ方に適しています。", ko: "젊은 방문객, 사진 여행객, 자연 경관을 즐기는 방문객에게 적합합니다.", fr: "Pour les jeunes visiteurs, photographes et amateurs de paysages naturels.", de: "Für junge Gäste, Fotografen und Naturliebhaber.", ru: "Для молодых гостей, фотографов и любителей природы.", hi: "युवा पर्यटकों, फोटोग्राफरों और प्राकृतिक दृश्य पसंद करने वालों के लिए।", ar: "مناسب للشباب ومحبي التصوير والمناظر الطبيعية.", th: "เหมาะกับนักท่องเที่ยววัยรุ่น ช่างภาพ และผู้รักธรรมชาติ" }
  },
  "night-riverside": {
    duration: { ja: "夜間観光", ko: "야간 관광", fr: "Visite nocturne", de: "Nachtbesuch", ru: "Ночная прогулка", hi: "रात्रि भ्रमण", ar: "جولة ليلية", th: "เที่ยวกลางคืน" },
    name: { ja: "水辺夜間観光ルート", ko: "수변 야간 코스", fr: "Parcours nocturne riverain", de: "Nächtliche Uferroute", ru: "Ночной маршрут вдоль воды", hi: "नदी किनारे रात्रि मार्ग", ar: "مسار ليلي على الواجهة المائية", th: "เส้นทางเที่ยวกลางคืนริมน้ำ" },
    feature: { ja: "夜間経済、ライトアップ、撮影スポット、水辺消費を示します。", ko: "야간 경제, 조명 포인트, 수변 소비 장면을 보여줍니다.", fr: "Met en valeur l'économie nocturne, les lumières et les loisirs au bord de l'eau.", de: "Zeigt Nachtwirtschaft, Lichtpunkte und Konsum am Wasser.", ru: "Показывает ночную экономику, подсветку и отдых у воды.", hi: "रात्रि अर्थव्यवस्था, रोशनी, फोटो स्थल और नदी किनारे अवकाश दिखाता है।", ar: "يعرض اقتصاد الليل والإضاءة ونقاط التصوير والترفيه على الماء.", th: "นำเสนอเศรษฐกิจยามค่ำ แสงไฟ จุดถ่ายรูป และกิจกรรมริมน้ำ" }
  },
  "family-study": {
    duration: { ja: "半日", ko: "반나절", fr: "Demi-journée", de: "Halber Tag", ru: "Полдня", hi: "आधा दिन", ar: "نصف يوم", th: "ครึ่งวัน" },
    name: { ja: "親子学習ルート", ko: "가족 학습 코스", fr: "Parcours famille et découverte", de: "Familien- und Lernroute", ru: "Семейно-образовательный маршрут", hi: "परिवार और शैक्षिक मार्ग", ar: "مسار عائلي تعليمي", th: "เส้นทางครอบครัวและการเรียนรู้" },
    feature: { ja: "親子、学習団体、学校の実践活動に適しています。", ko: "가족 방문객, 학습 단체, 학교 체험 활동에 적합합니다.", fr: "Adapté aux familles, groupes scolaires et activités éducatives.", de: "Für Familien, Studiengruppen und Schulaktivitäten.", ru: "Для семей, учебных групп и школьных практик.", hi: "परिवार, शैक्षिक समूह और स्कूल गतिविधियों के लिए उपयुक्त।", ar: "مناسب للعائلات والمجموعات التعليمية والأنشطة المدرسية.", th: "เหมาะกับครอบครัว คณะศึกษา และกิจกรรมโรงเรียน" }
  },
  "international-friendly": {
    duration: { ja: "3時間", ko: "3시간", fr: "3 heures", de: "3 Stunden", ru: "3 часа", hi: "3 घंटे", ar: "3 ساعات", th: "3 ชั่วโมง" },
    name: { ja: "海外旅行者フレンドリールート", ko: "외국인 친화 코스", fr: "Parcours adapté aux visiteurs internationaux", de: "Route für internationale Gäste", ru: "Маршрут для иностранных гостей", hi: "अंतरराष्ट्रीय पर्यटक अनुकूल मार्ग", ar: "مسار ملائم للزوار الدوليين", th: "เส้นทางสำหรับนักท่องเที่ยวต่างชาติ" },
    feature: { ja: "各スポットに多言語紹介、文化背景、AI音声ガイド、旅行者向けヒントを用意します。", ko: "각 지점에 다국어 소개, 문화 배경, AI 음성 안내, 방문 팁을 제공합니다.", fr: "Chaque arrêt propose des contenus multilingues, un contexte culturel, un audioguide IA et des conseils.", de: "Jeder Halt bietet mehrsprachige Inhalte, kulturellen Kontext, KI-Audio und Hinweise.", ru: "На каждой точке есть многоязычное описание, культурный контекст, ИИ-аудиогид и советы.", hi: "हर बिंदु पर बहुभाषी परिचय, सांस्कृतिक पृष्ठभूमि, AI ऑडियो और सुझाव मिलते हैं।", ar: "يوفر كل موقع تعريفا متعدد اللغات وخلفية ثقافية ودليلا صوتيا بالذكاء الاصطناعي ونصائح.", th: "แต่ละจุดมีคำอธิบายหลายภาษา ภูมิหลังทางวัฒนธรรม เสียงนำเที่ยว AI และคำแนะนำ" }
  }
};

routes.forEach((route) => {
  const locale = routeLocales[route.id];
  if (!locale) return;
  Object.assign(route.duration, locale.duration);
  Object.assign(route.name, locale.name);
  Object.assign(route.feature, locale.feature);
});

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
