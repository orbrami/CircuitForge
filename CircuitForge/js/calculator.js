// ============================================================
//  CircuitForge – calculator.js
//  Full circuit calculation engine
//  Made by Or Brami
// ============================================================

'use strict';

/* ── helpers ── */
const fmt2 = v => isFinite(v) ? +v.toPrecision(4) : '∞';
const fmt3 = v => isFinite(v) ? +v.toPrecision(5) : '∞';
const fmtU = (v, unit) => {
  if(!isFinite(v)) return '∞';
  const av = Math.abs(v);
  if(unit==='Ω') {
    if(av>=1e6)  return `${fmt2(v/1e6)} MΩ`;
    if(av>=1e3)  return `${fmt2(v/1e3)} kΩ`;
    return `${fmt2(v)} Ω`;
  }
  if(unit==='A') {
    if(av<1e-3) return `${fmt2(v*1e6)} μA`;
    if(av<1)    return `${fmt2(v*1e3)} mA`;
    return `${fmt2(v)} A`;
  }
  if(unit==='V') {
    if(av<0.001) return `${fmt2(v*1000)} mV`;
    return `${fmt2(v)} V`;
  }
  if(unit==='W') {
    if(av<0.001) return `${fmt2(v*1000)} mW`;
    if(av>=1000) return `${fmt2(v/1000)} kW`;
    return `${fmt2(v)} W`;
  }
  if(unit==='Hz') {
    if(av>=1e6) return `${fmt2(v/1e6)} MHz`;
    if(av>=1e3) return `${fmt2(v/1e3)} kHz`;
    return `${fmt2(v)} Hz`;
  }
  if(unit==='H') {
    if(av<1e-3) return `${fmt2(v*1e6)} μH`;
    if(av<1)    return `${fmt2(v*1e3)} mH`;
    return `${fmt2(v)} H`;
  }
  if(unit==='F') {
    if(av<1e-9)  return `${fmt2(v*1e12)} pF`;
    if(av<1e-6)  return `${fmt2(v*1e9)} nF`;
    if(av<1e-3)  return `${fmt2(v*1e6)} μF`;
    return `${fmt2(v)} F`;
  }
  if(unit==='s') {
    if(av<1e-6) return `${fmt2(v*1e9)} ns`;
    if(av<1e-3) return `${fmt2(v*1e6)} μs`;
    if(av<1)    return `${fmt2(v*1e3)} ms`;
    return `${fmt2(v)} s`;
  }
  return `${fmt2(v)} ${unit}`;
};

/* ── main calculate function ── */
window.calculateCircuit = function(circuit, frequency) {
  const comps  = circuit.components;
  const type   = circuit.type;
  const freq   = frequency || (circuit.frequency || 60);
  const omega  = 2 * Math.PI * freq;

  const vs     = comps.find(c => c.type==='VS');
  const Vs     = vs ? Number(vs.value) : 12;

  const Rs     = comps.filter(c => c.type==='R').map(c => Number(c.value));
  const Ls     = comps.filter(c => c.type==='L').map(c => Number(c.value));
  const Cs     = comps.filter(c => c.type==='C').map(c => Number(c.value));

  let result = { freq, omega, Vs, type, comps, perComp: [] };

  // ── SERIES ──────────────────────────────────
  if(type === 'series') {
    const RT = Rs.reduce((a,b)=>a+b, 0);
    const IT = Vs / RT;
    result = { ...result, RT, IT,
      P:  IT*IT*RT,
      perComp: comps.filter(c=>c.type==='R').map(c => ({
        label: c.label, type: c.type, value: c.value,
        V: fmtU(IT * c.value, 'V'),
        I: fmtU(IT, 'A'),
        P: fmtU(IT*IT*c.value, 'W'),
      }))
    };
  }

  // ── PARALLEL ────────────────────────────────
  else if(type === 'parallel') {
    const sumInv = Rs.reduce((a,b)=>a+1/b, 0);
    const RT = 1 / sumInv;
    const IT = Vs / RT;
    result = { ...result, RT, IT,
      P:  Vs*IT,
      perComp: comps.filter(c=>c.type==='R').map(c => ({
        label: c.label, type: c.type, value: c.value,
        V: fmtU(Vs, 'V'),
        I: fmtU(Vs/c.value, 'A'),
        P: fmtU(Vs*Vs/c.value, 'W'),
      }))
    };
  }

  // ── SERIES-PARALLEL ─────────────────────────
  else if(type === 'series_parallel') {
    const rComps = comps.filter(c=>c.type==='R');
    const R1 = rComps[0] ? Number(rComps[0].value) : 100;
    const R2 = rComps[1] ? Number(rComps[1].value) : 200;
    const R3 = rComps[2] ? Number(rComps[2].value) : 300;
    const Rpar = 1/(1/R2 + 1/R3);
    const RT = R1 + Rpar;
    const IT = Vs / RT;
    const VR1  = IT * R1;
    const Vpar = IT * Rpar;
    const IR2  = Vpar / R2;
    const IR3  = Vpar / R3;
    result = { ...result, RT, IT,
      P: IT*Vs,
      perComp: [
        { label: rComps[0]?.label||'R₁', type:'R', V: fmtU(VR1,'V'), I: fmtU(IT,'A'), P: fmtU(IT*IT*R1,'W') },
        { label: rComps[1]?.label||'R₂', type:'R', V: fmtU(Vpar,'V'), I: fmtU(IR2,'A'), P: fmtU(IR2*IR2*R2,'W') },
        { label: rComps[2]?.label||'R₃', type:'R', V: fmtU(Vpar,'V'), I: fmtU(IR3,'A'), P: fmtU(IR3*IR3*R3,'W') },
      ]
    };
  }

  // ── SERIES RL ───────────────────────────────
  else if(type === 'series_rl') {
    const R  = Rs[0]||1;
    const L  = Ls[0]||1e-3;
    const XL = omega * L;
    const Z  = Math.sqrt(R*R + XL*XL);
    const theta = Math.atan2(XL, R) * 180 / Math.PI;
    const IT = Vs / Z;
    const PF = Math.cos(theta * Math.PI/180);
    const P  = Vs*IT*PF;
    const Q  = Vs*IT*Math.sin(theta*Math.PI/180);
    const S  = Vs*IT;
    const tau= L/R;
    result = { ...result, XL, Z, theta, IT, PF, P, Q, S, tau,
      perComp: [
        { label: comps.find(c=>c.type==='R')?.label||'R₁', type:'R', V: fmtU(IT*R,'V'), I: fmtU(IT,'A'), P: fmtU(IT*IT*R,'W') },
        { label: comps.find(c=>c.type==='L')?.label||'L₁', type:'L', V: fmtU(IT*XL,'V'), I: fmtU(IT,'A'), P: `${fmtU(Q,'W')} (reactive)` },
      ]
    };
  }

  // ── SERIES RC ───────────────────────────────
  else if(type === 'series_rc') {
    const R  = Rs[0]||1000;
    const C  = Cs[0]||1e-6;
    const XC = 1/(omega*C);
    const Z  = Math.sqrt(R*R + XC*XC);
    const theta = -Math.atan2(XC, R) * 180 / Math.PI;
    const IT = Vs / Z;
    const PF = Math.cos(theta * Math.PI/180);
    const P  = Vs*IT*Math.abs(PF);
    const Q  = Vs*IT*Math.abs(Math.sin(theta*Math.PI/180));
    const S  = Vs*IT;
    const tau= R*C;
    result = { ...result, XC, Z, theta, IT, PF, P, Q, S, tau,
      perComp: [
        { label: comps.find(c=>c.type==='R')?.label||'R₁', type:'R', V: fmtU(IT*R,'V'), I: fmtU(IT,'A'), P: fmtU(IT*IT*R,'W') },
        { label: comps.find(c=>c.type==='C')?.label||'C₁', type:'C', V: fmtU(IT*XC,'V'), I: fmtU(IT,'A'), P: `${fmtU(Q,'W')} (reactive)` },
      ]
    };
  }

  // ── SERIES RLC ──────────────────────────────
  else if(type === 'series_rlc') {
    const R  = Rs[0]||100;
    const L  = Ls[0]||0.05;
    const C  = Cs[0]||5e-6;
    const XL = omega*L;
    const XC = 1/(omega*C);
    const X  = XL - XC;
    const Z  = Math.sqrt(R*R + X*X);
    const theta = Math.atan2(X, R) * 180 / Math.PI;
    const IT = Vs / Z;
    const PF = Math.cos(theta * Math.PI/180);
    const P  = IT*IT*R;
    const Q  = IT*IT*Math.abs(X);
    const S  = Vs*IT;
    const f0 = 1/(2*Math.PI*Math.sqrt(L*C));
    const Qf = (1/R)*Math.sqrt(L/C);
    const BW = f0/Qf;
    result = { ...result, XL, XC, X, Z, theta, IT, PF, P, Q, S, f0, Qf, BW,
      perComp: [
        { label: comps.find(c=>c.type==='R')?.label||'R₁', type:'R', V: fmtU(IT*R,'V'), I: fmtU(IT,'A'), P: fmtU(IT*IT*R,'W') },
        { label: comps.find(c=>c.type==='L')?.label||'L₁', type:'L', V: fmtU(IT*XL,'V'), I: fmtU(IT,'A'), P: 'reactive' },
        { label: comps.find(c=>c.type==='C')?.label||'C₁', type:'C', V: fmtU(IT*XC,'V'), I: fmtU(IT,'A'), P: 'reactive' },
      ]
    };
  }

  // ── PARALLEL RL ─────────────────────────────
  else if(type === 'parallel_rl') {
    const R  = Rs[0]||500;
    const L  = Ls[0]||0.08;
    const XL = omega*L;
    const IR = Vs/R;
    const IL = Vs/XL;
    const IT = Math.sqrt(IR*IR + IL*IL);
    const Z  = Vs/IT;
    const theta = -Math.atan2(IL, IR)*180/Math.PI;
    const PF = Math.cos(theta*Math.PI/180);
    const P  = Vs*IR;
    const Q  = Vs*IL;
    const S  = Vs*IT;
    const tau= L/R;
    result = { ...result, XL, Z, theta, IT, IR, IL, PF, P, Q, S, tau,
      perComp: [
        { label: comps.find(c=>c.type==='R')?.label||'R₁', type:'R', V: fmtU(Vs,'V'), I: fmtU(IR,'A'), P: fmtU(P,'W') },
        { label: comps.find(c=>c.type==='L')?.label||'L₁', type:'L', V: fmtU(Vs,'V'), I: fmtU(IL,'A'), P: `${fmtU(Q,'W')} (reactive)` },
      ]
    };
  }

  // ── PARALLEL RC ─────────────────────────────
  else if(type === 'parallel_rc') {
    const R  = Rs[0]||1000;
    const C  = Cs[0]||2e-6;
    const XC = 1/(omega*C);
    const IR = Vs/R;
    const IC = Vs/XC;
    const IT = Math.sqrt(IR*IR + IC*IC);
    const Z  = Vs/IT;
    const theta = Math.atan2(IC, IR)*180/Math.PI;
    const PF = Math.cos(theta*Math.PI/180);
    const P  = Vs*IR;
    const Q  = Vs*IC;
    const S  = Vs*IT;
    const tau= R*C;
    result = { ...result, XC, Z, theta, IT, IR, IC, PF, P, Q, S, tau,
      perComp: [
        { label: comps.find(c=>c.type==='R')?.label||'R₁', type:'R', V: fmtU(Vs,'V'), I: fmtU(IR,'A'), P: fmtU(P,'W') },
        { label: comps.find(c=>c.type==='C')?.label||'C₁', type:'C', V: fmtU(Vs,'V'), I: fmtU(IC,'A'), P: `${fmtU(Q,'W')} (reactive)` },
      ]
    };
  }

  // ── PARALLEL RLC ────────────────────────────
  else if(type === 'parallel_rlc') {
    const R  = Rs[0]||1000;
    const L  = Ls[0]||0.1;
    const C  = Cs[0]||1e-6;
    const XL = omega*L;
    const XC = 1/(omega*C);
    const IR = Vs/R;
    const IL = Vs/XL;
    const IC = Vs/XC;
    const IX = IC - IL;
    const IT = Math.sqrt(IR*IR + IX*IX);
    const Z  = Vs/IT;
    const theta = Math.atan2(IX, IR)*180/Math.PI;
    const PF = Math.cos(theta*Math.PI/180);
    const P  = Vs*IR;
    const Q  = Vs*Math.abs(IX);
    const S  = Vs*IT;
    const f0 = 1/(2*Math.PI*Math.sqrt(L*C));
    const Qf = R*Math.sqrt(C/L);
    const BW = f0/Qf;
    result = { ...result, XL, XC, Z, theta, IT, IR, IL, IC, PF, P, Q, S, f0, Qf, BW,
      perComp: [
        { label: comps.find(c=>c.type==='R')?.label||'R₁', type:'R', V: fmtU(Vs,'V'), I: fmtU(IR,'A'), P: fmtU(P,'W') },
        { label: comps.find(c=>c.type==='L')?.label||'L₁', type:'L', V: fmtU(Vs,'V'), I: fmtU(IL,'A'), P: `${fmtU(Q,'W')} (reactive)` },
        { label: comps.find(c=>c.type==='C')?.label||'C₁', type:'C', V: fmtU(Vs,'V'), I: fmtU(IC,'A'), P: 'reactive' },
      ]
    };
  }

  // attach formatted display values
  result.display = buildDisplay(result, fmtU);
  return result;
};

/* ── build display object for UI ── */
function buildDisplay(r, fmtU) {
  const d = {};
  if(r.RT    !== undefined) d.RT    = fmtU(r.RT, 'Ω');
  if(r.Z     !== undefined) d.Z     = fmtU(r.Z,  'Ω');
  if(r.IT    !== undefined) d.IT    = fmtU(r.IT, 'A');
  if(r.theta !== undefined) d.theta = `${fmt2(r.theta)}°`;
  if(r.PF    !== undefined) d.PF    = fmt2(Math.abs(r.PF)) + (r.theta>0?' (lagging)':r.theta<0?' (leading)':'');
  if(r.P     !== undefined) d.P     = fmtU(r.P,  'W');
  if(r.Q     !== undefined) d.Q     = fmtU(r.Q,  'W') + ' VAR';
  if(r.S     !== undefined) d.S     = fmtU(r.S,  'W') + ' VA';
  if(r.XL    !== undefined) d.XL    = fmtU(r.XL, 'Ω');
  if(r.XC    !== undefined) d.XC    = fmtU(r.XC, 'Ω');
  if(r.f0    !== undefined) d.f0    = fmtU(r.f0, 'Hz');
  if(r.Qf    !== undefined) d.Qf    = fmt2(r.Qf);
  if(r.BW    !== undefined) d.BW    = fmtU(r.BW, 'Hz');
  if(r.tau   !== undefined) d.tau   = fmtU(r.tau,'s');
  d.Vs = fmtU(r.Vs, 'V');
  d.freq  = fmtU(r.freq, 'Hz');
  d.omega = fmt2(r.omega) + ' rad/s';
  return d;
}

/* ── exposed formatter ── */
window.fmtU = fmtU;
window.fmt2  = fmt2;
