export const pois = [
  {
    id: "visitor_center",
    name: { zh: "南门游客中心", en: "Visitor Center" },
    type: "service",
    category: ["service", "facilities"],
    x: 19,
    y: 72,
    level: 1,
    stay: { zh: "15分钟", en: "15 min" },
    open: "08:30-18:00",
    intro: {
      zh: "提供票务咨询、导览领取、行李寄存、多语服务和应急协助，是游客进入景区后的第一站。",
      en: "The first stop for ticketing, guide services, luggage storage, multilingual support, and emergency assistance."
    },
    audience: { zh: "全部游客、团队游客、国际游客", en: "All visitors, groups, international visitors" },
    keywords: ["游客服务", "多语咨询", "应急协助"],
    audio: true,
    accessible: true
  },
  {
    id: "welcome_plaza",
    name: { zh: "山河迎宾广场", en: "Welcome Plaza" },
    type: "attraction",
    category: ["attractions"],
    x: 24,
    y: 67,
    level: 1,
    stay: { zh: "10分钟", en: "10 min" },
    open: "08:30-21:30",
    intro: {
      zh: "景区主入口广场，设有山河古镇主题牌坊和多语导览扫码入口。",
      en: "The main entrance plaza featuring the town gate, welcome signage, and QR access to the multilingual guide."
    },
    audience: { zh: "首次到访游客、团队游客", en: "First-time visitors, tour groups" },
    keywords: ["入口形象", "牌坊", "扫码导览"],
    audio: true,
    accessible: true
  },
  {
    id: "hexi_ancient_street",
    name: { zh: "河西古街", en: "Hexi Ancient Street" },
    type: "culture",
    category: ["culture", "attractions"],
    x: 32,
    y: 47,
    level: 1,
    stay: { zh: "45分钟", en: "45 min" },
    open: "全天开放",
    intro: {
      zh: "保存较完整的古镇街巷肌理，两侧分布茶馆、药铺、酒坊和手工糕点铺。",
      en: "A well-preserved old street lined with teahouses, herbal pharmacies, wine workshops, and traditional pastry shops."
    },
    audience: { zh: "文化游客、国际游客、摄影游客", en: "Culture lovers, international visitors, photographers" },
    keywords: ["古街巷", "商铺", "生活记忆"],
    audio: true,
    accessible: false
  },
  {
    id: "old_teahouse",
    name: { zh: "老茶馆", en: "Old Teahouse" },
    type: "dining/culture",
    category: ["dining", "culture"],
    x: 36,
    y: 40,
    level: 2,
    stay: { zh: "25分钟", en: "25 min" },
    open: "09:00-22:00",
    intro: {
      zh: "展示地方茶文化和慢生活场景，适合开展茶文化英文导览。",
      en: "A traditional teahouse presenting local tea culture and the slow-paced lifestyle of the ancient town."
    },
    audience: { zh: "文化游客、休闲游客", en: "Culture lovers, leisure visitors" },
    keywords: ["茶文化", "慢生活", "地方饮食"],
    audio: true,
    accessible: false
  },
  {
    id: "herbal_pharmacy",
    name: { zh: "百年药铺", en: "Century-old Herbal Pharmacy" },
    type: "culture",
    category: ["culture"],
    x: 31,
    y: 44,
    level: 2,
    stay: { zh: "15分钟", en: "15 min" },
    open: "09:00-18:00",
    intro: {
      zh: "以传统中医药文化为主题，展示草药柜、药秤和地方养生知识。",
      en: "A heritage pharmacy displaying traditional herbal medicine, medicine cabinets, and local wellness knowledge."
    },
    audience: { zh: "文化游客、研学团队", en: "Culture visitors, study groups" },
    keywords: ["中医药", "草药柜", "养生"],
    audio: true,
    accessible: false
  },
  {
    id: "old_well",
    name: { zh: "古井", en: "Old Well" },
    type: "culture",
    category: ["culture"],
    x: 28,
    y: 51,
    level: 2,
    stay: { zh: "8分钟", en: "8 min" },
    open: "全天开放",
    intro: {
      zh: "古镇居民生活记忆的重要见证，适合讲解民俗与社区生活。",
      en: "An old well that reflects the daily life and community memory of the ancient town."
    },
    audience: { zh: "亲子游客、文化游客", en: "Families, culture visitors" },
    keywords: ["民俗", "社区生活", "饮水记忆"],
    audio: true,
    accessible: false
  },
  {
    id: "shanhe_academy",
    name: { zh: "山河书院", en: "Shanhe Academy" },
    type: "culture",
    category: ["culture", "attractions"],
    x: 48,
    y: 31,
    level: 1,
    stay: { zh: "35分钟", en: "35 min" },
    open: "09:00-17:30",
    intro: {
      zh: "展示古代教育、地方文脉和书院文化，是研学游的重要点位。",
      en: "A cultural site presenting traditional education, local literary heritage, and academy culture."
    },
    audience: { zh: "研学团队、国际游客、文化游客", en: "Study groups, international visitors, culture lovers" },
    keywords: ["书院", "地方文脉", "教育"],
    audio: true,
    accessible: true
  },
  {
    id: "library_pavilion",
    name: { zh: "藏书楼", en: "Library Pavilion" },
    type: "culture",
    category: ["culture"],
    x: 51,
    y: 35,
    level: 2,
    stay: { zh: "15分钟", en: "15 min" },
    open: "09:00-17:30",
    intro: {
      zh: "书院附属建筑，用于展示古籍、地方志和传统阅读空间。",
      en: "A pavilion displaying ancient books, local records, and traditional reading spaces."
    },
    audience: { zh: "研学团队、文化游客", en: "Study groups, culture visitors" },
    keywords: ["古籍", "地方志", "阅读空间"],
    audio: true,
    accessible: true
  },
  {
    id: "stone_gallery",
    name: { zh: "碑林", en: "Stone Inscription Gallery" },
    type: "culture",
    category: ["culture"],
    x: 53,
    y: 38,
    level: 2,
    stay: { zh: "20分钟", en: "20 min" },
    open: "09:00-17:30",
    intro: {
      zh: "集中展示地方碑刻、题记和历史文献，可用于文化词翻译展示。",
      en: "A gallery of stone inscriptions and historical texts, suitable for interpreting culture-loaded expressions."
    },
    audience: { zh: "国际游客、研学团队", en: "International visitors, study groups" },
    keywords: ["碑刻", "历史文献", "文化翻译"],
    audio: true,
    accessible: true
  },
  {
    id: "city_wall_ruins",
    name: { zh: "古城墙遗址", en: "Ancient City Wall Ruins" },
    type: "history/nature",
    category: ["culture", "nature"],
    x: 26,
    y: 33,
    level: 1,
    stay: { zh: "30分钟", en: "30 min" },
    open: "08:30-18:00",
    intro: {
      zh: "位于西北山脊，是古镇防御体系的重要遗存。",
      en: "Located on the northwest ridge, the ruins are a key remnant of the town's historic defense system."
    },
    audience: { zh: "历史爱好者、徒步游客", en: "History lovers, hikers" },
    keywords: ["防御体系", "山脊", "遗址"],
    audio: true,
    accessible: false
  },
  {
    id: "west_gate",
    name: { zh: "西关城门", en: "West Gate Tower" },
    type: "history",
    category: ["culture"],
    x: 22,
    y: 39,
    level: 2,
    stay: { zh: "20分钟", en: "20 min" },
    open: "08:30-18:00",
    intro: {
      zh: "连接古镇与山地游线的重要节点。",
      en: "A historic gateway connecting the old town area with the mountain trail."
    },
    audience: { zh: "历史游客、山地游客", en: "History visitors, mountain trail visitors" },
    keywords: ["城门", "山地游线", "关隘"],
    audio: true,
    accessible: false
  },
  {
    id: "town_square",
    name: { zh: "中心广场", en: "Town Square" },
    type: "attraction/service",
    category: ["attractions", "service"],
    x: 48,
    y: 52,
    level: 1,
    stay: { zh: "20分钟", en: "20 min" },
    open: "全天开放",
    intro: {
      zh: "景区核心集散区，可连接古街、戏楼、书院和码头。",
      en: "The central gathering area connecting the old street, opera house, academy, and wharf."
    },
    audience: { zh: "全部游客、团队游客", en: "All visitors, groups" },
    keywords: ["集散", "换乘", "核心节点"],
    audio: true,
    accessible: true
  },
  {
    id: "opera_house",
    name: { zh: "山河戏楼", en: "Shanhe Opera House" },
    type: "performance",
    category: ["performance", "attractions"],
    x: 56,
    y: 56,
    level: 1,
    stay: { zh: "50分钟", en: "50 min" },
    open: "10:00-21:00",
    intro: {
      zh: "景区核心演艺建筑，定时上演地方戏曲、川剧片段和非遗节目。",
      en: "The main performance venue featuring local opera, Sichuan Opera excerpts, and intangible heritage shows."
    },
    audience: { zh: "国际游客、团队游客、文化游客", en: "International visitors, tour groups, culture lovers" },
    keywords: ["地方戏曲", "川剧", "非遗演艺"],
    audio: true,
    accessible: true
  },
  {
    id: "opera_square",
    name: { zh: "戏曲广场", en: "Opera Square" },
    type: "performance",
    category: ["performance"],
    x: 58,
    y: 61,
    level: 2,
    stay: { zh: "25分钟", en: "25 min" },
    open: "09:00-21:30",
    intro: {
      zh: "露天演艺与游客互动空间，适合举行节庆活动和快闪表演。",
      en: "An open-air performance space for festivals, interactive shows, and pop-up performances."
    },
    audience: { zh: "亲子游客、节庆游客", en: "Families, festival visitors" },
    keywords: ["露天演艺", "互动", "节庆"],
    audio: true,
    accessible: true
  },
  {
    id: "heritage_workshop",
    name: { zh: "非遗工坊", en: "Intangible Heritage Workshop" },
    type: "heritage",
    category: ["performance", "culture"],
    x: 41,
    y: 55,
    level: 1,
    stay: { zh: "45分钟", en: "45 min" },
    open: "09:00-20:30",
    intro: {
      zh: "集中展示剪纸、扎染、木雕、糖画等非遗体验项目。",
      en: "A hands-on heritage area featuring paper-cutting, tie-dye, woodcarving, and sugar painting."
    },
    audience: { zh: "亲子游客、研学团队、国际游客", en: "Families, study groups, international visitors" },
    keywords: ["剪纸", "扎染", "木雕", "糖画"],
    audio: true,
    accessible: true
  },
  {
    id: "paper_cutting",
    name: { zh: "剪纸馆", en: "Paper-cutting Studio" },
    type: "heritage",
    category: ["performance", "culture"],
    x: 43,
    y: 57,
    level: 2,
    stay: { zh: "20分钟", en: "20 min" },
    open: "09:00-20:30",
    intro: {
      zh: "游客可体验传统剪纸，并了解图案背后的吉祥寓意。",
      en: "Visitors can try traditional paper-cutting and learn the auspicious meanings behind the patterns."
    },
    audience: { zh: "亲子游客、国际游客", en: "Families, international visitors" },
    keywords: ["剪纸", "吉祥寓意", "手作体验"],
    audio: true,
    accessible: true
  },
  {
    id: "tie_dye",
    name: { zh: "扎染馆", en: "Tie-dye Studio" },
    type: "heritage",
    category: ["performance", "culture"],
    x: 45,
    y: 59,
    level: 2,
    stay: { zh: "25分钟", en: "25 min" },
    open: "09:00-20:30",
    intro: {
      zh: "展示传统染织工艺，适合亲子和研学活动。",
      en: "A studio presenting traditional dyeing techniques, ideal for family and study tours."
    },
    audience: { zh: "亲子游客、研学团队", en: "Families, study groups" },
    keywords: ["扎染", "染织", "研学"],
    audio: true,
    accessible: true
  },
  {
    id: "woodcarving",
    name: { zh: "木雕馆", en: "Woodcarving Studio" },
    type: "heritage",
    category: ["performance", "culture"],
    x: 49,
    y: 60,
    level: 2,
    stay: { zh: "20分钟", en: "20 min" },
    open: "09:00-20:30",
    intro: {
      zh: "展示地方木雕工艺和传统建筑装饰纹样。",
      en: "A studio presenting local woodcarving techniques and decorative patterns in traditional architecture."
    },
    audience: { zh: "文化游客、研学团队", en: "Culture visitors, study groups" },
    keywords: ["木雕", "建筑纹样", "地方工艺"],
    audio: true,
    accessible: true
  },
  {
    id: "sugar_painting",
    name: { zh: "糖画摊", en: "Sugar Painting Booth" },
    type: "heritage/dining",
    category: ["performance", "dining"],
    x: 39,
    y: 59,
    level: 2,
    stay: { zh: "10分钟", en: "10 min" },
    open: "10:00-21:00",
    intro: {
      zh: "展示传统糖画技艺，适合亲子互动和短视频打卡。",
      en: "A booth demonstrating traditional sugar painting, popular for family interaction and short-video sharing."
    },
    audience: { zh: "亲子游客、短视频游客", en: "Families, short-video visitors" },
    keywords: ["糖画", "亲子", "打卡"],
    audio: true,
    accessible: true
  },
  {
    id: "ancient_wharf",
    name: { zh: "古码头", en: "Ancient Wharf" },
    type: "waterfront",
    category: ["attractions", "transport"],
    x: 47,
    y: 67,
    level: 1,
    stay: { zh: "30分钟", en: "30 min" },
    open: "08:30-22:00",
    intro: {
      zh: "古镇水路交通记忆的重要节点，现在是游船和夜游入口。",
      en: "A historic water transport site, now serving as a cruise and night-tour entry point."
    },
    audience: { zh: "团队游客、夜游游客、国际游客", en: "Groups, night-tour visitors, international visitors" },
    keywords: ["水路交通", "游船", "夜游"],
    audio: true,
    accessible: true
  },
  {
    id: "night_pier",
    name: { zh: "夜游码头", en: "Night Cruise Pier" },
    type: "waterfront/night",
    category: ["transport"],
    x: 60,
    y: 69,
    level: 2,
    stay: { zh: "20分钟", en: "20 min" },
    open: "18:30-22:30",
    intro: {
      zh: "夜间游船起点，适合展示夜游经济和灯光导览。",
      en: "The departure point for night cruises, highlighting the town's night tourism and lighting experience."
    },
    audience: { zh: "夜游游客、情侣游客", en: "Night-tour visitors, couples" },
    keywords: ["夜游", "游船", "灯光导览"],
    audio: true,
    accessible: true
  },
  {
    id: "yunxi_water_street",
    name: { zh: "云溪水街", en: "Yunxi Riverside Street" },
    type: "dining/night",
    category: ["dining"],
    x: 70,
    y: 48,
    level: 1,
    stay: { zh: "45分钟", en: "45 min" },
    open: "10:00-23:00",
    intro: {
      zh: "滨水餐饮与休闲街区，夜间灯光氛围浓厚。",
      en: "A riverside dining and leisure street with a vibrant night atmosphere."
    },
    audience: { zh: "夜游游客、美食游客", en: "Night-tour visitors, food lovers" },
    keywords: ["滨水餐饮", "夜间消费", "灯光"],
    audio: true,
    accessible: true
  },
  {
    id: "wind_rain_bridge",
    name: { zh: "风雨桥", en: "Wind-and-Rain Bridge" },
    type: "landmark",
    category: ["attractions", "photo"],
    x: 60,
    y: 49,
    level: 1,
    stay: { zh: "15分钟", en: "15 min" },
    open: "全天开放",
    intro: {
      zh: "连接东西两岸的重要桥梁，也是拍照打卡点。",
      en: "A landmark bridge connecting both banks of the river and a popular photo spot."
    },
    audience: { zh: "摄影游客、全部游客", en: "Photographers, all visitors" },
    keywords: ["桥梁", "打卡", "东西两岸"],
    audio: true,
    accessible: true
  },
  {
    id: "moon_bridge",
    name: { zh: "月影桥", en: "Moon Reflection Bridge" },
    type: "landmark/night",
    category: ["attractions", "photo"],
    x: 74,
    y: 41,
    level: 2,
    stay: { zh: "15分钟", en: "15 min" },
    open: "全天开放",
    intro: {
      zh: "夜游灯光节点，桥影与水面倒影形成特色景观。",
      en: "A night-tour lighting spot where bridge lights reflect beautifully on the river."
    },
    audience: { zh: "夜游游客、摄影游客", en: "Night-tour visitors, photographers" },
    keywords: ["桥影", "倒影", "夜景"],
    audio: true,
    accessible: true
  },
  {
    id: "river_lantern_square",
    name: { zh: "河灯广场", en: "River Lantern Square" },
    type: "night/culture",
    category: ["culture", "photo"],
    x: 66,
    y: 52,
    level: 2,
    stay: { zh: "25分钟", en: "25 min" },
    open: "16:00-22:30",
    intro: {
      zh: "夜间民俗活动空间，可开展放河灯、民俗表演等活动。",
      en: "A night event space for river lantern activities and folk performances."
    },
    audience: { zh: "夜游游客、亲子游客", en: "Night-tour visitors, families" },
    keywords: ["河灯", "民俗活动", "夜游"],
    audio: true,
    accessible: true
  },
  {
    id: "river_view_terrace",
    name: { zh: "望河台", en: "River View Terrace" },
    type: "photo/nature",
    category: ["photo", "nature"],
    x: 82,
    y: 40,
    level: 2,
    stay: { zh: "15分钟", en: "15 min" },
    open: "全天开放",
    intro: {
      zh: "俯瞰云溪河与古镇屋顶的摄影点。",
      en: "A photo terrace overlooking the Yunxi River and the rooftops of the ancient town."
    },
    audience: { zh: "摄影游客、自然游客", en: "Photographers, nature visitors" },
    keywords: ["俯瞰", "河景", "屋顶"],
    audio: true,
    accessible: false
  },
  {
    id: "cableway",
    name: { zh: "山河索道站", en: "Cableway Station" },
    type: "transport",
    category: ["transport"],
    x: 52,
    y: 44,
    level: 1,
    stay: { zh: "10分钟", en: "10 min" },
    open: "09:00-18:00",
    intro: {
      zh: "连接古镇核心区与云顶观景台的快速交通节点。",
      en: "A transport hub linking the old town area with the Yunding Viewpoint."
    },
    audience: { zh: "山地游客、老年游客", en: "Mountain visitors, senior visitors" },
    keywords: ["索道", "换乘", "山地观景"],
    audio: true,
    accessible: true
  },
  {
    id: "lanyue_pavilion",
    name: { zh: "揽月阁", en: "Lanyue Pavilion" },
    type: "nature",
    category: ["nature", "photo"],
    x: 66,
    y: 18,
    level: 1,
    stay: { zh: "30分钟", en: "30 min" },
    open: "08:30-18:00",
    intro: {
      zh: "半山观景建筑，可远眺云溪河湾和古镇全貌。",
      en: "A hillside pavilion offering panoramic views of the river bend and the ancient town."
    },
    audience: { zh: "摄影游客、自然游客", en: "Photographers, nature visitors" },
    keywords: ["半山", "远眺", "河湾"],
    audio: true,
    accessible: false
  },
  {
    id: "spruce_trail",
    name: { zh: "云杉步道", en: "Spruce Trail" },
    type: "nature",
    category: ["nature"],
    x: 72,
    y: 23,
    level: 2,
    stay: { zh: "40分钟", en: "40 min" },
    open: "08:30-18:00",
    intro: {
      zh: "山地徒步路线，沿途分布林间休憩点和观景平台。",
      en: "A mountain walking trail with forest rest areas and scenic platforms."
    },
    audience: { zh: "徒步游客、自然游客", en: "Hikers, nature visitors" },
    keywords: ["云杉林", "徒步", "休憩点"],
    audio: true,
    accessible: false
  },
  {
    id: "yunding_viewpoint",
    name: { zh: "云顶观景台", en: "Yunding Viewpoint" },
    type: "nature/photo",
    category: ["nature", "photo", "attractions"],
    x: 78,
    y: 12,
    level: 1,
    stay: { zh: "35分钟", en: "35 min" },
    open: "08:30-18:30",
    intro: {
      zh: "景区最高观景点，可俯瞰山河古镇全景。",
      en: "The highest viewpoint in the scenic area, offering a full panorama of Shanhe Ancient Town."
    },
    audience: { zh: "摄影游客、自然游客、国际游客", en: "Photographers, nature visitors, international visitors" },
    keywords: ["最高点", "全景", "山河古镇"],
    audio: true,
    accessible: false
  },
  {
    id: "sunrise_deck",
    name: { zh: "日出平台", en: "Sunrise Deck" },
    type: "nature/photo",
    category: ["nature", "photo"],
    x: 84,
    y: 15,
    level: 2,
    stay: { zh: "20分钟", en: "20 min" },
    open: "05:30-18:30",
    intro: {
      zh: "适合清晨观日出和摄影。",
      en: "A viewing deck ideal for sunrise watching and photography."
    },
    audience: { zh: "摄影游客、自然游客", en: "Photographers, nature visitors" },
    keywords: ["日出", "摄影", "清晨"],
    audio: true,
    accessible: false
  },
  {
    id: "photo_deck",
    name: { zh: "摄影平台", en: "Photo Deck" },
    type: "photo",
    category: ["photo"],
    x: 75,
    y: 20,
    level: 2,
    stay: { zh: "20分钟", en: "20 min" },
    open: "08:30-18:30",
    intro: {
      zh: "面向摄影游客设置的专业取景点。",
      en: "A designated viewing point for photography enthusiasts."
    },
    audience: { zh: "摄影游客", en: "Photography enthusiasts" },
    keywords: ["取景", "摄影", "山景"],
    audio: true,
    accessible: false
  },
  {
    id: "starlight_camp",
    name: { zh: "星光营地", en: "Starlight Camp" },
    type: "accommodation/nature",
    category: ["accommodation", "nature"],
    x: 91,
    y: 20,
    level: 2,
    stay: { zh: "60分钟", en: "60 min" },
    open: "14:00-次日10:00",
    intro: {
      zh: "山地轻露营区域，适合夜间观星和休闲。",
      en: "A light camping area for stargazing and mountain leisure."
    },
    audience: { zh: "年轻游客、露营游客", en: "Young visitors, campers" },
    keywords: ["露营", "观星", "山地休闲"],
    audio: true,
    accessible: false
  },
  {
    id: "wind_pavilion",
    name: { zh: "听风亭", en: "Wind-listening Pavilion" },
    type: "nature",
    category: ["nature"],
    x: 70,
    y: 14,
    level: 2,
    stay: { zh: "15分钟", en: "15 min" },
    open: "08:30-18:00",
    intro: {
      zh: "山脊休憩点，适合短暂停留和自然讲解。",
      en: "A ridge-side rest pavilion suitable for short breaks and nature interpretation."
    },
    audience: { zh: "徒步游客、自然游客", en: "Hikers, nature visitors" },
    keywords: ["山脊", "休憩", "自然讲解"],
    audio: true,
    accessible: false
  },
  {
    id: "east_market",
    name: { zh: "东市商街", en: "East Market Street" },
    type: "shopping/dining",
    category: ["dining", "attractions"],
    x: 77,
    y: 53,
    level: 1,
    stay: { zh: "45分钟", en: "45 min" },
    open: "10:00-22:30",
    intro: {
      zh: "集文创、咖啡、轻餐和特色零售于一体的商业休闲街区。",
      en: "A leisure shopping street with cultural products, coffee, light meals, and local retail."
    },
    audience: { zh: "休闲游客、国际游客、美食游客", en: "Leisure visitors, international visitors, food lovers" },
    keywords: ["文创", "咖啡", "特色零售"],
    audio: true,
    accessible: true
  },
  {
    id: "creative_center",
    name: { zh: "山河文创中心", en: "Cultural Creative Center" },
    type: "shopping/culture",
    category: ["culture"],
    x: 76,
    y: 48,
    level: 2,
    stay: { zh: "30分钟", en: "30 min" },
    open: "10:00-22:00",
    intro: {
      zh: "展示并销售景区文创产品，可生成双语产品介绍。",
      en: "A center displaying and selling cultural creative products with bilingual product descriptions."
    },
    audience: { zh: "国际游客、购物游客", en: "International visitors, shoppers" },
    keywords: ["文创产品", "双语介绍", "伴手礼"],
    audio: true,
    accessible: true
  },
  {
    id: "post_office_cafe",
    name: { zh: "邮局咖啡", en: "Post Office Cafe" },
    type: "dining",
    category: ["dining"],
    x: 80,
    y: 56,
    level: 2,
    stay: { zh: "30分钟", en: "30 min" },
    open: "09:30-22:00",
    intro: {
      zh: "结合邮局主题和咖啡消费的网红空间。",
      en: "A themed cafe combining postal elements with coffee culture."
    },
    audience: { zh: "年轻游客、休闲游客", en: "Young visitors, leisure visitors" },
    keywords: ["邮局主题", "咖啡", "打卡"],
    audio: true,
    accessible: true
  },
  {
    id: "bookstore",
    name: { zh: "山河书店", en: "Shanhe Bookstore" },
    type: "shopping/culture",
    category: ["culture"],
    x: 82,
    y: 59,
    level: 2,
    stay: { zh: "25分钟", en: "25 min" },
    open: "10:00-21:30",
    intro: {
      zh: "售卖地方文化、旅行、人文类图书与明信片。",
      en: "A bookstore offering books and postcards on local culture, travel, and humanities."
    },
    audience: { zh: "文化游客、国际游客", en: "Culture visitors, international visitors" },
    keywords: ["书店", "明信片", "地方文化"],
    audio: true,
    accessible: true
  },
  {
    id: "hanfu",
    name: { zh: "汉服体验馆", en: "Hanfu Experience Hall" },
    type: "experience/photo",
    category: ["culture", "photo"],
    x: 78,
    y: 61,
    level: 2,
    stay: { zh: "45分钟", en: "45 min" },
    open: "10:00-21:00",
    intro: {
      zh: "提供汉服租赁、妆造和古镇拍照服务。",
      en: "A Hanfu experience hall offering costume rental, styling, and photo services."
    },
    audience: { zh: "摄影游客、年轻游客", en: "Photographers, young visitors" },
    keywords: ["汉服", "妆造", "旅拍"],
    audio: true,
    accessible: true
  },
  {
    id: "rest_station",
    name: { zh: "游客驿站", en: "Visitor Rest Station" },
    type: "service",
    category: ["service", "facilities"],
    x: 75,
    y: 64,
    level: 2,
    stay: { zh: "10分钟", en: "10 min" },
    open: "08:30-21:30",
    intro: {
      zh: "提供休息、饮水、咨询和简易充电服务。",
      en: "A rest station offering seating, drinking water, information, and basic charging service."
    },
    audience: { zh: "全部游客", en: "All visitors" },
    keywords: ["休息", "饮水", "咨询"],
    audio: true,
    accessible: true
  },
  {
    id: "yunxi_hotel",
    name: { zh: "云溪精品酒店", en: "Yunxi Boutique Hotel" },
    type: "accommodation",
    category: ["accommodation"],
    x: 83,
    y: 50,
    level: 2,
    stay: { zh: "住宿", en: "Overnight" },
    open: "24小时",
    intro: {
      zh: "东岸精品酒店，适合高端游客和商务团队。",
      en: "A boutique hotel on the east bank for premium visitors and business groups."
    },
    audience: { zh: "商务团队、高端游客", en: "Business groups, premium visitors" },
    keywords: ["精品酒店", "商务", "东岸"],
    audio: false,
    accessible: true
  },
  {
    id: "riverside_homestay",
    name: { zh: "河畔庭院民宿", en: "Riverside Courtyard Homestay" },
    type: "accommodation",
    category: ["accommodation"],
    x: 39,
    y: 70,
    level: 2,
    stay: { zh: "住宿", en: "Overnight" },
    open: "24小时",
    intro: {
      zh: "临河庭院式民宿，适合家庭游客和深度体验游客。",
      en: "A riverside courtyard homestay for families and slow-travel visitors."
    },
    audience: { zh: "家庭游客、深度体验游客", en: "Families, slow-travel visitors" },
    keywords: ["庭院民宿", "临河", "家庭"],
    audio: false,
    accessible: false
  },
  {
    id: "tea_valley",
    name: { zh: "茶山花谷", en: "Tea Hill Flower Valley" },
    type: "nature/family",
    category: ["nature", "photo"],
    x: 78,
    y: 74,
    level: 1,
    stay: { zh: "60分钟", en: "60 min" },
    open: "08:30-18:30",
    intro: {
      zh: "东南片区的自然休闲区，适合亲子、摄影和研学。",
      en: "A natural leisure area in the southeast, suitable for families, photography, and study tours."
    },
    audience: { zh: "亲子游客、摄影游客、研学团队", en: "Families, photographers, study groups" },
    keywords: ["茶山", "花谷", "研学"],
    audio: true,
    accessible: false
  },
  {
    id: "tea_museum",
    name: { zh: "茶文化馆", en: "Tea Culture Museum" },
    type: "culture",
    category: ["culture"],
    x: 76,
    y: 79,
    level: 2,
    stay: { zh: "35分钟", en: "35 min" },
    open: "09:00-18:00",
    intro: {
      zh: "展示茶叶种植、制作、品饮和茶礼文化。",
      en: "A museum presenting tea planting, processing, tasting, and tea etiquette."
    },
    audience: { zh: "研学团队、文化游客", en: "Study groups, culture visitors" },
    keywords: ["茶礼", "种植", "品饮"],
    audio: true,
    accessible: true
  },
  {
    id: "flower_trail",
    name: { zh: "花溪步道", en: "Flower Creek Trail" },
    type: "nature",
    category: ["nature"],
    x: 71,
    y: 82,
    level: 2,
    stay: { zh: "40分钟", en: "40 min" },
    open: "08:30-18:30",
    intro: {
      zh: "穿行花谷与溪流之间的轻徒步路线。",
      en: "A gentle walking trail through flower fields and small streams."
    },
    audience: { zh: "亲子游客、摄影游客", en: "Families, photographers" },
    keywords: ["花溪", "轻徒步", "溪流"],
    audio: true,
    accessible: false
  },
  {
    id: "nature_classroom",
    name: { zh: "儿童自然课堂", en: "Children's Nature Classroom" },
    type: "family/education",
    category: ["culture", "nature"],
    x: 84,
    y: 76,
    level: 2,
    stay: { zh: "40分钟", en: "40 min" },
    open: "09:00-18:00",
    intro: {
      zh: "面向亲子和研学团队的自然教育空间。",
      en: "A nature education space for families and student groups."
    },
    audience: { zh: "亲子游客、研学团队", en: "Families, study groups" },
    keywords: ["自然教育", "亲子", "研学"],
    audio: true,
    accessible: true
  },
  {
    id: "cloud_homestay",
    name: { zh: "云隐民宿", en: "Cloud Valley Homestay" },
    type: "accommodation",
    category: ["accommodation"],
    x: 88,
    y: 82,
    level: 2,
    stay: { zh: "住宿", en: "Overnight" },
    open: "24小时",
    intro: {
      zh: "茶山片区民宿，适合安静休闲和康养度假。",
      en: "A homestay in the tea hill area for quiet leisure and wellness stays."
    },
    audience: { zh: "康养游客、家庭游客", en: "Wellness visitors, families" },
    keywords: ["茶山", "康养", "安静休闲"],
    audio: false,
    accessible: false
  }
];

export const typeLabels = {
  service: { zh: "服务", en: "Service" },
  attraction: { zh: "核心景点", en: "Attraction" },
  culture: { zh: "文化体验", en: "Culture" },
  performance: { zh: "演艺", en: "Performance" },
  heritage: { zh: "非遗体验", en: "Heritage" },
  waterfront: { zh: "滨水景点", en: "Waterfront" },
  landmark: { zh: "地标", en: "Landmark" },
  transport: { zh: "交通", en: "Transport" },
  nature: { zh: "自然观景", en: "Nature" },
  dining: { zh: "餐饮", en: "Dining" },
  accommodation: { zh: "住宿", en: "Accommodation" },
  photo: { zh: "拍照点", en: "Photo Spot" },
  shopping: { zh: "购物", en: "Shopping" },
  night: { zh: "夜游", en: "Night Tour" },
  history: { zh: "历史遗址", en: "History" },
  family: { zh: "亲子", en: "Family" },
  education: { zh: "研学", en: "Education" },
  experience: { zh: "体验", en: "Experience" }
};
