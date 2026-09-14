/**
 * Aplica o roteiro-site-nr12: cards interativos profissionais + checadores situacionais.
 * Mantém shells de slide/games; troca HTML de conteúdo e decks JS.
 */
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'index.html');
let html = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');

function replaceBetween(src, startMarker, endMarker, replacement) {
  const a = src.indexOf(startMarker);
  if (a < 0) throw new Error('start not found: ' + startMarker.slice(0, 80));
  const b = src.indexOf(endMarker, a);
  if (b < 0) throw new Error('end not found after: ' + startMarker.slice(0, 80));
  return src.slice(0, a) + replacement + src.slice(b);
}

function replaceOnce(src, find, repl) {
  if (!src.includes(find)) {
    console.warn('WARN missing:', find.slice(0, 100).replace(/\n/g, ' '));
    return src;
  }
  return src.replace(find, repl);
}

/* ═══════════════════════════════════════════
   M1 — s2b3: Flip cards de conceitos
   ═══════════════════════════════════════════ */
html = replaceBetween(
  html,
  '        <div class="top-bar">\n          <span class="section-tag">📋 Legislação</span>\n          <div class="slide-title" style="margin-top:6px">Resumo: Conceito de Máquina <span>e Termofusão</span></div>',
  '        <div class="content-area"',
  `        <div class="top-bar">
          <span class="section-tag">📋 Conceitos</span>
          <div class="slide-title" style="margin-top:6px">Cards Virativos — <span>Conceitos Fundamentais</span></div>
          <div class="slide-subtitle">Clique em cada card para virar e ler a definição técnica</div>
`
);

// Replace entire content-area of s2b3 through wave before closing section - use unique markers
const s2b3ContentStart = html.indexOf('<div class="content-area" style="display:grid; grid-template-columns: 1.3fr 1fr; gap: 50px;');
const s2b3Wave = html.indexOf('<div class="wave"><svg viewBox="0 0 1440 100" preserveAspectRatio="none">\n            <path d="M0,55 C480,10 960,90 1440,40 L1440,100 L0,100 Z" fill="rgba(194, 30, 86,0.07)" />\n          </svg></div>\n      </section>', s2b3ContentStart);
if (s2b3ContentStart < 0 || s2b3Wave < 0) throw new Error('s2b3 content bounds');

const s2b3New = `<div class="content-area" style="max-width:1100px;margin:0 auto;padding:8px 20px 24px;">
          <style>
            #s2b3 .nr12-flip-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px;}
            #s2b3 .nr12-flip{perspective:1000px;min-height:180px;cursor:pointer;}
            #s2b3 .nr12-flip-inner{position:relative;width:100%;height:100%;min-height:180px;transform-style:preserve-3d;transition:transform .55s cubic-bezier(.4,.2,.2,1);}
            #s2b3 .nr12-flip.is-flipped .nr12-flip-inner{transform:rotateY(180deg);}
            #s2b3 .nr12-flip-face{position:absolute;inset:0;backface-visibility:hidden;border-radius:18px;padding:22px 20px;display:flex;flex-direction:column;justify-content:center;gap:10px;border:1px solid rgba(255,255,255,.12);box-shadow:0 16px 36px rgba(0,0,0,.28);}
            #s2b3 .nr12-flip-front{background:linear-gradient(160deg,#6B1830 0%,#3a0c18 100%);}
            #s2b3 .nr12-flip-back{background:linear-gradient(160deg,#1e2938 0%,#0f1720 100%);transform:rotateY(180deg);}
            #s2b3 .nr12-flip-ico{font-size:28px;line-height:1;}
            #s2b3 .nr12-flip-title{font-family:var(--font-h);font-size:18px;font-weight:800;color:#fff;margin:0;}
            #s2b3 .nr12-flip-hint{font-size:12px;color:rgba(255,255,255,.45);margin:0;}
            #s2b3 .nr12-flip-back p{margin:0;font-size:14.5px;line-height:1.55;color:rgba(255,255,255,.9);}
            @media(max-width:768px){#s2b3 .nr12-flip-grid{grid-template-columns:1fr;}}
          </style>
          <div class="nr12-flip-grid">
            <div class="nr12-flip" onclick="this.classList.toggle('is-flipped')" role="button" tabindex="0">
              <div class="nr12-flip-inner">
                <div class="nr12-flip-face nr12-flip-front"><div class="nr12-flip-ico">⚙️</div><h3 class="nr12-flip-title">O que é uma Máquina?</h3><p class="nr12-flip-hint">Toque para virar</p></div>
                <div class="nr12-flip-face nr12-flip-back"><p>Dispositivo artificial que utiliza a conversão de energia para atingir fins predeterminados.</p></div>
              </div>
            </div>
            <div class="nr12-flip" onclick="this.classList.toggle('is-flipped')" role="button" tabindex="0">
              <div class="nr12-flip-inner">
                <div class="nr12-flip-face nr12-flip-front"><div class="nr12-flip-ico">📦</div><h3 class="nr12-flip-title">Máquina de Arquear (Cintagem)</h3><p class="nr12-flip-hint">Toque para virar</p></div>
                <div class="nr12-flip-face nr12-flip-back"><p>Equipamento semiautomático elétrico que guia a fita plástica pela canaleta, identifica via sensor e ajusta, tensiona e sela volumes por termofusão.</p></div>
              </div>
            </div>
            <div class="nr12-flip" onclick="this.classList.toggle('is-flipped')" role="button" tabindex="0">
              <div class="nr12-flip-inner">
                <div class="nr12-flip-face nr12-flip-front"><div class="nr12-flip-ico">📜</div><h3 class="nr12-flip-title">O que é a NR-12?</h3><p class="nr12-flip-hint">Toque para virar</p></div>
                <div class="nr12-flip-face nr12-flip-back"><p>Norma que define referências técnicas e medidas de proteção para resguardar a saúde física dos trabalhadores em todo o ciclo de vida da máquina.</p></div>
              </div>
            </div>
            <div class="nr12-flip" onclick="this.classList.toggle('is-flipped')" role="button" tabindex="0">
              <div class="nr12-flip-inner">
                <div class="nr12-flip-face nr12-flip-front"><div class="nr12-flip-ico">📑</div><h3 class="nr12-flip-title">Estrutura dos Anexos</h3><p class="nr12-flip-hint">Toque para virar</p></div>
                <div class="nr12-flip-face nr12-flip-back"><p>Anexos I–XII complementam a norma (ex.: Anexo I optoeletrônicos, Anexo II capacitação, Anexo III meios de acesso, anexos setoriais V–XII).</p></div>
              </div>
            </div>
          </div>
        </div>
        `;
html = html.slice(0, s2b3ContentStart) + s2b3New + html.slice(s2b3Wave);

/* ═══════════════════════════════════════════
   M1 — s2c2: Galeria filtrável Item 12.1.4
   ═══════════════════════════════════════════ */
html = replaceOnce(html,
`          <span class="section-tag">⚖️ Legislação</span>
          <div class="slide-title" style="margin-top:6px">Ciclo de Vida da Máquina <span>sob a NR 12</span></div>
          <div class="slide-subtitle">Fundamentos Regulatórios, Conceitos Gerais e Aplicabilidade da NR 12</div>`,
`          <span class="section-tag">📋 Item 12.1.4</span>
          <div class="slide-title" style="margin-top:6px">Onde a NR-12 <span>não se aplica</span></div>
          <div class="slide-subtitle">Galeria filtrável das isenções legais — selecione uma categoria</div>`);

// Find s2c2 content-area - look for civcrim after s2c2 id
const s2c2Idx = html.indexOf('id="s2c2"');
const s2c2Content = html.indexOf('class="content-area', s2c2Idx);
const s2c2ContentTagEnd = html.indexOf('>', s2c2Content) + 1;
// Find end: carousel nav closing + before wave of s2c2
const s2c2Wave = html.indexOf('<div class="wave">', s2c2Content);
// Better: find last content before wave inside s2c2 section
let s2c2End = html.indexOf('</div>\n        <div class="wave">', s2c2Content);
if (s2c2End < 0) s2c2End = html.indexOf('<div class="wave">', s2c2Content);
// We need to replace from content-area opening through just before wave
const s2c2Open = html.lastIndexOf('<div class="content-area', s2c2Wave);
const s2c2New = `<div class="content-area" style="max-width:980px;margin:0 auto;padding:8px 18px 20px;">
          <style>
            #s2c2 .nr12-tabs{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;justify-content:center;}
            #s2c2 .nr12-tab{border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.04);color:rgba(255,255,255,.78);border-radius:999px;padding:9px 14px;font-size:12px;font-weight:700;font-family:var(--font-h);cursor:pointer;}
            #s2c2 .nr12-tab.active{background:linear-gradient(135deg,#C21E56,#8E1238);border-color:transparent;color:#fff;}
            #s2c2 .nr12-panel{display:none;background:linear-gradient(160deg,#2a0f18,#14080c);border:1px solid rgba(194,30,86,.28);border-radius:20px;padding:22px 20px;box-shadow:0 18px 40px rgba(0,0,0,.3);}
            #s2c2 .nr12-panel.active{display:block;animation:fadeIn .35s ease;}
            #s2c2 .nr12-panel h3{margin:0 0 10px;font-family:var(--font-h);font-size:18px;color:#fff;}
            #s2c2 .nr12-panel p{margin:0;font-size:15px;line-height:1.6;color:rgba(255,255,255,.88);}
            #s2c2 .nr12-chip{display:inline-block;margin-bottom:12px;padding:5px 12px;border-radius:999px;background:rgba(194,30,86,.15);color:#ff8fb0;font-size:11px;font-weight:800;letter-spacing:.04em;}
          </style>
          <div class="nr12-tabs" role="tablist">
            <button type="button" class="nr12-tab active" data-tab="a" onclick="nr12FilterTab('s2c2', this)">Força humana/animal</button>
            <button type="button" class="nr12-tab" data-tab="b" onclick="nr12FilterTab('s2c2', this)">Museus / eventos</button>
            <button type="button" class="nr12-tab" data-tab="c" onclick="nr12FilterTab('s2c2', this)">Eletrodomésticos</button>
            <button type="button" class="nr12-tab" data-tab="d" onclick="nr12FilterTab('s2c2', this)">Equip. estáticos</button>
            <button type="button" class="nr12-tab" data-tab="e" onclick="nr12FilterTab('s2c2', this)">Ferramentas tipo C</button>
          </div>
          <div class="nr12-panel active" data-panel="a">
            <span class="nr12-chip">Item 12.1.4 "a"</span>
            <h3>Força humana ou animal</h3>
            <p>Equipamentos acionados exclusivamente por força muscular humana ou animal (ex.: paleteira manual, arado de tração animal) <strong>não</strong> estão sujeitos aos requisitos construtivos e de proteção da NR-12.</p>
          </div>
          <div class="nr12-panel" data-panel="b">
            <span class="nr12-chip">Item 12.1.4 "b"</span>
            <h3>Museus e eventos históricos</h3>
            <p>Maquinários antigos sem fins produtivos, em feiras ou museus, estão isentos — desde que garantida a integridade física dos visitantes.</p>
          </div>
          <div class="nr12-panel" data-panel="c">
            <span class="nr12-chip">Item 12.1.4 "c"</span>
            <h3>Eletrodomésticos</h3>
            <p>Aparelhos de uso estritamente doméstico (geladeira, ventilador, forno, air fryer) possuem regulamentação própria do INMETRO e <strong>não</strong> são regidos pela NR-12.</p>
          </div>
          <div class="nr12-panel" data-panel="d">
            <span class="nr12-chip">Item 12.1.4 "d"</span>
            <h3>Equipamentos estáticos</h3>
            <p>Estruturas fixas sem partes mecânicas móveis em rotação/translação (caldeiras, tanques) são regidas por normas específicas — como a NR-13 para vasos de pressão.</p>
          </div>
          <div class="nr12-panel" data-panel="e">
            <span class="nr12-chip">Item 12.1.4 "e" e "f"</span>
            <h3>Ferramentas portáteis tipo "C" & INMETRO</h3>
            <p>Ferramentas manuais elétricas sob normas tipo "C" (furadeira, tico-tico) e máquinas com certificação INMETRO direta não requerem adaptações de NR-12.</p>
          </div>
        </div>
        `;
html = html.slice(0, s2c2Open) + s2c2New + html.slice(s2c2Wave);

/* ═══════════════════════════════════════════
   M1 — s2d: Por que a arqueadora SE aplica
   ═══════════════════════════════════════════ */
html = replaceOnce(html,
`          <span class="section-tag">⚖️ Legislação</span>
          <div class="slide-title" style="margin-top:6px">Mapa dos Anexos I a XII <span>da NR 12</span></div>
          <div class="slide-subtitle">Fundamentos Regulatórios, Conceitos Gerais e Aplicabilidade da NR 12</div>`,
`          <span class="section-tag">⚙️ Escopo</span>
          <div class="slide-title" style="margin-top:6px">A arqueadora <span>está sujeita à NR-12</span></div>
          <div class="slide-subtitle">THR-TK-90 e Cyklop SP4 — máquina industrial com energia elétrica e partes móveis</div>`);

const s2dIdx = html.indexOf('id="s2d"');
const s2dWave = html.indexOf('<div class="wave">', html.indexOf('class="content-area', s2dIdx));
const s2dOpen = html.lastIndexOf('<div class="content-area', s2dWave);
const s2dNew = `<div class="content-area" style="max-width:980px;margin:0 auto;padding:8px 18px 20px;">
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;">
            <div style="background:linear-gradient(160deg,#1e3a2f,#102018);border:1px solid rgba(46,204,113,.28);border-radius:18px;padding:20px;">
              <div style="font-size:22px;margin-bottom:8px;">⚡</div>
              <h3 style="margin:0 0 8px;font-family:var(--font-h);font-size:16px;color:#fff;">Energia elétrica</h3>
              <p style="margin:0;font-size:14px;line-height:1.55;color:rgba(255,255,255,.85);">Converte energia em movimento mecânico — fora das isenções do item 12.1.4.</p>
            </div>
            <div style="background:linear-gradient(160deg,#3a2a10,#1a1408);border:1px solid rgba(255,200,55,.28);border-radius:18px;padding:20px;">
              <div style="font-size:22px;margin-bottom:8px;">🔥</div>
              <h3 style="margin:0 0 8px;font-family:var(--font-h);font-size:16px;color:#fff;">Termofusão</h3>
              <p style="margin:0;font-size:14px;line-height:1.55;color:rgba(255,255,255,.85);">Placa aquecedora acima de 320°C — risco térmico exige proteções e capacitação.</p>
            </div>
            <div style="background:linear-gradient(160deg,#2a1830,#140818);border:1px solid rgba(194,30,86,.28);border-radius:18px;padding:20px;">
              <div style="font-size:22px;margin-bottom:8px;">📑</div>
              <h3 style="margin:0 0 8px;font-family:var(--font-h);font-size:16px;color:#fff;">Anexo II</h3>
              <p style="margin:0;font-size:14px;line-height:1.55;color:rgba(255,255,255,.85);">Capacitação obrigatória, bloqueio energético e procedimentos de trabalho seguro.</p>
            </div>
            <div style="background:linear-gradient(160deg,#183040,#081018);border:1px solid rgba(100,180,255,.28);border-radius:18px;padding:20px;">
              <div style="font-size:22px;margin-bottom:8px;">🏭</div>
              <h3 style="margin:0 0 8px;font-family:var(--font-h);font-size:16px;color:#fff;">Uso produtivo</h3>
              <p style="margin:0;font-size:14px;line-height:1.55;color:rgba(255,255,255,.85);">Não é museu, eletrodoméstico nem ferramenta portátil tipo C — aplica-se a NR-12 por completo.</p>
            </div>
          </div>
        </div>
        `;
html = html.slice(0, s2dOpen) + s2dNew + html.slice(s2dWave);

/* ═══════════════════════════════════════════
   M2 — deveres x proibições + LOTO
   ═══════════════════════════════════════════ */
html = replaceOnce(html,
`            <span class="section-tag">📋 Conteúdo</span>
            <div class="slide-title" style="margin-top:6px">Anexo II da NR 12 — <span>Capacitação e Bloqueio</span></div>
            <div class="slide-subtitle">Responsabilidades Legais, Capacitação e Bloqueio (LOTO)</div>`,
`            <span class="section-tag">⚖️ Responsabilidades</span>
            <div class="slide-title" style="margin-top:6px">Deveres × Proibições <span>+ LOTO</span></div>
            <div class="slide-subtitle">Compromisso compartilhado e bloqueio energético em 4 passos</div>`);

const m2Idx = html.indexOf('id="s-mod2-motoristas"');
const m2Wave = html.indexOf('<button type="button" class="ax-jump-btn"', m2Idx);
const m2Open = html.indexOf('<div class="content-area ax-content">', m2Idx);
const m2New = `<div class="content-area ax-content" style="max-width:1000px;margin:0 auto;">
          <style>
            #s-mod2-motoristas .nr12-cmp{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:18px;}
            #s-mod2-motoristas .nr12-cmp-col{border-radius:18px;padding:18px 16px;border:1px solid rgba(255,255,255,.1);}
            #s-mod2-motoristas .nr12-ok{background:linear-gradient(160deg,#1e3a2f,#102018);border-color:rgba(46,204,113,.3);}
            #s-mod2-motoristas .nr12-no{background:linear-gradient(160deg,#3a1a1a,#180808);border-color:rgba(220,53,69,.35);}
            #s-mod2-motoristas .nr12-cmp h3{margin:0 0 12px;font-family:var(--font-h);font-size:15px;color:#fff;}
            #s-mod2-motoristas .nr12-cmp li{margin:0 0 10px;font-size:13.5px;line-height:1.45;color:rgba(255,255,255,.88);}
            #s-mod2-motoristas .nr12-loto{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
            #s-mod2-motoristas .nr12-loto-step{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:14px 12px;cursor:pointer;transition:border-color .2s,background .2s;}
            #s-mod2-motoristas .nr12-loto-step.active{border-color:#C21E56;background:rgba(194,30,86,.12);}
            #s-mod2-motoristas .nr12-loto-num{display:inline-flex;width:28px;height:28px;border-radius:50%;align-items:center;justify-content:center;background:#C21E56;color:#fff;font-weight:800;font-size:13px;margin-bottom:8px;}
            #s-mod2-motoristas .nr12-loto-step h4{margin:0 0 6px;font-size:13px;font-family:var(--font-h);color:#fff;}
            #s-mod2-motoristas .nr12-loto-step p{margin:0;font-size:12.5px;line-height:1.4;color:rgba(255,255,255,.75);}
            @media(max-width:768px){
              #s-mod2-motoristas .nr12-cmp,#s-mod2-motoristas .nr12-loto{grid-template-columns:1fr;}
            }
          </style>
          <div class="nr12-cmp">
            <div class="nr12-cmp-col nr12-ok">
              <h3>🟢 Deveres do trabalhador</h3>
              <ul style="margin:0;padding-left:18px;">
                <li><strong>Cumprir procedimentos</strong> de operação, alimentação de fita, limpeza e inspeção.</li>
                <li><strong>Comunicar falhas</strong> imediatamente ao supervisor (barreira danificada ou inativa).</li>
                <li><strong>Participar</strong> dos treinamentos e colaborar com as diretrizes de SST.</li>
              </ul>
            </div>
            <div class="nr12-cmp-col nr12-no">
              <h3>🔴 Proibições absolutas</h3>
              <ul style="margin:0;padding-left:18px;">
                <li><strong>Bypass</strong>: alterar, retirar ou burlar proteção ou chave de segurança.</li>
                <li><strong>Operar sem capacitação</strong> formal de NR-12.</li>
                <li><strong>Gambiarras</strong>: reparos elétricos/mecânicos não autorizados.</li>
              </ul>
            </div>
          </div>
          <p style="margin:0 0 10px;font-size:13px;color:rgba(255,255,255,.55);font-family:var(--font-h);letter-spacing:.04em;text-transform:uppercase;">Bloqueio energético (LOTO) — clique nos passos</p>
          <div class="nr12-loto" id="nr12-loto">
            <div class="nr12-loto-step active" onclick="nr12LotoStep(this)">
              <span class="nr12-loto-num">1</span>
              <h4>Desenergização</h4>
              <p>Desligar a chave geral luminosa e desconectar o plugue da tomada.</p>
            </div>
            <div class="nr12-loto-step" onclick="nr12LotoStep(this)">
              <span class="nr12-loto-num">2</span>
              <h4>Dispositivo de bloqueio</h4>
              <p>Instalar garra/cadeado no plugue para impedir religação acidental.</p>
            </div>
            <div class="nr12-loto-step" onclick="nr12LotoStep(this)">
              <span class="nr12-loto-num">3</span>
              <h4>Etiquetagem (Tagout)</h4>
              <p>Fixar etiqueta com nome, data e aviso “EM MANUTENÇÃO — NÃO LIGUE”.</p>
            </div>
            <div class="nr12-loto-step" onclick="nr12LotoStep(this)">
              <span class="nr12-loto-num">4</span>
              <h4>Zero energia</h4>
              <p>Tentar acionar o botão de energia para confirmar ausência de energia residual.</p>
            </div>
          </div>
        </div>
        `;
html = html.slice(0, m2Open) + m2New + html.slice(m2Wave);

/* ═══════════════════════════════════════════
   M3 — ServiceNow simulator
   ═══════════════════════════════════════════ */
html = replaceOnce(html,
`          <span class="section-tag">🚦 Circulação</span>
          <div class="slide-title" style="margin-top:6px">Passo a Passo: Abrir a IT <span>no Portal 3PIR</span></div>
          <div class="slide-subtitle">Acesso aos Procedimentos — ServiceNow / Portal 3PIR</div>`,
`          <span class="section-tag">🖥️ Simulador</span>
          <div class="slide-title" style="margin-top:6px">Busca da IT no <span>ServiceNow / 3PIR</span></div>
          <div class="slide-subtitle">Clique nos botões destacados para simular a busca</div>`);

const m3drIdx = html.indexOf('id="s-mod3-driver-rules"');
const m3drWave = html.indexOf('<div class="wave">', html.indexOf('class="content-area', m3drIdx));
const m3drOpen = html.lastIndexOf('<div class="content-area', m3drWave);
const m3drNew = `<div class="content-area" style="max-width:820px;margin:0 auto;padding:8px 16px 20px;">
          <style>
            #s-mod3-driver-rules .sn-sim{background:linear-gradient(160deg,#1a2230,#0d1218);border:1px solid rgba(255,255,255,.12);border-radius:18px;overflow:hidden;box-shadow:0 20px 48px rgba(0,0,0,.35);}
            #s-mod3-driver-rules .sn-bar{display:flex;align-items:center;gap:8px;padding:10px 14px;background:#0b0f14;border-bottom:1px solid rgba(255,255,255,.08);}
            #s-mod3-driver-rules .sn-dot{width:10px;height:10px;border-radius:50%;background:#ff5f57;}
            #s-mod3-driver-rules .sn-dot:nth-child(2){background:#febc2e;}
            #s-mod3-driver-rules .sn-dot:nth-child(3){background:#28c840;}
            #s-mod3-driver-rules .sn-body{padding:22px 18px;min-height:220px;}
            #s-mod3-driver-rules .sn-step{display:none;}
            #s-mod3-driver-rules .sn-step.active{display:block;animation:fadeIn .3s ease;}
            #s-mod3-driver-rules .sn-btn{display:inline-flex;align-items:center;gap:8px;margin-top:14px;padding:12px 18px;border:none;border-radius:12px;font-weight:800;font-family:var(--font-h);cursor:pointer;background:linear-gradient(135deg,#C21E56,#8E1238);color:#fff;box-shadow:0 0 0 0 rgba(194,30,86,.5);animation:nr12Pulse 1.6s ease infinite;}
            #s-mod3-driver-rules .sn-input{width:100%;max-width:360px;padding:12px 14px;border-radius:10px;border:1px solid rgba(255,255,255,.2);background:rgba(0,0,0,.25);color:#fff;font-size:14px;}
            #s-mod3-driver-rules .sn-doc{padding:14px;border-radius:12px;border:1px dashed rgba(255,255,255,.25);margin-top:12px;cursor:pointer;}
            #s-mod3-driver-rules .sn-doc:hover{border-color:#C21E56;background:rgba(194,30,86,.1);}
            @keyframes nr12Pulse{0%,100%{box-shadow:0 0 0 0 rgba(194,30,86,.45);}70%{box-shadow:0 0 0 12px rgba(194,30,86,0);}}
          </style>
          <p style="text-align:center;margin:0 0 12px;font-size:13px;color:rgba(255,255,255,.6);">Clique nos botões destacados para simular a busca da IT</p>
          <div class="sn-sim">
            <div class="sn-bar"><span class="sn-dot"></span><span class="sn-dot"></span><span class="sn-dot"></span><span style="margin-left:8px;font-size:12px;color:rgba(255,255,255,.5);">ServiceNow — simulação</span></div>
            <div class="sn-body">
              <div class="sn-step active" data-sn="1">
                <h3 style="margin:0 0 8px;font-family:var(--font-h);color:#fff;font-size:18px;">Etapa 1 — Acesso ao Portal</h3>
                <p style="margin:0;color:rgba(255,255,255,.8);font-size:14px;line-height:1.5;">Na tela inicial do ServiceNow, abra o Portal 3PIR.</p>
                <button type="button" class="sn-btn" onclick="nr12SnNext(2)">PORTAL 3PIR</button>
              </div>
              <div class="sn-step" data-sn="2">
                <h3 style="margin:0 0 8px;font-family:var(--font-h);color:#fff;font-size:18px;">Etapa 2 — Campo de pesquisa</h3>
                <p style="margin:0 0 10px;color:rgba(255,255,255,.8);font-size:14px;">Digite o termo de busca e use a lupa.</p>
                <input class="sn-input" id="nr12-sn-q" value="máquina de arquear" readonly>
                <button type="button" class="sn-btn" onclick="nr12SnNext(3)">🔍 Buscar</button>
              </div>
              <div class="sn-step" data-sn="3">
                <h3 style="margin:0 0 8px;font-family:var(--font-h);color:#fff;font-size:18px;">Etapa 3 — Seleção do documento</h3>
                <p style="margin:0;color:rgba(255,255,255,.8);font-size:14px;">Escolha a IT oficial da arqueadora.</p>
                <div class="sn-doc" onclick="nr12SnNext(4)"><strong style="color:#fff;">Instrução de Trabalho Máquina de Arquear Semi Automática</strong><br><span style="font-size:12px;color:rgba(255,255,255,.55);">Documento SST · Portal 3PIR</span></div>
              </div>
              <div class="sn-step" data-sn="4">
                <h3 style="margin:0 0 8px;font-family:var(--font-h);color:#fff;font-size:18px;">Etapa 4 — Mídia de suporte</h3>
                <p style="margin:0;color:rgba(255,255,255,.8);font-size:14px;line-height:1.5;">Assista ao vídeo tutorial integrado antes de operar a máquina real.</p>
                <button type="button" class="sn-btn" onclick="nr12SnNext(1)">▶ Vídeo tutorial — reiniciar simulação</button>
              </div>
            </div>
          </div>
        </div>
        `;
html = html.slice(0, m3drOpen) + m3drNew + html.slice(m3drWave);

/* Visibilidade → o que consta na IT */
html = replaceOnce(html,
`          <div class="slide-title" style="margin-top:6px">IT + Vídeo Tutorial: <span>Receita de Segurança</span></div>
          <div class="slide-subtitle">Acesso aos Procedimentos — ServiceNow / Portal 3PIR</div>`,
`          <div class="slide-title" style="margin-top:6px">O que consta na <span>Instrução de Trabalho</span></div>
          <div class="slide-subtitle">Passos operacionais, EPIs e mídias de apoio</div>`);

html = replaceOnce(html,
`                <p class="cr-caption">No computador do setor, abra o ServiceNow → Portal 3PIR e localize a IT da máquina de arquear.</p>
              </div>
              <div class="cr-card cr-slide">
                <div class="cr-tips-title">Antes de ligar a arqueadora</div>
                <ul class="cr-tips">
                  <li><span class="cr-tip-num">1</span><span>Leia a <strong>Instrução de Trabalho</strong> oficial (IT).</span></li>
                  <li><span class="cr-tip-num">2</span><span>Assista ao <strong>vídeo tutorial</strong> integrado ao documento.</span></li>
                  <li><span class="cr-tip-num">3</span><span>Siga o passo a passo — <strong>sem improviso</strong>.</span></li>
                </ul>
              </div>
            </div>
            <div class="cr-right cr-card cr-slide">
              <div class="cr-img-box">
                <img src="img/it-tablet-arqueadora.png" alt="Operador consultando o vídeo tutorial da IT ao lado da arqueadora">
              </div>
              <p class="cr-caption">Nunca opere a arqueadora por intuição — a IT é o guia oficial passo a passo da NR 12.</p>
            </div>`,
`                <p class="cr-caption"><strong>Passos operacionais:</strong> alinhar o volume, passar a fita pela canaleta e aguardar a selagem sem expor as mãos.</p>
              </div>
              <div class="cr-card cr-slide">
                <div class="cr-tips-title">EPIs e ferramentas exigidas</div>
                <ul class="cr-tips">
                  <li><span class="cr-tip-num">1</span><span><strong>Luvas</strong> de proteção para as mãos.</span></li>
                  <li><span class="cr-tip-num">2</span><span><strong>Calçado fechado</strong> de segurança.</span></li>
                  <li><span class="cr-tip-num">3</span><span>Ferramentas de corte <strong>homologadas</strong> (retrátil / bico de pato).</span></li>
                </ul>
              </div>
            </div>
            <div class="cr-right cr-card cr-slide">
              <div class="cr-img-box">
                <img src="img/it-tablet-arqueadora.png" alt="Operador consultando o vídeo tutorial da IT ao lado da arqueadora">
              </div>
              <p class="cr-caption"><strong>Mídias de apoio:</strong> o vídeo tutorial na IT demonstra a operação correta antes de iniciar a jornada.</p>
            </div>`);

/* ═══════════════════════════════════════════
   M4 — modelos + painel
   ═══════════════════════════════════════════ */
html = replaceOnce(html,
`          <div class="slide-title" style="margin-top:6px">Mesa, Rodízios e Batentes: <span>Componentes Externos</span></div>`,
`          <div class="slide-title" style="margin-top:6px">Modelos THR-TK-90 <span>× Cyklop SP4</span></div>`);

const m4rzIdx = html.indexOf('id="s-mod4-redzone"');
const m4rzWave = html.indexOf('<div class="wave">', html.indexOf('class="content-area', m4rzIdx));
const m4rzOpen = html.lastIndexOf('<div class="content-area', m4rzWave);
const m4rzNew = `<div class="content-area" style="max-width:980px;margin:0 auto;padding:8px 16px 20px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;">
            <div style="background:linear-gradient(160deg,#2a1830,#140810);border:1px solid rgba(194,30,86,.3);border-radius:18px;padding:20px;">
              <h3 style="margin:0 0 10px;font-family:var(--font-h);color:#fff;font-size:17px;">🏢 THR-TK-90 (fechada)</h3>
              <ul style="margin:0;padding-left:18px;color:rgba(255,255,255,.88);font-size:14px;line-height:1.55;">
                <li>Gabinete com chapas metálicas laterais e frontais fechadas.</li>
                <li>Mesa superior de inox com canaleta da fita.</li>
                <li>Rodízios + batentes mecânicos para travar no piso.</li>
              </ul>
            </div>
            <div style="background:linear-gradient(160deg,#183040,#081018);border:1px solid rgba(100,180,255,.28);border-radius:18px;padding:20px;">
              <h3 style="margin:0 0 10px;font-family:var(--font-h);color:#fff;font-size:17px;">🔓 Cyklop SP4 (aberta)</h3>
              <ul style="margin:0;padding-left:18px;color:rgba(255,255,255,.88);font-size:14px;line-height:1.55;">
                <li>Parte inferior aberta/vazada, sem barreiras de chassi.</li>
                <li>Mesmos princípios de termofusão e painel.</li>
                <li>Exige atenção redobrada à área inferior.</li>
              </ul>
            </div>
          </div>
          <div style="margin-top:14px;display:grid;grid-template-columns:repeat(5,1fr);gap:8px;">
            ${[
              ['1', 'Mesa inox', 'Apoio dos volumes + canaleta da fita'],
              ['2', 'Porta / chapa', 'Acesso à espula (rolo de fita)'],
              ['3', 'Rodízios', 'Transporte + batentes de fixação'],
              ['4', 'Painel', 'Power, Reset, Feed, Length Adj'],
              ['5', 'Cabo elétrico', 'Rede aterrada trifásica/monofásica']
            ].map(([n,t,d]) => `<div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:12px 10px;"><div style="width:24px;height:24px;border-radius:50%;background:#C21E56;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;margin-bottom:6px;">${n}</div><strong style="display:block;color:#fff;font-size:12px;font-family:var(--font-h);">${t}</strong><span style="font-size:11px;color:rgba(255,255,255,.65);line-height:1.35;">${d}</span></div>`).join('')}
          </div>
          <style>@media(max-width:768px){#s-mod4-redzone .content-area>div:first-child,#s-mod4-redzone .content-area>div:last-child{grid-template-columns:1fr!important;}}</style>
        </div>
        `;
html = html.slice(0, m4rzOpen) + m4rzNew + html.slice(m4rzWave);

html = replaceOnce(html,
`          <div class="slide-title" style="margin-top:6px">Espula, Freio e Agregado <span>de Selagem</span></div>`,
`          <div class="slide-title" style="margin-top:6px">Painel de Controle <span>+ Mecanismos Internos</span></div>`);

const m4pcIdx = html.indexOf('id="s-mod4-pontoscegos"');
const m4pcWave = html.indexOf('<div class="wave">', html.indexOf('class="content-area', m4pcIdx));
const m4pcOpen = html.lastIndexOf('<div class="content-area', m4pcWave);
const m4pcNew = `<div class="content-area" style="max-width:980px;margin:0 auto;padding:8px 16px 20px;">
          <style>
            #s-mod4-pontoscegos .nr12-panel-sim{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px;}
            #s-mod4-pontoscegos .nr12-pbtn{border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);border-radius:14px;padding:14px 10px;color:#fff;cursor:pointer;font-family:var(--font-h);font-weight:800;font-size:12px;text-align:center;}
            #s-mod4-pontoscegos .nr12-pbtn.active{border-color:#C21E56;background:rgba(194,30,86,.18);}
            #s-mod4-pontoscegos .nr12-pinfo{min-height:72px;margin-bottom:16px;padding:14px 16px;border-radius:14px;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.9);font-size:14px;line-height:1.5;}
            #s-mod4-pontoscegos .nr12-inner{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;}
            #s-mod4-pontoscegos .nr12-inner div{padding:12px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);font-size:13px;color:rgba(255,255,255,.88);line-height:1.45;}
            @media(max-width:700px){#s-mod4-pontoscegos .nr12-panel-sim,#s-mod4-pontoscegos .nr12-inner{grid-template-columns:1fr 1fr;}}
          </style>
          <p style="margin:0 0 10px;font-size:12px;color:rgba(255,255,255,.55);text-transform:uppercase;letter-spacing:.04em;font-family:var(--font-h);">Clique em cada botão do painel</p>
          <div class="nr12-panel-sim">
            <button type="button" class="nr12-pbtn active" data-pinfo="Interruptor luminoso: liga/desliga a alimentação elétrica e o motor principal." onclick="nr12PanelInfo(this)">POWER</button>
            <button type="button" class="nr12-pbtn" data-pinfo="Dial Length Adj: regula o comprimento da fita pré-alimentada entre 25 mm e 7620 mm." onclick="nr12PanelInfo(this)">LENGTH ADJ</button>
            <button type="button" class="nr12-pbtn" data-pinfo="Botão amarelo Manual/Reset: força o agregado a completar o ciclo e voltar à posição inicial." onclick="nr12PanelInfo(this)">RESET</button>
            <button type="button" class="nr12-pbtn" data-pinfo="Botão verde Feed: alimenta fita adicional continuamente enquanto mantido pressionado." onclick="nr12PanelInfo(this)">FEED</button>
          </div>
          <div class="nr12-pinfo" id="nr12-pinfo">Interruptor luminoso: liga/desliga a alimentação elétrica e o motor principal.</div>
          <div class="nr12-inner">
            <div><strong>Espula</strong> — carretel interno do rolo de fita plástica.</div>
            <div><strong>Freio da espula</strong> — trava a rotação ao fim da puxada (evita embaraço).</div>
            <div><strong>Agregado de selagem</strong> — traciona, tensiona, corta e solda por termofusão.</div>
            <div><strong>Caixa/placa do motor</strong> — unidade elétrica blindada de comando.</div>
          </div>
        </div>
        `;
html = html.slice(0, m4pcOpen) + m4pcNew + html.slice(m4pcWave);

/* ═══════════════════════════════════════════
   M5 — Accordion 10 regras (split 1-5 / 6-10)
   ═══════════════════════════════════════════ */
const rules = [
  ['01', 'Leitura de instruções e sinais', 'Ler o manual e respeitar pictogramas e placas de advertência na máquina.'],
  ['02', 'Uso de EPIs obrigatórios', 'Luvas de proteção e calçado de segurança fechado durante toda a jornada.'],
  ['03', 'Partes do corpo fora da canaleta', 'Mãos e dedos fora da canaleta e da área de cintagem no ciclo ativo.'],
  ['04', 'Perigo térmico (>320°C)', 'A placa interna de soldagem ultrapassa 320°C. Nunca toque nessa área.'],
  ['05', 'Proibição de ciclo em vazio', 'Nunca introduzir fita na guia sem caixa/fardo posicionado na mesa.'],
  ['06', 'Peças de reposição originais', 'Não substituir componentes de segurança por peças fora da especificação.'],
  ['07', 'Atenção à mola da espula', 'Cuidado com a energia elástica ao abrir a espula (risco de chicoteamento).'],
  ['08', 'Desligamento pós-expediente', 'Desligar a chave geral e desconectar a tomada ao terminar ou em limpeza.'],
  ['09', 'Proibição de jato d’água', 'Nunca lavar com mangueira — risco de curto-circuito e choque fatal.'],
  ['10', 'Manual sempre acessível', 'Manter o manual visível e próximo à arqueadora para consulta rápida.']
];

function accordionHtml(from, to, id) {
  return rules.slice(from, to).map(([n, t, d], i) => `
            <div class="nr12-acc ${i === 0 ? 'open' : ''}" onclick="nr12AccToggle(this)">
              <div class="nr12-acc-h"><span class="nr12-acc-n">${n}</span><strong>${t}</strong><span class="nr12-acc-chev">▾</span></div>
              <div class="nr12-acc-b"><p>${d}</p></div>
            </div>`).join('');
}

const accCss = `
          <style>
            #${'ID'} .nr12-acc{border:1px solid rgba(255,255,255,.1);border-radius:14px;margin-bottom:8px;background:rgba(255,255,255,.03);overflow:hidden;cursor:pointer;}
            #${'ID'} .nr12-acc-h{display:flex;align-items:center;gap:10px;padding:12px 14px;}
            #${'ID'} .nr12-acc-n{flex-shrink:0;width:32px;height:32px;border-radius:10px;background:#C21E56;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;}
            #${'ID'} .nr12-acc-h strong{flex:1;font-family:var(--font-h);font-size:14px;color:#fff;}
            #${'ID'} .nr12-acc-chev{color:rgba(255,255,255,.45);}
            #${'ID'} .nr12-acc-b{display:none;padding:0 14px 14px 56px;}
            #${'ID'} .nr12-acc.open .nr12-acc-b{display:block;}
            #${'ID'} .nr12-acc-b p{margin:0;font-size:13.5px;line-height:1.5;color:rgba(255,255,255,.85);}
          </style>`;

html = replaceOnce(html,
`          <div class="slide-title" style="margin-top:6px">Regras 5 e 6: Fita e <span>Integridade de Peças</span></div>`,
`          <div class="slide-title" style="margin-top:6px">10 Regras de Ouro — <span>parte 1 (1–5)</span></div>`);

const m5pkIdx = html.indexOf('id="s-mod5-picking"');
const m5pkWave = html.indexOf('<div class="wave">', html.indexOf('class="content-area', m5pkIdx));
const m5pkOpen = html.lastIndexOf('<div class="content-area', m5pkWave);
html = html.slice(0, m5pkOpen) + `<div class="content-area" style="max-width:820px;margin:0 auto;padding:8px 16px 20px;">
${accCss.replace(/#ID/g, '#s-mod5-picking')}
          <p style="margin:0 0 12px;font-size:13px;color:rgba(255,255,255,.55);">Clique em cada regra para expandir</p>
          ${accordionHtml(0, 5)}
        </div>
        ` + html.slice(m5pkWave);

html = replaceOnce(html,
`          <div class="slide-title" style="margin-top:6px">Regras 7 e 8: Mola da Espula <span>e Desligamento Seguro</span></div>`,
`          <div class="slide-title" style="margin-top:6px">10 Regras de Ouro — <span>parte 2 (6–10)</span></div>`);

const m5apIdx = html.indexOf('id="s-mod5-aproximacao"');
const m5apWave = html.indexOf('<div class="wave">', html.indexOf('class="content-area', m5apIdx));
const m5apOpen = html.lastIndexOf('<div class="content-area', m5apWave);
html = html.slice(0, m5apOpen) + `<div class="content-area" style="max-width:820px;margin:0 auto;padding:8px 16px 20px;">
${accCss.replace(/#ID/g, '#s-mod5-aproximacao')}
          <p style="margin:0 0 12px;font-size:13px;color:rgba(255,255,255,.55);">Clique em cada regra para expandir</p>
          ${accordionHtml(5, 10)}
        </div>
        ` + html.slice(m5apWave);

html = replaceOnce(html,
`          <div class="slide-title" style="margin-top:6px">Regras 9 e 10: Limpeza Seca <span>e Manual Técnico</span></div>`,
`          <div class="slide-title" style="margin-top:6px">Alertas críticos — <span>térmico e elétrico</span></div>`);

const m5dkIdx = html.indexOf('id="s-mod5-doca"');
const m5dkWave = html.indexOf('<div class="wave">', html.indexOf('class="content-area', m5dkIdx));
const m5dkOpen = html.lastIndexOf('<div class="content-area', m5dkWave);
html = html.slice(0, m5dkOpen) + `<div class="content-area" style="max-width:900px;margin:0 auto;padding:8px 16px 20px;display:grid;gap:14px;">
          <div style="padding:22px;border-radius:18px;background:linear-gradient(135deg,#5a1a00,#2a0c00);border:1px solid rgba(255,120,40,.4);">
            <h3 style="margin:0 0 8px;font-family:var(--font-h);color:#ffb080;font-size:18px;">🔥 Placa aquecedora &gt; 320°C</h3>
            <p style="margin:0;color:rgba(255,255,255,.9);font-size:15px;line-height:1.55;">Queimadura severa instantânea. Nunca toque na área de soldagem por termofusão.</p>
          </div>
          <div style="padding:22px;border-radius:18px;background:linear-gradient(135deg,#0a2840,#061018);border:1px solid rgba(80,180,255,.35);">
            <h3 style="margin:0 0 8px;font-family:var(--font-h);color:#8fd0ff;font-size:18px;">⚡ Proibido jato d’água</h3>
            <p style="margin:0;color:rgba(255,255,255,.9);font-size:15px;line-height:1.55;">Regra 09: mangueira ou balde d’água = risco de curto-circuito e choque elétrico fatal. Limpeza apenas a seco.</p>
          </div>
          <div style="padding:22px;border-radius:18px;background:linear-gradient(135deg,#1e3a2f,#102018);border:1px solid rgba(46,204,113,.3);">
            <h3 style="margin:0 0 8px;font-family:var(--font-h);color:#7dffa0;font-size:18px;">📚 Manual sempre à mão</h3>
            <p style="margin:0;color:rgba(255,255,255,.9);font-size:15px;line-height:1.55;">Regra 10: mantenha o manual técnico visível e próximo à arqueadora para consulta imediata.</p>
          </div>
        </div>
        ` + html.slice(m5dkWave);

/* ═══════════════════════════════════════════
   M6 — limites + P.A.R. + corte
   ═══════════════════════════════════════════ */
html = replaceOnce(html,
`            <div class="slide-title" style="margin-top:6px">Guia Rápido: Limite do Operador <span>e P.A.R.</span></div>`,
`            <div class="slide-title" style="margin-top:6px">Limites de intervenção <span>operacional</span></div>`);

const m6gIdx = html.indexOf('id="s-mod6-guia"');
const m6gWave = html.indexOf('<div class="wave">', html.indexOf('class="content-area', m6gIdx));
const m6gOpen = html.lastIndexOf('<div class="content-area', m6gWave);
html = html.slice(0, m6gOpen) + `<div class="content-area" style="max-width:920px;margin:0 auto;padding:8px 16px 20px;display:grid;gap:14px;">
          <div style="padding:18px;border-radius:18px;background:linear-gradient(160deg,#1e3a2f,#102018);border:1px solid rgba(46,204,113,.3);">
            <h3 style="margin:0 0 10px;font-family:var(--font-h);color:#7dffa0;font-size:16px;">🟢 Permitido ao operador capacitado</h3>
            <ul style="margin:0;padding-left:18px;color:rgba(255,255,255,.9);font-size:14px;line-height:1.55;">
              <li>Abastecimento e troca do rolo de fita na espula</li>
              <li>Ajuste do Length Adj (comprimento da fita)</li>
              <li>Limpeza a seco da mesa e inspeção visual diária</li>
              <li>Uso do Reset para destravar ciclos incompletos</li>
            </ul>
          </div>
          <div style="padding:18px;border-radius:18px;background:linear-gradient(160deg,#3a1a1a,#180808);border:1px solid rgba(220,53,69,.35);">
            <h3 style="margin:0 0 10px;font-family:var(--font-h);color:#ff8f9a;font-size:16px;">🔴 Proibido — acionar líder / manutenção</h3>
            <ul style="margin:0;padding-left:18px;color:rgba(255,255,255,.9);font-size:14px;line-height:1.55;">
              <li>Desmontar agregado ou regular placa aquecedora</li>
              <li>Abrir painéis elétricos internos</li>
              <li>Ajustes no motor ou troca de correias</li>
              <li>Reparar sensores ópticos ou chaves limite</li>
            </ul>
          </div>
        </div>
        ` + html.slice(m6gWave);

html = replaceOnce(html,
`            <div class="slide-title" style="margin-top:6px">Zoneamento Seguro e <span>Ferramentas Homologadas</span></div>`,
`            <div class="slide-title" style="margin-top:6px">P.A.R. + ferramentas de <span>corte homologadas</span></div>`);

const m6zIdx = html.indexOf('id="s-mod6-zonas"');
const m6zWave = html.indexOf('<div class="wave">', html.indexOf('class="content-area', m6zIdx));
const m6zOpen = html.lastIndexOf('<div class="content-area', m6zWave);
html = html.slice(0, m6zOpen) + `<div class="content-area" style="max-width:920px;margin:0 auto;padding:8px 16px 20px;">
          <div style="padding:18px;border-radius:18px;background:linear-gradient(160deg,#2a1830,#140810);border:1px solid rgba(194,30,86,.28);margin-bottom:14px;">
            <h3 style="margin:0 0 8px;font-family:var(--font-h);color:#fff;font-size:17px;">📍 P.A.R. — Posto de Arqueação e Retensionamento</h3>
            <ul style="margin:0;padding-left:18px;color:rgba(255,255,255,.88);font-size:14px;line-height:1.55;">
              <li><strong>Proibido transportar</strong> a arqueadora para fora do P.A.R. demarcado.</li>
              <li>Área fora do corredor de veículos de carga para evitar colisões.</li>
              <li>Local <strong>ventilado</strong> para dispersar gases da termofusão.</li>
              <li>Travar batentes das rodas antes de cintar.</li>
            </ul>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
            <div style="padding:14px;border-radius:14px;background:rgba(46,204,113,.1);border:1px solid rgba(46,204,113,.3);">
              <strong style="display:block;color:#7dffa0;margin-bottom:6px;font-size:13px;">🟢 Retrátil automático</strong>
              <span style="font-size:12.5px;color:rgba(255,255,255,.8);line-height:1.4;">Lâmina recolhe ao perder contato com a fita.</span>
            </div>
            <div style="padding:14px;border-radius:14px;background:rgba(46,204,113,.1);border:1px solid rgba(46,204,113,.3);">
              <strong style="display:block;color:#7dffa0;margin-bottom:6px;font-size:13px;">🟢 Bico de pato</strong>
              <span style="font-size:12.5px;color:rgba(255,255,255,.8);line-height:1.4;">Lâmina abrigada em fenda — dedos não tocam o fio.</span>
            </div>
            <div style="padding:14px;border-radius:14px;background:rgba(220,53,69,.12);border:1px solid rgba(220,53,69,.35);">
              <strong style="display:block;color:#ff8f9a;margin-bottom:6px;font-size:13px;">🔴 Facas / lâmina exposta</strong>
              <span style="font-size:12.5px;color:rgba(255,255,255,.8);line-height:1.4;">Proibido: facas, tesouras domésticas, estilete sem trava.</span>
            </div>
          </div>
          <style>@media(max-width:700px){#s-mod6-zonas .content-area>div:last-of-type{grid-template-columns:1fr!important;}}</style>
        </div>
        ` + html.slice(m6zWave);

/* ═══════════════════════════════════════════
   Game decks + intros
   ═══════════════════════════════════════════ */
html = replaceOnce(html,
`              Cenário real do chão de fábrica: a tampa lateral da arqueadora está com a trava quebrada. Escolha a <strong>conduta correta</strong> (Opção A ou B).`,
`              O sensor da porta lateral está frouxo e a máquina funciona com a porta aberta. Escolha a <strong>conduta correta</strong>.`);

html = replaceOnce(html,
`              <button type="button" class="mod2tf-btn tf-true" onclick="handleMod2TfChoice(true)">A — Fita crepe e operar</button>
              <button type="button" class="mod2tf-btn tf-false" onclick="handleMod2TfChoice(false)">B — Parar e comunicar</button>`,
`              <button type="button" class="mod2tf-btn tf-true" onclick="handleMod2TfChoice(true)">A — Continuar com cuidado</button>
              <button type="button" class="mod2tf-btn tf-false" onclick="handleMod2TfChoice(false)">B — Parar e avisar supervisor</button>`);

html = replaceOnce(html, `    const mod2tfDeck = [
      {
        text: 'Ao iniciar o turno, a tampa lateral que protege a espula e as engrenagens está com a trava quebrada e ficando entreaberta. Qual é a conduta correta?',
        answer: false,
        tip: 'Correto — Opção B! Não opere a máquina, comunique imediatamente o supervisor e aguarde bloqueio e reparo técnico. Improvisar com fita crepe viola a NR 12.'
      }
    ];`, `    const mod2tfDeck = [
      {
        text: 'A porta de acesso lateral à espula está com o sensor frouxo e a máquina funciona mesmo com a porta aberta. Qual atitude tomar?',
        answer: false,
        tip: 'Perfeito! Pare imediatamente e comunique o supervisor para manutenção corretiva. Ignorar falha em barreira de segurança é infração grave.'
      }
    ];`);

html = replaceOnce(html, `            'Digitar "máquina de arquear" na busca do Portal 3PIR.',
            'Abrir o ServiceNow no computador corporativo.',
            'Assistir ao vídeo tutorial da IT.'`,
`            'Clicar no Portal 3PIR sem abrir o ServiceNow.',
            'Abrir o ServiceNow no computador do setor.',
            'Assistir ao vídeo tutorial da IT.'`);

html = replaceOnce(html, `            '"empilhadeira NR 11"',
            '"máquina de arquear"',
            '"pit stop GLP"'`,
`            '"furadeira portátil"',
            '"máquina de arquear"',
            '"NR-13 caldeira"'`);

/* Expand m6 to 10 final questions - replace m6gRounds entirely */
const m6RoundsNew = `      var m6gRounds = [
        { type: 'choice', emoji: '📜', label: 'NR-12', title: 'Objetivo da norma', inst: 'Qual é o objetivo principal da NR-12?', hint: 'Saúde e prevenção.', items: [
          { t: 'Aumentar a velocidade de produção das arqueadoras.', ok: false, emoji: '⚡' },
          { t: 'Garantir a saúde e integridade física dos trabalhadores e prevenir acidentes em máquinas.', ok: true, emoji: '🛡️' },
          { t: 'Regular apenas o valor de venda dos equipamentos.', ok: false, emoji: '💰' }
        ], fb: 'A NR-12 existe para proteger a integridade física e prevenir acidentes.' },
        { type: 'choice', emoji: '📋', label: '12.1.4', title: 'Isenções', inst: 'Segundo o item 12.1.4, qual NÃO se aplica à NR-12?', hint: 'Força humana.', items: [
          { t: 'Arqueadora semiautomática THR-TK-90.', ok: false, emoji: '📦' },
          { t: 'Prensas e injetoras plásticas.', ok: false, emoji: '🏭' },
          { t: 'Equipamentos movidos por força humana, como paleteiras manuais.', ok: true, emoji: '✋' }
        ], fb: 'Paleteiras manuais e similares estão isentos pelo item 12.1.4.' },
        { type: 'choice', emoji: '🚨', label: 'Conduta', title: 'Sensor quebrado', inst: 'O que fazer se encontrar um sensor de segurança quebrado?', hint: 'Pare e comunique.', items: [
          { t: 'Colocar fita crepe e trabalhar rápido.', ok: false, emoji: '🩹' },
          { t: 'Parar a máquina e comunicar o supervisor direto imediatamente.', ok: true, emoji: '📞' },
          { t: 'Tentar arrumar com ferramentas próprias.', ok: false, emoji: '🔧' }
        ], fb: 'Pare e comunique o supervisor — sem gambiarra.' },
        { type: 'choice', emoji: '🔥', label: 'Térmico', title: 'Placa aquecedora', inst: 'Qual a temperatura aproximada da placa de aquecimento?', hint: 'Risco severo.', items: [
          { t: '50°C.', ok: false, emoji: '🌡️' },
          { t: '100°C.', ok: false, emoji: '♨️' },
          { t: 'Acima de 320°C (risco de queimadura severa).', ok: true, emoji: '🔥' }
        ], fb: 'A placa ultrapassa 320°C — nunca toque.' },
        { type: 'choice', emoji: '⏱️', label: 'Painel', title: 'Length Adj', inst: 'Qual controle ajusta o comprimento da fita (25–7620 mm)?', hint: 'Temporizador.', items: [
          { t: 'Botão Power.', ok: false, emoji: '🔌' },
          { t: 'Temporizador (Length Adj).', ok: true, emoji: '⏲️' },
          { t: 'Botão Reset.', ok: false, emoji: '🟡' }
        ], fb: 'Length Adj regula 25 mm a 7620 mm.' },
        { type: 'choice', emoji: '🔒', label: 'LOTO', title: 'Antes de limpar', inst: 'Procedimento obrigatório antes de limpar/inspecionar o interior?', hint: 'Bloqueio completo.', items: [
          { t: 'Apenas desligar o botão no painel.', ok: false, emoji: '⏻' },
          { t: 'Desenergizar na tomada e aplicar Bloqueio e Etiquetagem (LOTO).', ok: true, emoji: '🔒' },
          { t: 'Pedir para o colega segurar a porta.', ok: false, emoji: '🤝' }
        ], fb: 'LOTO completo: desenergizar, bloquear, etiquetar e verificar zero energia.' },
        { type: 'choice', emoji: '💧', label: 'Água', title: 'Limpeza', inst: 'Em relação ao uso de água na arqueadora:', hint: 'Regra 09.', items: [
          { t: 'Pode lavar com mangueira uma vez por semana.', ok: false, emoji: '🚿' },
          { t: 'É expressamente proibido usar jatos d’água (risco de curto e choque).', ok: true, emoji: '🚫' },
          { t: 'Pode jogar água apenas na mesa de inox.', ok: false, emoji: '🪣' }
        ], fb: 'Limpeza apenas a seco — água é proibida.' },
        { type: 'choice', emoji: '✂️', label: 'Corte', title: 'Ferramenta homologada', inst: 'Qual ferramenta é homologada para cortar fita plástica?', hint: 'Retrátil ou bico de pato.', items: [
          { t: 'Faca de cozinha de ponta.', ok: false, emoji: '🔪' },
          { t: 'Tesoura escolar de papel.', ok: false, emoji: '✂️' },
          { t: 'Estilete de segurança retrátil ou modelo bico de pato.', ok: true, emoji: '✅' }
        ], fb: 'Somente estiletes homologados de segurança.' },
        { type: 'choice', emoji: '🛠️', label: 'Limite', title: 'Intervenção autorizada', inst: 'Qual a única intervenção mecânica autorizada ao operador?', hint: 'Abastecimento.', items: [
          { t: 'Abastecimento e recarga da fita plástica na espula.', ok: true, emoji: '🧵' },
          { t: 'Regulagem interna do motor elétrico.', ok: false, emoji: '⚙️' },
          { t: 'Troca das correias de tração.', ok: false, emoji: '🔩' }
        ], fb: 'Operador: abastecer fita. O resto é manutenção.' },
        { type: 'choice', emoji: '🅿️', label: 'P.A.R.', title: 'Local de operação', inst: 'Onde a máquina de arquear deve ser operada?', hint: 'Área demarcada.', items: [
          { t: 'Em qualquer lugar do corredor de veículos de carga.', ok: false, emoji: '🚧' },
          { t: 'Dentro do Posto de Arqueação (P.A.R.), área demarcada fora da rota de veículos pesados.', ok: true, emoji: '🟨' },
          { t: 'Próxima à porta do refeitório.', ok: false, emoji: '🚪' }
        ], fb: 'Opere somente no P.A.R. demarcado, com batentes travados.' }
      ];`;

const m6Start = html.indexOf('      var m6gRounds = [');
const m6End = html.indexOf('      function m6gShuffle(arr) {', m6Start);
if (m6Start < 0 || m6End < 0) throw new Error('m6gRounds bounds');
html = html.slice(0, m6Start) + m6RoundsNew + '\n\n' + html.slice(m6End);

/* Helper JS before closing of main script - inject near initPandaVideoBoxes or DOMContentLoaded */
const helpers = `
    function nr12FilterTab(slideId, btn) {
      var root = document.getElementById(slideId);
      if (!root) return;
      var tab = btn.getAttribute('data-tab');
      root.querySelectorAll('.nr12-tab').forEach(function (b) { b.classList.toggle('active', b === btn); });
      root.querySelectorAll('.nr12-panel').forEach(function (p) { p.classList.toggle('active', p.getAttribute('data-panel') === tab); });
    }
    function nr12LotoStep(el) {
      var root = document.getElementById('nr12-loto');
      if (!root) return;
      root.querySelectorAll('.nr12-loto-step').forEach(function (s) { s.classList.remove('active'); });
      el.classList.add('active');
    }
    function nr12SnNext(n) {
      var root = document.getElementById('s-mod3-driver-rules');
      if (!root) return;
      root.querySelectorAll('.sn-step').forEach(function (s) {
        s.classList.toggle('active', String(s.getAttribute('data-sn')) === String(n));
      });
    }
    function nr12PanelInfo(btn) {
      var box = document.getElementById('nr12-pinfo');
      if (!box) return;
      document.querySelectorAll('#s-mod4-pontoscegos .nr12-pbtn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      box.textContent = btn.getAttribute('data-pinfo') || '';
    }
    function nr12AccToggle(el) {
      var open = el.classList.contains('open');
      var parent = el.parentElement;
      if (parent) parent.querySelectorAll('.nr12-acc').forEach(function (a) { a.classList.remove('open'); });
      if (!open) el.classList.add('open');
    }
`;

html = replaceOnce(html, '    window.addEventListener(\'message\', handlePandaMessage);', '    window.addEventListener(\'message\', handlePandaMessage);\n' + helpers);

fs.writeFileSync(file, html, 'utf8');
console.log('OK: roteiro-site aplicado em index.html');
