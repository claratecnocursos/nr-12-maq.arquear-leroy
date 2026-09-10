const fs = require('fs');
const file = 'index.html';
let html = fs.readFileSync(file, 'utf8');

function replaceOnce(oldStr, newStr, label) {
  if (!html.includes(oldStr)) {
    console.warn('MISSING:', label);
    return false;
  }
  html = html.replace(oldStr, newStr);
  console.log('OK:', label);
  return true;
}

// ── s2b3 content area (from top-bar through content-area end before wave) ──
{
  const start = html.indexOf('<section class="slide" id="s2b3">');
  const topBar = html.indexOf('<div class="top-bar">', start);
  const wave = html.indexOf('<div class="wave">', topBar);
  if (start < 0 || topBar < 0 || wave < 0) throw new Error('s2b3 bounds');

  const newBlock = `        <div class="top-bar">
          <span class="section-tag">⚙️ Fundamentos</span>
          <div class="slide-title" style="margin-top:6px">Resumo: Conceito de Máquina <span>e Termofusão</span></div>
          <div class="slide-subtitle">Fundamentos Regulatórios, Conceitos Gerais e Aplicabilidade da NR 12</div>
        </div>
        <div class="content-area" style="display:grid; grid-template-columns: 1.25fr 1fr; gap: 36px; align-items: stretch; max-width: 1100px; margin: 0 auto; padding: 0 20px 20px;">
          <div id="s2b3-text" class="s2b3-slide s2b3-card-active" style="background: linear-gradient(160deg, #6B1830 0%, #530713 40%, #2A0810 75%, #140408 100%); border: 1px solid rgba(194, 30, 86, 0.28); border-radius: 24px; padding: 36px 32px; box-shadow: 0 20px 40px rgba(0,0,0,0.3); animation: slideRight 0.8s ease;">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px;">
              <span class="nr-badge" style="background:rgba(194, 30, 86, 0.12); color:#C21E56; border:1px solid rgba(194, 30, 86, 0.25); padding:6px 14px; border-radius:100px; font-size:12px; font-weight:700; letter-spacing:0.5px; font-family:var(--font-h)">MÁQUINA DE ARQUEAR</span>
            </div>
            <p style="font-family: var(--font-p); font-size: clamp(16px, 1.7vw, 19px); line-height: 1.7; color: rgba(255, 255, 255, 0.92); margin: 0; font-weight: 500;">
              Uma <strong>máquina</strong> é um dispositivo artificial que converte energia para atingir um objetivo. No nosso posto, trabalhamos com a <strong>máquina de arquear</strong> (cintagem), equipamento <strong>semiautomático elétrico</strong> que usa fita plástica.
            </p>
            <p style="font-family: var(--font-p); font-size: clamp(16px, 1.7vw, 19px); line-height: 1.7; color: rgba(255, 255, 255, 0.92); margin: 16px 0 0; font-weight: 500;">
              O ciclo é intuitivo: o operador passa a fita pelas guias e pela canaleta. Um sensor reconhece a fita, que é <strong>ajustada, tensionada e selada por termofusão</strong> de forma automática.
            </p>
            <div class="text-line" style="height: 3px; width: 80px; background: #C21E56; border-radius: 3px; margin-top: 26px;"></div>
          </div>

          <div id="s2b3-card" class="s2b3-slide" style="display:flex; justify-content:center; align-items:stretch;">
            <div class="img-placeholder" style="width:100%; min-height:320px; border-radius:24px; border:2px dashed rgba(194,30,86,0.45); background:rgba(255,255,255,0.03); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; padding:24px; text-align:center;">
              <div style="width:64px;height:64px;border-radius:16px;background:rgba(194,30,86,0.15);display:flex;align-items:center;justify-content:center;font-size:28px;">📷</div>
              <p style="margin:0;font-family:var(--font-h);font-size:15px;font-weight:800;color:rgba(255,255,255,0.9);">Imagem da arqueadora / termofusão</p>
              <p style="margin:0;font-family:var(--font-p);font-size:13px;color:rgba(255,255,255,0.55);max-width:240px;line-height:1.4;">Espaço reservado — adicione a foto correta depois.</p>
            </div>
          </div>

          <div class="s2b3-carousel-nav" id="s2b3-carousel-nav">
            <button type="button" class="s2b3-nav-btn" id="s2b3-prev" aria-label="Anterior" onclick="s2b3CarouselNav(-1)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <span class="s2b3-counter" id="s2b3-counter">1 / 2</span>
            <button type="button" class="s2b3-nav-btn" id="s2b3-next" aria-label="Próximo" onclick="s2b3CarouselNav(1)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
            </button>
          </div>

        </div>
        `;
  html = html.slice(0, topBar) + newBlock + html.slice(wave);
  console.log('OK: s2b3');
}

// ── s2c2 viewport content ──
{
  const start = html.indexOf('id="s2c2-mobile-subhead"');
  const nav = html.indexOf('id="s2c2-carousel-nav"', start);
  if (start < 0 || nav < 0) throw new Error('s2c2 bounds');
  // include from mobile-subhead div opening
  const blockStart = html.lastIndexOf('<div class="s2c2-mobile-subhead"', start);
  const blockEnd = html.lastIndexOf('<div class="s2c2-carousel-nav"', nav);

  const newBlock = `          <div class="s2c2-mobile-subhead" id="s2c2-mobile-subhead">Ciclo de Vida da Máquina</div>

          <div class="s2c2-card-viewport" id="s2c2-card-viewport">
          <div class="civcrim-civil s2c2-slide s2c2-card-active" data-group="Ciclo de Vida da Máquina">
            <div class="civcrim-civil-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <div>
              <span class="nr-badge" style="background:rgba(194, 30, 86, 0.12); color:#C21E56; border:1px solid rgba(194, 30, 86, 0.25); padding:5px 12px; border-radius:100px; font-size:11px; font-weight:700; letter-spacing:0.5px; font-family:var(--font-h)">NR 12 — OBJETIVO</span>
              <p class="civcrim-civil-desc">Proteção da saúde e integridade física do trabalhador</p>
              <p class="civcrim-quote">A NR 12 define requisitos mínimos para prevenir acidentes e doenças em todo o ciclo de vida das máquinas — não só na operação.</p>
            </div>
          </div>

          <div class="civcrim-subhead"><span class="civcrim-subhead-text">Fases do ciclo de vida sob a NR 12</span></div>

          <div class="civcrim-grid">
            <div class="civcrim-card s2c2-slide" data-group="Fases do ciclo de vida sob a NR 12">
              <div class="civcrim-card-head">
                <div class="civcrim-card-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
                  </svg>
                </div>
                <div>
                  <div class="civcrim-card-title">Projeto → Fabricação</div>
                  <div class="civcrim-card-sub">Antes de chegar à fábrica</div>
                </div>
              </div>
              <div class="civcrim-card-text">
                Inclui <strong>projeto, fabricação, importação, comercialização e exposição</strong>. A segurança começa na origem da máquina.
              </div>
            </div>

            <div class="civcrim-card s2c2-slide" data-group="Fases do ciclo de vida sob a NR 12">
              <div class="civcrim-card-head">
                <div class="civcrim-card-icon">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  </svg>
                </div>
                <div>
                  <div class="civcrim-card-title">Operação → Descarte</div>
                  <div class="civcrim-card-sub">No chão de fábrica e depois</div>
                </div>
              </div>
              <div class="civcrim-card-text">
                Abrange <strong>montagem, instalação, ajuste, operação, limpeza, manutenção, inspeção</strong> e o <strong>descarte seguro</strong> da arqueadora.
              </div>
            </div>
          </div>
          </div>

          `;
  html = html.slice(0, blockStart) + newBlock + html.slice(blockEnd);
  console.log('OK: s2c2');
}

// ── s2d viewport content ──
{
  const start = html.indexOf('id="s2d-mobile-subhead"');
  const nav = html.indexOf('id="s2d-carousel-nav"', start);
  if (start < 0 || nav < 0) throw new Error('s2d bounds');
  const blockStart = html.lastIndexOf('<div class="s2d-mobile-subhead"', start);
  const blockEnd = html.lastIndexOf('<div class="s2d-carousel-nav"', nav);

  const newBlock = `          <div class="s2d-mobile-subhead" id="s2d-mobile-subhead">Anexos técnicos da NR 12</div>

          <div class="s2d-card-viewport" id="s2d-card-viewport">
          <div class="civcrim-subhead"><span class="civcrim-subhead-text">Anexos técnicos da NR 12 (I a XII)</span></div>

          <div class="civcrim-grid">
            <div class="civcrim-card s2d-card-active" data-group="Anexos técnicos da NR 12 (I a XII)">
              <div class="civcrim-card-head">
                <div class="civcrim-card-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
                  </svg>
                </div>
                <div>
                  <div class="civcrim-card-title">Anexos I e II</div>
                  <div class="civcrim-card-sub">Proteções e capacitação</div>
                </div>
              </div>
              <div class="civcrim-card-text">
                <strong>Anexo I:</strong> sistemas optoeletrônicos.<br>
                <strong>Anexo II:</strong> capacitação e treinamento dos trabalhadores — essencial para a arqueadora.
              </div>
            </div>

            <div class="civcrim-card" data-group="Anexos técnicos da NR 12 (I a XII)">
              <div class="civcrim-card-head">
                <div class="civcrim-card-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18M9 21V9" />
                  </svg>
                </div>
                <div>
                  <div class="civcrim-card-title">Anexos III a XII</div>
                  <div class="civcrim-card-sub">Máquinas e setores específicos</div>
                </div>
              </div>
              <div class="civcrim-card-text">
                Exemplos: motosserras (V), panificação (VI), prensas (VIII), injetoras (IX), agrícolas (XI), elevação de pessoas (XII). Cada anexo traz regras detalhadas do setor.
              </div>
            </div>
          </div>

          <div class="civcrim-subhead"><span class="civcrim-subhead-text">Onde a NR 12 NÃO se aplica (Item 12.1.4)</span></div>

          <div class="civcrim-grid">
            <div class="civcrim-card" data-group="Onde a NR 12 NÃO se aplica (Item 12.1.4)">
              <div class="civcrim-card-head">
                <div class="civcrim-card-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                  </svg>
                </div>
                <div>
                  <div class="civcrim-card-title">Isenções a–c</div>
                  <div class="civcrim-card-sub">Força humana, museus, eletrodomésticos</div>
                </div>
              </div>
              <div class="civcrim-card-text">
                <strong>a)</strong> força humana/animal (ex.: paleteira manual).<br>
                <strong>b)</strong> museus e eventos históricos.<br>
                <strong>c)</strong> eletrodomésticos (geladeira, air fryer, ventilador).
              </div>
            </div>

            <div class="civcrim-card is-civil" data-group="Onde a NR 12 NÃO se aplica (Item 12.1.4)">
              <div class="civcrim-card-head">
                <div class="civcrim-card-icon">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
                  </svg>
                </div>
                <div>
                  <div class="civcrim-card-title">Isenções d–f</div>
                  <div class="civcrim-card-sub">Estáticos, portáteis e INMETRO</div>
                </div>
              </div>
              <div class="civcrim-card-text">
                <strong>d)</strong> equipamentos estáticos (caldeiras, tanques).<br>
                <strong>e)</strong> ferramentas portáteis elétricas (norma tipo C).<br>
                <strong>f)</strong> máquinas certificadas pelo INMETRO.
              </div>
            </div>
          </div>
          </div>

          `;
  html = html.slice(0, blockStart) + newBlock + html.slice(blockEnd);
  console.log('OK: s2d');
}

// ── mod2 anexo content ──
{
  const start = html.indexOf('<div class="content-area ax-content">');
  const btn = html.indexOf('<button type="button" class="ax-jump-btn"', start);
  if (start < 0 || btn < 0) throw new Error('mod2 bounds');

  const newBlock = `        <div class="content-area ax-content">
          <div class="ax-shell">
            <div class="ax-block">
              <div class="ax-head">
                <span class="ax-num">1</span>
                <p>Deveres do trabalhador na <span>NR 12</span></p>
              </div>
              <p class="ax-kicker">Obrigações legais do operador da arqueadora</p>
              <div class="ax-list">
                <div class="ax-li"><span class="ax-letter">•</span><p>cumprir os procedimentos seguros de operação, alimentação de fita, abastecimento, limpeza, inspeção e transporte;</p></div>
                <div class="ax-li"><span class="ax-letter">•</span><p>participar da capacitação fornecida pelo empregador — a formação em NR 12 é <strong>obrigatória antes de operar</strong>;</p></div>
                <div class="ax-li"><span class="ax-letter">•</span><p><strong>proibido</strong> alterar, remover ou anular proteções e dispositivos de segurança;</p></div>
                <div class="ax-li"><span class="ax-letter">•</span><p>comunicar <strong>imediatamente</strong> ao superior qualquer barreira danificada, sensor falho ou condição insegura.</p></div>
              </div>
            </div>
            <div class="ax-block" style="margin-top:18px;">
              <div class="ax-head">
                <span class="ax-num">2</span>
                <p>Conteúdo Programático — <span>Anexo II da NR 12</span></p>
              </div>
              <p class="ax-kicker">Tópicos da capacitação (inclui bloqueio LOTO)</p>
              <div class="ax-list">
                <div class="ax-li"><span class="ax-letter">a)</span><p>descrição e identificação dos riscos associados com cada máquina e equipamento e as proteções específicas contra cada um deles;</p></div>
                <div class="ax-li"><span class="ax-letter">b)</span><p>funcionamento das proteções; como e por que devem ser usadas;</p></div>
                <div class="ax-li"><span class="ax-letter">c)</span><p>como e em que circunstâncias uma proteção pode ser removida, e por quem;</p></div>
                <div class="ax-li"><span class="ax-letter">d)</span><p>o que fazer se uma proteção foi danificada ou perdeu a função — contatar o supervisor;</p></div>
                <div class="ax-li"><span class="ax-letter">e)</span><p>os princípios de segurança na utilização da máquina ou equipamento;</p></div>
                <div class="ax-li"><span class="ax-letter">f)</span><p>segurança para riscos mecânicos, elétricos e outros relevantes;</p></div>
                <div class="ax-li"><span class="ax-letter">g)</span><p>método de trabalho seguro;</p></div>
                <div class="ax-li"><span class="ax-letter">h)</span><p>permissão de trabalho; e</p></div>
                <div class="ax-li"><span class="ax-letter">i)</span><p><strong>sistema de bloqueio (LOTO)</strong> durante inspeção, limpeza, lubrificação e manutenção — a máquina não pode ligar acidentalmente.</p></div>
              </div>
            </div>
          </div>
        </div>
        `;
  html = html.slice(0, start) + newBlock + html.slice(btn);
  console.log('OK: mod2');
}

fs.writeFileSync(file, html);
console.log({
  termofusao: html.includes('selada por termofusão'),
  placeholder: html.includes('Imagem da arqueadora / termofusão'),
  noCard: !html.includes('CARTÃO DE IDENTIFICAÇÃO'),
  ciclo: html.includes('Fases do ciclo de vida sob a NR 12'),
  noArt132: !html.includes('Artigo 132'),
  anexos: html.includes('Anexos técnicos da NR 12'),
  noHomicidio: !html.includes('Homicídio Culposo'),
  deveres: html.includes('Deveres do trabalhador na'),
});
