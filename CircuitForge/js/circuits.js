// ============================================================
//  CircuitForge – circuits.js
//  Circuit templates & SVG rendering engine
//  Made by Or Brami
// ============================================================

'use strict';

// ──────────────────────────────────────────────
//  CIRCUIT TEMPLATES
// ──────────────────────────────────────────────
window.CIRCUIT_TEMPLATES = [
  {
    id: 'series_r',
    categoryKey: 'catResistive',
    nameKey: 'tplSeries',
    descKey: 'descSeries',
    badge: 'badge-resistive',
    type: 'series',
    hasAC: false,
    components: [
      { id: 'V1', type: 'VS', label: 'V₁', value: 12, unit: 'V' },
      { id: 'R1', type: 'R',  label: 'R₁', value: 100, unit: 'Ω' },
      { id: 'R2', type: 'R',  label: 'R₂', value: 220, unit: 'Ω' },
      { id: 'R3', type: 'R',  label: 'R₃', value: 330, unit: 'Ω' },
    ],
  },
  {
    id: 'parallel_r',
    categoryKey: 'catResistive',
    nameKey: 'tplParallel',
    descKey: 'descParallel',
    badge: 'badge-resistive',
    type: 'parallel',
    hasAC: false,
    components: [
      { id: 'V1', type: 'VS', label: 'V₁', value: 12, unit: 'V' },
      { id: 'R1', type: 'R',  label: 'R₁', value: 100, unit: 'Ω' },
      { id: 'R2', type: 'R',  label: 'R₂', value: 220, unit: 'Ω' },
      { id: 'R3', type: 'R',  label: 'R₃', value: 470, unit: 'Ω' },
    ],
  },
  {
    id: 'series_parallel',
    categoryKey: 'catMixed',
    nameKey: 'tplSeriesParallel',
    descKey: 'descSeriesParallel',
    badge: 'badge-mixed',
    type: 'series_parallel',
    hasAC: false,
    components: [
      { id: 'V1', type: 'VS', label: 'V₁', value: 24, unit: 'V' },
      { id: 'R1', type: 'R',  label: 'R₁', value: 100, unit: 'Ω' },
      { id: 'R2', type: 'R',  label: 'R₂', value: 200, unit: 'Ω' },
      { id: 'R3', type: 'R',  label: 'R₃', value: 300, unit: 'Ω' },
    ],
  },
  {
    id: 'series_rl',
    categoryKey: 'catReactive',
    nameKey: 'tplSeriesRL',
    descKey: 'descSeriesRL',
    badge: 'badge-reactive',
    type: 'series_rl',
    hasAC: true,
    frequency: 1000,
    components: [
      { id: 'V1', type: 'VS', label: 'V₁', value: 10, unit: 'V' },
      { id: 'R1', type: 'R',  label: 'R₁', value: 100, unit: 'Ω' },
      { id: 'L1', type: 'L',  label: 'L₁', value: 0.05, unit: 'H' },
    ],
  },
  {
    id: 'series_rc',
    categoryKey: 'catReactive',
    nameKey: 'tplSeriesRC',
    descKey: 'descSeriesRC',
    badge: 'badge-reactive',
    type: 'series_rc',
    hasAC: true,
    frequency: 1000,
    components: [
      { id: 'V1', type: 'VS', label: 'V₁', value: 10, unit: 'V' },
      { id: 'R1', type: 'R',  label: 'R₁', value: 1000, unit: 'Ω' },
      { id: 'C1', type: 'C',  label: 'C₁', value: 1e-6, unit: 'F' },
    ],
  },
  {
    id: 'series_rlc',
    categoryKey: 'catReactive',
    nameKey: 'tplSeriesRLC',
    descKey: 'descSeriesRLC',
    badge: 'badge-reactive',
    type: 'series_rlc',
    hasAC: true,
    frequency: 1000,
    components: [
      { id: 'V1', type: 'VS', label: 'V₁', value: 10, unit: 'V' },
      { id: 'R1', type: 'R',  label: 'R₁', value: 100, unit: 'Ω' },
      { id: 'L1', type: 'L',  label: 'L₁', value: 0.05, unit: 'H' },
      { id: 'C1', type: 'C',  label: 'C₁', value: 5e-6, unit: 'F' },
    ],
  },
  {
    id: 'parallel_rl',
    categoryKey: 'catReactive',
    nameKey: 'tplParallelRL',
    descKey: 'descParallelRL',
    badge: 'badge-reactive',
    type: 'parallel_rl',
    hasAC: true,
    frequency: 1000,
    components: [
      { id: 'V1', type: 'VS', label: 'V₁', value: 10, unit: 'V' },
      { id: 'R1', type: 'R',  label: 'R₁', value: 500, unit: 'Ω' },
      { id: 'L1', type: 'L',  label: 'L₁', value: 0.08, unit: 'H' },
    ],
  },
  {
    id: 'parallel_rc',
    categoryKey: 'catReactive',
    nameKey: 'tplParallelRC',
    descKey: 'descParallelRC',
    badge: 'badge-reactive',
    type: 'parallel_rc',
    hasAC: true,
    frequency: 1000,
    components: [
      { id: 'V1', type: 'VS', label: 'V₁', value: 10, unit: 'V' },
      { id: 'R1', type: 'R',  label: 'R₁', value: 1000, unit: 'Ω' },
      { id: 'C1', type: 'C',  label: 'C₁', value: 2e-6, unit: 'F' },
    ],
  },
  {
    id: 'parallel_rlc',
    categoryKey: 'catReactive',
    nameKey: 'tplParallelRLC',
    descKey: 'descParallelRLC',
    badge: 'badge-reactive',
    type: 'parallel_rlc',
    hasAC: true,
    frequency: 1000,
    components: [
      { id: 'V1', type: 'VS', label: 'V₁', value: 10, unit: 'V' },
      { id: 'R1', type: 'R',  label: 'R₁', value: 1000, unit: 'Ω' },
      { id: 'L1', type: 'L',  label: 'L₁', value: 0.1, unit: 'H' },
      { id: 'C1', type: 'C',  label: 'C₁', value: 1e-6, unit: 'F' },
    ],
  },
];

// ──────────────────────────────────────────────
//  RANDOM CIRCUIT GENERATOR
// ──────────────────────────────────────────────
window.generateRandomCircuit = function() {
  const types = [
    'series','parallel','series_parallel',
    'series_rl','series_rc','series_rlc',
    'parallel_rl','parallel_rc','parallel_rlc'
  ];
  const type = types[Math.floor(Math.random() * types.length)];
  const hasAC = type.includes('rl') || type.includes('rc') || type.includes('rlc');

  const rndR  = ()  => [10,22,47,100,150,220,330,470,560,680,1000][Math.floor(Math.random()*11)];
  const rndL  = ()  => parseFloat((Math.random()*0.2 + 0.01).toFixed(4));
  const rndC  = ()  => parseFloat((Math.random()*0.00001 + 0.0000001).toExponential(2));
  const rndV  = ()  => [5,9,10,12,15,24][Math.floor(Math.random()*6)];
  const rndF  = ()  => [50,100,500,1000,5000,10000][Math.floor(Math.random()*6)];

  let components = [{ id:'V1', type:'VS', label:'V₁', value: rndV(), unit:'V' }];

  switch(type) {
    case 'series':
    case 'parallel':
    case 'series_parallel': {
      const n = 2 + Math.floor(Math.random()*3);
      for(let i=1;i<=n;i++) components.push({id:`R${i}`,type:'R',label:`R${i}`,value:rndR(),unit:'Ω'});
      break;
    }
    case 'series_rl':
    case 'parallel_rl':
      components.push({id:'R1',type:'R',label:'R₁',value:rndR(),unit:'Ω'});
      components.push({id:'L1',type:'L',label:'L₁',value:rndL(),unit:'H'});
      break;
    case 'series_rc':
    case 'parallel_rc':
      components.push({id:'R1',type:'R',label:'R₁',value:rndR()*5,unit:'Ω'});
      components.push({id:'C1',type:'C',label:'C₁',value:rndC(),unit:'F'});
      break;
    case 'series_rlc':
    case 'parallel_rlc':
      components.push({id:'R1',type:'R',label:'R₁',value:rndR(),unit:'Ω'});
      components.push({id:'L1',type:'L',label:'L₁',value:rndL(),unit:'H'});
      components.push({id:'C1',type:'C',label:'C₁',value:rndC(),unit:'F'});
      break;
  }

  // Map type to name/desc keys
  const keyMap = {
    series:         {nameKey:'tplSeries',       descKey:'descSeries',       badge:'badge-resistive'},
    parallel:       {nameKey:'tplParallel',      descKey:'descParallel',     badge:'badge-resistive'},
    series_parallel:{nameKey:'tplSeriesParallel',descKey:'descSeriesParallel',badge:'badge-mixed'},
    series_rl:      {nameKey:'tplSeriesRL',      descKey:'descSeriesRL',     badge:'badge-reactive'},
    series_rc:      {nameKey:'tplSeriesRC',      descKey:'descSeriesRC',     badge:'badge-reactive'},
    series_rlc:     {nameKey:'tplSeriesRLC',     descKey:'descSeriesRLC',    badge:'badge-reactive'},
    parallel_rl:    {nameKey:'tplParallelRL',    descKey:'descParallelRL',   badge:'badge-reactive'},
    parallel_rc:    {nameKey:'tplParallelRC',    descKey:'descParallelRC',   badge:'badge-reactive'},
    parallel_rlc:   {nameKey:'tplParallelRLC',   descKey:'descParallelRLC',  badge:'badge-reactive'},
  };

  return {
    id: 'random_' + Date.now(),
    type,
    hasAC,
    frequency: hasAC ? rndF() : 60,
    components,
    isRandom: true,
    badge: 'badge-random',
    ...keyMap[type],
  };
};

// ──────────────────────────────────────────────
//  SVG DRAWING ENGINE
// ──────────────────────────────────────────────

const SVG_NS = 'http://www.w3.org/2000/svg';
const C = {           // colors
  wire    : '#a0aec0',
  r       : '#f59e0b',
  l       : '#4f8ef7',
  c       : '#00d4ff',
  vs      : '#22c55e',
  text    : '#e8ecf5',
  textDim : '#8b95b0',
  node    : '#4f8ef7',
  gnd     : '#8b95b0',
};

function el(tag, attrs, children) {
  const e = document.createElementNS(SVG_NS, tag);
  for (const [k,v] of Object.entries(attrs||{})) e.setAttribute(k,v);
  for (const c of (children||[])) { if(c) e.appendChild(c); }
  return e;
}

function text(x, y, str, opts={}) {
  const t = el('text', {
    x, y,
    'text-anchor': opts.anchor || 'middle',
    'dominant-baseline': opts.base || 'auto',
    fill: opts.color || C.text,
    'font-size': opts.size || 11,
    'font-family': "'Space Mono','Courier New',monospace",
    'font-weight': opts.weight || 'normal',
  });
  t.textContent = str;
  return t;
}

// ── resistor zigzag ──
function drawResistor(x, y, label, value) {
  const g = el('g', { class:'svg-component' });
  const n = 6; const segW = 8; const amp = 7;
  const totalW = n * segW; const startX = x - totalW/2;
  let pts = `${startX},${y}`;
  for(let i=0;i<n;i++) {
    pts += ` ${startX + i*segW + segW/2},${y + (i%2===0 ? -amp : amp)}`;
  }
  pts += ` ${startX + totalW},${y}`;
  g.appendChild(el('polyline',{points:pts,stroke:C.r,'stroke-width':2,'fill':'none','stroke-linecap':'round','stroke-linejoin':'round'}));
  g.appendChild(el('line',{x1:x-totalW/2-20,y1:y,x2:startX,y2:y,stroke:C.wire,'stroke-width':1.5}));
  g.appendChild(el('line',{x1:startX+totalW,y1:y,x2:x+totalW/2+20,y2:y,stroke:C.wire,'stroke-width':1.5}));
  g.appendChild(text(x, y-14, label,   {size:10,color:C.r,weight:'bold'}));
  g.appendChild(text(x, y+20, fmtVal(value,'R'), {size:9,color:C.textDim}));
  return g;
}

// ── inductor (bumps) ──
function drawInductor(x, y, label, value) {
  const g = el('g', { class:'svg-component' });
  const bumps = 4; const bR = 8;
  let d = `M ${x - bumps*bR*2/2} ${y}`;
  for(let i=0;i<bumps;i++) {
    const cx = x - bumps*bR*2/2 + i*bR*2 + bR;
    d += ` A ${bR} ${bR} 0 0 1 ${cx+bR} ${y}`;
  }
  const totalW = bumps*bR*2;
  g.appendChild(el('path',{d,stroke:C.l,'stroke-width':2,'fill':'none','stroke-linecap':'round'}));
  g.appendChild(el('line',{x1:x-totalW/2-18,y1:y,x2:x-totalW/2,y2:y,stroke:C.wire,'stroke-width':1.5}));
  g.appendChild(el('line',{x1:x+totalW/2,y1:y,x2:x+totalW/2+18,y2:y,stroke:C.wire,'stroke-width':1.5}));
  g.appendChild(text(x, y-16, label,   {size:10,color:C.l,weight:'bold'}));
  g.appendChild(text(x, y+18, fmtVal(value,'L'), {size:9,color:C.textDim}));
  return g;
}

// ── capacitor (two parallel lines) ──
function drawCapacitor(x, y, label, value) {
  const g = el('g', { class:'svg-component' });
  const plateH = 20; const gap = 6;
  g.appendChild(el('line',{x1:x-36,y1:y,x2:x-gap/2,y2:y,stroke:C.wire,'stroke-width':1.5}));
  g.appendChild(el('line',{x1:x+gap/2,y1:y,x2:x+36,y2:y,stroke:C.wire,'stroke-width':1.5}));
  g.appendChild(el('line',{x1:x-gap/2,y1:y-plateH/2,x2:x-gap/2,y2:y+plateH/2,stroke:C.c,'stroke-width':3,'stroke-linecap':'round'}));
  g.appendChild(el('line',{x1:x+gap/2,y1:y-plateH/2,x2:x+gap/2,y2:y+plateH/2,stroke:C.c,'stroke-width':3,'stroke-linecap':'round'}));
  g.appendChild(text(x, y-18, label,   {size:10,color:C.c,weight:'bold'}));
  g.appendChild(text(x, y+22, fmtVal(value,'C'), {size:9,color:C.textDim}));
  return g;
}

// ── voltage source (circle with + - ) ──
function drawVoltageSource(x, y, label, value, vertical) {
  const g = el('g', {class:'svg-component'});
  const r = 18;
  g.appendChild(el('circle',{cx:x,cy:y,r,stroke:C.vs,'stroke-width':2,'fill':'rgba(34,197,94,0.08)'}));
  if(vertical) {
    g.appendChild(text(x, y-5,  '+', {size:12,color:C.vs,weight:'bold',base:'middle'}));
    g.appendChild(text(x, y+10, '−', {size:14,color:C.textDim,weight:'bold',base:'middle'}));
    g.appendChild(el('line',{x1:x,y1:y-r,x2:x,y2:y-r-16,stroke:C.wire,'stroke-width':1.5}));
    g.appendChild(el('line',{x1:x,y1:y+r,x2:x,y2:y+r+16,stroke:C.wire,'stroke-width':1.5}));
  } else {
    g.appendChild(text(x-6, y+1,  '+', {size:11,color:C.vs,weight:'bold',base:'middle'}));
    g.appendChild(text(x+6, y+1,  '−', {size:13,color:C.textDim,weight:'bold',base:'middle'}));
    g.appendChild(el('line',{x1:x-r-16,y1:y,x2:x-r,y2:y,stroke:C.wire,'stroke-width':1.5}));
    g.appendChild(el('line',{x1:x+r,y1:y,x2:x+r+16,y2:y,stroke:C.wire,'stroke-width':1.5}));
  }
  g.appendChild(text(x+r+5, y-8, label,    {size:10,color:C.vs,weight:'bold',anchor:'start'}));
  g.appendChild(text(x+r+5, y+4, `${value}V`,{size:9,color:C.textDim,anchor:'start'}));
  return g;
}

// ── ground symbol ──
function drawGround(x, y) {
  const g = el('g',{});
  g.appendChild(el('line',{x1:x,y1:y,x2:x,y2:y+12,stroke:C.gnd,'stroke-width':1.5}));
  g.appendChild(el('line',{x1:x-16,y1:y+12,x2:x+16,y2:y+12,stroke:C.gnd,'stroke-width':2}));
  g.appendChild(el('line',{x1:x-10,y1:y+18,x2:x+10,y2:y+18,stroke:C.gnd,'stroke-width':1.5}));
  g.appendChild(el('line',{x1:x-4, y1:y+24,x2:x+4, y2:y+24,stroke:C.gnd,'stroke-width':1}));
  return g;
}

// ── node dot ──
function drawNode(x, y) { return el('circle',{cx:x,cy:y,r:3.5,fill:C.node}); }

// ── wire / line ──
function wire(x1,y1,x2,y2) { return el('line',{x1,y1,x2,y2,stroke:C.wire,'stroke-width':1.5,'stroke-linecap':'round'}); }

// ── corner ──
function corner(x,y) { return el('circle',{cx:x,cy:y,r:2,fill:C.wire}); }

// ── format value ──
function fmtVal(v, type) {
  if(type==='R') {
    if(v>=1e6) return `${(v/1e6).toPrecision(3)}MΩ`;
    if(v>=1e3) return `${(v/1e3).toPrecision(3)}kΩ`;
    return `${v}Ω`;
  }
  if(type==='L') {
    if(v>=1) return `${v}H`;
    if(v>=1e-3) return `${(v*1e3).toPrecision(3)}mH`;
    return `${(v*1e6).toPrecision(3)}μH`;
  }
  if(type==='C') {
    if(v>=1e-3) return `${(v*1e3).toPrecision(3)}mF`;
    if(v>=1e-6) return `${(v*1e6).toPrecision(3)}μF`;
    if(v>=1e-9) return `${(v*1e9).toPrecision(3)}nF`;
    return `${(v*1e12).toPrecision(3)}pF`;
  }
  return String(v);
}

// ──────────────────────────────────────────────
//  SVG LAYOUTS PER CIRCUIT TYPE
// ──────────────────────────────────────────────

function drawSeriesCircuit(svg, comps) {
  const W=700, H=300;
  svg.setAttribute('viewBox',`0 0 ${W} ${H}`);

  const vs   = comps.find(c=>c.type==='VS');
  const parts = comps.filter(c=>c.type!=='VS');
  const n = parts.length;

  // Layout
  const leftX = 60, rightX = W-60;
  const topY = 80, botY = 220, midY = (topY+botY)/2;
  const segW = (rightX-leftX) / (n+1);

  // Bottom wire
  svg.appendChild(wire(leftX, botY, rightX, botY));
  // Voltage source on left (vertical)
  svg.appendChild(wire(leftX, topY, leftX, midY-18));
  svg.appendChild(wire(leftX, midY+18, leftX, botY));
  const vsEl = drawVoltageSource(leftX, midY, vs?vs.label:'V₁', vs?vs.value:12, true);
  svg.appendChild(vsEl);

  // Top wire from VS to first component
  svg.appendChild(wire(leftX, topY, leftX+segW, topY));

  // Components
  for(let i=0;i<n;i++) {
    const cx = leftX + segW*(i+1);
    const c = parts[i];
    let g;
    if(c.type==='R') g = drawResistor(cx, topY, c.label, c.value);
    else if(c.type==='L') g = drawInductor(cx, topY, c.label, c.value);
    else if(c.type==='C') g = drawCapacitor(cx, topY, c.label, c.value);
    svg.appendChild(g);
    if(i<n-1) svg.appendChild(wire(cx+50, topY, leftX+segW*(i+2)-50, topY));
  }

  // Close top right
  svg.appendChild(wire(leftX+segW*n+50, topY, rightX, topY));
  // Right side wire
  svg.appendChild(wire(rightX, topY, rightX, botY));
  // Ground
  svg.appendChild(drawGround(leftX, botY));
  // Current arrow
  svg.appendChild(drawCurrentArrow(leftX+segW/2+20, topY-12, 'I_T'));
  // Corner dots
  svg.appendChild(corner(leftX, topY));
  svg.appendChild(corner(leftX, botY));
  svg.appendChild(corner(rightX, topY));
  svg.appendChild(corner(rightX, botY));
}

function drawParallelCircuit(svg, comps) {
  const W=700, H=300;
  svg.setAttribute('viewBox',`0 0 ${W} ${H}`);

  const vs   = comps.find(c=>c.type==='VS');
  const parts = comps.filter(c=>c.type!=='VS');
  const n = parts.length;

  const leftX=60, topY=60, botY=240;
  const busL=160, busR=560;
  const segW=(busR-busL)/(n-1||1);

  // VS left vertical
  const midY=(topY+botY)/2;
  svg.appendChild(wire(leftX, topY, leftX, midY-18));
  svg.appendChild(wire(leftX, midY+18, leftX, botY));
  svg.appendChild(drawVoltageSource(leftX, midY, vs?vs.label:'V₁', vs?vs.value:12, true));

  // Top and bottom bus
  svg.appendChild(wire(leftX, topY, busR, topY));
  svg.appendChild(wire(leftX, botY, busR, botY));

  // Right short
  svg.appendChild(wire(busR, topY, busR, botY));

  // Each component hangs vertically
  for(let i=0;i<n;i++) {
    const cx = busL + i*segW;
    const c = parts[i];
    const compMidY = midY;

    svg.appendChild(wire(cx, topY, cx, compMidY-30));
    svg.appendChild(wire(cx, compMidY+30, cx, botY));

    let g;
    if(c.type==='R') {
      // vertical resistor
      g = drawResistorV(cx, compMidY, c.label, c.value);
    } else if(c.type==='L') {
      g = drawInductorV(cx, compMidY, c.label, c.value);
    } else if(c.type==='C') {
      g = drawCapacitorV(cx, compMidY, c.label, c.value);
    }
    if(g) svg.appendChild(g);
    svg.appendChild(drawNode(cx, topY));
    svg.appendChild(drawNode(cx, botY));
  }

  svg.appendChild(drawGround(leftX, botY));
  svg.appendChild(corner(leftX, topY));
  svg.appendChild(corner(leftX, botY));
}

function drawSeriesParallelCircuit(svg, comps) {
  const W=700, H=300;
  svg.setAttribute('viewBox',`0 0 ${W} ${H}`);

  const vs    = comps.find(c=>c.type==='VS');
  const parts = comps.filter(c=>c.type!=='VS' && c.type==='R');

  const leftX=60, rightX=W-60, topY=80, botY=220;
  const midY=(topY+botY)/2;

  // VS
  svg.appendChild(wire(leftX,topY,leftX,midY-18));
  svg.appendChild(wire(leftX,midY+18,leftX,botY));
  svg.appendChild(drawVoltageSource(leftX,midY,vs?vs.label:'V₁',vs?vs.value:24,true));

  // R1 in series
  const r1 = parts[0]||{label:'R₁',value:100};
  svg.appendChild(wire(leftX,topY,200,topY));
  svg.appendChild(drawResistor(200,topY,r1.label,r1.value));
  svg.appendChild(wire(250,topY,320,topY));

  // R2 and R3 in parallel
  const r2 = parts[1]||{label:'R₂',value:200};
  const r3 = parts[2]||{label:'R₃',value:300};
  // top bus 320
  svg.appendChild(wire(320,topY,320,botY)); // left of parallel
  svg.appendChild(wire(320,topY,480,topY)); // top parallel
  svg.appendChild(wire(320,botY,480,botY)); // bot parallel
  svg.appendChild(wire(480,topY,480,botY)); // right of parallel

  // R2 vertical
  svg.appendChild(wire(380, topY, 380, midY-28));
  svg.appendChild(wire(380, midY+28, 380, botY));
  svg.appendChild(drawResistorV(380, midY, r2.label, r2.value));
  svg.appendChild(drawNode(380,topY));
  svg.appendChild(drawNode(380,botY));

  // R3 vertical
  svg.appendChild(wire(430, topY, 430, midY-28));
  svg.appendChild(wire(430, midY+28, 430, botY));
  svg.appendChild(drawResistorV(430, midY, r3.label, r3.value));
  svg.appendChild(drawNode(430,topY));
  svg.appendChild(drawNode(430,botY));

  // Continue to right
  svg.appendChild(wire(480,topY,rightX,topY));
  svg.appendChild(wire(rightX,topY,rightX,botY));
  svg.appendChild(wire(leftX,botY,rightX,botY));

  svg.appendChild(drawGround(leftX,botY));
  svg.appendChild(corner(leftX,topY));
  svg.appendChild(corner(leftX,botY));
  svg.appendChild(corner(rightX,topY));
  svg.appendChild(corner(rightX,botY));
  svg.appendChild(corner(320,topY));
  svg.appendChild(corner(320,botY));
  svg.appendChild(corner(480,topY));
  svg.appendChild(corner(480,botY));
  svg.appendChild(drawCurrentArrow(140, topY-12, 'I_T'));
}

// ── series reactive (RL / RC / RLC) ──
function drawSeriesReactive(svg, comps) {
  const W=700, H=300;
  svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
  const vs    = comps.find(c=>c.type==='VS');
  const parts = comps.filter(c=>c.type!=='VS');
  const n = parts.length;

  const leftX=60, rightX=W-60;
  const topY=90, botY=210, midY=(topY+botY)/2;
  const segW=(rightX-leftX)/(n+1);

  svg.appendChild(wire(leftX,topY,leftX,midY-18));
  svg.appendChild(wire(leftX,midY+18,leftX,botY));
  svg.appendChild(drawVoltageSource(leftX,midY,vs?vs.label:'V₁',vs?vs.value:10,true));
  svg.appendChild(wire(leftX,topY,leftX+segW,topY));

  for(let i=0;i<n;i++){
    const cx=leftX+segW*(i+1);
    const c=parts[i];
    let g;
    if(c.type==='R') g=drawResistor(cx,topY,c.label,c.value);
    else if(c.type==='L') g=drawInductor(cx,topY,c.label,c.value);
    else if(c.type==='C') g=drawCapacitor(cx,topY,c.label,c.value);
    svg.appendChild(g);
    if(i<n-1) svg.appendChild(wire(cx+50,topY,leftX+segW*(i+2)-50,topY));
  }

  svg.appendChild(wire(leftX+segW*n+50,topY,rightX,topY));
  svg.appendChild(wire(rightX,topY,rightX,botY));
  svg.appendChild(wire(leftX,botY,rightX,botY));
  svg.appendChild(drawGround(leftX,botY));
  svg.appendChild(corner(leftX,topY));
  svg.appendChild(corner(leftX,botY));
  svg.appendChild(corner(rightX,topY));
  svg.appendChild(corner(rightX,botY));
  svg.appendChild(drawCurrentArrow(leftX+segW/2+20,topY-12,'I_T'));

  // AC indicator on source
  svg.appendChild(drawACMarker(leftX, midY));
}

// ── parallel reactive (RL / RC / RLC) ──
function drawParallelReactive(svg, comps) {
  const W=700, H=300;
  svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
  const vs    = comps.find(c=>c.type==='VS');
  const parts = comps.filter(c=>c.type!=='VS');
  const n = parts.length;

  const leftX=60, topY=55, botY=245;
  const midY=(topY+botY)/2;
  const busL=180;
  const segW=120;

  svg.appendChild(wire(leftX,topY,leftX,midY-18));
  svg.appendChild(wire(leftX,midY+18,leftX,botY));
  svg.appendChild(drawVoltageSource(leftX,midY,vs?vs.label:'V₁',vs?vs.value:10,true));
  svg.appendChild(drawACMarker(leftX,midY));

  const busR=busL+segW*(n-1)+40;
  svg.appendChild(wire(leftX,topY,busR,topY));
  svg.appendChild(wire(leftX,botY,busR,botY));
  svg.appendChild(wire(busR,topY,busR,botY));

  for(let i=0;i<n;i++){
    const cx=busL+i*segW;
    const c=parts[i];
    svg.appendChild(wire(cx,topY,cx,midY-32));
    svg.appendChild(wire(cx,midY+32,cx,botY));
    let g;
    if(c.type==='R') g=drawResistorV(cx,midY,c.label,c.value);
    else if(c.type==='L') g=drawInductorV(cx,midY,c.label,c.value);
    else if(c.type==='C') g=drawCapacitorV(cx,midY,c.label,c.value);
    if(g) svg.appendChild(g);
    svg.appendChild(drawNode(cx,topY));
    svg.appendChild(drawNode(cx,botY));
  }

  svg.appendChild(drawGround(leftX,botY));
  svg.appendChild(corner(leftX,topY));
  svg.appendChild(corner(leftX,botY));
}

// ── Vertical component variants ──
function drawResistorV(x, y, label, value) {
  const g = el('g',{class:'svg-component'});
  const n=6, segH=7, amp=6;
  const totalH=n*segH; const startY=y-totalH/2;
  let pts=`${x},${startY}`;
  for(let i=0;i<n;i++){
    pts+=` ${x+(i%2===0?-amp:amp)},${startY+i*segH+segH/2}`;
  }
  pts+=` ${x},${startY+totalH}`;
  g.appendChild(el('polyline',{points:pts,stroke:C.r,'stroke-width':2,'fill':'none','stroke-linecap':'round','stroke-linejoin':'round'}));
  g.appendChild(text(x+16, y, label, {size:10,color:C.r,weight:'bold',anchor:'start',base:'middle'}));
  g.appendChild(text(x+16, y+13, fmtVal(value,'R'), {size:9,color:C.textDim,anchor:'start',base:'middle'}));
  return g;
}

function drawInductorV(x, y, label, value) {
  const g = el('g',{class:'svg-component'});
  const bumps=4, bR=7;
  let d=`M ${x} ${y-bumps*bR*2/2}`;
  for(let i=0;i<bumps;i++){
    const cy=y-bumps*bR*2/2+i*bR*2+bR;
    d+=` A ${bR} ${bR} 0 0 0 ${x} ${cy+bR}`;
  }
  g.appendChild(el('path',{d,stroke:C.l,'stroke-width':2,'fill':'none','stroke-linecap':'round'}));
  g.appendChild(text(x+16, y, label, {size:10,color:C.l,weight:'bold',anchor:'start',base:'middle'}));
  g.appendChild(text(x+16, y+13, fmtVal(value,'L'), {size:9,color:C.textDim,anchor:'start',base:'middle'}));
  return g;
}

function drawCapacitorV(x, y, label, value) {
  const g = el('g',{class:'svg-component'});
  const plateW=20, gap=6;
  g.appendChild(el('line',{x1:x-plateW/2,y1:y-gap/2,x2:x+plateW/2,y2:y-gap/2,stroke:C.c,'stroke-width':3,'stroke-linecap':'round'}));
  g.appendChild(el('line',{x1:x-plateW/2,y1:y+gap/2,x2:x+plateW/2,y2:y+gap/2,stroke:C.c,'stroke-width':3,'stroke-linecap':'round'}));
  g.appendChild(text(x+18, y, label, {size:10,color:C.c,weight:'bold',anchor:'start',base:'middle'}));
  g.appendChild(text(x+18, y+13, fmtVal(value,'C'), {size:9,color:C.textDim,anchor:'start',base:'middle'}));
  return g;
}

// ── current arrow ──
function drawCurrentArrow(x, y, label) {
  const g = el('g',{});
  g.appendChild(el('path',{d:`M ${x} ${y} L ${x+30} ${y}`,stroke:'rgba(79,142,247,0.7)','stroke-width':1.5,'marker-end':'url(#arrowBlue)'}));
  g.appendChild(text(x+15, y-6, label, {size:9,color:'rgba(79,142,247,0.9)',anchor:'middle'}));
  return g;
}

// ── AC wavy marker ──
function drawACMarker(x, y) {
  const g = el('g',{});
  const d=`M ${x-8} ${y+4} Q ${x-5} ${y-4} ${x} ${y+4} Q ${x+5} ${y+12} ${x+8} ${y+4}`;
  g.appendChild(el('path',{d,stroke:C.vs,'stroke-width':1.5,'fill':'none'}));
  return g;
}

// ──────────────────────────────────────────────
//  MAIN RENDER FUNCTION
// ──────────────────────────────────────────────
window.renderCircuitSVG = function(circuit, svgEl) {
  while(svgEl.firstChild) svgEl.removeChild(svgEl.firstChild);

  // Arrow defs
  const defs = el('defs');
  const marker = el('marker',{id:'arrowBlue',markerWidth:8,markerHeight:8,refX:6,refY:3,orient:'auto'});
  marker.appendChild(el('path',{d:'M0,0 L0,6 L8,3 z',fill:'rgba(79,142,247,0.8)'}));
  defs.appendChild(marker);
  svgEl.appendChild(defs);

  const comps = circuit.components;
  const t = circuit.type;

  if(t==='series')           drawSeriesCircuit(svgEl, comps);
  else if(t==='parallel')    drawParallelCircuit(svgEl, comps);
  else if(t==='series_parallel') drawSeriesParallelCircuit(svgEl, comps);
  else if(['series_rl','series_rc','series_rlc'].includes(t)) drawSeriesReactive(svgEl, comps);
  else if(['parallel_rl','parallel_rc','parallel_rlc'].includes(t)) drawParallelReactive(svgEl, comps);
  else drawSeriesCircuit(svgEl, comps); // fallback
};
