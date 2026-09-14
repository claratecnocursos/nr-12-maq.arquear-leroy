/**
 * Extrai o manifesto de narração a partir do index.html.
 *
 * Uso:
 *   node audio-data.js              → gera audios/manifest.json
 *   const { buildManifest } = require('./audio-data');
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = __dirname;
const HTML_PATH = path.join(ROOT, 'index.html');
const OUTPUT_DIR = path.join(ROOT, 'audios');
const MANIFEST_PATH = path.join(OUTPUT_DIR, 'manifest.json');

/** Textos customizados para slides com pouco conteúdo textual ou conteúdo dinâmico. */
const NARRATION_OVERRIDES = {
  s1:
    'Treinamento de Segurança do Trabalho. NR 12 — Máquina de Arquear Semiautomática. Capacitação em segurança na operação dos modelos THR-TK-90 e Cyklop SP4. São seis módulos, conteúdo completo, cento por cento online.',
  s6:
    'Sumário. Conteúdo Programático. Módulo 1: Fundamentos Regulatórios, Conceitos Gerais e Aplicabilidade da NR 12. Módulo 2: Responsabilidades Legais do Trabalhador, Capacitação e Bloqueio LOTO. Módulo 3: Acesso à Instrução de Trabalho no ServiceNow e Portal 3PIR. Módulo 4: Anatomia Mecânica, Modelos e Painel de Controle. Módulo 5: As 10 Regras de Ouro de Segurança Operacional. Módulo 6: Limites de Intervenção, Zoneamento P.A.R. e Corte Seguro.',
  's-mod1':
    'Início do Módulo 1. Fundamentos Regulatórios, Conceitos Gerais e Aplicabilidade da NR 12.',
  s2b:
    'Vídeo. O que é uma Máquina e a Máquina de Arquear. Máquina é um dispositivo artificial que converte energia para um objetivo. A arqueadora, ou máquina de cintagem, é semiautomática elétrica: a fita plástica passa pela canaleta, o sensor reconhece, tensiona e sela por termofusão.',
  s2b2:
    'Vídeo. Conhecendo a NR 12 e Seus Objetivos. A NR 12 trata da segurança no trabalho em máquinas e equipamentos. Seu objetivo é proteger a saúde e a integridade física do trabalhador em todo o ciclo de vida da máquina: projeto, fabricação, importação, operação e descarte.',
  s2b3:
    'Cards do vídeo. O que é uma máquina: dispositivo que converte energia. Máquina de arquear: cintagem semiautomática por termofusão. NR 12: norma de proteção. Objetivo: resguardar a saúde e prevenir acidentes em todo o ciclo de vida da máquina.',
  s2c:
    'Vídeo. A Estrutura e os Anexos da NR 12. A norma se organiza nos Anexos I ao XII: optoeletrônicos, capacitação, meios de acesso, glossário e anexos setoriais para motosserras, panificação, prensas, injetoras, calçados, agrícolas e elevação de pessoas.',
  s2c2:
    'Anexos da NR 12, como o vídeo mostrou. Anexo I: optoeletrônicos. Anexo II: capacitação. Anexo III: meios de acesso. Anexos setoriais V a XII detalham setores. Os anexos complementam a norma — não a substituem.',
  s2d:
    'O que os anexos exigem do operador. A capacitação da arqueadora segue o Anexo II. Quando a norma citar um anexo, ele também é obrigação. Anexos setoriais não substituem o manual da arqueadora.',
  s2b4:
    'Vídeo. Onde a NR 12 não se aplica, parte 1. Isentos: equipamentos movidos só por força humana ou animal, e maquinários históricos em museus ou feiras, desde que haja proteção aos visitantes.',
  s2b5:
    'Vídeo. Onde a NR 12 não se aplica, parte 2. Isentos: eletrodomésticos, como geladeira, ventilador e air fryer; e equipamentos estáticos sem partes móveis, como caldeiras e tanques, regidos por outras normas.',
  s2b6:
    'Vídeo. Onde a NR 12 não se aplica, parte 3. Isentos: ferramentas portáteis elétricas sob norma tipo C, como furadeira e tico-tico; e máquinas certificadas pelo INMETRO com os requisitos de segurança atendidos.',
  s2e: null,
  's-mod2':
    'Início do Módulo 2. Responsabilidades Legais do Trabalhador, Capacitação e Bloqueio Energético LOTO.',
  's-mod2-video':
    'Vídeo. Os Deveres Legais do Trabalhador na NR 12. Cumprir procedimentos de operação, alimentação de fita, limpeza e inspeção. Participar da capacitação. A formação em NR 12 é obrigatória antes de operar a arqueadora.',
  's-mod2-video2':
    'Vídeo. Proibições e Comunicação Urgente de Falhas. É proibido alterar, remover ou burlar proteções e dispositivos de segurança. Se uma barreira ou sensor estiver danificado, comunique imediatamente o supervisor e não opere em condição insegura.',
  's-mod2-motoristas':
    'Deveres e proibições do trabalhador, mais o bloqueio energético LOTO. Deveres: cumprir procedimentos, comunicar falhas e participar dos treinamentos. Proibições: bypass de proteções, operar sem capacitação e fazer gambiarras. LOTO em quatro passos: desenergizar, aplicar cadeado, etiquetar e verificar zero energia.',
  's-mod2-game': null,
  's-mod3':
    'Início do Módulo 3. Acesso aos Procedimentos de Trabalho no ServiceNow e Portal 3PIR.',
  's-mod3-video':
    'Vídeo. A Importância da Instrução de Trabalho. Nunca opere por achismo. A IT é o documento oficial de segurança com o passo a passo da arqueadora.',
  's-mod3-video2':
    'Vídeo. Acessando o ServiceNow e o Portal 3PIR. No computador do setor, abra o ServiceNow e entre no Portal 3PIR, repositório de políticas, processos, procedimentos e registros.',
  's-mod3-video3':
    'Vídeo. Buscando a IT da Arqueadora no Sistema. No Portal 3PIR, digite máquina de arquear na busca e abra a Instrução de Trabalho Máquina de Arquear Semi Automática.',
  's-mod3-driver-rules':
    'Simulador de busca da IT. Etapa 1: abrir o Portal 3PIR no ServiceNow. Etapa 2: pesquisar máquina de arquear. Etapa 3: selecionar a Instrução de Trabalho oficial. Etapa 4: assistir ao vídeo tutorial integrado antes de operar.',
  's-mod3-video4':
    'Vídeo. Navegando pelo Procedimento Operacional e Vídeo Tutorial. Na IT você encontra a sequência operacional, EPIs exigidos e o vídeo de apoio. Siga o procedimento sem improviso.',
  's-mod3-visibilidade':
    'O que consta na Instrução de Trabalho. Passos operacionais: alinhar o volume, passar a fita e aguardar a selagem sem expor as mãos. EPIs: luvas e calçado fechado. Ferramentas de corte homologadas. Mídia de apoio: vídeo tutorial antes da jornada.',
  's-mod3-game': null,
  's-mod4':
    'Início do Módulo 4. Anatomia Mecânica, Modelos e Interface da Arqueadora.',
  's-mod4-video':
    'Vídeo. Anatomia da Máquina de Arquear. Conheça a estrutura geral da arqueadora semiautomática e os pontos principais de operação segura.',
  's-mod4-match':
    'Interação após o vídeo de anatomia. Associe mesa de inox, porta da espula, rodízios, painel e cabo elétrico às funções que o vídeo apresentou.',
  's-mod4-video2':
    'Vídeo. Modelos de Arqueadora THR-TK-90 e Cyklop SP4. A THR-TK-90 é semiautomática fechada, com gabinete e mesa de inox. A Cyklop SP4 tem a parte inferior aberta e exige atenção redobrada nessa área.',
  's-mod4-redzone':
    'Comparativo dos modelos do vídeo. THR-TK-90: gabinete fechado, mesa de inox e batentes. Cyklop SP4: parte inferior aberta, mesma termofusão, atenção redobrada na área inferior.',
  's-mod4-video3':
    'Vídeo. Componentes Externos da Arqueadora. Conheça a mesa, a porta da espula, os rodízios com batentes de fixação, o painel e a conexão elétrica.',
  's-mod4-video4':
    'Vídeo. Mecanismos Internos e Operação. Espula, freio, agregado de selagem e unidade do motor — entenda o que acontece dentro da arqueadora.',
  's-mod4-pontoscegos':
    'Mecanismos internos do vídeo. Espula: carretel da fita. Freio da espula: trava a rotação ao fim da puxada. Agregado de selagem: traciona, tensiona, corta e solda. Caixa do motor: comando elétrico blindado.',
  's-mod4-video5':
    'Vídeo. Painel de Controle: Liga-Desliga e Função Reset. A chave luminosa energiza o equipamento. O botão amarelo Reset força o agregado a voltar à posição inicial em travamentos leves.',
  's-mod4-game': null,
  's-mod5':
    'Início do Módulo 5. As 10 Regras de Ouro e Procedimentos de Operação Segura.',
  's-mod5-video':
    'Vídeo. Regras 1 e 2: Instruções Visuais e EPIs Obrigatórios. Respeite pictogramas e placas. Use luvas e calçado de segurança fechado em toda a jornada.',
  's-mod5-match':
    'Interação da introdução. As 10 regras vêm do manual do fabricante, servem para operar sem acidente, valem para todo operador e nenhum atalho vale o risco.',
  's-mod5-video2':
    'Vídeo. Regras 3 e 4: Área de Arqueação e Placa Térmica. Mantenha mãos e dedos fora da canaleta no ciclo ativo. Nunca toque na placa de soldagem acima de 320 graus.',
  's-mod5-picking':
    'Procedimento de operação segura do vídeo. Alinhar o volume, passar a fita, aguardar a selagem sem expor as mãos, não operar em vazio e seguir a sequência oficial.',
  's-mod5-video3':
    'Vídeo. Regras 5 e 6: Introdução da Fita e Integridade de Peças. Nunca introduza fita sem caixa ou fardo na mesa. Use só peças de reposição originais do fabricante.',
  's-mod5-aproximacao':
    'Regras 1 e 2 do vídeo. Ler o manual, respeitar pictogramas e placas, usar luvas e calçado de segurança fechado.',
  's-mod5-video4':
    'Vídeo. Regras 7 e 8: Mola da Espula e Desligamento Seguro. Cuidado com a força da mola ao abrir a espula. Ao terminar, desligue a chave geral e desconecte a tomada.',
  's-mod5-doca':
    'Regras 6 a 10 do vídeo. Peças originais. Cuidado com a mola da espula. Desligar e desconectar ao terminar. Proibido jato de água. Manual sempre próximo da máquina.',
  's-mod5-video5':
    'Vídeo. Regras 9 e 10: Risco Elétrico na Limpeza e Acesso ao Manual. Proibido jato de água na máquina. Mantenha o manual visível e próximo da arqueadora.',
  's-mod5-game': null,
  's-mod6':
    'Início do Módulo 6. Limites de Intervenção, Zoneamento Logístico P.A.R. e Corte Seguro.',
  's-mod6-video':
    'Vídeo. O Limite de Intervenção e Acesso Não Autorizado. Ao operador cabe abastecer a fita, ajustar o Length Adj, limpar a seco e usar o Reset. Desmontagem, painéis elétricos e reparos mecânicos são da manutenção.',
  's-mod6-video2':
    'Vídeo. O Posto de Trabalho P.A.R. e a Movimentação Segura. P.A.R. significa Posto de Arqueação e Retensionamento. Opere só na área demarcada, fora da rota de veículos pesados, com batentes travados.',
  's-mod6-guia':
    'Depois dos vídeos de limite e P.A.R. Permitido: troca de fita, Length Adj, limpeza a seco e Reset. Proibido: abrir agregado, painéis, motor, correias ou sensores. P.A.R.: operar só na área demarcada, fora da rota de veículos, com batentes travados.',
  's-mod6-video3':
    'Vídeo. Placas de Alerta, Gases de Fusão e Riscos na Mesa. Respeite as placas. Opere em local ventilado para dispersar gases da termofusão. Mantenha as mãos longe da canaleta.',
  's-mod6-zonas':
    'Placas, gases e riscos na mesa, como o vídeo mostrou. Respeite as placas de alerta. Opere em local ventilado para dispersar gases da termofusão. Mantenha as mãos longe da canaleta no ciclo ativo.',
  's-mod6-video4':
    'Vídeo. Uso Correto de Ferramentas de Corte de Fitilho. Homologados: estilete retrátil e bico de pato. Proibidos: faca comum, tesoura doméstica e estilete sem trava.',
  's-mod6-game': null,
  's-fim':
    'Parabéns. Você concluiu o treinamento NR 12 — Segurança na Operação de Máquina de Arquear Semiautomática. Por mérito e compromisso com a segurança, você percorreu os seis módulos. A segurança é um direito de todos e um dever de cada um. Continue fazendo a sua parte.',
};

function cleanText(text) {
  return (text || '')
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\uFE0F]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripHtml(html) {
  return cleanText(
    String(html || '')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<svg[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<iframe[\s\S]*?<\/iframe>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, ' e ')
      .replace(/&gt;/g, ' ')
      .replace(/&lt;/g, ' ')
      .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
      .replace(/&[a-z]+;/gi, ' ')
  );
}

function attr(html, name) {
  const re = new RegExp(`${name}="([^"]*)"`, 'i');
  const m = String(html || '').match(re);
  return m ? m[1] : '';
}

function splitSlides(html) {
  const start = html.indexOf('<div id="slides">');
  const root = start >= 0 ? html.slice(start) : html;
  const chunks = [];
  const re = /<section\b[^>]*class="[^"]*\bslide\b[^"]*"[^>]*>/gi;
  const marks = [...root.matchAll(re)];
  marks.forEach((mark, i) => {
    const from = mark.index;
    const to = i + 1 < marks.length ? marks[i + 1].index : root.length;
    const block = root.slice(from, to);
    const id = attr(block, 'id') || `slide-${i + 1}`;
    chunks.push({ id, html: block });
  });
  return chunks;
}

function extractSlideText(slideHtml) {
  const custom = attr(slideHtml, 'data-audio-text');
  if (custom) return cleanText(custom);

  let text = stripHtml(slideHtml);
  text = text
    .replace(/\bToque\b/g, ' ')
    .replace(/\bAvançar\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (text.length < 40) {
    const title = stripHtml((slideHtml.match(/class="slide-title"[\s\S]*?<\/div>/i) || [''])[0]);
    const iframeTitle = attr(slideHtml, 'title');
    const parts = [title, iframeTitle].map(cleanText).filter(Boolean);
    if (parts.length) text = parts.join('. ');
  }

  return text;
}

function slideTitleFromHtml(slideHtml, id) {
  const titleBlock = (slideHtml.match(/class="slide-title"[\s\S]*?<\/div>/i) || [''])[0]
    || (slideHtml.match(/<h1[\s\S]*?<\/h1>/i) || [''])[0];
  return cleanText(stripHtml(titleBlock) || id);
}

function parseQuizQuestions(html) {
  const match = html.match(/const\s+q1_questions\s*=\s*(\[[\s\S]*?\n\s*\]);/);
  if (!match) return [];

  try {
    return Function(`"use strict"; return (${match[1]});`)();
  } catch {
    return [];
  }
}

function parseQ5Questions(html) {
  const match = html.match(/const\s+q5_questions\s*=\s*(\[[\s\S]*?\n\s*\]);/);
  if (!match) return [];

  try {
    return Function(`"use strict"; return (${match[1]});`)();
  } catch {
    return [];
  }
}

function parseMod1GameDeck(html) {
  const match = html.match(/const\s+mod1GameDeck\s*=\s*(\[[\s\S]*?\n\s*\]);/);
  if (!match) return [];

  try {
    return Function(`"use strict"; return (${match[1]});`)();
  } catch {
    return [];
  }
}

function parseQm2Questions(html) {
  const match = html.match(/const\s+qm2_questions\s*=\s*(\[[\s\S]*?\n\s*\]);/);
  if (!match) return [];

  try {
    return Function(`"use strict"; return (${match[1]});`)();
  } catch {
    return [];
  }
}

function buildMod1Narration(deck) {
  if (!deck.length) {
    return 'Quiz NR-12 — Módulo 1. Classifique equipamentos como sujeitos ou isentos da NR 12 pelo item 12.1.4.';
  }

  const parts = [
    'Quiz NR-12 — Módulo 1. Fundamentos e isenções do item 12.1.4. Classifique cada item como sujeito ou isento da NR 12.',
  ];

  deck.forEach((item, index) => {
    parts.push(`Pergunta ${index + 1}: ${cleanText(item.text)}`);
    (item.options || []).forEach((opt) => {
      parts.push(`Alternativa ${opt.key}: ${cleanText(opt.text)}`);
    });
    parts.push(`Resposta correta: alternativa ${item.correct}. ${cleanText(item.tip)}`);
  });

  return parts.join(' ');
}

function parseMod2tfDeck(html) {
  const match = html.match(/const\s+mod2tfDeck\s*=\s*(\[[\s\S]*?\n\s*\]);/);
  if (!match) return [];

  try {
    return Function(`"use strict"; return (${match[1]});`)();
  } catch {
    return [];
  }
}

function buildMod2tfNarration(deck) {
  if (!deck.length) {
    return 'Desafio Módulo 2 — Estudo de Caso. Responsabilidades do trabalhador e comunicação de falhas na arqueadora.';
  }

  const parts = [
    'Desafio Módulo 2 — Estudo de Caso NR-12. Escolha a conduta correta diante de falha em proteção ou sensor.',
  ];

  deck.forEach((item, index) => {
    parts.push(`Afirmação ${index + 1}: ${cleanText(item.text)}`);
    parts.push(`Resposta correta: ${item.answer ? 'Verdadeiro' : 'Falso'}. ${cleanText(item.tip)}`);
  });

  return parts.join(' ');
}

function buildMod2Narration(questions) {
  if (!questions.length) {
    return 'Quiz — Módulo 2. Conhecendo o Equipamento. Responda cinco perguntas sobre o equipamento. Acerte pelo menos três questões para concluir o módulo.';
  }

  const parts = [
    'Quiz. Conhecendo o Equipamento. Quiz — Módulo 2. Responda cinco perguntas sobre tipos de transpaleteiras, capacidade de carga, componentes principais, painel de controle e funcionamento do timão. Acerte pelo menos três questões para concluir o módulo.',
  ];

  questions.forEach((item, index) => {
    parts.push(`Pergunta ${index + 1}: ${cleanText(item.q)}`);
    item.opts.forEach((opt, optIndex) => {
      const marker = optIndex === item.correct ? 'Resposta correta' : `Alternativa ${optIndex + 1}`;
      parts.push(`${marker}: ${cleanText(opt)}`);
    });
    if (item.feedback_ok) {
      parts.push(cleanText(item.feedback_ok));
    }
  });

  return parts.join(' ');
}

function parseMod3BinaryDeck(html) {
  const match = html.match(/const\s+mod3BinaryDeck\s*=\s*(\[[\s\S]*?\n\s*\]);/);
  if (!match) return [];

  try {
    return Function(`"use strict"; return (${match[1]});`)();
  } catch {
    return [];
  }
}

function parseM3gDeck(html) {
  const match = html.match(/var\s+m3gDeck\s*=\s*(\[[\s\S]*?\n\s*\]);/);
  if (!match) return [];

  try {
    return Function(`"use strict"; return (${match[1]});`)();
  } catch {
    return [];
  }
}

function buildM3gNarration(deck) {
  if (!deck.length) {
    return 'Quiz NR-12 — Módulo 3. Cinco situações sobre a Instrução de Trabalho no ServiceNow e no Portal 3PIR. Escolha a ação correta.';
  }

  const letters = ['A', 'B', 'C'];
  const parts = [
    'Quiz NR-12 — Módulo 3. Cinco situações sobre a Instrução de Trabalho no ServiceNow e no Portal 3PIR. Escolha a ação correta.',
  ];

  deck.forEach((item, index) => {
    parts.push(`Situação ${index + 1}: ${cleanText(item.sit)}`);
    item.opts.forEach((opt, optIndex) => {
      parts.push(`Alternativa ${letters[optIndex] || optIndex + 1}: ${cleanText(opt)}`);
    });
    parts.push(`Resposta correta: alternativa ${letters[item.ans] || item.ans + 1}. ${cleanText(item.fb)}`);
  });

  return parts.join(' ');
}

function parseM4gDeck(html) {
  const match = html.match(/var\s+m4gDeck\s*=\s*(\[[\s\S]*?\n\s*\]);/);
  if (!match) return [];

  try {
    return Function(`"use strict"; return (${match[1]});`)();
  } catch {
    return [];
  }
}

function buildM4gNarration(deck) {
  if (!deck.length) {
    return 'Quiz NR-12 — Módulo 4. Cinco afirmações sobre modelos, painel e comandos da arqueadora. Responda Certo ou Errado.';
  }

  const parts = [
    'Quiz NR-12 — Módulo 4. Cinco afirmações sobre modelos, painel e comandos da arqueadora. Responda Certo ou Errado.',
  ];

  deck.forEach((item, index) => {
    parts.push(`Afirmação ${index + 1}: ${cleanText(item.text)}`);
    parts.push(`Resposta correta: ${item.ans ? 'Certo' : 'Errado'}. ${cleanText(item.tip)}`);
  });

  return parts.join(' ');
}

function parseM5gDeck(html) {
  const match = html.match(/var\s+m5gDeck\s*=\s*(\[[\s\S]*?\n\s*\]);/);
  if (!match) return [];

  try {
    return Function(`"use strict"; return (${match[1]});`)();
  } catch {
    return [];
  }
}

function buildM5gNarration(deck) {
  if (!deck.length) {
    return 'Quiz NR-12 — Módulo 5. Cinco situações das regras de ouro: canaleta, placa térmica, EPIs, mola da espula e proibição de água.';
  }

  const letters = ['A', 'B', 'C'];
  const parts = [
    'Quiz NR-12 — Módulo 5. Cinco situações das regras de ouro: canaleta, placa térmica, EPIs, mola da espula e proibição de água.',
  ];

  deck.forEach((item, index) => {
    parts.push(`Situação ${index + 1}: ${cleanText(item.sit)}`);
    item.opts.forEach((opt, optIndex) => {
      parts.push(`Alternativa ${letters[optIndex] || optIndex + 1}: ${cleanText(opt)}`);
    });
    parts.push(`Resposta correta: alternativa ${letters[item.ans] || item.ans + 1}. ${cleanText(item.fb)}`);
  });

  return parts.join(' ');
}

function parseM6gDeck(html) {
  const match = html.match(/var\s+m6gRounds\s*=\s*(\[[\s\S]*?\n\s*\]);/);
  if (!match) return [];

  try {
    return Function(`"use strict"; return (${match[1]});`)();
  } catch {
    return [];
  }
}

function buildM6gNarration(deck) {
  if (!deck.length) {
    return 'Avaliação final NR-12. Dez questões sobre a norma, a arqueadora, o painel, o bloqueio LOTO, o corte seguro e o posto P.A.R.';
  }

  const parts = [
    'Avaliação final NR-12. Dez questões sobre a norma, a arqueadora, o painel, o bloqueio LOTO, o corte seguro e o posto P.A.R.',
  ];

  deck.forEach((item, index) => {
    parts.push(`Etapa ${index + 1}: ${cleanText(item.title)}. ${cleanText(item.inst)}`);
    if (item.type === 'order') {
      parts.push('Ordem correta:');
      item.items.forEach((opt, optIndex) => {
        parts.push(`Passo ${optIndex + 1}: ${cleanText(opt.t)}`);
      });
    } else if (item.type === 'select') {
      const yes = item.items.filter((opt) => opt.ok).map((opt) => cleanText(opt.t));
      const no = item.items.filter((opt) => !opt.ok).map((opt) => cleanText(opt.t));
      parts.push(`Marque: ${yes.join('; ')}.`);
      if (no.length) parts.push(`Não marque: ${no.join('; ')}.`);
    } else {
      item.items.forEach((opt) => {
        parts.push(`${opt.ok ? 'Regra correta' : 'Opção incorreta'}: ${cleanText(opt.t)}`);
      });
    }
    parts.push(cleanText(item.fb));
  });

  return parts.join(' ');
}

function parseM7gDeck(html) {
  const match = html.match(/var\s+m7gRounds\s*=\s*(\[[\s\S]*?\n\s*\]);/);
  if (!match) return [];

  try {
    return Function(`"use strict"; return (${match[1]});`)();
  } catch {
    return [];
  }
}

function buildM7gNarration(deck) {
  if (!deck.length) {
    return 'Missão NR 12 — Módulo 7. São cinco perguntas simples sobre a NR 12. Toque na resposta certa e valide o módulo.';
  }

  const parts = [
    'Missão NR 12 — Módulo 7. São cinco perguntas simples sobre a NR 12. Toque na resposta certa e valide o módulo.',
  ];

  deck.forEach((item, index) => {
    parts.push(`Etapa ${index + 1}: ${cleanText(item.title)}. ${cleanText(item.inst)}`);
    if (item.type === 'order') {
      parts.push('Ordem correta:');
      item.items.forEach((opt, optIndex) => {
        parts.push(`Passo ${optIndex + 1}: ${cleanText(opt.t)}`);
      });
    } else if (item.type === 'select') {
      const yes = item.items.filter((opt) => opt.ok).map((opt) => cleanText(opt.t));
      const no = item.items.filter((opt) => !opt.ok).map((opt) => cleanText(opt.t));
      parts.push(`Marque: ${yes.join('; ')}.`);
      if (no.length) parts.push(`Não marque: ${no.join('; ')}.`);
    } else {
      item.items.forEach((opt) => {
        parts.push(`${opt.ok ? 'Regra correta' : 'Opção incorreta'}: ${cleanText(opt.t)}`);
      });
    }
    parts.push(cleanText(item.fb));
  });

  return parts.join(' ');
}

function parseQm4Questions(html) {
  const match = html.match(/const\s+qm4_data\s*=\s*(\[[\s\S]*?\n\s*\]);/);
  if (!match) return [];
  try {
    return Function('"use strict"; return (' + match[1] + ');')();
  } catch {
    return [];
  }
}

function parseQm6Questions(html) {
  const match = html.match(/const\s+qm6_data\s*=\s*(\[[\s\S]*?\n\s*\]);/);
  if (!match) return [];
  try {
    return Function('"use strict"; return (' + match[1] + ');')();
  } catch {
    return [];
  }
}

function buildMod3Narration(deck) {
  if (!deck.length) {
    return 'Desafio do Módulo 3. Permitido ou Proibido. Decida se cada prática de procedimento operacional ou condução de transpaleteira pode ou não ser realizada. Conclua o jogo para validar o módulo.';
  }

  const parts = [
    'Desafio do Módulo 3. Permitido ou Proibido. Decida se cada prática de procedimento operacional ou condução de transpaleteira pode ou não ser realizada. Cinco situações sobre inspeção, trânsito interno, postura e estacionamento seguro.',
  ];

  deck.forEach((item, index) => {
    const answer = item.allowed ? 'Permitido' : 'Proibido';
    parts.push(`Situação ${index + 1}: ${cleanText(item.text)} Resposta correta: ${answer}. ${cleanText(item.tip)}`);
  });

  parts.push('Conclua o jogo para validar o módulo.');
  return parts.join(' ');
}

function buildQuizNarration(questions, moduleNum = 1) {
  if (!questions.length) {
    return `Quiz do Módulo ${moduleNum}. Responda às perguntas sobre os conceitos apresentados no módulo.`;
  }

  const parts = [
    `Quiz do Módulo ${moduleNum}. Responda às ${questions.length} perguntas sobre os conceitos do módulo.`,
  ];

  questions.forEach((item, index) => {
    parts.push(`Pergunta ${index + 1}: ${cleanText(item.q)}`);
    item.opts.forEach((opt, optIndex) => {
      parts.push(`Alternativa ${optIndex + 1}: ${cleanText(opt)}`);
    });
  });

  return parts.join(' ');
}

function slideTitle(slide) {
  const titleEl = slide.querySelector('.slide-title, .mod-intro-title, h1');
  return cleanText(titleEl?.textContent || slide.id);
}

function loadTextHashes() {
  const hashPath = path.join(OUTPUT_DIR, '.text-hashes.json');
  if (!fs.existsSync(hashPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(hashPath, 'utf8'));
  } catch {
    return {};
  }
}

function audioMatchesText(id, text) {
  const filePath = path.join(OUTPUT_DIR, `${id}.mp3`);
  if (!fs.existsSync(filePath)) return false;
  const hashes = loadTextHashes();
  const textHash = crypto.createHash('sha256').update(text, 'utf8').digest('hex');
  return hashes[id] === textHash;
}

function buildManifest(htmlPath = HTML_PATH) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  const quizQuestions = parseQuizQuestions(html);
  const q5Questions = parseQ5Questions(html);
  const mod3Deck = parseMod3BinaryDeck(html);
  const mod1Deck = parseMod1GameDeck(html);
  const qm2Questions = parseQm2Questions(html);

  const slides = splitSlides(html).map((slide, index) => {
    const id = slide.id || `slide-${index + 1}`;
    let text = NARRATION_OVERRIDES[id];

    if (text === null && id === 's7d') {
      text = buildQuizNarration(quizQuestions, 1);
    } else if (text === null && id === 's31') {
      text = buildQuizNarration(q5Questions, 5);
    } else if (text === null && id === 's26') {
      text = buildMod3Narration(mod3Deck);
    } else if (text === null && id === 's4f') {
      text = buildQuizNarration(parseQm4Questions(html), 4);
    } else if (text === null && id === 's6f') {
      text = buildQuizNarration(parseQm6Questions(html), 6);
    } else if (text === null && id === 's2e') {
      text = buildMod1Narration(mod1Deck);
    } else if (text === null && id === 's3f') {
      text = buildMod2Narration(qm2Questions);
    } else if ((text === undefined || text === null) && id === 's-mod2-game') {
      text = buildMod2tfNarration(parseMod2tfDeck(html));
    } else if ((text === undefined || text === null) && id === 's-mod3-game') {
      text = buildM3gNarration(parseM3gDeck(html));
    } else if ((text === undefined || text === null) && id === 's-mod4-game') {
      text = buildM4gNarration(parseM4gDeck(html));
    } else if ((text === undefined || text === null) && id === 's-mod5-game') {
      text = buildM5gNarration(parseM5gDeck(html));
    } else if ((text === undefined || text === null) && id === 's-mod6-game') {
      text = buildM6gNarration(parseM6gDeck(html));
    } else if ((text === undefined || text === null) && id === 's-mod7-game') {
      text = buildM7gNarration(parseM7gDeck(html));
    } else if (text === undefined || text === null) {
      text = extractSlideText(slide.html);
    }

    if (!text) {
      text = `Slide ${index + 1}. ${slideTitleFromHtml(slide.html, id)}`;
    }

    return {
      index,
      id,
      title: slideTitleFromHtml(slide.html, id),
      file: `audios/${id}.mp3`,
      text,
      audioReady: audioMatchesText(id, text),
    };
  });

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    source: path.basename(htmlPath),
    audioDir: 'audios',
    slides,
  };
}

function writeManifest(manifest, outputPath = MANIFEST_PATH) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2), 'utf8');

  const jsPath = path.join(path.dirname(outputPath), 'audio-manifest.js');
  fs.writeFileSync(
    jsPath,
    `window.__AUDIO_NARRATION__ = ${JSON.stringify(manifest)};\n`,
    'utf8',
  );

  return outputPath;
}

if (require.main === module) {
  const manifest = buildManifest();
  const out = writeManifest(manifest);
  console.log(`Manifesto gerado: ${out}`);
  console.log(`${manifest.slides.length} slides encontrados.`);
  manifest.slides.forEach((slide) => {
    console.log(`  [${String(slide.index + 1).padStart(2, '0')}] ${slide.id} (${slide.text.length} chars)`);
  });
}

module.exports = {
  HTML_PATH,
  MANIFEST_PATH,
  OUTPUT_DIR,
  NARRATION_OVERRIDES,
  buildManifest,
  writeManifest,
  extractSlideText,
  cleanText,
  buildMod1Narration,
  parseMod1GameDeck,
  buildMod2Narration,
  parseQm2Questions,
};
