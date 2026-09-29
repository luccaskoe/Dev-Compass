// INFORMAÇÕES DAS ÁREAS
const resultInfo = {
  frontend: {
    name: "Front-End",
    description:
      "Você demonstra interesse em criar experiências visuais e interfaces que conectam pessoas e tecnologia.",
  },

  backend: {
    name: "Back-End",
    description:
      "Seu perfil demonstra interesse em lógica, sistemas e no funcionamento por trás das aplicações.",
  },

  engenharia: {
    name: "Engenharia de Software",
    description:
      "Você demonstra interesse em estruturar sistemas, resolver problemas e pensar em soluções que possam crescer.",
  },

  ia: {
    name: "Inteligência Artificial",
    description:
      "Seu perfil demonstra curiosidade por automação, inteligência artificial e novas formas de resolver problemas.",
  },

  seguranca: {
    name: "Segurança da Informação",
    description:
      "Você demonstra curiosidade por investigação, proteção e identificação de comportamentos inesperados.",
  },

  descoberta: {
    name: "Exploração",
    description:
      "Você ainda está descobrindo seu caminho — e isso também faz parte da jornada.",
  },
};

// MENSAGENS DOS RESULTADOS
const resultMessages = {
  frontend: {
    title: "Seu caminho começa pela experiência.",

    message:
      "Você demonstra uma forte afinidade com Front-End. Criar interfaces, pensar na experiência das pessoas e transformar ideias em algo que pode ser visto e utilizado parecem despertar sua curiosidade.",

    challenge:
      "Mas não pare apenas nesse resultado. O desafio pode revelar habilidades que você ainda nem percebeu que possui.",
  },

  backend: {
    title: "Você gosta de descobrir o que existe por trás.",

    message:
      "Seu perfil mostra uma forte afinidade com Back-End. Lógica, sistemas e resolução de problemas parecem combinar bastante com a forma como você pensa.",

    challenge:
      "E talvez exista ainda mais aí. Algumas habilidades de Engenharia de Software podem aparecer conforme você começa a construir sistemas maiores.",
  },

  engenharia: {
    title: "Você pensa além do código.",

    message:
      "Seu resultado mostra uma forte afinidade com Engenharia de Software. Você parece se interessar não apenas por fazer algo funcionar, mas por entender como organizar, estruturar e fazer um sistema funcionar bem.",

    challenge:
      "Talvez você descubra que gosta justamente dos problemas que aparecem quando um sistema começa a crescer.",
  },

  ia: {
    title: "Sua curiosidade aponta para novas possibilidades.",

    message:
      "Você demonstra uma forte curiosidade por Inteligência Artificial, automação e pela possibilidade de usar tecnologia para encontrar novas formas de resolver problemas.",

    challenge:
      "Mas lembre-se: IA também precisa de lógica, programação e sistemas. Seu resultado pode ser apenas o começo da descoberta.",
  },

  seguranca: {
    title: "Você tem olhos para o que os outros não percebem.",

    message:
      "Seu perfil demonstra uma forte afinidade com Segurança da Informação. Investigar comportamentos inesperados, encontrar falhas e pensar em proteção parecem despertar sua curiosidade.",

    challenge:
      "E talvez o que você descobrir durante o desafio seja ainda mais interessante do que esse primeiro resultado.",
  },

  descoberta: {
    title: "Sua jornada ainda está sendo descoberta.",

    message:
      "Tudo bem ainda não saber exatamente qual caminho seguir. Suas respostas mostram que você está explorando possibilidades — e isso também faz parte de começar na tecnologia.",

    challenge:
      "Não descarte nenhuma possibilidade ainda. Talvez você descubra uma afinidade com Back-End, Engenharia de Software, Segurança, IA ou Front-End. O desafio existe justamente para você experimentar e descobrir.",
  },
};

const resultScreen = document.querySelector("#result-screen");
const mainPercentage = document.querySelector("#main-percentage");
const mainArea = document.querySelector("#main-area");

// RANKING
function generateRanking() {
  const ranking = Object.entries(scores);
  ranking.sort((a, b) => b[1] - a[1]); // Ordena o ranking por pontos decrescente

  return ranking;
}

// PORCENTAGENS
function calculatePercentages(ranking) {
  const totalPoints = ranking.reduce((total, [, points]) => total + points, 0);

  return ranking.map(([area, points]) => {
    const percentage =
      totalPoints > 0 ? Math.round((points / totalPoints) * 100) : 0;

    return {
      area,
      points,
      percentage,
    };
  });
}

// FULL-STACK
function isFullStack() {
  const frontendScore = scores.frontend;
  const backendScore = scores.backend;

  const difference = Math.abs(frontendScore - backendScore);

  const fullStack = frontendScore >= 8 && backendScore >= 8 && difference <= 3; // Verifica se o usuário tem uma forte afinidade com Front-End e Back-End e se a diferença entre os pontos é menor que igual a 3

  return fullStack;
}

// PERFIL PRINCIPAL
function getMainResult(ranking) {
  if (isFullStack()) {
    // Verifica se o usuário é uma pessoa Full-Stack
    return {
      area: "fullstack",
      name: "Full-Stack",
      title: "Você encontrou um equilíbrio entre os dois mundos.",
      message:
        "Suas respostas mostram uma forte afinidade tanto com Front-End quanto com Back-End. Você parece ter curiosidade tanto pela experiência que as pessoas enxergam quanto pela lógica que faz tudo funcionar por trás.",
      challenge:
        "Isso pode ser um ótimo ponto de partida para explorar o caminho Full-Stack e descobrir onde sua curiosidade realmente cresce.",
    };
  }

  const mainArea = ranking[0][0];

  return {
    area: mainArea,
    name: resultInfo[mainArea].name,
    title: resultMessages[mainArea].title,
    message: resultMessages[mainArea].message,
    challenge: resultMessages[mainArea].challenge,
  };
}

// ANIMAÇÃO DAS BARRAS
function animateBars() {
  const bars = document.querySelectorAll(".result-bar span");

  bars.forEach((bar, index) => {
    const percentage = bar.dataset.percentage;

    setTimeout(() => {
      // Cria um pequeno atraso entre a animação de cada barra
      bar.style.width = `${percentage}%`;
    }, index * 120);
  });
}

function renderRanking(percentages) {
  // Renderiza o ranking na página
  const rankingContainer = document.querySelector("#result-ranking");

  rankingContainer.innerHTML = ""; // Limpa o conteúdo anterior do ranking
  percentages.forEach((item, index) => {
    const info = resultInfo[item.area];
    const rankingItem = document.createElement("div");

    rankingItem.classList.add("ranking-item");
    rankingItem.dataset.area = item.area;
    rankingItem.style.setProperty("--delay", `${index * 100}ms`);

    rankingItem.innerHTML = `
      <div class="ranking-header">
        <span>${info.name}</span>
        <strong>${item.percentage}%</strong>
      </div>
      <div class="result-bar">
        <span
            data-percentage="${item.percentage}"
            style="
                width: 0%;
                --bar-color: var(--color-${item.area});
            "
        ></span>
    </div>
    `; // Cria o HTML para cada item do ranking

    rankingContainer.appendChild(rankingItem);
  });
}

function animateCompass(mainResult) {
  const pointers = document.querySelectorAll(".compass-pointer");

  // Primeiro deixa todas as setas escondidas
  pointers.forEach((pointer) => {
    pointer.style.height = "0";
    pointer.style.opacity = "0";
  });

  // Procura somente a seta correspondente ao resultado principal
  const mainPointer = document.querySelector(
    `.compass-pointer[data-area="${mainResult.area}"]`
  );

  if (!mainPointer) return;

  // Pequeno atraso para sincronizar com a entrada da bússola
  setTimeout(() => {
    mainPointer.style.height = "43%";
    mainPointer.style.opacity = "1";
  }, 900);
}

function updateCompass(mainResult, percentages) {
  if (mainResult.area === "fullstack") {
    const fullStackPercentage = calculateFullStackPercentage();

    mainPercentage.textContent = `${fullStackPercentage}%`;

    mainArea.textContent = "FULL-STACK";

    return;
  }

  const mainItem = percentages.find((item) => item.area === mainResult.area);

  if (!mainItem) return;

  mainPercentage.textContent = `${mainItem.percentage}%`;

  mainArea.textContent = mainResult.name.toUpperCase();
}

function calculateFullStackPercentage() {
  const frontend = scores.frontend || 0;
  const backend = scores.backend || 0;

  const totalPoints = Object.values(scores).reduce(
    (total, points) => total + points,
    0,
  );

  if (totalPoints === 0) return 0;

  return Math.round(((frontend + backend) / totalPoints) * 100);
}

function generateResult() {
  const ranking = generateRanking();
  const percentages = calculatePercentages(ranking);
  const mainResult = getMainResult(ranking);

  // RESULTADO PRINCIPAL
  document.querySelector("#result-area").textContent = mainResult.name;
  document.querySelector("#result-title").textContent = mainResult.title;
  document.querySelector("#result-message").textContent = mainResult.message;

  document.querySelector("#result-challenge").textContent =
    mainResult.challenge;

  // RANKING
  renderRanking(percentages);

  // BÚSSOLA
  updateCompass(mainResult, percentages);

  // MOSTRA A TELA
  showResultScreen();

  // ANIMAÇÃO
  requestAnimationFrame(() => {
    animateBars();
    animateCompass(mainResult);
  });

  return {
    ranking,
    percentages,
    mainResult,
  };
}

function showResultScreen() {
  resultScreen.style.display = "block";

  resultScreen.classList.remove("result-visible");

  requestAnimationFrame(() => {
    resultScreen.classList.add("result-visible");

    resultScreen.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

currentQuestion++;

if (currentQuestion < questions.length) {
  atualizarContador();
  changeQuestion();
}
