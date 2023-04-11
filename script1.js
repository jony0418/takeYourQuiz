const startButton = document.getElementById("start-quiz");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const gameOver = document.getElementById("game-over");
const finalScoreElement = document.getElementById("final-score");
const initialsForm = document.getElementById("initials-form");
const timeLeftElement = document.getElementById("time-left");
const feedbackElement = document.getElementById("feedback");


const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinking Text Marking Language", correct: false },
    ],
  },
  {
    question: "What is the correct syntax for referring to an external script called 'script.js'?",
    answers: [
      { text: "<script src='script.js'>", correct: true },
      { text: "<script href='script.js'>", correct: false },
      { text: "<script ref='script.js'>", correct: false },
      { text: "<script name='script.js'>", correct: false },
    ],
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    answers: [
      { text: "font", correct: false },
      { text: "class", correct: false },
      { text: "style", correct: true },
      { text: "styles", correct: false },
    ],
  },
  {
    question: "What is the correct format for a JavaScript function?",
    answers: [
      { text: "function:myFunction()", correct: false },
      { text: "function myFunction()", correct: true },
      { text: "function = myFunction()", correct: false },
      { text: "function => myFunction()", correct: false },
    ],
  },
  {
    question: "Which CSS property controls the text size?",
    answers: [
      { text: "font-size", correct: true },
      { text: "text-size", correct: false },
      { text: "font-style", correct: false },
      { text: "text-style", correct: false },
    ],
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    answers: [
      { text: "Number", correct: false },
      { text: "String", correct: false },
      { text: "Image", correct: true },
      { text: "Boolean", correct: false },
    ],
  },
  {
    question: "How do you add a comment in a CSS file?",
    answers: [
      { text: "// this is a comment", correct: false },
      { text: "/* this is a comment */", correct: true },
      { text: "<!-- this is a comment -->", correct: false },
      { text: "' this is a comment", correct: false },
    ],
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    answers: [
      { text: "<style>", correct: true },
      { text: "<css>", correct: false },
      { text: "<script>", correct: false },
      { text: "<styles>", correct: false },
    ],
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    answers: [
      { text: "var colors = 'red', 'green', 'blue';", correct: false },
      { text: "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue');", correct: false },
      { text: "var colors = (1:'red', 2:'green', 3:'blue');", correct: false },
      { text: "var colors = ['red', 'green', 'blue'];", correct: true },
    ],
  },
  {
    question: "How do you select an element with the id 'demo' in JavaScript?",
    answers: [
      { text: "document.getElementById('demo');", correct: true },
      { text: "document.getElement('demo');", correct: false },
      { text: "document.id('demo');", correct: false },
      { text: "document.#('demo');", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let timeLeft = 60;
let timer;

startButton.addEventListener("click", startQuiz);
initialsForm.addEventListener("submit", saveHighScore);

function startQuiz() {
  alert("Welcome to the quiz! You have 60 seconds to answer the questions. Good luck!");
  startButton.style.display = "none";
  timerElement.style.display = "block";
  questionContainer.style.display = "block";
  timer = setInterval(countdown, 1000);
  showNextQuestion();
}

function countdown() {
  timeLeftElement.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timer);
    gameOverScreen();
  } else {
    timeLeft--;
  }
}

function showNextQuestion() {
  if (currentQuestionIndex === questions.length) {
    clearInterval(timer);
    gameOverScreen();
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  answerButtons.innerHTML = "";
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.addEventListener("click", () => checkAnswer(answer.correct));
    answerButtons.appendChild(button);
  });
}

function checkAnswer(isCorrect) {
    displayFeedback(isCorrect);
    if (!isCorrect) {
      timeLeft -= 10;
    }
    currentQuestionIndex++;
    setTimeout(showNextQuestion, 1000);
  }

function gameOverScreen() {
    questionContainer.style.display = "none";
    gameOver.style.display = "block";
    finalScoreElement.textContent = timeLeft;
  }
  
function saveHighScore(e) {
    e.preventDefault();
    const initials = document.getElementById("initials").value;
    const score = timeLeft;
  
    // Retrieve high scores from localStorage, or initialize an empty string
    const highScores = localStorage.getItem("highScores") || "";
  
    // Save the new score to localStorage
    const newHighScores = highScores === "" ? `${initials},${score}` : `${highScores};${initials},${score}`;
    localStorage.setItem("highScores", newHighScores);
  
    // Redirect to the high scores page
    window.location.href = "highscores.html";
}

function showInstructions() {
    questionElement.textContent =
      "Welcome to the quiz! You will be presented with 10 questions about JavaScript, CSS, and HTML. Answer as quickly as possible. For each incorrect answer, 10 seconds will be deducted from your time. Good luck!";
    const startButton = document.createElement("button");
    startButton.innerText = "Start";
    startButton.addEventListener("click", startQuiz);
    answerButtons.appendChild(startButton);
  }

