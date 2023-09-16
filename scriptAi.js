let data = ["", "", "", "", "", "", "", "", ""];
let count = 0;
let lock = false;

const toggle = (e, num) => {
  if (lock || data[num] !== "") {
    return;
  }

  const currentPlayer = count % 2 === 0 ? "X" : "O";
  const currentImage =
    currentPlayer === "X" ? "images/cross.png" : "images/circle.png";

  const img = document.createElement("img");
  img.src = currentImage;
  e.target.innerHTML = "";
  e.target.appendChild(img);

  data[num] = currentPlayer;
  count++;
  check();

  // After the player's move, let the AI make a move
  if (!lock && count % 2 === 1) {
    setTimeout(() => {
      makeAIMove();
    }, 500); // Delay the AI's move for 1 second (adjust as needed)
  }
};

const check = () => {
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombination) {
    const [a, b, c] = combo;
    if (data[a] && data[a] === data[b] && data[a] === data[c]) {
      document.querySelector(".message").textContent = `${data[a]} wins!`;
      lock = true;
      return;
    }
  }

  if (count === 9) {
    document.querySelector(".message").textContent = "It's a draw!";
    lock = true;
  }
};

const reset = () => {
  data = ["", "", "", "", "", "", "", "", ""];
  document.querySelector(".message").textContent = "Let's play!";
  document.querySelectorAll(".boxes").forEach((box) => {
    box.textContent = "";
  });
  lock = false;
  count = 0;
};

const makeAIMove = () => {
  if (lock) {
    return;
  }

  // Simple AI: Choose a random empty cell
  const emptyCells = data.reduce((acc, val, index) => {
    if (val === "") {
      acc.push(index);
    }
    return acc;
  }, []);

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const aiMoveIndex = emptyCells[randomIndex];
    toggle(
      document.querySelector(`.boxes[data-num="${aiMoveIndex}"]`),
      aiMoveIndex
    );
  }
};

// Add event listeners to your game cells
document.querySelectorAll(".boxes").forEach((box, index) => {
  box.setAttribute("data-num", index);
  box.addEventListener("click", (e) => toggle(e, index));
});

// Add a reset button click event listener
document.querySelector(".reset-button").addEventListener("click", reset);

// Initialize the game
reset();
