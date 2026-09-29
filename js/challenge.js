// ELEMENTOS DAS TELAS
const challengeResultScreen = document.querySelector("#result-screen");
const challengeLobby = document.querySelector("#challenge-lobby");
const challengeGame = document.querySelector("#challenge-game");
const challengeSuccess = document.querySelector("#challenge-success");
const challengeGameover = document.querySelector("#challenge-gameover");
const challengeFinal = document.querySelector("#challenge-final");

// BOTÕES
const startChallenges = document.querySelector("#start-challenges");
const startChallengesHome = document.querySelector("#start-challenges-home");
const backToResult = document.querySelector("#back-to-result");
const gameBackToLobby = document.querySelector("#game-back-to-lobby");

const retryChallenge = document.querySelector("#retry-challenge");
const gameoverLobby = document.querySelector("#gameover-lobby");
const nextChallenge = document.querySelector("#next-challenge");
const finalLobby = document.querySelector("#final-lobby");
const finalNewChallenge = document.querySelector("#final-new-challenge");
const challengeCards = document.querySelectorAll(".challenge-card");

// ELEMENTOS DO DESAFIO
const challengeTotalScore = document.querySelector("#challenge-total-score");
const challengeGameNumber = document.querySelector("#challenge-game-number");
const challengeTitle = document.querySelector("#challenge-title");
const challengeDescription = document.querySelector("#challenge-description");
const challengeOptions = document.querySelector("#challenge-options");
const challengeAttempts = document.querySelectorAll(".challenge-attempt");

// ESTADO DO JOGO
let selectedCategory = null;
let currentChallenge = 0;
let attempts = 3;

// GUARDA A ÚLTIMA POSIÇÃO DA RESPOSTA CORRETA
const lastCorrectPositions = {};

// PONTUAÇÃO DOS DESAFIOS
const challengeScores = {
  frontend: 0,
  backend: 0,
  fullstack: 0,
  engenharia: 0,
  ia: 0,
  seguranca: 0,
};

// PONTUAÇÃO TOTAL
let totalChallengeScore = 0;

// TOTAL DE DESAFIOS RESPONDIDOS
let totalChallengesPlayed = 0;

// TOTAL DE ACERTOS
let totalChallengeHits = 0;

// NOMES DAS ÁREAS
const categoryNames = {
  frontend: "FRONT-END",
  backend: "BACK-END",
  engenharia: "ENGENHARIA",
  ia: "IA",
  seguranca: "SEGURANÇA",
  fullstack: "FULL-STACK",
};

// MOSTRAR UMA TELA
function showScreen(screen) {
  // Telas dos desafios
  const challengeScreens = [
    challengeLobby,
    challengeGame,
    challengeSuccess,
    challengeGameover,
    challengeFinal,
  ];

  // Esconde as telas dos desafios
  challengeScreens.forEach((section) => {
    if (section) {
      section.classList.remove("active");
    }
  });

  // Esconde também a tela de resultado do quiz
  if (challengeResultScreen) {
    challengeResultScreen.classList.remove("active");
  }

  // Mostra a tela escolhida
  if (screen) {
    screen.classList.add("active");
  }
}

// ENTRAR NO AMBIENTE DE DESAFIOS
function enterChallengeLobby() {
  showScreen(challengeLobby);
}

// DESAFIOS
const challenges = {
  frontend: [
    {
      title: "Centralize o elemento",
      description:
        "O quadrado precisa ficar exatamente no centro da tela. Qual combinação de CSS resolve esse problema?",
      type: "choice",
      difficulty: "easy",
      points: 1,
      icon: "ri-layout-grid-line",

      options: [
        "display: flex; justify-content: center; align-items: center;",
        "margin: 0 auto;",
        "position: absolute; top: 0;",
        "display: block; margin-left: 0;",
      ],

      correct: 0,
    },

    {
      title: "Encontre o seletor",
      description:
        "Você precisa alterar apenas os elementos que possuem a classe .card. Qual seletor CSS deve ser utilizado?",
      type: "choice",
      difficulty: "easy",
      points: 1,
      icon: "ri-code-box-line",

      options: [".card", "#card", "card", "*card"],

      correct: 0,
    },

    {
      title: "Organize os elementos",
      description:
        "Três elementos precisam ficar lado a lado dentro de um container. Qual propriedade é a escolha mais adequada?",
      type: "choice",
      difficulty: "medium",
      points: 2,
      icon: "ri-layout-column-line",

      options: [
        "display: flex;",
        "display: block;",
        "position: fixed;",
        "visibility: hidden;",
      ],

      correct: 0,
    },

    {
      title: "Faça o layout respirar",
      description:
        "Um card possui conteúdo encostando nas bordas internas. Qual propriedade cria espaço entre o conteúdo e a borda do próprio card?",
      type: "choice",
      difficulty: "medium",
      points: 2,
      icon: "ri-space",

      options: ["padding", "margin", "gap", "border"],

      correct: 0,
    },

    {
      title: "O desafio do responsivo",
      description:
        "Um layout possui duas colunas no desktop. Em telas pequenas, você quer que elas fiquem uma abaixo da outra. Qual solução faz mais sentido?",
      type: "choice",
      difficulty: "hard",
      points: 3,
      icon: "ri-smartphone-line",

      options: [
        "Usar media query e alterar o grid para uma coluna.",
        "Aumentar o tamanho das colunas.",
        "Usar position: absolute em todos os elementos.",
        "Desativar o conteúdo em telas pequenas.",
      ],

      correct: 0,
    },
  ],

  backend: [
    {
      title: "Retorne o usuário",
      description:
        "Você possui um objeto chamado user. Qual opção retorna corretamente o nome do usuário?",
      type: "choice",
      difficulty: "easy",
      points: 1,
      icon: "ri-server-line",

      options: [
        "return user.name;",
        "console.log(user.name);",
        "return = user.name;",
        "user.name();",
      ],

      correct: 0,
    },

    {
      title: "Encontre o método",
      description:
        "Você precisa buscar dados de uma API sem enviar informações para criar ou alterar um recurso. Qual método HTTP normalmente seria utilizado?",
      type: "choice",
      difficulty: "easy",
      points: 1,
      icon: "ri-global-line",

      options: ["GET", "POST", "DELETE", "PATCH"],

      correct: 0,
    },

    {
      title: "Encontre o erro",
      description:
        "Observe o código: const idade = 20; idade = 21; O que acontece quando a segunda linha é executada?",
      type: "choice",
      difficulty: "medium",
      points: 2,
      icon: "ri-bug-line",

      options: [
        "O JavaScript gera um erro porque uma const não pode receber outro valor.",
        "A idade passa automaticamente para 21.",
        "A variável é transformada em let.",
        "Nada acontece.",
      ],

      correct: 0,
    },

    {
      title: "Pense como uma API",
      description:
        "Uma API recebeu corretamente uma requisição e criou um novo usuário. Qual código HTTP representa melhor essa situação?",
      type: "choice",
      difficulty: "medium",
      points: 2,
      icon: "ri-terminal-box-line",

      options: ["201", "404", "500", "301"],

      correct: 0,
    },

    {
      title: "O fluxo por trás da aplicação",
      description:
        "Uma aplicação precisa receber uma requisição, processar uma regra de negócio e consultar dados. Qual fluxo representa melhor esse processo?",
      type: "choice",
      difficulty: "hard",
      points: 3,
      icon: "ri-flow-chart",

      options: [
        "Requisição → Backend → Regra de negócio → Banco de dados",
        "Banco de dados → CSS → HTML → Usuário",
        "Frontend → Banco de dados diretamente → CSS",
        "HTML → Banco → HTML → Servidor",
      ],

      correct: 0,
    },
  ],

  engenharia: [
    {
      title: "Divida para conquistar",
      description:
        "Uma função está fazendo cinco tarefas diferentes. Qual decisão tende a deixar o código mais organizado?",
      type: "choice",
      difficulty: "easy",
      points: 1,
      icon: "ri-node-tree",

      options: [
        "Separar responsabilidades em funções menores.",
        "Colocar ainda mais código na mesma função.",
        "Duplicar a função várias vezes.",
        "Ignorar a organização.",
      ],

      correct: 0,
    },

    {
      title: "Pense em manutenção",
      description:
        "Um sistema possui o mesmo código repetido em vários lugares. Qual problema pode aparecer?",
      type: "choice",
      difficulty: "easy",
      points: 1,
      icon: "ri-tools-line",

      options: [
        "Alterações ficam mais difíceis de manter.",
        "O sistema automaticamente fica mais seguro.",
        "O código fica sempre mais rápido.",
        "O banco de dados é apagado.",
      ],

      correct: 0,
    },

    {
      title: "Monte a arquitetura",
      description:
        "Você precisa organizar uma aplicação separando interface, regras de negócio e acesso aos dados. Qual ideia representa melhor essa organização?",
      type: "choice",
      difficulty: "medium",
      points: 2,
      icon: "ri-building-4-line",

      options: [
        "Separar responsabilidades em camadas.",
        "Colocar tudo em um único arquivo.",
        "Duplicar toda a aplicação.",
        "Misturar banco de dados com interface.",
      ],

      correct: 0,
    },

    {
      title: "O sistema está crescendo",
      description:
        "Uma aplicação começou pequena, mas agora possui milhares de usuários. Qual preocupação passa a ser cada vez mais importante?",
      type: "choice",
      difficulty: "medium",
      points: 2,
      icon: "ri-stack-line",

      options: [
        "Pensar em escalabilidade e organização da arquitetura.",
        "Adicionar todo código em uma única função.",
        "Remover todas as validações.",
        "Evitar qualquer tipo de estrutura.",
      ],

      correct: 0,
    },

    {
      title: "O problema invisível",
      description:
        "Uma alteração aparentemente pequena quebra três partes diferentes do sistema. O que isso pode indicar?",
      type: "choice",
      difficulty: "hard",
      points: 3,
      icon: "ri-git-branch-line",

      options: [
        "Existem dependências ou responsabilidades muito acopladas.",
        "O computador está necessariamente com defeito.",
        "CSS sempre causa esse problema.",
        "O banco de dados precisa ser apagado.",
      ],

      correct: 0,
    },
  ],

  ia: [
    {
      title: "Encontre o padrão",
      description:
        "Observe: 2 → 4, 4 → 8, 6 → 12. Qual seria o próximo resultado para 8?",
      type: "choice",
      difficulty: "easy",
      points: 1,
      icon: "ri-robot-2-line",

      options: ["16", "12", "14", "18"],

      correct: 0,
    },

    {
      title: "Classifique o problema",
      description:
        "Você possui milhares de imagens e quer ensinar um sistema a diferenciar gatos de cachorros. O que você está tentando fazer?",
      type: "choice",
      difficulty: "easy",
      points: 1,
      icon: "ri-brain-line",

      options: [
        "Treinar um modelo para reconhecer padrões.",
        "Criar apenas uma animação CSS.",
        "Alterar o sistema operacional.",
        "Criar uma conexão física com o computador.",
      ],

      correct: 0,
    },

    {
      title: "Automatize o processo",
      description:
        "Uma empresa recebe milhares de mensagens e quer identificar automaticamente quais são reclamações. Qual ideia combina melhor com IA?",
      type: "choice",
      difficulty: "medium",
      points: 2,
      icon: "ri-cpu-line",

      options: [
        "Usar um modelo para classificar os textos.",
        "Apagar todas as mensagens.",
        "Transformar todos os textos em imagens.",
        "Desligar o servidor.",
      ],

      correct: 0,
    },

    {
      title: "Pense como uma máquina",
      description:
        "Um sistema recebeu os dados: 10, 20, 30, 40. Qual número seria o próximo se o padrão continuar?",
      type: "choice",
      difficulty: "medium",
      points: 2,
      icon: "ri-function-line",

      options: ["50", "45", "60", "80"],

      correct: 0,
    },

    {
      title: "Escolha a melhor estratégia",
      description:
        "Você precisa criar um sistema que aprenda com exemplos anteriores para prever uma categoria. Qual abordagem faz mais sentido?",
      type: "choice",
      difficulty: "hard",
      points: 3,
      icon: "ri-sparkling-2-line",

      options: [
        "Treinar um modelo usando dados representativos.",
        "Escolher respostas aleatoriamente.",
        "Ignorar completamente os dados.",
        "Criar uma resposta diferente a cada segundo.",
      ],

      correct: 0,
    },
  ],

  seguranca: [
    {
      title: "Detecte o comportamento suspeito",
      description:
        "Um usuário realizou 17 tentativas de login em apenas 3 segundos. Qual comportamento parece mais adequado?",
      type: "choice",
      difficulty: "easy",
      points: 1,
      icon: "ri-shield-check-line",

      options: [
        "Bloquear temporariamente e investigar.",
        "Ignorar o comportamento.",
        "Liberar o acesso automaticamente.",
        "Apagar o sistema.",
      ],

      correct: 0,
    },

    {
      title: "Proteja a senha",
      description:
        "Uma aplicação precisa armazenar senhas de usuários. Qual abordagem é mais adequada?",
      type: "choice",
      difficulty: "easy",
      points: 1,
      icon: "ri-lock-password-line",

      options: [
        "Armazenar usando um algoritmo de hash apropriado.",
        "Salvar as senhas em texto puro.",
        "Enviar as senhas para o HTML.",
        "Colocar todas as senhas em um arquivo público.",
      ],

      correct: 0,
    },

    {
      title: "Encontre a brecha",
      description:
        "Um formulário recebe diretamente dados enviados pelo usuário e os coloca em uma consulta ao banco sem tratamento. Qual risco pode existir?",
      type: "choice",
      difficulty: "medium",
      points: 2,
      icon: "ri-spy-line",

      options: [
        "Injeção de comandos na consulta.",
        "Aumento automático da resolução da tela.",
        "Melhoria automática da velocidade.",
        "Redução do tamanho do banco.",
      ],

      correct: 0,
    },

    {
      title: "Pense como um atacante",
      description:
        "Uma conta permite infinitas tentativas de senha sem qualquer limitação. Qual medida ajudaria a reduzir ataques automatizados?",
      type: "choice",
      difficulty: "medium",
      points: 2,
      icon: "ri-alarm-warning-line",

      options: [
        "Limitar tentativas e aplicar mecanismos de proteção.",
        "Permitir ainda mais tentativas.",
        "Exibir a senha correta na tela.",
        "Remover o login.",
      ],

      correct: 0,
    },

    {
      title: "Defenda o sistema",
      description:
        "Você percebe uma sequência incomum de requisições vindas de uma mesma origem. Qual seria uma atitude adequada antes de simplesmente ignorar o comportamento?",
      type: "choice",
      difficulty: "hard",
      points: 3,
      icon: "ri-radar-line",

      options: [
        "Analisar os logs, investigar o padrão e aplicar medidas de proteção.",
        "Apagar todos os logs.",
        "Liberar todas as requisições.",
        "Desligar permanentemente o sistema.",
      ],

      correct: 0,
    },
  ],

  fullstack: [
    {
      title: "Monte o fluxo",
      description:
        "Qual sequência representa melhor uma aplicação web tradicional?",
      type: "choice",
      difficulty: "easy",
      points: 1,
      icon: "ri-stack-line",

      options: [
        "Frontend → API → Backend → Banco de dados",
        "Banco de dados → CSS → HTML → API",
        "Backend → CSS → Banco → HTML",
        "API → HTML → Banco → CSS",
      ],

      correct: 0,
    },

    {
      title: "Quem faz o quê?",
      description:
        "Qual parte normalmente é responsável por apresentar a interface que o usuário interage diretamente?",
      type: "choice",
      difficulty: "easy",
      points: 1,
      icon: "ri-window-line",

      options: ["Frontend", "Banco de dados", "Servidor", "API"],

      correct: 0,
    },

    {
      title: "Conectando os mundos",
      description:
        "O Front-End precisa solicitar dados de usuários armazenados no servidor. Qual elemento normalmente faz essa comunicação?",
      type: "choice",
      difficulty: "medium",
      points: 2,
      icon: "ri-links-line",

      options: ["API", "CSS", "HTML", "Imagem"],

      correct: 0,
    },

    {
      title: "Resolva o fluxo",
      description:
        "O usuário clica em 'Entrar'. Qual sequência representa melhor o caminho da informação?",
      type: "choice",
      difficulty: "medium",
      points: 2,
      icon: "ri-route-line",

      options: [
        "Frontend → API → Backend → Banco → Backend → Frontend",
        "Banco → CSS → HTML → Usuário",
        "Frontend → CSS → Banco diretamente",
        "HTML → Imagem → Banco → CSS",
      ],

      correct: 0,
    },

    {
      title: "O desafio Full-Stack",
      description:
        "Uma aplicação precisa autenticar usuários, salvar seus dados e apresentar o resultado na interface. Qual conjunto representa melhor as partes envolvidas?",
      type: "choice",
      difficulty: "hard",
      points: 3,
      icon: "ri-code-s-slash-line",

      options: [
        "Frontend + API/Backend + Banco de dados",
        "Somente CSS",
        "Somente HTML",
        "Somente banco de dados",
      ],

      correct: 0,
    },
  ],
};

startChallengesHome.addEventListener("click", () => {
  showScreen(challengeLobby);
});

// ESCOLHER UMA ÁREA
challengeCards.forEach((card) => {
  card.addEventListener("click", () => {
    selectedCategory = card.dataset.challenge;

    currentChallenge = 0;

    attempts = 3;

    console.log("Área escolhida:", selectedCategory);

    startChallenge();
  });
});

// INICIAR DESAFIO
function startChallenge() {
  showScreen(challengeGame);

  attempts = 3;

  updateAttempts();
  renderChallenge();
}

// ATUALIZAR PLACAR
function updateScore() {
  if (!challengeTotalScore) {
    return;
  }

  challengeTotalScore.textContent = totalChallengeScore;
}

// RENDERIZAR DESAFIO
function renderChallenge() {
  const categoryChallenges = challenges[selectedCategory];

  const challenge = categoryChallenges[currentChallenge];

  if (!challenge) {
    console.error(
      "Desafio não encontrado:",
      selectedCategory,
      currentChallenge,
    );

    return;
  }

  window.currentChallengeData = challenge;

  // LIMPA A ANIMAÇÃO DA PERGUNTA ANTERIOR
  if (window.resetChallengeAnimation) {
    window.resetChallengeAnimation();
  }

  challengeGameNumber.textContent = `${categoryNames[selectedCategory]} · DESAFIO ${String(
    currentChallenge + 1,
  ).padStart(2, "0")}`;

  challengeTitle.textContent = challenge.title;
  challengeDescription.textContent = challenge.description;
  challengeOptions.innerHTML = "";

  if (challenge.type === "choice") {
    renderChoiceChallenge(challenge);
  }

  console.log("Desafio carregado:", currentChallenge + 1);
}

// RENDERIZAR ALTERNATIVAS
function renderChoiceChallenge(challenge) {
  // Cria uma lista com os índices originais das opções
  const optionIndexes = challenge.options.map((_, index) => index);

  // Identifica unicamente essa pergunta
  const challengeKey = `${selectedCategory}-${currentChallenge}`;

  // Guarda a posição anterior da resposta correta
  const lastPosition = lastCorrectPositions[challengeKey];

  // Embaralha até a resposta correta ficar
  // em uma posição diferente da anterior
  do {
    shuffleArray(optionIndexes);
  } while (
    lastPosition !== undefined &&
    optionIndexes.indexOf(challenge.correct) === lastPosition
  );

  // Descobre a nova posição da resposta correta
  const correctPosition = optionIndexes.indexOf(challenge.correct);

  // Salva a posição para a próxima vez
  lastCorrectPositions[challengeKey] = correctPosition;

  // Cria os botões na ordem embaralhada
  optionIndexes.forEach((originalIndex) => {
    const button = document.createElement("button");

    button.type = "button";
    button.classList.add("challenge-option");

    button.textContent = challenge.options[originalIndex];

    button.addEventListener("click", () => {
      checkAnswer(originalIndex);
    });

    challengeOptions.appendChild(button);
  });
}

// EMBARALHAR ARRAY
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
}

// VERIFICAR RESPOSTA
function checkAnswer(selectedIndex) {
  const challenge = challenges[selectedCategory][currentChallenge];

  const isCorrect = selectedIndex === challenge.correct;

  if (isCorrect) {
    handleCorrectAnswer();
  } else {
    handleWrongAnswer();
  }
}

// RESPOSTA CORRETA
async function handleCorrectAnswer() {
  const challenge = challenges[selectedCategory][currentChallenge];

  const points = challenge.points || 1;

  if (window.playChallengeAnimation) {
    await window.playChallengeAnimation(
      "correct",
      selectedCategory,
      currentChallenge,
    );
  }

  // Soma os pontos
  challengeScores[selectedCategory] += points;
  totalChallengeScore += points;
  totalChallengeHits++;
  totalChallengesPlayed++;

  updateScore();

  console.log("Resposta correta!");
  console.log("Pontos ganhos:", points);
  console.log("Pontuação total:", totalChallengeScore);

  // VERIFICA SE É A ÚLTIMA PERGUNTA
  const categoryChallenges = challenges[selectedCategory];

  const isLastChallenge = currentChallenge === categoryChallenges.length - 1;

  if (isLastChallenge) {
    // Terminou as 5 perguntas
    showSuccess();

    return;
  }

  // VAI PARA A PRÓXIMA PERGUNTA
  currentChallenge++;
  attempts = 3;

  updateAttempts();
  renderChallenge();
}

// RESPOSTA ERRADA
async function handleWrongAnswer() {
  console.log("Resposta errada!");

  if (window.playChallengeAnimation) {
    try {
      await window.playChallengeAnimation(
        "wrong",
        selectedCategory,
        currentChallenge,
      );
    } catch (error) {
      console.error("Erro na animação de erro:", error);
    }
  }

  // PERDE UMA TENTATIVA
  attempts--;

  updateAttempts();

  console.log("Tentativas restantes:", attempts);

  // Ainda possui tentativas
  if (attempts > 0) {
    return;
  }

  // Acabaram as tentativas
  showGameOver();
}

// ATUALIZAR TENTATIVAS
function updateAttempts() {
  challengeAttempts.forEach((attempt, index) => {
    if (index < attempts) {
      attempt.classList.remove("used");
    } else {
      attempt.classList.add("used");
    }
  });
}

// VITÓRIA
function showSuccess() {
  const categoryChallenges = challenges[selectedCategory];
  const lastChallenge = categoryChallenges[currentChallenge];

  const points = lastChallenge.points || 1;
  const scoreElement = document.querySelector("#success-score");

  if (scoreElement) {
    scoreElement.textContent = `+${points}`;
  }

  console.log("🏆 VITÓRIA!");
  console.log("Todos os 5 desafios foram concluídos.");
  console.log("Área:", categoryNames[selectedCategory]);
  console.log("Pontuação:", challengeScores[selectedCategory]);

  showScreen(challengeSuccess);
}

// GAME OVER
function showGameOver() {
  console.log("GAME OVER");

  showScreen(challengeGameover);
}

// RESULTADO FINAL
function generateChallengeResult() {
  return Object.entries(challengeScores).sort((a, b) => b[1] - a[1]);
}

function formatCategoryName(category) {
  const names = {
    frontend: "Front-End",
    backend: "Back-End",
    engenharia: "Engenharia de Software",
    ia: "Inteligência Artificial",
    seguranca: "Segurança da Informação",
    fullstack: "Full-Stack",
    descoberta: "Descoberta",
  };

  return names[category] || category;
}

function showFinalResult() {
  const finalScore = document.querySelector("#final-total-score");

  const finalRanking = document.querySelector("#final-ranking");

  const finalMessage = document.querySelector("#final-message");

  if (!finalScore || !finalRanking || !finalMessage) {
    console.error("Elementos da tela final não encontrados.");

    return;
  }

  finalScore.textContent = totalChallengeScore;

  finalRanking.innerHTML = "";

  const ranking = generateChallengeResult();

  ranking.forEach(([area, pontos]) => {
    const item = document.createElement("div");

    item.classList.add("final-ranking-item");

    item.innerHTML = `
        <span>
          ${formatCategoryName(area)}
        </span>
        <strong>
          ${pontos}
        </strong>
      `;

    finalRanking.appendChild(item);
  });

  const strongestArea = ranking[0][0];

  finalMessage.textContent = `Seu desempenho mostra uma forte afinidade com ${formatCategoryName(
    strongestArea,
  )}.`;

  showScreen(challengeFinal);
}

// HOME → FAZER DESAFIO
if (startChallengesHome) {
  startChallengesHome.addEventListener("click", enterChallengeLobby);
}

// RESULTADO DO QUIZ → FAZER DESAFIO
if (startChallenges) {
  startChallenges.addEventListener("click", enterChallengeLobby);
}

// LOBBY → VOLTAR AO RESULTADO
if (backToResult) {
  backToResult.addEventListener("click", () => {
    // Esconde as telas dos desafios
    [
      challengeLobby,
      challengeGame,
      challengeSuccess,
      challengeGameover,
      challengeFinal,
    ].forEach((screen) => {
      if (screen) {
        screen.classList.remove("active");
      }
    });

    // Mostra resultado do quiz
    if (challengeResultScreen) {
      challengeResultScreen.classList.add("active");
    }
  });
}

// JOGO → VOLTAR AO LOBBY
if (gameBackToLobby) {
  gameBackToLobby.addEventListener("click", enterChallengeLobby);
}

// GAME OVER → TENTAR NOVAMENTE
if (retryChallenge) {
  retryChallenge.addEventListener("click", () => {
    attempts = 3;
    startChallenge();
  });
}

// GAME OVER → VOLTAR AO LOBBY
if (gameoverLobby) {
  gameoverLobby.addEventListener("click", enterChallengeLobby);
}

// VITÓRIA → VER RESULTADO
if (nextChallenge) {
  nextChallenge.addEventListener("click", showFinalResult);
}

// RESULTADO FINAL → NOVO DESAFIO
if (finalNewChallenge) {
  finalNewChallenge.addEventListener("click", enterChallengeLobby);
}

// RESULTADO FINAL → LOBBY
if (finalLobby) {
  finalLobby.addEventListener("click", enterChallengeLobby);
}

// INICIALIZAÇÃO
updateScore();
updateAttempts();
