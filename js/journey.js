const cardOptions = document.querySelector("#journey-options");
const cards = cardOptions.querySelectorAll(".card-journey");

const startJourney = document.querySelector("#start-quiz");
const journeyQuiz = document.querySelector("#journey-start");

const questionTitle = document.querySelector("#question");
const contador = document.querySelector("#counter");
const countingLine = document.querySelector(".counting-line");

let currentQuestion = 0; // Em qual posição do array estamos

const questions = [
  {
    question: "O que mais desperta sua curiosidade?",
    options: [
      {
        text: "Criar interfaces e experiências",
        icon: "ri-palette-fill",
        scores: {
          frontend: 1,
        },
      },
      {
        text: "Resolver problemas e construir sistemas",
        icon: "ri-settings-5-line",
        scores: {
          backend: 1,
        },
      },
      {
        text: "Planejar a estrutura de um sistema antes de construí-lo",
        icon: "ri-terminal-box-line",
        scores: {
          engenharia: 1,
        },
      },
      {
        text: "Investigar e proteger sistemas",
        icon: "ri-fingerprint-line",
        scores: {
          seguranca: 1,
        },
      },
      {
        text: "Criar soluções usando inteligência artificial e machine learning",
        icon: "ri-robot-2-fill",
        scores: {
          ia: 1,
        },
      },
      {
        text: "Ainda não sei, me ajude a descobrir",
        icon: "ri-search-line",
        scores: {
          descoberta: 1,
        },
      },
    ],
  },

  {
    question:
      "Você recebe um problema que nunca viu antes. O que mais te anima?",
    options: [
      {
        text: "Entender a lógica por trás de como ele funciona",
        icon: "ri-settings-5-line",
        scores: {
          backend: 2,
        },
      },
      {
        text: "Descobrir como esse problema afeta as pessoas",
        icon: "ri-palette-fill",
        scores: {
          frontend: 2,
        },
      },
      {
        text: "Entender como diferentes partes de um sistema se conectam",
        icon: "ri-terminal-box-line",
        scores: {
          engenharia: 2,
        },
      },
      {
        text: "Quebrar o problema em partes e automatizar",
        icon: "ri-robot-2-fill",
        scores: {
          ia: 2,
        },
      },
      {
        text: "Encontrar uma brecha ou falha no sistema",
        icon: "ri-fingerprint-line",
        scores: {
          seguranca: 2,
        },
      },
      {
        text: "Explorar possibilidades até descobrir o que realmente gosto",
        icon: "ri-search-line",
        scores: {
          descoberta: 2,
        },
      },
    ],
  },
  {
    question:
      "Qual dessas atividades você conseguiria passar horas tentando melhorar?",
    options: [
      {
        text: "Criar uma interface bonita e fácil de usar",
        icon: "ri-palette-fill",
        scores: {
          frontend: 3,
        },
      },
      {
        text: "Fazer uma aplicação funcionar melhor por trás",
        icon: "ri-settings-5-line",
        scores: {
          backend: 3,
        },
      },
      {
        text: "Pensar em como organizar um sistema para que ele continue funcionando bem conforme cresce",
        icon: "ri-terminal-box-line",
        scores: {
          engenharia: 3,
        },
      },
      {
        text: "Encontrar uma forma inteligente de automatizar tarefas e processos",
        icon: "ri-robot-2-fill",
        scores: {
          ia: 3,
        },
      },
      {
        text: "Entender como um sistema pode ser protegido",
        icon: "ri-fingerprint-line",
        scores: {
          seguranca: 3,
        },
      },
      {
        text: "Experimentar tecnologias diferentes para descobrir o que combina comigo",
        icon: "ri-search-line",
        scores: {
          descoberta: 3,
        },
      },
    ],
  },
  {
    question: "Quando algo não funciona, qual é sua primeira reação?",
    options: [
      {
        text: "Vou testar diferentes soluções até entender qual funciona melhor",
        icon: "ri-code-box-fill",
        scores: {
          engenharia: 2,
          backend: 1,
        },
      },
      {
        text: "Quero entender exatamente por que isso aconteceu",
        icon: "ri-git-branch-line",
        scores: {
          frontend: 2,
          backend: 1,
          engenharia: 1,
        },
      },
      {
        text: "Vou conduzir a análise de causa raiz para identificar a origem da falha",
        icon: "ri-bug-line",
        scores: {
          seguranca: 1,
          engenharia: 2,
        },
      },
      {
        text: "Gosto de experimentar formas de fazer uma máquina gerar ou interpretar informações",
        icon: "ri-robot-2-fill",
        scores: {
          ia: 2,
        },
      },
      {
        text: "Busco identificar falhas ocultas ou comportamentos que possam expor o sistema a riscos",
        icon: "ri-fingerprint-line",
        scores: {
          seguranca: 2,
        },
      },
      {
        text: "Procuro ajuda ou uma explicação antes de continuar",
        icon: "ri-search-line",
        scores: {
          descoberta: 2,
        },
      },
    ],
  },
  {
    question:
      "Qual desses assuntos você teria mais vontade de explorar nas próximas semanas?",
    options: [
      {
        text: "Interfaces, experiência do usuário e desenvolvimento Front-end",
        icon: "ri-palette-fill",
        scores: {
          frontend: 3,
        },
      },
      {
        text: "APIs, servidores e desenvolvimento Back-end",
        icon: "ri-settings-5-line",
        scores: {
          backend: 3,
        },
      },
      {
        text: "Modelagem, Armazenamento e Persistência de Dados",
        icon: "ri-database-line",
        scores: {
          engenharia: 3,
          backend: 1,
        },
      },
      {
        text: "Inteligência Artificial e automação",
        icon: "ri-robot-2-fill",
        scores: {
          ia: 3,
        },
      },
      {
        text: "Segurança da informação e proteção de sistemas",
        icon: "ri-fingerprint-line",
        scores: {
          seguranca: 3,
        },
      },
      {
        text: "Explorar diferentes áreas antes de escolher um caminho",
        icon: "ri-search-line",
        scores: {
          descoberta: 3,
        },
      },
    ],
  },
  {
    question: "O que você sente que faz melhor hoje?",
    options: [
      {
        text: "Criar coisas visualmente e pensar em experiências",
        icon: "ri-palette-fill",
        scores: {
          frontend: 2,
        },
      },
      {
        text: "Resolver problemas usando lógica",
        icon: "ri-settings-5-line",
        scores: {
          backend: 2,
        },
      },
      {
        text: "Estruturar, modelar e extrair padrões de dados em sistemas",
        icon: "ri-terminal-box-line",
        scores: {
          engenharia: 2,
        },
      },
      {
        text: "Adaptabilidade tecnológica focada na rápida implementação de soluções inteligentes",
        icon: "ri-robot-2-fill",
        scores: {
          ia: 2,
        },
      },
      {
        text: "Executar triagem e investigação técnica para identificar a causa-raiz de brechas de segurança",
        icon: "ri-fingerprint-line",
        scores: {
          seguranca: 2,
        },
      },
      {
        text: "Ainda não sei exatamente — estou descobrindo",
        icon: "ri-search-line",
        scores: {
          descoberta: 2,
        },
      },
    ],
  },
  {
    question:
      "Se tivesse que escolher uma coisa para explorar primeiro, qual seria?",
    options: [
      {
        text: "Construir algo que as pessoas possam visualizar e usar",
        icon: "ri-palette-fill",
        scores: {
          frontend: 2,
        },
      },
      {
        text: "Criar sistemas que funcionam por trás das aplicações",
        icon: "ri-settings-5-line",
        scores: {
          backend: 2,
        },
      },
      {
        text: "Trabalhar com informações e descobrir o que os dados dizem",
        icon: "ri-terminal-box-line",
        scores: {
          engenharia: 2,
        },
      },
      {
        text: "Criar soluções inteligentes e automatizar tarefas",
        icon: "ri-robot-2-fill",
        scores: {
          ia: 2,
        },
      },
      {
        text: "Entender como proteger sistemas e encontrar vulnerabilidades",
        icon: "ri-fingerprint-line",
        scores: {
          seguranca: 2,
        },
      },
      {
        text: "Explorar diferentes áreas antes de escolher um caminho",
        icon: "ri-search-line",
        scores: {
          descoberta: 2,
        },
      },
    ],
  },
  {
    question:
      "Se você pudesse sair daqui com apenas uma resposta, qual gostaria de descobrir?",
    options: [
      {
        text: "Quero descobrir qual área combina comigo",
        icon: "ri-search-line",
        scores: {
          descoberta: 3,
        },
      },
      {
        text: "Quero entender se Front-end faz sentido para mim",
        icon: "ri-palette-fill",
        scores: {
          frontend: 3,
        },
      },
      {
        text: "Quero entender se Back-end faz sentido para mim",
        icon: "ri-settings-5-line",
        scores: {
          backend: 3,
        },
      },
      {
        text: "Quero descobrir se Engenharia de Software combina comigo",
        icon: "ri-terminal-box-line",
        scores: {
          engenharia: 3,
        },
      },
      {
        text: "Quero descobrir se IA pode ser meu caminho",
        icon: "ri-robot-2-fill",
        scores: {
          ia: 3,
        },
      },
      {
        text: "Quero entender se Segurança da Informação combina comigo",
        icon: "ri-fingerprint-line",
        scores: {
          seguranca: 3,
        },
      },
    ],
  },
];


const scores = {
  frontend: 0,
  backend: 0,
  engenharia: 0,
  ia: 0,
  seguranca: 0,
  descoberta: 0,
}; // Tabela de pontuação

// NAVEGAÇÃO BTN HOME PARA QUIZ
startJourney.addEventListener("click", () => {
  // Esconde qualquer tela que esteja ativa
  document.querySelectorAll(".screen.active").forEach((screen) => {
    screen.classList.remove("active");
  });

  // Reinicia o quiz
  currentQuestion = 0;

  Object.keys(scores).forEach((area) => {
    scores[area] = 0;
  });

  // Atualiza a primeira pergunta
  atualizarContador();
  renderQuestion();

  // Abre a tela do quiz
  journeyQuiz.classList.add("active");

  // Desce a página até o início do quiz
  requestAnimationFrame(() => {
    journeyQuiz.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  console.log("Quiz iniciado pelo botão Home.");
});

// cards.forEach -> Para cada card existente, faça alguma coisa
let changingQuestion = false;

cards.forEach((card) => {
  card.addEventListener("click", () => {
    // Impede clique duplo durante a animação
    if (changingQuestion) return;

    // Segurança contra índice inválido
    if (currentQuestion >= questions.length) return;

    const optionIndex = Number(card.dataset.option);

    const selectedOption = questions[currentQuestion].options[optionIndex];

    if (!selectedOption) return;

    // SOMA OS PONTOS
    Object.entries(selectedOption.scores).forEach(([area, pontos]) => {
      scores[area] += pontos;
    });

    // AVANÇA A PERGUNTA
    currentQuestion++;

    // ATUALIZA CONTADOR
    atualizarContador();

    // FINALIZOU O QUIZ
    if (currentQuestion >= questions.length) {
      console.log("QUIZ FINALIZADO!");

      const result = generateResult();
      console.log(result);

      return;
    }

    // TROCA COM ANIMAÇÃO
    changeQuestion();
  });
});

function atualizarContador() {
  // Atualize o contador de pergunta
  const numeroAtual = currentQuestion + 0; // Índice da pergunta atual + 1 = número da pergunta atual

  contador.textContent =
    // Atualize o contador de pergunta
    `${String(numeroAtual).padStart(2, "0")} / ${String(questions.length).padStart(2, "0")}`;

  // Progresso baseado nas respostas
  const progresso = (currentQuestion / questions.length) * 100;
  countingLine.style.setProperty("--progress", `${progresso}%`);
}

function renderQuestion() {
  const question = questions[currentQuestion]; // Pegue a pergunta atual

  if (!question) {
    return;
  }

  questionTitle.textContent = question.question; // Atualize o título da pergunta

  cards.forEach((card, index) => {
    const option = question.options[index];
    const button = card.querySelector("button");

    if (option) {
      // Mostra o card
      card.style.display = "";

      // Mantém somente a classe principal
      card.className = "card-journey";

      // Atualiza o índice
      card.dataset.option = index;

      // Cria ícone + texto
      button.innerHTML = `
        <i class="${option.icon}"></i>
        <span>${option.text}</span>
      `;
    } else {
      card.style.display = "none";
    }
  });
}

// TROCA DE PERGUNTA
function changeQuestion() {
  changingQuestion = true;

  // Fade out
  cardOptions.classList.add("question-changing");
  questionTitle.classList.add("question-changing");

  setTimeout(() => {
    // Troca o conteúdo
    renderQuestion();

    // Fade in
    cardOptions.classList.remove("question-changing");
    questionTitle.classList.remove("question-changing");

    changingQuestion = false;
  }, 250);
}

// INICIALIZAÇÃO
atualizarContador();
renderQuestion();
