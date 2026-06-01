// CircuitForge - Hebrew Translations (עברית)
// Made by Or Brami

const LANG_HE = {
  // App
  appName: "CircuitForge",
  appTagline: "מעבדת מעגלים אינטראקטיבית",
  madeBy: "נוצר על ידי אור ברמי",

  // Nav / Header
  langToggle: "English",
  darkMode: "מצב כהה",

  // Sidebar
  circuitTemplates: "תבניות מעגלים",
  searchTemplates: "חיפוש תבניות...",
  generateRandom: "⚡ מעגל אקראי",

  // Template categories
  catResistive: "נגדי",
  catReactive: "ריאקטיבי",
  catMixed: "מעורב",

  // Template names
  tplSeries: "נגדים בטור",
  tplParallel: "נגדים במקביל",
  tplSeriesParallel: "מעגל טור-מקביל מעורב",
  tplSeriesRL: "RL בטור",
  tplSeriesRC: "RC בטור",
  tplSeriesRLC: "RLC בטור",
  tplParallelRL: "RL במקביל",
  tplParallelRC: "RC במקביל",
  tplParallelRLC: "RLC במקביל",

  // Template descriptions
  descSeries: "נגדים מחוברים קצה לקצה — אותו זרם זורם דרך כולם",
  descParallel: "נגדים מחוברים על אותו מתח — הזרם מתחלק",
  descSeriesParallel: "שילוב של רשתות נגדים בטור ובמקביל",
  descSeriesRL: "נגד וסליל בטור — עכבה תלוית תדר",
  descSeriesRC: "נגד וקבל בטור — מעגל RC עם קבוע זמן",
  descSeriesRLC: "מעגל RLC בטור מלא — ניתוח תהודה ועכבה",
  descParallelRL: "נגד וסליל במקביל — ניתוח אדמיטנס",
  descParallelRC: "נגד וקבל במקביל — רשת RC מקבילה",
  descParallelRLC: "מעגל RLC מקביל מלא — תהודה מקבילה",

  // Canvas / central area
  circuitDiagram: "תרשים מעגל",
  components: "רכיבים",
  addComponent: "+ הוסף רכיב",
  deleteComponent: "מחק",
  componentType: "סוג",
  componentValue: "ערך",
  componentLabel: "תווית",
  editValue: "ערוך ערך",
  noCircuit: "בחר תבנית מעגל מהפאנל השמאלי כדי להתחיל.",

  // Component types
  compResistor: "נגד",
  compInductor: "סליל",
  compCapacitor: "קבל",
  compVoltageSource: "מקור מתח",

  // Component units
  unitOhm: "Ω",
  unitHenry: "H",
  unitFarad: "F",
  unitVolt: "V",
  unitAmp: "A",
  unitHz: "Hz",
  unitOhms: "Ω",
  unitDeg: "°",
  unitWatt: "W",
  unitVar: "VAR",
  unitVA: "VA",

  // Results panel
  resultsTitle: "תוצאות חישוב",
  noResults: "טען מעגל כדי לראות חישובים.",
  frequency: "תדר (f)",
  angularFreq: "תדר זוויתי (ω)",
  totalResistance: "התנגדות כוללת (R_T)",
  totalImpedance: "עכבה כוללת (Z)",
  phaseAngle: "זווית פאזה (θ)",
  totalCurrent: "זרם כולל (I_T)",
  supplyVoltage: "מתח אספקה (V_S)",
  powerFactor: "גורם הספק (PF)",
  activePower: "הספק פעיל (P)",
  reactivePower: "הספק ריאקטיבי (Q)",
  apparentPower: "הספק נראה (S)",
  resonantFreq: "תדר תהודה (f₀)",
  qualityFactor: "גורם איכות (Q-factor)",
  bandwidth: "רוחב סרט (BW)",
  timeConstant: "קבוע זמן (τ)",
  inductiveReactance: "ריאקטנס אינדוקטיבי (X_L)",
  capacitiveReactance: "ריאקטנס קפסיטיבי (X_C)",
  perComponent: "ערכים לכל רכיב",
  voltageAcross: "מתח על",
  currentThrough: "זרם דרך",

  // Practice Questions
  practiceTitle: "שאלות תרגול",
  generateQuestions: "צור שאלות",
  showSolution: "הצג פתרון",
  hideSolution: "הסתר פתרון",
  noQuestionsYet: "לחץ על 'צור שאלות' כדי ליצור תרגילים למעגל הנוכחי.",
  questionDifficulty: ["בסיסי", "בינוני", "מתקדם"],

  // Add component modal
  addComponentTitle: "הוסף רכיב",
  selectType: "בחר סוג רכיב",
  enterValue: "הזן ערך",
  enterLabel: "הזן תווית (אופציונלי)",
  cancel: "ביטול",
  add: "הוסף",
  confirmDelete: "האם אתה בטוח שברצונך למחוק רכיב זה?",

  // Toast messages
  toastCircuitLoaded: "מעגל נטען",
  toastComponentAdded: "רכיב נוסף",
  toastComponentDeleted: "רכיב נמחק",
  toastSaved: "מעגל נשמר",
  toastRandomGenerated: "מעגל אקראי נוצר!",
  toastInvalidValue: "אנא הזן מספר חיובי תקין",

  // Footer
  footerDesc: "מעבדת מעגלים אינטראקטיבית ללימוד אלקטרוניקה",
  footerBy: "נבנה באהבה על ידי",

  // Question templates
  q_total_resistance: "מה ההתנגדות השקולה הכוללת של המעגל?",
  q_total_current: "מה הזרם הכולל שמספק מקור המתח?",
  q_voltage_divider: "חשב את נפילת המתח על פני {label}.",
  q_current_divider: "חשב את הזרם הזורם דרך {label}.",
  q_power_component: "מה ההספק המפוזר על ידי {label}?",
  q_total_power: "מה ההספק הכולל הנצרך במעגל?",
  q_impedance: "חשב את העכבה הכוללת של מעגל ה-RLC בתדר {freq} Hz.",
  q_phase_angle: "מה זווית הפאזה בין המתח לזרם?",
  q_resonant_freq: "באיזה תדר מתרחשת תהודה במעגל ה-RLC?",
  q_quality_factor: "מה גורם האיכות (Q) של המעגל?",
  q_bandwidth: "חשב את רוחב הסרט של מעגל ה-RLC.",
  q_inductive_reactance: "מה הריאקטנס האינדוקטיבי (X_L) בתדר {freq} Hz?",
  q_capacitive_reactance: "מה הריאקטנס הקפסיטיבי (X_C) בתדר {freq} Hz?",
  q_time_constant_rl: "מה קבוע הזמן (τ) של מעגל ה-RL?",
  q_time_constant_rc: "מה קבוע הזמן (τ) של מעגל ה-RC?",
  q_power_factor: "מה גורם ההספק של המעגל?",
  q_reactive_power: "חשב את ההספק הריאקטיבי (Q) של המעגל.",
  q_apparent_power: "מה ההספק הנראה (S) של המעגל?",
  q_voltage_source: "אם מתח האספקה מוכפל, מה יקרה לזרם הכולל?",
  q_parallel_total: "מדוע ההתנגדות הכוללת במעגל מקביל תמיד קטנה מהנגד הקטן ביותר?",
  q_series_current: "הסבר מדוע אותו זרם זורם דרך כל הרכיבים במעגל טור.",
};

window.LANG_HE = LANG_HE;
