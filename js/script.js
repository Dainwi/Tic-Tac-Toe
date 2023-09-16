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
