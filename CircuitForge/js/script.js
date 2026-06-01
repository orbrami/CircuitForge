// ============================================================
//  CircuitForge – script.js
//  Main Application Controller
//  Made by Or Brami
// ============================================================

'use strict';

/* ════════════════════════════════════════════
   STATE
   ════════════════════════════════════════════ */
const state = {
  lang: 'en',
  circuit: null,      // current circuit object (deep copy of template)
  calcResult: null,
  frequency: 1000,
  idCounter: 100,
};

/* ════════════════════════════════════════════
   LANG
   ════════════════════════════════════════════ */
function t(key) {
  const dict = state.lang === 'he' ? window.LANG_HE : window.LANG_EN;
  return dict[key] || key;
}

function setLang(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  document.body.dir = lang === 'he' ? 'rtl' : 'ltr';
  refreshAllText();
  if(state.circuit) {
    renderResults();
    refreshQuestionsPanel();
  }
}

/* ════════════════════════════════════════════
   DOM HELPERS
   ════════════════════════════════════════════ */
const $  = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

function setText(id, val) {
  const el = $(id);
  if(el) el.textContent = val;
}

function setPlaceholder(id, val) {
  const el = $(id);
  if(el) el.placeholder = val;
}

function refreshAllText() {
  // ── Header ──
  setText('logo-tagline',   t('appTagline'));
  setText('made-by-text',   t('madeBy'));
  const btnLang = $('btn-lang');
  if(btnLang) btnLang.textContent = t('langToggle');

  // ── Sidebar ──
  setText('sidebar-title',  t('circuitTemplates'));
  setPlaceholder('search-input', t('searchTemplates'));
  setText('btn-random-text', t('generateRandom'));

  // ── Canvas area ──
  setText('canvas-title',     t('circuitDiagram'));
  setText('components-title', t('components'));
  const addBtn = $('btn-add-comp');
  if(addBtn) addBtn.textContent = t('addComponent');

  // Table headers
  setText('th-type',  t('componentType'));
  setText('th-label', t('componentLabel'));
  setText('th-value', t('componentValue'));

  // ── Results panel ──
  setText('results-title',  t('resultsTitle'));
  setText('no-results-msg', t('noResults'));

  // ── Practice panel ──
  setText('practice-title',    t('practiceTitle'));
  setText('btn-gen-questions', t('generateQuestions'));

  // ── Modal ──
  setText('modal-title-text', t('addComponentTitle'));
  setText('modal-cancel',     t('cancel'));
  setText('modal-submit',     t('add'));
  // Update modal select labels
  const modalType = $('modal-type');
  if(modalType) {
    modalType.options[0].text = `${t('compResistor')} (R) – Ω`;
    modalType.options[1].text = `${t('compInductor')} (L) – H`;
    modalType.options[2].text = `${t('compCapacitor')} (C) – F`;
    modalType.options[3].text = `${t('compVoltageSource')} (V)`;
  }
  const modalLbl = document.querySelector('label[for="modal-type"]');
  if(modalLbl) modalLbl.textContent = t('selectType');
  const modalValLbl = document.querySelector('label[for="modal-value"]');
  if(modalValLbl) modalValLbl.textContent = t('enterValue');
  const modalLabelLbl = document.querySelector('label[for="modal-label"]');
  if(modalLabelLbl) modalLabelLbl.textContent = t('enterLabel');

  // ── Placeholder messages ──
  const noCircuitEl = $('no-circuit-msg');
  if(noCircuitEl) noCircuitEl.textContent = t('noCircuit');
  const noQEl = $('no-questions-msg');
  if(noQEl) noQEl.textContent = t('noQuestionsYet');

  // ── Frequency label ──
  const freqUnit = document.querySelector('.freq-unit');
  if(freqUnit) freqUnit.textContent = t('unitHz') || 'Hz';
  const freqLbl = document.querySelector('.freq-label');
  if(freqLbl) freqLbl.textContent = 'f =';

  // ── Template list & components table re-render ──
  renderTemplateList();
  if(state.circuit) renderComponentsTable();
}

/* ════════════════════════════════════════════
   TOAST NOTIFICATIONS
   ════════════════════════════════════════════ */
function showToast(msg, type='success') {
  const icons = { success:'✅', error:'❌', warning:'⚠️', info:'ℹ️' };
  const c = $('toast-container');
  const div = document.createElement('div');
  div.className = `toast toast-${type}`;
  div.innerHTML = `<span class="toast-icon">${icons[type]||'ℹ️'}</span><span>${msg}</span>`;
  c.appendChild(div);
  setTimeout(()=>{
    div.classList.add('removing');
    setTimeout(()=>c.removeChild(div), 350);
  }, 2800);
}

/* ════════════════════════════════════════════
   SIDEBAR – TEMPLATE LIST
   ════════════════════════════════════════════ */
function renderTemplateList(filter='') {
  const list = $('template-list');
  if(!list) return;
  list.innerHTML = '';
  const filterLC = filter.toLowerCase();

  const templates = window.CIRCUIT_TEMPLATES;
  const categories = ['catResistive','catMixed','catReactive'];

  categories.forEach(cat => {
    const items = templates.filter(tp => tp.categoryKey === cat &&
      (t(tp.nameKey).toLowerCase().includes(filterLC) ||
       t(tp.descKey).toLowerCase().includes(filterLC) || !filter)
    );
    if(!items.length) return;

    const label = document.createElement('div');
    label.className = 'category-label';
    label.textContent = t(cat);
    list.appendChild(label);

    items.forEach(tp => {
      const div = document.createElement('div');
      div.className = 'template-item' + (state.circuit?.id===tp.id ? ' active' : '');
      div.dataset.id = tp.id;
      div.innerHTML = `
        <div class="template-name">${t(tp.nameKey)}</div>
        <div class="template-desc">${t(tp.descKey)}</div>
        <span class="template-badge ${tp.badge}">${t(tp.categoryKey)}</span>
      `;
      div.addEventListener('click', () => loadTemplate(tp));
      list.appendChild(div);
    });
  });
}

/* ════════════════════════════════════════════
   LOAD CIRCUIT
   ════════════════════════════════════════════ */
function loadTemplate(tpl) {
  // Deep copy components so edits don't affect the template
  const circuit = {
    ...tpl,
    components: tpl.components.map(c => ({ ...c })),
    frequency: tpl.frequency || state.frequency,
  };
  state.circuit = circuit;
  state.frequency = circuit.frequency || 1000;
  if($('freq-input')) $('freq-input').value = state.frequency;

  // Show/hide frequency control based on whether circuit is AC
  const freqCtrl = $('freq-control');
  if(freqCtrl) freqCtrl.style.display = circuit.hasAC ? 'flex' : 'none';

  renderCircuitSVG(state.circuit, $('circuit-svg'));
  renderComponentsTable();
  runCalculation();
  renderTemplateList(($('search-input')||{}).value || '');
  refreshQuestionsPanel();
  showToast(t('toastCircuitLoaded') + ' – ' + t(tpl.nameKey), 'success');
  saveToLocalStorage();
}

function loadCircuit(circuit) {
  state.circuit = circuit;
  state.frequency = circuit.frequency || state.frequency;
  if($('freq-input')) $('freq-input').value = state.frequency;

  // Show/hide frequency control based on circuit type
  const freqCtrl = $('freq-control');
  if(freqCtrl) freqCtrl.style.display = circuit.hasAC ? 'flex' : 'none';

  renderCircuitSVG(state.circuit, $('circuit-svg'));
  renderComponentsTable();
  runCalculation();
  renderTemplateList('');
  refreshQuestionsPanel();
  saveToLocalStorage();
}

/* ════════════════════════════════════════════
   COMPONENTS TABLE
   ════════════════════════════════════════════ */
const TYPE_LABELS = { R:'compResistor', L:'compInductor', C:'compCapacitor', VS:'compVoltageSource' };
const TYPE_DOTS   = { R:'dot-r', L:'dot-l', C:'dot-c', VS:'dot-vs' };
const TYPE_UNITS  = { R:'Ω', L:'H', C:'F', VS:'V' };

function renderComponentsTable() {
  const tbody = $('comp-tbody');
  if(!tbody || !state.circuit) return;
  tbody.innerHTML = '';

  state.circuit.components.forEach((comp, i) => {
    const tr = document.createElement('tr');
    tr.dataset.idx = i;

    // Type cell
    const tdType = document.createElement('td');
    tdType.innerHTML = `<span class="comp-type-badge"><span class="comp-dot ${TYPE_DOTS[comp.type]||'dot-r'}"></span>${t(TYPE_LABELS[comp.type]||'compResistor')}</span>`;

    // Label cell
    const tdLabel = document.createElement('td');
    tdLabel.innerHTML = `<span class="comp-label">${comp.label}</span>`;

    // Value cell (editable)
    const tdVal = document.createElement('td');
    const inp = document.createElement('input');
    inp.className = 'value-input';
    inp.type = 'number';
    inp.step = 'any';
    inp.min = '0';
    inp.value = comp.value;
    inp.title = t('editValue');
    inp.addEventListener('change', () => {
      const v = parseFloat(inp.value);
      if(isNaN(v) || v <= 0) { showToast(t('toastInvalidValue'),'warning'); inp.value=comp.value; return; }
      comp.value = v;
      runCalculation();
      // Re-render SVG to update labels
      renderCircuitSVG(state.circuit, $('circuit-svg'));
      saveToLocalStorage();
    });
    const unit = document.createElement('span');
    unit.style.cssText='font-size:0.7rem;color:var(--text-muted);margin-left:4px;font-family:var(--font-mono)';
    unit.textContent = TYPE_UNITS[comp.type] || '';
    tdVal.appendChild(inp);
    tdVal.appendChild(unit);

    // Delete cell
    const tdDel = document.createElement('td');
    tdDel.style.textAlign = 'right';
    if(comp.type !== 'VS') {
      const btn = document.createElement('button');
      btn.className = 'btn btn-danger btn-xs';
      btn.textContent = t('deleteComponent');
      btn.addEventListener('click', () => deleteComponent(i));
      tdDel.appendChild(btn);
    }

    tr.appendChild(tdType);
    tr.appendChild(tdLabel);
    tr.appendChild(tdVal);
    tr.appendChild(tdDel);
    tbody.appendChild(tr);
  });
}

function deleteComponent(idx) {
  if(!state.circuit) return;
  state.circuit.components.splice(idx, 1);
  renderCircuitSVG(state.circuit, $('circuit-svg'));
  renderComponentsTable();
  runCalculation();
  showToast(t('toastComponentDeleted'), 'info');
  saveToLocalStorage();
}

/* ════════════════════════════════════════════
   ADD COMPONENT MODAL
   ════════════════════════════════════════════ */
function openAddModal() {
  if(!state.circuit) return;
  $('modal-overlay').classList.add('open');
  $('modal-type').focus();
}

function closeAddModal() {
  $('modal-overlay').classList.remove('open');
}

function submitAddComponent() {
  if(!state.circuit) return;
  const type  = $('modal-type').value;
  const val   = parseFloat($('modal-value').value);
  const label = $('modal-label').value.trim();

  if(isNaN(val) || val <= 0) { showToast(t('toastInvalidValue'), 'warning'); return; }

  // Auto-label
  const existingOfType = state.circuit.components.filter(c=>c.type===type).length;
  const autoLabel = type==='R' ? `R${existingOfType+1}` :
                    type==='L' ? `L${existingOfType+1}` :
                    type==='C' ? `C${existingOfType+1}` : `VS${existingOfType+1}`;

  const comp = {
    id:    `${type}${++state.idCounter}`,
    type,
    label: label || autoLabel,
    value: val,
    unit:  TYPE_UNITS[type]||'Ω',
  };

  state.circuit.components.push(comp);
  // Note: SVG is re-rendered but may not show the new component in all layouts
  // (by design, the table remains the source of truth for added components)
  renderCircuitSVG(state.circuit, $('circuit-svg'));
  renderComponentsTable();
  runCalculation();
  closeAddModal();
  showToast(t('toastComponentAdded') + ' – ' + comp.label, 'success');
  saveToLocalStorage();
}

/* ════════════════════════════════════════════
   CALCULATIONS + RESULTS
   ════════════════════════════════════════════ */
function runCalculation() {
  if(!state.circuit) return;
  const result = window.calculateCircuit(state.circuit, state.frequency);
  state.calcResult = result;
  renderResults();
}

function renderResults() {
  const r  = state.calcResult;
  const el = $('results-body');
  if(!r || !el) return;
  const d = r.display;

  let html = '';

  // ── Main results ──
  html += `<div class="panel-section">
    <div class="panel-section-header">
      <span class="panel-section-title">${t('resultsTitle')}</span>
    </div>
    <div class="panel-section-body">`;

  html += row(t('supplyVoltage'),   d.Vs,     'highlight');
  if(r.hasAC || r.freq) {
    html += row(t('frequency'),   d.freq,   '');
    html += row(t('angularFreq'), d.omega,  '');
  }
  if(d.RT !== undefined) html += row(t('totalResistance'), d.RT, 'highlight');
  if(d.Z  !== undefined) html += row(t('totalImpedance'),  d.Z,  'highlight');
  if(d.XL !== undefined) html += row(t('inductiveReactance'), d.XL, '');
  if(d.XC !== undefined) html += row(t('capacitiveReactance'), d.XC, '');
  html += row(t('totalCurrent'),   d.IT,   'positive');
  if(d.theta !== undefined) html += row(t('phaseAngle'),   d.theta, r.theta>0?'warning':r.theta<0?'highlight':'');
  if(d.PF    !== undefined) html += row(t('powerFactor'),  d.PF,    '');
  if(d.P     !== undefined) html += row(t('activePower'),  d.P,     'positive');
  if(d.Q     !== undefined) html += row(t('reactivePower'),d.Q,     '');
  if(d.S     !== undefined) html += row(t('apparentPower'),d.S,     '');
  if(d.f0    !== undefined) html += row(t('resonantFreq'), d.f0,    'resonant');
  if(d.Qf    !== undefined) html += row(t('qualityFactor'),d.Qf,    '');
  if(d.BW    !== undefined) html += row(t('bandwidth'),    d.BW,    '');
  if(d.tau   !== undefined) html += row(t('timeConstant'), d.tau,   '');

  html += `</div></div>`;

  // ── Per-component ──
  if(r.perComp && r.perComp.length) {
    html += `<div class="panel-section">
      <div class="panel-section-header">
        <span class="panel-section-title">${t('perComponent')}</span>
      </div>
      <div class="panel-section-body">`;

    r.perComp.forEach(pc => {
      html += `<div class="comp-result-item">
        <div class="comp-result-name">${pc.label}</div>
        <div class="comp-result-data">
          <span>${t('voltageAcross')}: <strong>${pc.V}</strong></span>
          <span>${t('currentThrough')}: <strong>${pc.I}</strong></span>
          <span>P: <strong>${pc.P}</strong></span>
        </div>
      </div>`;
    });

    html += `</div></div>`;
  }

  el.innerHTML = html;
}

function row(label, value, cls='') {
  return `<div class="result-row">
    <span class="result-label">${label}</span>
    <span class="result-value ${cls}">${value}</span>
  </div>`;
}

/* ════════════════════════════════════════════
   FREQUENCY CONTROL
   ════════════════════════════════════════════ */
function onFreqChange(val) {
  const v = parseFloat(val);
  if(isNaN(v) || v <= 0) return;
  state.frequency = v;
  if(state.circuit) { state.circuit.frequency = v; runCalculation(); saveToLocalStorage(); }
}

/* ════════════════════════════════════════════
   PRACTICE QUESTIONS PANEL
   ════════════════════════════════════════════ */
function refreshQuestionsPanel() {
  const qList = $('questions-list');
  if(!qList) return;
  qList.innerHTML = `<p class="no-results">${t('noQuestionsYet')}</p>`;
}

function generateAndShowQuestions() {
  if(!state.circuit || !state.calcResult) {
    showToast(t('noResults'), 'warning'); return;
  }

  const lang = state.lang === 'he' ? window.LANG_HE : window.LANG_EN;
  const questions = window.generateQuestions(state.circuit, state.calcResult, lang);

  const qList = $('questions-list');
  if(!qList) return;
  qList.innerHTML = '';

  const diffLabels = t('questionDifficulty');
  const diffClasses = ['diff-basic','diff-intermediate','diff-advanced'];

  questions.forEach((q, i) => {
    const div = document.createElement('div');
    div.className = 'question-item';
    div.innerHTML = `
      <div class="question-header">
        <div class="question-number">${q.id}</div>
        <div class="question-text">${q.text}</div>
        <span class="question-difficulty ${diffClasses[q.difficulty]||'diff-basic'}">${diffLabels[q.difficulty]||diffLabels[0]}</span>
      </div>
      <div class="question-footer">
        <button class="btn btn-ghost btn-xs" onclick="toggleSolution(this)">${t('showSolution')}</button>
      </div>
      <div class="question-solution">${q.solution}</div>
    `;
    qList.appendChild(div);
  });
}

window.toggleSolution = function(btn) {
  const sol = btn.closest('.question-item').querySelector('.question-solution');
  const visible = sol.classList.toggle('visible');
  btn.textContent = visible ? t('hideSolution') : t('showSolution');
};

/* ════════════════════════════════════════════
   RANDOM CIRCUIT
   ════════════════════════════════════════════ */
function loadRandomCircuit() {
  const circuit = window.generateRandomCircuit();
  loadCircuit(circuit);
  showToast(t('toastRandomGenerated'), 'info');
  renderTemplateList('');
  showRandomInSidebar(circuit);
}

/* ════════════════════════════════════════════
   LOCAL STORAGE
   ════════════════════════════════════════════ */
function saveToLocalStorage() {
  try {
    if(state.circuit) {
      localStorage.setItem('cf_circuit',  JSON.stringify(state.circuit));
      localStorage.setItem('cf_freq',     state.frequency);
      localStorage.setItem('cf_lang',     state.lang);
    }
  } catch(e) {}
}

function loadFromLocalStorage() {
  try {
    const savedLang = localStorage.getItem('cf_lang');
    if(savedLang) setLang(savedLang);

    const savedFreq = parseFloat(localStorage.getItem('cf_freq'));
    if(!isNaN(savedFreq) && savedFreq > 0) {
      state.frequency = savedFreq;
      if($('freq-input')) $('freq-input').value = savedFreq;
    }

    const savedCircuit = localStorage.getItem('cf_circuit');
    if(savedCircuit) {
      const circuit = JSON.parse(savedCircuit);
      loadCircuit(circuit);
    }
  } catch(e) {}
}

/* ════════════════════════════════════════════
   INIT
   ════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  // Render sidebar
  renderTemplateList();

  // Language toggle
  $('btn-lang').addEventListener('click', () => {
    setLang(state.lang === 'en' ? 'he' : 'en');
    saveToLocalStorage();
  });

  // Search
  $('search-input').addEventListener('input', e => {
    renderTemplateList(e.target.value);
  });

  // Random circuit
  $('btn-random').addEventListener('click', loadRandomCircuit);

  // Add component button
  $('btn-add-comp').addEventListener('click', openAddModal);

  // Modal
  $('modal-cancel').addEventListener('click', closeAddModal);
  $('modal-submit').addEventListener('click', submitAddComponent);
  $('modal-overlay').addEventListener('click', e => {
    if(e.target === $('modal-overlay')) closeAddModal();
  });

  // Modal type change → update placeholder
  $('modal-type').addEventListener('change', e => {
    const units = { R:'Ω – e.g. 100', L:'H – e.g. 0.05', C:'F – e.g. 0.000001', VS:'V – e.g. 12' };
    $('modal-value').placeholder = units[e.target.value] || '';
  });

  // Keyboard close modal
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') closeAddModal();
    if(e.key === 'Enter' && $('modal-overlay').classList.contains('open')) submitAddComponent();
  });

  // Generate questions button
  $('btn-gen-questions').addEventListener('click', generateAndShowQuestions);

  // Frequency input
  $('freq-input').addEventListener('change', e => onFreqChange(e.target.value));
  $('freq-input').addEventListener('keydown', e => { if(e.key==='Enter') onFreqChange(e.target.value); });

  // Load last saved circuit or default
  loadFromLocalStorage();

  // If nothing loaded, load default
  if(!state.circuit) {
    const defaultTpl = window.CIRCUIT_TEMPLATES.find(t => t.id === 'series_r');
    if(defaultTpl) loadTemplate(defaultTpl);
  }

  // Show placeholder
  if(!state.circuit) {
    $('circuit-svg').innerHTML = `
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
        font-family="'Outfit',system-ui" font-size="14" fill="rgba(139,149,176,0.5)">
        Select a circuit template
      </text>`;
  }
});

/* ════════════════════════════════════════════
   EXTRA UTILITIES
   ════════════════════════════════════════════ */

// Show the random circuit as a temporary item in the sidebar
function showRandomInSidebar(circuit) {
  const list = $('template-list');
  if(!list) return;
  // Remove previous random item
  const old = list.querySelector('.random-item');
  if(old) old.remove();

  const catLabel = document.createElement('div');
  catLabel.className = 'category-label';
  catLabel.textContent = state.lang === 'he' ? 'אקראי' : 'Random';
  list.insertBefore(catLabel, list.firstChild);

  const div = document.createElement('div');
  div.className = 'template-item random-item active';
  const nameKey = circuit.nameKey || 'tplSeries';
  const descKey = circuit.descKey || 'descSeries';
  div.innerHTML = `
    <div class="template-name">🎲 ${t(nameKey)}</div>
    <div class="template-desc">${t(descKey)}</div>
    <span class="template-badge badge-random">${state.lang==='he'?'אקראי':'Random'}</span>
  `;
  div.addEventListener('click', () => {});
  list.insertBefore(div, list.children[1] || null);
}

// loadRandomCircuit is defined above
