// ============================================================
//  CircuitForge – questions.js
//  Practice question generator with full solutions
//  Made by Or Brami
// ============================================================

'use strict';

/* ── Format helpers (reuse from calculator if loaded) ── */
const _fmt2 = v => isFinite(v) ? +v.toPrecision(4) : '∞';
const _fmtU = window.fmtU || ((v,u)=>`${_fmt2(v)} ${u}`);

/* ── Question bank builder ── */
window.generateQuestions = function(circuit, calcResult, lang) {
  const L = lang; // translation object
  const t = circuit.type;
  const d = calcResult.display;
  const r = calcResult;
  const comps = circuit.components.filter(c=>c.type!=='VS');
  const vs    = circuit.components.find(c=>c.type==='VS');
  const freq  = r.freq;

  const questions = [];
  let id = 0;

  function addQ(text, solution, difficulty=0) {
    questions.push({ id: ++id, text, solution, difficulty });
  }

  const Rs = circuit.components.filter(c=>c.type==='R');
  const Ls = circuit.components.filter(c=>c.type==='L');
  const Cs = circuit.components.filter(c=>c.type==='C');

  // ── UNIVERSAL QUESTIONS ─────────────────────
  // Total current
  if(r.IT !== undefined) {
    const steps = buildCurrentSolution(t, r, d, L);
    addQ(L.q_total_current, steps, 0);
  }

  // Total resistance / impedance
  if(r.RT !== undefined) {
    addQ(L.q_total_resistance, buildRtSolution(t, r, d, circuit, L), 0);
  }
  if(r.Z !== undefined && r.RT === undefined) {
    addQ(L.q_impedance.replace('{freq}', freq), buildZSolution(t,r,d,L), 1);
  }

  // Phase angle
  if(r.theta !== undefined) {
    addQ(L.q_phase_angle, buildThetaSolution(t,r,d,L), 1);
  }

  // Power factor
  if(r.PF !== undefined) {
    addQ(L.q_power_factor, buildPFSolution(r,d,L), 1);
  }

  // Total power
  if(r.P !== undefined) {
    addQ(L.q_total_power, buildPowerSolution(r,d,L), 0);
  }

  // Reactive power
  if(r.Q !== undefined) {
    addQ(L.q_reactive_power, buildQSolution(r,d,L), 1);
  }

  // Apparent power
  if(r.S !== undefined) {
    addQ(L.q_apparent_power, buildSSolution(r,d,L), 1);
  }

  // XL
  if(r.XL !== undefined) {
    addQ(L.q_inductive_reactance.replace('{freq}',freq), buildXLSolution(r,d,L), 1);
  }

  // XC
  if(r.XC !== undefined) {
    addQ(L.q_capacitive_reactance.replace('{freq}',freq), buildXCSolution(r,d,L), 1);
  }

  // Resonant frequency
  if(r.f0 !== undefined) {
    addQ(L.q_resonant_freq, buildF0Solution(r,d,L), 2);
  }

  // Quality factor
  if(r.Qf !== undefined) {
    addQ(L.q_quality_factor, buildQfSolution(r,d,L), 2);
  }

  // Bandwidth
  if(r.BW !== undefined) {
    addQ(L.q_bandwidth, buildBWSolution(r,d,L), 2);
  }

  // Time constant
  if(r.tau !== undefined && (t.includes('rl')||t.includes('rc'))) {
    const key = t.includes('rl') ? L.q_time_constant_rl : L.q_time_constant_rc;
    addQ(key, buildTauSolution(r,d,L), 1);
  }

  // Per-component voltage divider / current divider
  r.perComp.forEach(pc => {
    if(t.includes('series') || t==='series') {
      addQ(L.q_voltage_divider.replace('{label}',pc.label),
        buildVdivSolution(pc, r, d, L), 0);
      addQ(L.q_power_component.replace('{label}',pc.label),
        buildPcompSolution(pc, L), 0);
    }
    if(t.includes('parallel') || t==='parallel') {
      addQ(L.q_current_divider.replace('{label}',pc.label),
        buildIdivSolution(pc, r, d, L), 0);
      addQ(L.q_power_component.replace('{label}',pc.label),
        buildPcompSolution(pc, L), 0);
    }
  });

  // Conceptual
  if(t==='parallel') {
    addQ(L.q_parallel_total, buildParallelConceptSolution(L), 2);
  }
  if(t.startsWith('series')) {
    addQ(L.q_series_current, buildSeriesConceptSolution(L), 2);
  }

  // Double voltage conceptual
  addQ(L.q_voltage_source, buildDoubleVSolution(t,r,d,L), 1);

  return questions.slice(0, 14); // up to 14 questions
};

// ────────────────────────────────────────────
//  SOLUTION BUILDERS
// ────────────────────────────────────────────

function line(text) {
  return `<span class="sol-step">${text}</span>`;
}
function answer(text) {
  return `<span class="sol-step sol-answer">✓ ${text}</span>`;
}
function sep() {
  return `<span class="sol-step" style="color:rgba(255,255,255,0.1)">─────────────────</span>`;
}

// ── Current ──
function buildCurrentSolution(type, r, d, L) {
  const isAC = !!r.Z;
  if(isAC) {
    return [
      line(`Z = ${d.Z}`),
      line(`I = V / Z = ${d.Vs} / ${d.Z}`),
      sep(),
      answer(`I_T = ${d.IT}`)
    ].join('');
  }
  return [
    line(`R_T = ${d.RT}`),
    line(`I = V / R = ${d.Vs} / ${d.RT}`),
    sep(),
    answer(`I_T = ${d.IT}`)
  ].join('');
}

// ── Total Resistance ──
function buildRtSolution(type, r, d, circuit, L) {
  const Rs = circuit.components.filter(c=>c.type==='R');
  if(type==='series') {
    const parts = Rs.map(c=>`${c.value}Ω`).join(' + ');
    return [
      line(`Series: R_T = R₁ + R₂ + ... = ${parts}`),
      sep(),
      answer(`R_T = ${d.RT}`)
    ].join('');
  }
  if(type==='parallel') {
    const parts = Rs.map(c=>`1/${c.value}`).join(' + ');
    return [
      line(`Parallel: 1/R_T = ${parts}`),
      line(`R_T = 1 / (${parts})`),
      sep(),
      answer(`R_T = ${d.RT}`)
    ].join('');
  }
  if(type==='series_parallel') {
    const r = circuit.components.filter(c=>c.type==='R');
    const R2 = r[1]?.value||200, R3 = r[2]?.value||300;
    const Rpar = 1/(1/R2+1/R3);
    return [
      line(`R₂ ‖ R₃ = (R₂×R₃)/(R₂+R₃) = (${R2}×${R3})/(${R2}+${R3}) = ${_fmt2(Rpar)}Ω`),
      line(`R_T = R₁ + R_par = ${r[0]?.value||100} + ${_fmt2(Rpar)}`),
      sep(),
      answer(`R_T = ${d.RT}`)
    ].join('');
  }
  return answer(`R_T = ${d.RT}`);
}

// ── Impedance ──
function buildZSolution(type, r, d, L) {
  const steps = [];
  if(r.XL) steps.push(line(`X_L = ωL = ${d.omega} × L = ${d.XL}`));
  if(r.XC) steps.push(line(`X_C = 1/ωC = ${d.XC}`));
  if(type.includes('series')) {
    const X = r.XL && r.XC ? line(`X = X_L − X_C = ${_fmt2(r.XL)} − ${_fmt2(r.XC)} = ${_fmt2(r.XL-r.XC)}Ω`) : '';
    if(X) steps.push(X);
    steps.push(line(`Z = √(R² + X²) = ${d.Z}`));
  } else {
    steps.push(line(`Z = V / I_T = ${d.Vs} / ${_fmt2(r.IT)} = ${d.Z}`));
  }
  steps.push(sep(), answer(`Z = ${d.Z}`));
  return steps.join('');
}

// ── Phase angle ──
function buildThetaSolution(type, r, d, L) {
  const steps = [];
  if(type.includes('series')) {
    steps.push(line(`θ = arctan(X / R)`));
    if(r.XL && r.XC) steps.push(line(`X = X_L − X_C = ${_fmt2(r.XL-r.XC)}Ω`));
    else if(r.XL) steps.push(line(`X = X_L = ${d.XL}`));
    else if(r.XC) steps.push(line(`X = −X_C = −${d.XC}`));
  } else {
    steps.push(line(`θ = arctan(I_X / I_R)`));
  }
  steps.push(sep(), answer(`θ = ${d.theta} (${r.theta>0?'lagging / inductive':'leading / capacitive'})`));
  return steps.join('');
}

// ── Power factor ──
function buildPFSolution(r, d, L) {
  return [
    line(`PF = cos(θ) = cos(${_fmt2(r.theta)}°)`),
    sep(),
    answer(`PF = ${d.PF}`)
  ].join('');
}

// ── Active power ──
function buildPowerSolution(r, d, L) {
  const steps = [];
  if(r.RT) {
    steps.push(line(`P = I² × R = (${_fmt2(r.IT)})² × ${_fmt2(r.RT)}`));
    steps.push(line(`P = V × I = ${_fmt2(r.Vs)} × ${_fmt2(r.IT)}`));
  } else {
    steps.push(line(`P = V × I × PF = ${_fmt2(r.Vs)} × ${_fmt2(r.IT)} × ${_fmt2(Math.abs(r.PF||1))}`));
  }
  steps.push(sep(), answer(`P = ${d.P}`));
  return steps.join('');
}

// ── Reactive power ──
function buildQSolution(r, d, L) {
  return [
    line(`Q = V × I × sin(θ) = ${_fmt2(r.Vs)} × ${_fmt2(r.IT)} × sin(${_fmt2(r.theta)}°)`),
    sep(),
    answer(`Q = ${d.Q}`)
  ].join('');
}

// ── Apparent power ──
function buildSSolution(r, d, L) {
  return [
    line(`S = V × I = ${_fmt2(r.Vs)} × ${_fmt2(r.IT)}`),
    line(`S = √(P² + Q²)`),
    sep(),
    answer(`S = ${d.S}`)
  ].join('');
}

// ── XL ──
function buildXLSolution(r, d, L) {
  const Lval = r.comps ? r.comps.find(c=>c.type==='L')?.value : '?';
  return [
    line(`X_L = ω × L = 2π × f × L`),
    line(`X_L = 2π × ${_fmt2(r.freq)} × ${Lval}`),
    sep(),
    answer(`X_L = ${d.XL}`)
  ].join('');
}

// ── XC ──
function buildXCSolution(r, d, L) {
  const Cval = r.comps ? r.comps.find(c=>c.type==='C')?.value : '?';
  return [
    line(`X_C = 1 / (ω × C) = 1 / (2π × f × C)`),
    line(`X_C = 1 / (2π × ${_fmt2(r.freq)} × ${Cval})`),
    sep(),
    answer(`X_C = ${d.XC}`)
  ].join('');
}

// ── Resonant frequency ──
function buildF0Solution(r, d, L) {
  const Lval = r.comps ? r.comps.find(c=>c.type==='L')?.value : '?';
  const Cval = r.comps ? r.comps.find(c=>c.type==='C')?.value : '?';
  return [
    line(`f₀ = 1 / (2π√(LC))`),
    line(`f₀ = 1 / (2π × √(${Lval} × ${Cval}))`),
    sep(),
    answer(`f₀ = ${d.f0}`)
  ].join('');
}

// ── Quality factor ──
function buildQfSolution(r, d, L) {
  const Rval = r.comps ? r.comps.find(c=>c.type==='R')?.value : '?';
  const Lval = r.comps ? r.comps.find(c=>c.type==='L')?.value : '?';
  const Cval = r.comps ? r.comps.find(c=>c.type==='C')?.value : '?';
  const isS  = r.type?.includes('series');
  return [
    line(isS ? `Q = (1/R) × √(L/C)` : `Q = R × √(C/L)`),
    line(`f₀ = ${d.f0}`),
    sep(),
    answer(`Q-factor = ${d.Qf}`)
  ].join('');
}

// ── Bandwidth ──
function buildBWSolution(r, d, L) {
  return [
    line(`BW = f₀ / Q = ${d.f0} / ${d.Qf}`),
    line(`BW = R / (2πL)  [for series RLC]`),
    sep(),
    answer(`BW = ${d.BW}`)
  ].join('');
}

// ── Time constant ──
function buildTauSolution(r, d, L) {
  const type = r.type;
  if(type.includes('rl')) {
    const Rval = r.comps?r.comps.find(c=>c.type==='R')?.value:'?';
    const Lval = r.comps?r.comps.find(c=>c.type==='L')?.value:'?';
    return [
      line(`τ = L / R = ${Lval} / ${Rval}`),
      sep(),
      answer(`τ = ${d.tau}`)
    ].join('');
  } else {
    const Rval = r.comps?r.comps.find(c=>c.type==='R')?.value:'?';
    const Cval = r.comps?r.comps.find(c=>c.type==='C')?.value:'?';
    return [
      line(`τ = R × C = ${Rval} × ${Cval}`),
      sep(),
      answer(`τ = ${d.tau}`)
    ].join('');
  }
}

// ── Voltage divider ──
function buildVdivSolution(pc, r, d, L) {
  return [
    line(`V = I × R = ${d.IT} × ${pc.value??'R'}Ω`),
    line(`Or: V = V_S × (R / R_T) [voltage divider rule]`),
    sep(),
    answer(`V(${pc.label}) = ${pc.V}`)
  ].join('');
}

// ── Current divider ──
function buildIdivSolution(pc, r, d, L) {
  return [
    line(`I = V_S / R = ${d.Vs} / ${pc.value??'R'}Ω`),
    line(`Voltage across all parallel branches = V_S`),
    sep(),
    answer(`I(${pc.label}) = ${pc.I}`)
  ].join('');
}

// ── Power per component ──
function buildPcompSolution(pc, L) {
  return [
    line(`P = V × I = ${pc.V} × ${pc.I}`),
    line(`P = I² × R  or  P = V² / R`),
    sep(),
    answer(`P(${pc.label}) = ${pc.P}`)
  ].join('');
}

// ── Parallel concept ──
function buildParallelConceptSolution(L) {
  return [
    line(`1/R_T = 1/R₁ + 1/R₂ + ...`),
    line(`Adding more terms always increases 1/R_T,`),
    line(`which means R_T decreases.`),
    line(`A parallel path always provides an additional`),
    line(`route for current, lowering total opposition.`),
    sep(),
    answer(`R_T < min(R₁, R₂, ...) — always true for parallel circuits.`)
  ].join('');
}

// ── Series concept ──
function buildSeriesConceptSolution(L) {
  return [
    line(`In a series circuit, there is only ONE path for current.`),
    line(`By Kirchhoff's Current Law (KCL), current entering`),
    line(`any node equals current leaving — since there are no`),
    line(`branches, the same current flows everywhere.`),
    sep(),
    answer(`I = constant throughout all series components.`)
  ].join('');
}

// ── Double voltage ──
function buildDoubleVSolution(type, r, d, L) {
  const doubled = _fmt2(r.IT*2);
  if(type.includes('parallel') || type==='parallel') {
    return [
      line(`V doubles → I = V/R doubles for each branch.`),
      line(`Total current also doubles.`),
      sep(),
      answer(`I_T would become ${doubled} ${d.IT.includes('m')?'m':''}A (doubled).`)
    ].join('');
  }
  return [
    line(`By Ohm's Law: I = V / R (or V / Z for AC).`),
    line(`If V doubles, and R (or Z) stays constant, I doubles.`),
    sep(),
    answer(`I_T would become ${doubled} ${d.IT.includes('m')?'m':''}A (doubled).`)
  ].join('');
}
