const startButton = document.getElementById("start-quiz");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const gameOver = document.getElementById("game-over");
const finalScoreElement = document.getElementById("final-score");
const initialsForm = document.getElementById("initials-form");
const timeLeftElement = document.getElementById("time-left");
const feedbackElement = document.getElementById("feedback");

//Here is the array of questions and answers
const questions = [
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
    question: "How do you add a comment in a CSS file?",
    answers: [
      { text: "// this is a comment", correct: false },
      { text: "/* this is a comment */", correct: true },
      { text: "<!-- this is a comment -->", correct: false },
      { text: "' this is a comment", correct: false },
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
];

let currentQuestionIndex = 0;
let timeLeft = 60;
let timer;

//This is the welcome message as an alert
alert("Welcome to the quiz! You have 60 seconds to answer the questions, EACH WRONG ANSWER WILL TAKE 10 SECONS. Good luck!");
startButton.addEventListener("click", startQuiz);
initialsForm.addEventListener("submit", saveHighScore);

//This is the function that will start the quiz
function startQuiz() {
  startButton.style.display = "none";
  questionContainer.style.display = "block";
  timer = setInterval(countdown, 1000);
  showNextQuestion();
}

//This is the function wich does the countdown timer
function countdown() {
  timeLeftElement.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timer);
    gameOverScreen();
  } else {
    timeLeft--;
  }
}

//This funtion show the next question
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

//This funtion does the scoring
function checkAnswer(isCorrect) {
  displayFeedback(isCorrect);
  if (!isCorrect) {
    timeLeft -= 10;
  }
  currentQuestionIndex++;
  showNextQuestion();
}

//This function takes you to the game over screen
function gameOverScreen() {
  questionContainer.style.display = "none";
  gameOver.style.display = "block";
  finalScoreElement.textContent = timeLeft;
}

//Here the function saves the high score
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

//This function displays the feedback
function displayFeedback(isCorrect) {
  feedbackElement.style.display = "block";
  if (isCorrect) {
    feedbackElement.textContent = "Correct!";
    feedbackElement.style.color = "green";
  } else {
    feedbackElement.textContent = "Wrong!";
    feedbackElement.style.color = "red";
  }

  setTimeout(() => {
    feedbackElement.style.display = "none";
  }, 500);
}

