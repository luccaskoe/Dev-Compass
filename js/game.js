
// ELEMENTOS
const challengeObject = document.querySelector("#challenge-object");
const challengeArea = document.querySelector("#challenge-object-area");

// Container das alternativas (usado só para travar cliques durante a animação)
const optionsLock = document.querySelector("#challenge-options");

// CONFIGURAÇÃO DAS ANIMAÇÕES
const challengeAnimations = {
  frontend: ["center", "selector", "layout", "spacing", "responsive"],
  backend: ["server", "server", "server", "server", "server"],
  engenharia: [
    "architecture",
    "architecture",
    "architecture",
    "architecture",
    "architecture",
  ],
  ia: ["data", "data", "data", "data", "data"],
  seguranca: ["security", "security", "security", "security", "security"],
  fullstack: ["server", "layout", "server", "architecture", "server"],
};

// Tempos (em milissegundos)
const animationTimes = {
  solve: 900, // objeto executa a resposta correta
  react: 400, // pequeno pulso de reação
  holdCheck: 800, // tempo com o ✓ na tela
  shake: 500, // tremida do erro
  holdX: 700, // tempo com o X na tela
};

// HTML de cada cena 
const sceneTemplates = {

  // FRONT-END
  center: `<div class="piece sq"></div>`,

  selector: `
    <div class="sel-row">
      <div class="piece sel-box is-card"><span>.card</span></div>
      <div class="piece sel-box"><span>.box</span></div>
      <div class="piece sel-box is-card"><span>.card</span></div>
    </div>`,

  layout: `
    <div class="lay-row">
      <div class="piece lay-box"></div>
      <div class="piece lay-box"></div>
      <div class="piece lay-box"></div>
    </div>`,

  spacing: `
    <div class="gap-row">
      <div class="piece gap-box"></div>
      <div class="piece gap-box"></div>
      <div class="piece gap-box"></div>
    </div>`,

  responsive: `
    <div class="resp-frame">
      <div class="piece resp-col a"></div>
      <div class="piece resp-col b"></div>
    </div>`,

  // BACK-END
  server: `
    <div class="srv-flow">
      <div class="srv-node"><i class="ri-computer-line"></i><small>Cliente</small></div>
      <div class="srv-line"><span class="srv-packet"></span></div>
      <div class="srv-node"><i class="ri-server-line"></i><small>API</small></div>
      <div class="srv-line"><span class="srv-packet"></span></div>
      <div class="srv-node"><i class="ri-database-2-line"></i><small>Banco</small></div>
    </div>`,

  // ENGENHARIA
  architecture: `
    <div class="arch-stack">
      <div class="piece arch-block">Interface</div>
      <div class="piece arch-block">Regras</div>
      <div class="piece arch-block">Dados</div>
    </div>`,

  // IA
  data: `
    <div class="ai-row">
      <span class="ai-step">📊</span>
      <i class="ri-arrow-right-line ai-arrow"></i>
      <span class="ai-step">🧠</span>
      <i class="ri-arrow-right-line ai-arrow"></i>
      <span class="ai-step">🤖</span>
    </div>`,

  // SEGURANÇA
  security: `
    <div class="sec-scene">
      <span class="sec-threat">🕵️‍♀️</span>
      <span class="sec-lock">
        <span class="lock-open">🔓</span>
        <span class="lock-closed">🔒</span>
      </span>
    </div>`,
};

// Timers ativos (para poder cancelar tudo ao restaurar)
let animationTimers = [];

// FUNÇÃO PRINCIPAL
async function playChallengeAnimation(result, category, challengeIndex) {
  if (!challengeObject) {
    return;
  }

  // Descobre qual animação pertence ao desafio atual
  const animationType =
    challengeAnimations[category]?.[challengeIndex] || "generic";

  // Trava as alternativas enquanto a animação roda
  lockOptions(true);

  if (result === "wrong") {
    await playWrongAnimation();
    return;
  }

  await playCorrectAnimation(animationType);
}

function wait(ms) {
  return new Promise((resolve) => {
    animationTimers.push(setTimeout(resolve, ms));
  });
}

// Trava/destrava cliques nas alternativas
function lockOptions(locked) {
  if (optionsLock) {
    optionsLock.style.pointerEvents = locked ? "none" : "";
  }
}

// ANIMAÇÕES DOS OBJETOS - Monta a cena do desafio
function buildScene(type) {
  if (!challengeObject) {
    return;
  }

  let html = sceneTemplates[type];

  // Cena genérica
  if (!html) {
    type = "generic";
    const icon = window.currentChallengeData?.icon || "ri-code-s-slash-line";
    html = `<div class="gen-icon piece"><i class="${icon}"></i></div>`;
  }

  challengeObject.dataset.scene = type;
  challengeObject.innerHTML = `<div class="scene scene-${type}">${html}</div>`;
}

// Descobre a cena do desafio atual
function getCurrentSceneType() {
  try {
    return (
      challengeAnimations[selectedCategory]?.[currentChallenge] || "generic"
    );
  } catch (error) {
    return "generic";
  }
}

// FEEDBACK DE ACERTO
async function playCorrectAnimation() {
  clearAnimationState();

  // Força o navegador a registrar o estado inicial
  void challengeObject.offsetWidth;

  // 1. O objeto executa a resposta correta (as transições ficam no CSS)
  challengeObject.classList.add("is-solved");
  await wait(animationTimes.solve);

  // 2. O objeto reage
  challengeObject.classList.add("is-reacting");
  await wait(animationTimes.react);

  // 3. Aparece o ✓ grande no centro + som
  showFeedback("check");
  playCorrectSound();
  await wait(animationTimes.holdCheck);

  // 4. Limpa tudo
  resetChallengeAnimation();
}

// FEEDBACK DE ERRO
async function playWrongAnimation() {
  clearAnimationState();

  void challengeObject.offsetWidth;

  // 1. O objeto NÃO se transforma: só treme
  challengeObject.classList.add("is-wrong");
  await wait(animationTimes.shake);
  challengeObject.classList.remove("is-wrong");

  // 2. Aparece o X grande no centro + som
  showFeedback("x");
  playWrongSound();
  await wait(animationTimes.holdX);

  // 3. Limpa tudo
  resetChallengeAnimation();
}

// Mostra o ✓ ou o X no centro do palco
function showFeedback(kind) {
  removeFeedback();

  const mark = document.createElement("div");
  mark.className = `challenge-feedback ${kind === "check" ? "is-check" : "is-x"}`;
  mark.innerHTML =
    kind === "check"
      ? `<i class="ri-check-line"></i>`
      : `<i class="ri-close-line"></i>`;

  (challengeArea || challengeObject.parentElement).appendChild(mark);

  // Deixa a cena mais apagada para o ✓/X aparecer bem
  challengeObject.classList.add("is-feedback");
}

// Remove qualquer ✓ ou X que esteja no palco
function removeFeedback() {
  const area = challengeArea || challengeObject?.parentElement;

  if (!area) {
    return;
  }

  area.querySelectorAll(".challenge-feedback").forEach((mark) => mark.remove());
}

// RESTAURAÇÃO DO OBJETO - Remove as classes
function clearAnimationState() {
  challengeObject.classList.remove(
    "is-solved",
    "is-reacting",
    "is-wrong",
    "is-feedback",
  );
  removeFeedback();
}

// Deixa o objeto limpo e pronto para a pergunta atual
function resetChallengeAnimation() {
  if (!challengeObject) {
    return;
  }

  // Cancela qualquer animação pendente
  animationTimers.forEach(clearTimeout);
  animationTimers = [];

  clearAnimationState();

  // Remove estilos inline temporários
  challengeObject.removeAttribute("style");
  challengeObject.dataset.animation = "";

  // Reconstrói a cena original da pergunta atual
  buildScene(getCurrentSceneType());

  // Libera as alternativas
  lockOptions(false);
}

// SONS 
let sharedAudioContext = null;

function playTone(frequency, volume, duration) {
  try {
    if (!sharedAudioContext) {
      sharedAudioContext = new AudioContext();
    }

    if (sharedAudioContext.state === "suspended") {
      sharedAudioContext.resume();
    }

    const oscillator = sharedAudioContext.createOscillator();
    const gain = sharedAudioContext.createGain();

    oscillator.frequency.value = frequency;
    gain.gain.value = volume;

    oscillator.connect(gain);
    gain.connect(sharedAudioContext.destination);

    oscillator.start();
    oscillator.stop(sharedAudioContext.currentTime + duration);
  } catch (error) {
    console.warn("Não foi possível tocar o som:", error);
  }
}

// Som de acerto
function playCorrectSound() {
  playTone(700, 0.04, 0.12);
}

// Som de erro
function playWrongSound() {
  playTone(220, 0.035, 0.15);
}

// DISPONIBILIZA AS FUNÇÕES
window.playChallengeAnimation = playChallengeAnimation;
window.resetChallengeAnimation = resetChallengeAnimation;
