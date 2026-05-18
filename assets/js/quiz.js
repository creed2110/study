// =========================
// GLOBAL VARIABLES
// =========================

let quizzes = {};

let selectedQuestions = [];
let userAnswers = [];

let currentQuestion = 0;
let timeLeft = 600; // 10 mins
let timer;


// =========================
// HTML ELEMENTS
// =========================

const subjectSelect = document.getElementById("subjectSelect");
const startBtn = document.getElementById("startBtn");

const quizContainer = document.getElementById("quizContainer");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const submitBtn = document.getElementById("submitBtn");

const result = document.getElementById("result");

const timerDisplay = document.getElementById("timer");

const progressBar = document.getElementById("progressBar");

const recentScores = document.getElementById("recentScores");


// =========================
// FETCH QUESTIONS
// =========================

fetch("questions.json")
  .then(res => {
    console.log("Status:", res.status);
    return res.json();
  })
  .then(data => {
    quizzes = data;
    console.log("Loaded OK:", quizzes);
  })
  .catch(err => {
    console.error("FAILED TO LOAD JSON:", err);
  });

// =========================
// START QUIZ
// =========================

startBtn.addEventListener("click", startQuiz);

function startQuiz() {

  const subject = subjectSelect.value;

  if (!subject) {
    alert("Please select a subject");
    return;
  }

  // RANDOM QUESTIONS
  selectedQuestions = quizzes[subject]
    .sort(() => Math.random() - 0.5)
    .slice(0, 20);

  // RESET VALUES
  currentQuestion = 0;

  userAnswers = new Array(selectedQuestions.length).fill(null);

  timeLeft = 600;

  result.innerHTML = "";

  // START TIMER
  startTimer();

  // SHOW FIRST QUESTION
  displayQuestion();

}


// =========================
// DISPLAY QUESTION
// =========================

function displayQuestion() {

  const q = selectedQuestions[currentQuestion];

  quizContainer.innerHTML = `
  
    <h2>
      Question ${currentQuestion + 1}
    </h2>

    <p>${q.question}</p>

    <div class="options">

      ${q.options.map(option => `

        <label>

          <input
            type="radio"
            name="option"
            value="${option}"

            ${userAnswers[currentQuestion] === option
              ? "checked"
              : ""
            }
          >

          ${option}

        </label>

        <br>

      `).join("")}

    </div>

  `;

  updateProgressBar();

}


// =========================
// SAVE ANSWER
// =========================

function saveAnswer() {

  const selectedOption =
    document.querySelector(
      'input[name="option"]:checked'
    );

  if (selectedOption) {

    userAnswers[currentQuestion] =
      selectedOption.value;

  }

}


// =========================
// NEXT BUTTON
// =========================

nextBtn.addEventListener("click", () => {

  saveAnswer();

  if (
    currentQuestion <
    selectedQuestions.length - 1
  ) {

    currentQuestion++;

    displayQuestion();

  }

});


// =========================
// PREVIOUS BUTTON
// =========================

prevBtn.addEventListener("click", () => {

  saveAnswer();

  if (currentQuestion > 0) {

    currentQuestion--;

    displayQuestion();

  }

});


// =========================
// TIMER
// =========================

function startTimer() {

  clearInterval(timer);

  timer = setInterval(() => {

    timeLeft--;

    let minutes =
      Math.floor(timeLeft / 60);

    let seconds =
      timeLeft % 60;

    timerDisplay.innerHTML =
      `
      ${minutes}:
      ${seconds < 10 ? "0" : ""}
      ${seconds}
      `;

    // AUTO SUBMIT
    if (timeLeft <= 0) {

      clearInterval(timer);

      submitQuiz();

    }

  }, 1000);

}


// =========================
// PROGRESS BAR
// =========================

function updateProgressBar() {

  const progress =
    (
      (currentQuestion + 1)
      /
      selectedQuestions.length
    ) * 100;

  progressBar.style.width =
    progress + "%";

}


// =========================
// SUBMIT QUIZ
// =========================

submitBtn.addEventListener(
  "click",
  submitQuiz
);

function submitQuiz() {

  saveAnswer();

  clearInterval(timer);

  let score = 0;

  selectedQuestions.forEach(
    (q, index) => {

      if (
        userAnswers[index] === q.answer
      ) {

        score++;

      }

    }
  );

  result.innerHTML = `
  
    <h2>
      You scored
      ${score}
      /
      ${selectedQuestions.length}
    </h2>

  `;

  saveScore(score);

  loadRecentScores();

}


// =========================
// SAVE SCORE
// =========================

function saveScore(score) {

  const subject =
    subjectSelect.value;

  const scores =
    JSON.parse(
      localStorage.getItem("scores")
    ) || [];

  scores.push({

    subject,

    score,

    total:
      selectedQuestions.length,

    date:
      new Date().toLocaleString()

  });

  localStorage.setItem(
    "scores",
    JSON.stringify(scores)
  );

}


// =========================
// LOAD RECENT SCORES
// =========================

function loadRecentScores() {

  const scores =
    JSON.parse(
      localStorage.getItem("scores")
    ) || [];

  recentScores.innerHTML =
    "<h3>Recent Scores</h3>";

  scores.reverse().slice(0, 5)
    .forEach(score => {

      recentScores.innerHTML += `
      
        <div>

          <strong>
            ${score.subject}
          </strong>

          :
          ${score.score}
          /
          ${score.total}

          <br>

          <small>
            ${score.date}
          </small>

          <hr>

        </div>

      `;

    });

}


// =========================
// LOAD SCORES ON PAGE LOAD
// =========================

loadRecentScores();
