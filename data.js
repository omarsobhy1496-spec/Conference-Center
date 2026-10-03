/* =====================================================================
   data.js  —  ده الملف الوحيد اللي هتعدّل فيه
   1) STATUS  : حالة كل قاعة  ("free" = متاح/أخضر  |  "busy" = مشغول/أحمر)
   2) SPACES  : اسم كل قاعة (إنجليزي + عربي) والمعلومات اللي بتظهر لما حد يضغط عليها
   3) BUILDINGS : المباني والطوابق وإيه اللي في كل طابق
   ===================================================================== */

/* ---------- 1) الحالة: غيّر الكلمة قدام اسم المكان، احفظ، وحدّث الصفحة ---------- */
var STATUS = {
  /* مبنى المؤتمرات */
  great:  "busy",   // القاعة الكبرى (واحدة بتظهر في F1 و F2 و F3 والميزانين)
  multi:  "free",   // قاعة الأغراض المتعددة
  greco:  "free",   // المطعم اليوناني الروماني
  ra:     "busy",   // غرفة A
  rb:     "busy",   // غرفة B
  rc:     "free",   // غرفة C
  rd:     "free",   // غرفة D
  re:     "busy",   // غرفة E
  vipl:   "free",   // صالة كبار الزوار
  vipm:   "free",   // غرفة اجتماعات كبار الزوار
  deleg:  "busy",   // قاعة الوفود
  lect:   "free",   // قاعة المحاضرات
  theater:"free",   // المسرح الصغير
  hex:    "free",   // الهكساجون
  east:   "busy",   // المعرض الشرقي
  west:   "free",   // المعرض الغربي
  /* المبنى الرئيسي */
  aud:    "free",   // قاعة الأوديتوريوم
  float:  "busy"    // قاعة الشراع
};

/* ---------- 2) القاعات: الأسماء والمعلومات ----------
   info = الأسطر اللي بتظهر في الصندوق. سيبها [] لو مفيش معلومات لسه. */
var SPACES = {
  great:  { en: "Great Hall", ar: "القاعة الكبرى", shared: true,
            info: ["القاعة الكبرى (Great Hall): تتسع لـ 1,629 شخصاً (موزعة على ثلاثة مستويات: الصالة، اللوج، البلكون)."] },
  multi:  { en: "Multipurpose Room", ar: "قاعة الأغراض المتعددة",
            info: ["قاعة الأغراض المتعددة (Multipurpose Hall): تتسع لـ 150 شخصاً."] },
  greco:  { en: "Greco-Roman Restaurant", ar: "المطعم اليوناني الروماني", info: [] },
  ra:     { en: "Room A", ar: "غرفة A", info: ["قاعتا (A) و (E): تتسع كل منهما لـ 35 شخصاً."] },
  rb:     { en: "Room B", ar: "غرفة B", info: ["قاعتا (B) و (D): تتسع كل منهما لـ 14 شخصاً."] },
  rc:     { en: "Room C", ar: "غرفة C", info: ["قاعة (C): تتسع لـ 60 شخصاً."] },
  rd:     { en: "Room D", ar: "غرفة D", info: ["قاعتا (B) و (D): تتسع كل منهما لـ 14 شخصاً."] },
  re:     { en: "Room E", ar: "غرفة E", info: ["قاعتا (A) و (E): تتسع كل منهما لـ 35 شخصاً."] },
  vipl:   { en: "VIP Lounge", ar: "صالة كبار الزوار", info: [] },
  vipm:   { en: "VIP Meeting Room", ar: "غرفة اجتماعات كبار الزوار",
            info: ["غرفة اجتماعات كبار الزوار (VIP Meeting Room): تتسع لـ 22 شخصاً."] },
  deleg:  { en: "Delegates Hall", ar: "قاعة الوفود",
            info: ["قاعة الوفود (Delegates Hall): تتسع لـ 106 أشخاص."] },
  lect:   { en: "Lectures Hall", ar: "قاعة المحاضرات",
            info: ["قاعة المحاضرات (Lecture Hall): تتسع لـ 270 شخصاً."] },
  theater:{ en: "Small Theater", ar: "المسرح الصغير",
            info: ["المسرح الصغير (Small Theater): يتسع لـ 242 شخصاً."] },
  hex:    { en: "Hexagon", ar: "الهكساجون", info: [] },
  east:   { en: "East Exhibition", ar: "المعرض الشرقي", info: [] },
  west:   { en: "West Exhibition", ar: "المعرض الغربي", info: [] },
  aud:    { en: "Auditorium Hall", ar: "قاعة الأوديتوريوم",
            info: ["قاعة الأوديتوريوم (Auditorium): تتسع لـ 99 شخصاً."] },
  float:  { en: "Floating Room", ar: "قاعة الشراع",
            info: ["قاعات الشراع (Floating Rooms): قاعتان بمستويي F3 وF4، تتسع كل قاعة لـ 35 شخصاً."] }
};

/* ---------- 3) المباني والطوابق (من الأعلى للأسفل) ---------- */
var BUILDINGS = [
  { id: "cc", en: "Conference Center", ar: "مبنى المؤتمرات",
    floors: [
      { code: "F3", en: "Third Floor",    ar: "الطابق الثالث",  rooms: ["great"] },
      { code: "F2", en: "Second Floor",   ar: "الطابق الثاني",  rooms: ["multi", "great"] },
      { code: "F1", en: "First Floor",    ar: "الطابق الأول",   rooms: ["greco", "great"] },
      { code: "M",  en: "Mezzanine",      ar: "الميزانين",      rooms: ["ra", "rb", "rc", "rd", "re", "great"] },
      { code: "G",  en: "Entrance Level", ar: "طابق المدخل",    rooms: ["vipl", "vipm"] },
      { code: "B1", en: "Basement 1",     ar: "البدروم (B1)",   rooms: ["deleg", "lect", "theater", "hex", "east", "west"] }
    ] },
  { id: "main", en: "Main Building", ar: "المبنى الرئيسي",
    floors: [
      { code: "F3", en: "Third Floor",    ar: "الطابق الثالث",  rooms: ["float"] },
      { code: "G",  en: "Entrance Level", ar: "طابق المدخل",    rooms: ["aud"] }
    ] }
];
