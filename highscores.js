const highScoresList = document.getElementById("high-scores-list");
const clearHighScoresButton = document.getElementById("clear-highscores");

// Retrieve high scores from localStorage
const highScores = localStorage.getItem("highScores") || "";

// Display high scores
const highScoresArray = highScores.split(";").filter((entry) => entry !== "");
highScoresList.innerHTML = highScoresArray
  .map((entry) => {
    const [initials, score] = entry.split(",");
    return `<li>${initials} - ${score}</li>`;
  })
  .join("");

// Clear high scores
clearHighScoresButton.addEventListener("click", () => {
  localStorage.removeItem("highScores");
  highScoresList.innerHTML = "";
});

const takeAnotherQuizButton = document.getElementById("take-another-quiz");

takeAnotherQuizButton.addEventListener("click", () => {
  window.location.href = "index.html";
});