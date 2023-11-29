const correctGuesses = [
  "buaya",
  "harimau",
  "hiu putih",
  "jerapah",
  "kelinci",
  "kucing",
  "orang utan",
  "panda",
  "singa",
  "zebra",
];

let currentImageIndex = 0;
let correctGuessesTable = [];

const imageElement = document.querySelector(".game-image");
const guessInput = document.getElementById("guess-input");
const guessForm = document.getElementById("guess-form");
const restartButton = document.getElementById("restart-button");
const tableContainer = document.getElementById("table-container");

function displayNextImage() {
  imageElement.src = "img/" + correctGuesses[currentImageIndex] + ".jpg";
}

function checkGuess() {
  const guess = guessInput.value.toLowerCase();

  if (correctGuesses.includes(guess)) {
    Swal.fire({
      title: "Good job!",
      text: "jawaban kamu benar",
      icon: "success",
    });
    correctGuessesTable.push(guess);
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "jawaban kamu salah",
    });
  }

  guessInput.value = "";

  currentImageIndex = (currentImageIndex + 1) % correctGuesses.length;

  if (currentImageIndex === 0) {
    // Display the correct guesses table
    displayCorrectGuessesTable();
  } else {
    displayNextImage();
  }
}

function displayCorrectGuessesTable() {
  // Clear the game container
  document.querySelector(".game-container").style.display = "none";

  // Display the table container
  tableContainer.style.display = "block";

  // Create a table to display correct guesses
  let tableHTML = "<table><tr><th>Jawaban Benar</th></tr>";
  for (const guess of correctGuessesTable) {
    tableHTML += "<tr><td>" + guess + "</td></tr>";
  }
  tableHTML += "</table>";

  // Display the table
  tableContainer.innerHTML = tableHTML;

  // Display the restart button
  restartButton.style.display = "block";
}

function restartGame() {
  // Reset variables
  currentImageIndex = 0;
  correctGuessesTable = [];

  // Display the game container
  document.querySelector(".game-container").style.display = "block";

  // Hide the table container and restart button
  tableContainer.style.display = "none";
  restartButton.style.display = "none";

  // Display the first image
  displayNextImage();
}

guessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  checkGuess();
});

restartButton.addEventListener("click", restartGame);

displayNextImage();
