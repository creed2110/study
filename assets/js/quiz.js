// quiz.js

const quizData = {
  math: [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4"
    },
    {
      question: "What is 5 * 3?",
      options: ["8", "15", "10", "20"],
      correctAnswer: "15"
    }
  ],
  english: [
    {
      question: "Choose the correct spelling:",
      options: ["Recieve", "Receive", "Receeve", "Recive"],
      correctAnswer: "Receive"
    },
    {
      question: "Which one is a noun?",
      options: ["Quickly", "Run", "Happiness", "Very"],
      correctAnswer: "Happiness"
    }
  ]
};

let selectedSubject = "";
let currentQuestion = 0;
let score = 0;
let selectedOption = "";

function chooseSubject() {
  const select = document.getElementById("subjectSelect");
  selectedSubject = select.value;

  if (selectedSubject !== "") {
    startQuiz();
  } else {
    document.getElementById("quiz-box").innerHTML = "";
  }
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedOption = "";
  document.getElementById("nextBtn").disabled = true;
  showQuestion();
}

function showQuestion() {
  const questions = quizData[selectedSubject];
  const questionObj = questions[currentQuestion];

  document.getElementById("question").innerText = questionObj.question;

  const optionsContainer = document.getElementById("options");
  optionsContainer.innerHTML = "";
  selectedOption = "";
  document.getElementById("nextBtn").disabled = true;

  questionObj.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => selectOption(btn, option);
    optionsContainer.appendChild(btn);
  });
}

function selectOption(button, option) {
  // Clear all highlights
  document.querySelectorAll("#options button").forEach(btn => {
    btn.style.backgroundColor = "";
  });

  // Highlight selected
  button.style.backgroundColor = "lightblue";
  selectedOption = option;
  document.getElementById("nextBtn").disabled = false;
}

function nextQuestion() {
  const questions = quizData[selectedSubject];
  const correct = questions[currentQuestion].correctAnswer;

  if (selectedOption === correct) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("quiz-box").innerHTML = `
    <div>Your score: ${score}/${quizData[selectedSubject].length}</div>
    <button onclick="startQuiz()">Retry</button>
  `;
}
