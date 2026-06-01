// CircuitForge - English Translations
// Made by Or Brami

const LANG_EN = {
  // App
  appName: "CircuitForge",
  appTagline: "Interactive Circuit Laboratory",
  madeBy: "Made by Or Brami",

  // Nav / Header
  langToggle: "עברית",
  darkMode: "Dark Mode",

  // Sidebar
  circuitTemplates: "Circuit Templates",
  searchTemplates: "Search templates...",
  generateRandom: "⚡ Random Circuit",

  // Template categories
  catResistive: "Resistive",
  catReactive: "Reactive",
  catMixed: "Mixed",

  // Template names
  tplSeries: "Series Resistors",
  tplParallel: "Parallel Resistors",
  tplSeriesParallel: "Series-Parallel Mixed",
  tplSeriesRL: "Series RL",
  tplSeriesRC: "Series RC",
  tplSeriesRLC: "Series RLC",
  tplParallelRL: "Parallel RL",
  tplParallelRC: "Parallel RC",
  tplParallelRLC: "Parallel RLC",

  // Template descriptions
  descSeries: "Resistors connected end-to-end, same current flows through all",
  descParallel: "Resistors connected across same voltage, current divides",
  descSeriesParallel: "Combination of series and parallel resistor networks",
  descSeriesRL: "Resistor and inductor in series — frequency-dependent impedance",
  descSeriesRC: "Resistor and capacitor in series — RC time constant circuit",
  descSeriesRLC: "Full RLC series circuit — resonance and impedance analysis",
  descParallelRL: "Resistor and inductor in parallel — admittance analysis",
  descParallelRC: "Resistor and capacitor in parallel — parallel RC network",
  descParallelRLC: "Full RLC parallel circuit — parallel resonance",

  // Canvas / central area
  circuitDiagram: "Circuit Diagram",
  components: "Components",
  addComponent: "+ Add Component",
  deleteComponent: "Delete",
  componentType: "Type",
  componentValue: "Value",
  componentLabel: "Label",
  editValue: "Edit Value",
  noCircuit: "Select a circuit template from the left panel to get started.",

  // Component types
  compResistor: "Resistor",
  compInductor: "Inductor",
  compCapacitor: "Capacitor",
  compVoltageSource: "Voltage Source",

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
  resultsTitle: "Calculation Results",
  noResults: "Load a circuit to see calculations.",
  frequency: "Frequency (f)",
  angularFreq: "Angular Freq. (ω)",
  totalResistance: "Total Resistance (R_T)",
  totalImpedance: "Total Impedance (Z)",
  phaseAngle: "Phase Angle (θ)",
  totalCurrent: "Total Current (I_T)",
  supplyVoltage: "Supply Voltage (V_S)",
  powerFactor: "Power Factor (PF)",
  activePower: "Active Power (P)",
  reactivePower: "Reactive Power (Q)",
  apparentPower: "Apparent Power (S)",
  resonantFreq: "Resonant Frequency (f₀)",
  qualityFactor: "Quality Factor (Q-factor)",
  bandwidth: "Bandwidth (BW)",
  timeConstant: "Time Constant (τ)",
  inductiveReactance: "Inductive Reactance (X_L)",
  capacitiveReactance: "Capacitive Reactance (X_C)",
  perComponent: "Per-Component Values",
  voltageAcross: "Voltage across",
  currentThrough: "Current through",

  // Practice Questions
  practiceTitle: "Practice Questions",
  generateQuestions: "Generate Questions",
  showSolution: "Show Solution",
  hideSolution: "Hide Solution",
  noQuestionsYet: "Click 'Generate Questions' to create practice problems for the current circuit.",
  questionDifficulty: ["Basic", "Intermediate", "Advanced"],

  // Add component modal
  addComponentTitle: "Add Component",
  selectType: "Select Component Type",
  enterValue: "Enter Value",
  enterLabel: "Enter Label (optional)",
  cancel: "Cancel",
  add: "Add",
  confirmDelete: "Are you sure you want to delete this component?",

  // Toast messages
  toastCircuitLoaded: "Circuit loaded",
  toastComponentAdded: "Component added",
  toastComponentDeleted: "Component deleted",
  toastSaved: "Circuit saved",
  toastRandomGenerated: "Random circuit generated!",
  toastInvalidValue: "Please enter a valid positive number",

  // Footer
  footerDesc: "Interactive circuit lab for learning electronics",
  footerBy: "Built with ❤️ by",

  // Question templates (used in JS to generate questions)
  q_total_resistance: "What is the total equivalent resistance of this circuit?",
  q_total_current: "What is the total current supplied by the voltage source?",
  q_voltage_divider: "Calculate the voltage drop across {label}.",
  q_current_divider: "Calculate the current flowing through {label}.",
  q_power_component: "What is the power dissipated by {label}?",
  q_total_power: "What is the total power consumed by the circuit?",
  q_impedance: "Calculate the total impedance of this RLC circuit at {freq} Hz.",
  q_phase_angle: "What is the phase angle between voltage and current?",
  q_resonant_freq: "At what frequency does resonance occur in this RLC circuit?",
  q_quality_factor: "What is the quality factor (Q) of this circuit?",
  q_bandwidth: "Calculate the bandwidth of this RLC circuit.",
  q_inductive_reactance: "What is the inductive reactance (X_L) at {freq} Hz?",
  q_capacitive_reactance: "What is the capacitive reactance (X_C) at {freq} Hz?",
  q_time_constant_rl: "What is the time constant (τ) of this RL circuit?",
  q_time_constant_rc: "What is the time constant (τ) of this RC circuit?",
  q_power_factor: "What is the power factor of this circuit?",
  q_reactive_power: "Calculate the reactive power (Q) of the circuit.",
  q_apparent_power: "What is the apparent power (S) of the circuit?",
  q_voltage_source: "If the supply voltage is doubled, what happens to the total current?",
  q_parallel_total: "Why is the total resistance in a parallel circuit always less than the smallest individual resistor?",
  q_series_current: "Explain why the same current flows through all components in a series circuit.",
};

window.LANG_EN = LANG_EN;
