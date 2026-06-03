export const facilities = [
  {
    id: "restroom_south",
    name: { zh: "南门卫生间", en: "South Gate Restroom" },
    type: "restroom",
    category: ["facilities"],
    x: 22,
    y: 75,
    level: 1,
    distance: { zh: "80米", en: "80 m" },
    status: { zh: "开放", en: "Open" },
    intro: { zh: "靠近游客中心，含无障碍厕位。", en: "Near the visitor center, with accessible stalls." },
    accessible: true
  },
  {
    id: "parking_south",
    name: { zh: "南门停车场", en: "South Gate Parking" },
    type: "parking",
    category: ["facilities", "transport"],
    x: 15,
    y: 78,
    level: 1,
    distance: { zh: "150米", en: "150 m" },
    status: { zh: "余位充足", en: "Available" },
    intro: { zh: "大巴、小车分区停放，可接驳游客中心。", en: "Coach and car parking with shuttle access to the visitor center." },
    accessible: true
  },
  {
    id: "service_square",
    name: { zh: "中心服务点", en: "Town Square Service Point" },
    type: "service",
    category: ["facilities"],
    x: 50,
    y: 52,
    level: 1,
    distance: { zh: "620米", en: "620 m" },
    status: { zh: "开放", en: "Open" },
    intro: { zh: "提供咨询、失物招领和多语导览协助。", en: "Information, lost-and-found, and multilingual guide support." },
    accessible: true
  },
  {
    id: "first_aid_old_street",
    name: { zh: "古街急救点", en: "Old Street First Aid" },
    type: "firstAid",
    category: ["facilities"],
    x: 34,
    y: 55,
    level: 2,
    distance: { zh: "510米", en: "510 m" },
    status: { zh: "值守中", en: "On duty" },
    intro: { zh: "提供简单外伤处理、应急药品和转运联络。", en: "Basic wound care, emergency medicine, and transfer support." },
    accessible: true
  },
  {
    id: "security_bridge",
    name: { zh: "风雨桥安保点", en: "Bridge Security Station" },
    type: "security",
    category: ["facilities"],
    x: 62,
    y: 50,
    level: 2,
    distance: { zh: "760米", en: "760 m" },
    status: { zh: "值守中", en: "On duty" },
    intro: { zh: "桥梁与水岸客流安全巡查点。", en: "Safety patrol point for the bridge and riverfront." },
    accessible: true
  },
  {
    id: "charging_square",
    name: { zh: "中心广场充电站", en: "Town Square Charging Station" },
    type: "charging",
    category: ["facilities"],
    x: 46,
    y: 54,
    level: 3,
    distance: { zh: "580米", en: "580 m" },
    status: { zh: "可用", en: "Available" },
    intro: { zh: "支持手机、相机和充电宝快速补电。", en: "Quick charging for phones, cameras, and power banks." },
    accessible: true
  },
  {
    id: "nursing_center",
    name: { zh: "游客中心母婴室", en: "Visitor Center Nursing Room" },
    type: "nursing",
    category: ["facilities"],
    x: 20,
    y: 70,
    level: 3,
    distance: { zh: "40米", en: "40 m" },
    status: { zh: "开放", en: "Open" },
    intro: { zh: "配备护理台、温奶器和亲子休息区。", en: "Changing table, bottle warmer, and family rest area." },
    accessible: true
  },
  {
    id: "accessible_ramp_wharf",
    name: { zh: "古码头无障碍坡道", en: "Ancient Wharf Accessible Ramp" },
    type: "accessible",
    category: ["facilities"],
    x: 48,
    y: 65,
    level: 3,
    distance: { zh: "690米", en: "690 m" },
    status: { zh: "开放", en: "Open" },
    intro: { zh: "连接码头广场和滨水步道。", en: "Connects the wharf plaza with the riverside walkway." },
    accessible: true
  },
  {
    id: "ticket_machine_east",
    name: { zh: "东市自助售票机", en: "East Market Ticket Machine" },
    type: "ticket",
    category: ["facilities"],
    x: 79,
    y: 55,
    level: 3,
    distance: { zh: "1.1公里", en: "1.1 km" },
    status: { zh: "可用", en: "Available" },
    intro: { zh: "支持中英双语购票与演出票兑换。", en: "Bilingual ticketing and show-ticket redemption." },
    accessible: true
  },
  {
    id: "photo_opera",
    name: { zh: "戏楼最佳机位", en: "Opera House Photo Spot" },
    type: "photo",
    category: ["photo"],
    x: 54,
    y: 58,
    level: 3,
    distance: { zh: "720米", en: "720 m" },
    status: { zh: "开放", en: "Open" },
    intro: { zh: "可拍摄戏楼正立面与广场人流。", en: "Best angle for the opera house facade and square activity." },
    accessible: true
  },
  {
    id: "dining_riverside",
    name: { zh: "水街餐饮服务区", en: "Riverside Dining Area" },
    type: "dining",
    category: ["dining"],
    x: 70,
    y: 51,
    level: 2,
    distance: { zh: "980米", en: "980 m" },
    status: { zh: "营业中", en: "Open" },
    intro: { zh: "集合地方小吃、轻餐、咖啡和夜间水岸消费。", en: "Local snacks, light meals, coffee, and night riverside dining." },
    accessible: true
  },
  {
    id: "hotel_dropoff",
    name: { zh: "酒店接驳点", en: "Hotel Shuttle Stop" },
    type: "transport",
    category: ["facilities", "transport"],
    x: 84,
    y: 52,
    level: 3,
    distance: { zh: "1.2公里", en: "1.2 km" },
    status: { zh: "运行中", en: "In service" },
    intro: { zh: "连接东市商街、精品酒店和南门游客中心。", en: "Connects East Market Street, the boutique hotel, and the visitor center." },
    accessible: true
  },
  {
    id: "parking_east",
    name: { zh: "东岸停车场", en: "East Bank Parking" },
    type: "parking",
    category: ["facilities", "transport"],
    x: 91,
    y: 42,
    level: 2,
    distance: { zh: "1.5公里", en: "1.5 km" },
    status: { zh: "余位紧张", en: "Limited spaces" },
    intro: { zh: "靠近东市商街和滨水休闲区。", en: "Near East Market Street and the riverside leisure area." },
    accessible: true
  },
  {
    id: "restroom_east",
    name: { zh: "东市卫生间", en: "East Market Restroom" },
    type: "restroom",
    category: ["facilities"],
    x: 75,
    y: 56,
    level: 2,
    distance: { zh: "1.0公里", en: "1.0 km" },
    status: { zh: "开放", en: "Open" },
    intro: { zh: "位于东市商街入口附近。", en: "Located near the East Market Street entrance." },
    accessible: true
  },
  {
    id: "restroom_mountain",
    name: { zh: "云顶卫生间", en: "Yunding Restroom" },
    type: "restroom",
    category: ["facilities"],
    x: 80,
    y: 14,
    level: 3,
    distance: { zh: "2.8公里", en: "2.8 km" },
    status: { zh: "开放", en: "Open" },
    intro: { zh: "山地观景线主要公共卫生间。", en: "Main restroom on the mountain viewpoint route." },
    accessible: false
  },
  {
    id: "first_aid_mountain",
    name: { zh: "山地急救点", en: "Mountain First Aid" },
    type: "firstAid",
    category: ["facilities"],
    x: 74,
    y: 20,
    level: 3,
    distance: { zh: "2.5公里", en: "2.5 km" },
    status: { zh: "值守中", en: "On duty" },
    intro: { zh: "服务山地步道与观景台游客。", en: "Supports visitors on mountain trails and viewpoints." },
    accessible: false
  },
  {
    id: "charging_mountain",
    name: { zh: "山地补能点", en: "Mountain Charging Point" },
    type: "charging",
    category: ["facilities"],
    x: 68,
    y: 18,
    level: 3,
    distance: { zh: "2.3公里", en: "2.3 km" },
    status: { zh: "可用", en: "Available" },
    intro: { zh: "提供充电、饮水和短暂停靠。", en: "Charging, drinking water, and short rest stop." },
    accessible: false
  },
  {
    id: "photo_yunding",
    name: { zh: "云顶全景机位", en: "Yunding Panorama Spot" },
    type: "photo",
    category: ["photo"],
    x: 79,
    y: 10,
    level: 3,
    distance: { zh: "2.9公里", en: "2.9 km" },
    status: { zh: "开放", en: "Open" },
    intro: { zh: "适合拍摄山河古镇全景。", en: "Ideal for panoramic photos of Shanhe Ancient Town." },
    accessible: false
  },
  {
    id: "restroom_tea",
    name: { zh: "茶山卫生间", en: "Tea Hill Restroom" },
    type: "restroom",
    category: ["facilities"],
    x: 78,
    y: 77,
    level: 3,
    distance: { zh: "1.9公里", en: "1.9 km" },
    status: { zh: "开放", en: "Open" },
    intro: { zh: "服务茶山花谷和儿童自然课堂。", en: "Serves the tea valley and children's nature classroom." },
    accessible: true
  },
  {
    id: "nursing_tea",
    name: { zh: "亲子护理点", en: "Family Care Point" },
    type: "nursing",
    category: ["facilities"],
    x: 83,
    y: 78,
    level: 3,
    distance: { zh: "2.0公里", en: "2.0 km" },
    status: { zh: "开放", en: "Open" },
    intro: { zh: "靠近儿童自然课堂，提供亲子休息和护理。", en: "Family rest and care near the children's nature classroom." },
    accessible: true
  },
  {
    id: "security_tea",
    name: { zh: "茶山安保点", en: "Tea Hill Security Point" },
    type: "security",
    category: ["facilities"],
    x: 75,
    y: 73,
    level: 3,
    distance: { zh: "1.8公里", en: "1.8 km" },
    status: { zh: "值守中", en: "On duty" },
    intro: { zh: "服务东南自然休闲片区。", en: "Serves the southeast nature leisure area." },
    accessible: true
  },
  {
    id: "photo_flower",
    name: { zh: "花谷拍照点", en: "Flower Valley Photo Spot" },
    type: "photo",
    category: ["photo"],
    x: 80,
    y: 81,
    level: 3,
    distance: { zh: "2.1公里", en: "2.1 km" },
    status: { zh: "开放", en: "Open" },
    intro: { zh: "适合拍摄花田、溪流和茶山景观。", en: "Best for flower fields, streams, and tea hill scenery." },
    accessible: false
  },
  {
    id: "ticket_south",
    name: { zh: "南门自助售票机", en: "South Gate Ticket Machine" },
    type: "ticket",
    category: ["facilities"],
    x: 18,
    y: 74,
    level: 3,
    distance: { zh: "60米", en: "60 m" },
    status: { zh: "可用", en: "Available" },
    intro: { zh: "支持门票、演出票和夜游票自助购买。", en: "Self-service tickets for admission, shows, and night tours." },
    accessible: true
  }
];

export const facilityTypeLabels = {
  restroom: { zh: "卫生间", en: "Restroom" },
  parking: { zh: "停车场", en: "Parking" },
  service: { zh: "游客服务点", en: "Service Center" },
  firstAid: { zh: "急救点", en: "First Aid" },
  security: { zh: "安保点", en: "Security Station" },
  charging: { zh: "充电站", en: "Charging Station" },
  nursing: { zh: "母婴室", en: "Nursing Room" },
  accessible: { zh: "无障碍设施", en: "Accessible Facility" },
  ticket: { zh: "自助售票机", en: "Ticket Machine" },
  photo: { zh: "拍照点", en: "Photo Spot" },
  dining: { zh: "餐饮", en: "Dining" },
  accommodation: { zh: "住宿", en: "Accommodation" },
  transport: { zh: "交通接驳", en: "Transport" }
};

Object.assign(facilityTypeLabels.restroom, { ja: "トイレ", ko: "화장실", fr: "Toilettes", de: "WC", ru: "Туалет", hi: "शौचालय", ar: "دورات المياه", th: "ห้องน้ำ" });
Object.assign(facilityTypeLabels.parking, { ja: "駐車場", ko: "주차장", fr: "Parking", de: "Parkplatz", ru: "Парковка", hi: "पार्किंग", ar: "موقف سيارات", th: "ที่จอดรถ" });
Object.assign(facilityTypeLabels.service, { ja: "観光サービス", ko: "방문객 서비스", fr: "Centre de services", de: "Servicezentrum", ru: "Сервисный центр", hi: "सेवा केंद्र", ar: "مركز خدمات", th: "ศูนย์บริการ" });
Object.assign(facilityTypeLabels.firstAid, { ja: "救護所", ko: "응급처치소", fr: "Premiers secours", de: "Erste Hilfe", ru: "Первая помощь", hi: "प्राथमिक उपचार", ar: "إسعاف أولي", th: "ปฐมพยาบาล" });
Object.assign(facilityTypeLabels.security, { ja: "警備所", ko: "보안 초소", fr: "Poste de sécurité", de: "Sicherheitsstation", ru: "Пункт охраны", hi: "सुरक्षा चौकी", ar: "نقطة أمن", th: "จุดรักษาความปลอดภัย" });
Object.assign(facilityTypeLabels.charging, { ja: "充電ステーション", ko: "충전소", fr: "Station de recharge", de: "Ladestation", ru: "Зарядная станция", hi: "चार्जिंग स्टेशन", ar: "محطة شحن", th: "จุดชาร์จ" });
Object.assign(facilityTypeLabels.nursing, { ja: "授乳室", ko: "수유실", fr: "Salle bébé", de: "Stillraum", ru: "Комната матери и ребенка", hi: "शिशु देखभाल कक्ष", ar: "غرفة رعاية الأطفال", th: "ห้องแม่และเด็ก" });
Object.assign(facilityTypeLabels.accessible, { ja: "バリアフリー設備", ko: "무장애 시설", fr: "Équipement accessible", de: "Barrierefreie Einrichtung", ru: "Доступная среда", hi: "सुगम सुविधा", ar: "مرفق ميسر", th: "สิ่งอำนวยความสะดวกสำหรับผู้พิการ" });
Object.assign(facilityTypeLabels.ticket, { ja: "自動券売機", ko: "무인 발권기", fr: "Billetterie automatique", de: "Ticketautomat", ru: "Автомат продажи билетов", hi: "टिकट मशीन", ar: "آلة بيع التذاكر", th: "เครื่องจำหน่ายตั๋ว" });
Object.assign(facilityTypeLabels.photo, { ja: "撮影スポット", ko: "사진 명소", fr: "Point photo", de: "Fotospot", ru: "Фототочка", hi: "फोटो स्थल", ar: "موقع تصوير", th: "จุดถ่ายรูป" });
Object.assign(facilityTypeLabels.dining, { ja: "飲食", ko: "식음료", fr: "Restauration", de: "Gastronomie", ru: "Питание", hi: "भोजन", ar: "مطاعم", th: "อาหาร" });
Object.assign(facilityTypeLabels.accommodation, { ja: "宿泊", ko: "숙박", fr: "Hébergement", de: "Unterkunft", ru: "Проживание", hi: "आवास", ar: "إقامة", th: "ที่พัก" });
Object.assign(facilityTypeLabels.transport, { ja: "交通接続", ko: "교통 연결", fr: "Transport", de: "Verkehrsanbindung", ru: "Транспорт", hi: "परिवहन संपर्क", ar: "ربط النقل", th: "การเดินทาง" });
