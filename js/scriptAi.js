let data = ["", "", "", "", "", "", "", "", ""];
let count = 0;
let lock = false;

const toggle = (cell, num) => {
  if (lock || cell.textContent !== "") {
    return;
  }

  const currentPlayer = count % 2 === 0 ? "X" : "O";
  const currentImage =
    currentPlayer === "X" ? "images/cross.png" : "images/circle.png";

  const img = document.createElement("img");
  img.src = currentImage;
  cell.textContent = "";
  cell.appendChild(img);

  data[num] = currentPlayer;
  count++;
  check();
  // makeAIMove();
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
  setTimeout(() => {
    const bestMove = getBestMove(data);
    if (bestMove !== -1) {
      toggle(document.querySelector(`.box${bestMove}`), bestMove);
    }
  }, 1000); // Delay AI move by 1000 milliseconds (1 second)
};




const getBestMove = (board) => {
  let bestMove = -1;
  let bestScore = -Infinity;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      board[i] = "O";
      const score = minimax(board, 0, false);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
};

const minimax = (board, depth, isMaximizing) => {
  const scores = {
    X: -1,
    O: 1,
    draw: 0,
  };

  const winner = checkForWinner(board);

  if (winner !== null) {
    return scores[winner];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "O";
        const score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = "X";
        const score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

const checkForWinner = (board) => {
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
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.includes("")) {
    return null; // Game still ongoing
  } else {
    return "draw"; // It's a draw
  }
};

document.querySelectorAll(".boxes").forEach((box, index) => {
  box.addEventListener("click", (e) => {
    toggle(e.currentTarget, index);
    // Move the AI move inside the user's click event
    makeAIMove();
  });
});

// Event listener for the reset button
document.querySelector(".reset").addEventListener("click", reset);

// Initialize the game
reset();