// script.js
const paragraphs = [
  "In 1923, the city of New York was bustling with life, as it had been for over a century. The streets were filled with people, cars, and the sound of construction, as new buildings were erected at an astonishing rate, over 500 in just that year alone. By 1930, the skyline had changed drastically, with the Empire State Building standing at 1,454 feet tall, a symbol of progress and ambition. As the years passed, the city continued to grow, and by 2020, it was home to over 8 million people, each contributing to its unique and ever-evolving story.",
  "Water. Earth. Fire. Air. Long ago, the four nations lived together in harmony. Then everything changed when the Fire Nation attacked. Only the Avatar, master of all four elements, could stop them. But when the world needed him most, he vanished. A hundred years passed and my brother and I discovered the new Avatar, an airbender named Aang, and although his airbending skills are great, he still has a lot to learn before he's ready to save anyone. But I believe Aang can save the world.",
  "The landlady informed me that he had left the house shortly after eight o'clock in the morning. I sat down beside the fire, however, with the intention of awaiting him, however long he might be. I was already deeply interested in his inquiry, for, though it was surrounded by none of the grim and strange features which were associated with the two crimes which I have already recorded, still, the nature of the case and the exalted station of his client gave it a character of its own.",
  "The summer evenings were long. It was not dark, yet. Presently Tom checked his whistle. A stranger was before him - a boy a shade larger than himself. A newcomer of any age or either gender was an impressive curiosity in the poor little shabby village of St. Petersburg. This boy was well dressed, too well dressed on a weekday. This was simply astounding. His cap was a dainty thing, his close-buttoned blue cloth roundabout was new and natty, and so were his pantaloons.",
  "But this was too much. The wolf danced about with rage and swore he would come down the chimney and eat up the little pig for his supper. But while he was climbing on to the roof the little pig made up a blazing fire and put on a big pot full of water to boil. Then, just as the wolf was coming down the chimney, the little piggy pulled off the lid, and plop! In fell the wolf into the scalding water."
];

const textDisplay = document.getElementById("text-display");
const hiddenInput = document.getElementById("hidden-input");
const timerElement = document.getElementById("timer");
const accuracyElement = document.getElementById("accuracy");
const resultsElement = document.getElementById("results");
const resetButton = document.getElementById("reset-btn");

let paragraph = "";
let timer = 0;
let interval = null;
let started = false;
let correctChars = 0;

// Initialize the test
function initializeText() {
  // Pick a random paragraph
  paragraph = paragraphs[Math.floor(Math.random() * paragraphs.length)];
  textDisplay.innerHTML = "";

  for (let char of paragraph) {
    const span = document.createElement("span");
    span.textContent = char;
    textDisplay.appendChild(span);
  }

  hiddenInput.value = "";
  hiddenInput.disabled = false; // Enable the input field when the test starts
  hiddenInput.focus();
  started = false;
  correctChars = 0;
  timer = 0;

  // Reset the timer
  timerElement.innerText = "Time: 0.00s";
  accuracyElement.innerText = "Accuracy: 100%";
  resultsElement.style.display = "none"; // Hide results

  // Show the reset button before the test starts
  resetButton.classList.remove("hidden");
}

// Start the timer
function startTimer() {
  interval = setInterval(() => {
    timer += 0.01;
    timerElement.innerText = `Time: ${timer.toFixed(2)}s`;
  }, 10);
}

// Stop the timer
function stopTimer() {
  clearInterval(interval);
}

// Update highlights and stats
function updateStats(inputText) {
  correctChars = 0;

  for (let i = 0; i < paragraph.length; i++) {
    const charSpan = textDisplay.children[i];
    const typedChar = inputText[i];

    if (typedChar == null) {
      charSpan.classList.remove("correct", "incorrect");
    } else if (typedChar === paragraph[i]) {
      charSpan.classList.add("correct");
      charSpan.classList.remove("incorrect");
      correctChars++;
    } else {
      charSpan.classList.add("incorrect");
      charSpan.classList.remove("correct");
    }
  }

  // Calculate accuracy
  const totalTypedChars = inputText.length;
  const accuracy = totalTypedChars > 0 ? Math.round((correctChars / totalTypedChars) * 100) : 100;
  accuracyElement.innerText = `Accuracy: ${accuracy}%`;

  // Automatically end the test when the last character is typed
  if (inputText.length === paragraph.length) {
    stopTimer();
    hiddenInput.disabled = true; // Disable input after the test is completed
    showResults(accuracy);
  }
}

// Show results
function showResults(accuracy) {
  const timeTaken = timer.toFixed(2);
  const wordsTyped = paragraph.split(" ").length;
  const wpm = Math.round((wordsTyped / (timeTaken / 60)));

  // Hide the initial time and accuracy and only show the results
  timerElement.style.display = "none";
  accuracyElement.style.display = "none";

  resultsElement.style.display = "block";
  resultsElement.innerHTML = `
    <h2>Test Completed!</h2>
    <p><strong>Time Taken:</strong> ${timeTaken}s</p>
    <p><strong>Accuracy:</strong> ${accuracy}%</p>
    <p><strong>WPM:</strong> ${wpm}</p>
    <button onclick="initializeText()">Try Again</button>
  `;

  // Hide the reset button after test completion
  resetButton.classList.add("hidden");
}

// Event listeners
hiddenInput.addEventListener("input", (e) => {
  const inputText = hiddenInput.value;
  if (!started) {
    started = true;
    startTimer();
  }
  updateStats(inputText);
});

// Reset the test when the reset button is clicked
resetButton.addEventListener("click", () => {
  stopTimer(); // Stop the timer
  initializeText(); // Reset the test
});

// Initialize on load
initializeText();
