"use strict";

const farmSites = [
  {
    id: "kaiping", name: ["Kaiping", "开平"], area: ["Guangdong, China", "中国 · 广东"],
    lat: 22.48, lon: 112.60, terrain: "delta", priorities: { income: "potato", cover: "vetch" },
    system: ["Double rice · winter rotation", "双季稻 · 冬季轮作"],
    previous: ["Late rice harvest", "晚稻收割"], next: ["Early rice transplant", "早稻插秧"],
    harvestStart: [10, 31], harvestDefault: 11, harvestMax: 35, riceStart: [3, 20], riceDefault: 15, riceMax: 30,
    crops: [{ id: "potato", offset: 5, duration: 115, buffer: 7 }, { id: "vetch", offset: -5, end: [3, 18], cutoff: [11, 20], buffer: 10 }],
    note: ["A Kaiping case report documents winter potato, Chinese milk vetch and winter fallow.", "开平市记录了双季稻区的冬种马铃薯、紫云英和传统冬闲做法。"],
    source: "https://www.kaiping.gov.cn/kpszfw/xwdt/bmdt/content/post_3261533.html",
  },
  {
    id: "luzon", name: ["Nueva Ecija", "新怡诗夏"], area: ["Central Luzon, Philippines", "菲律宾 · 中吕宋"],
    lat: 15.72, lon: 120.93, terrain: "plain", priorities: { income: "maize", cover: "mung" },
    system: ["Wet-season rice · dry-season crops", "雨季稻 · 旱季轮作"],
    previous: ["Wet-season rice harvest", "雨季稻收割"], next: ["Next wet-season rice", "下一轮雨季稻"],
    harvestStart: [10, 8], harvestDefault: 17, harvestMax: 47, riceStart: [5, 21], riceDefault: 15, riceMax: 30,
    crops: [{ id: "maize", offset: 3, duration: 105, buffer: 14 }, { id: "mung", offset: 3, duration: 65, buffer: 14 }],
    note: ["PhilRice documents dry-season maize and mung bean in rice-based systems. Check dry-season irrigation locally.", "菲律宾水稻研究所记录了稻作体系中的玉米与绿豆。旱季灌溉条件需在当地确认。"],
    source: "https://www.philrice.gov.ph/wp-content/uploads/2020/07/ASPPD-Highlights-2019.pdf",
  },
  {
    id: "rajshahi", name: ["Rajshahi", "拉杰沙希"], area: ["Northwest Bangladesh", "孟加拉国 · 西北平原"],
    lat: 24.43, lon: 88.65, terrain: "river", priorities: { income: "mustard" },
    system: ["Aman rice · winter crops · Boro rice", "Aman 稻 · 冬作 · Boro 稻"],
    previous: ["Aman rice harvest", "Aman 稻收割"], next: ["Boro rice transplant", "Boro 稻插秧"],
    harvestStart: [11, 1], harvestDefault: 14, harvestMax: 37, riceStart: [2, 5], riceDefault: 15, riceMax: 30,
    crops: [{ id: "mustard", offset: 2, duration: 80, buffer: 10 }, { id: "potato", offset: 2, duration: 90, buffer: 10 }],
    note: ["Regional trials include mustard between Aman and Boro rice. Potato is an additional scenario for comparison.", "当地试验记录了 Aman 稻与 Boro 稻之间的短季油料芥菜。马铃薯作为额外比较方案。"],
    source: "https://ageconsearch.umn.edu/record/211170",
  },
  {
    id: "sacramento", name: ["Sacramento Valley", "萨克拉门托河谷"], area: ["California, United States", "美国 · 加利福尼亚"],
    lat: 39.08, lon: -121.94, terrain: "valley", priorities: { cover: "hairy" },
    system: ["Annual rice · winter cover", "一年一季稻 · 冬季覆盖"],
    previous: ["Previous rice harvest", "上季水稻收割"], next: ["Spring rice planting", "春季水稻播种"],
    harvestStart: [9, 15], harvestDefault: 20, harvestMax: 49, riceStart: [4, 25], riceDefault: 15, riceMax: 30,
    crops: [{ id: "rye", offset: 4, duration: 140, buffer: 25 }, { id: "hairy", offset: 4, duration: 150, buffer: 25 }],
    note: ["UC Cooperative Extension evaluated rye and vetch in Sacramento Valley rice fields. Confirm field access and winter flooding locally.", "加州大学合作推广项目在河谷稻田试验了黑麦和苕子。冬季淹水及进田条件需在当地确认。"],
    source: "https://ucanr.edu/blog/uc-rice-blog/article/winter-cover-crop-variety-evaluation",
  },
];

if (typeof module !== "undefined") module.exports = farmSites;
