// *** GAMEBOARD ***
function gameBoard() {
  const board = [];
  for (let i = 0; i < 9; i++) {
    board.push(cell().getValue());
  }
  const getBoard = () => board;
  const setMark = (index, player) => {
    if (board[index] !== "") return;
    board[index] = player;
  };

  return { setMark, getBoard };
}

// **** CELL ****
function cell() {
  let value = "";

  const setValue = (player) => {
    value = player;
  };

  const getValue = () => value;
  return { getValue, setValue };
}

// *** GAME LOGIC ***

function gameController(
  playerNameOne = "Player One",
  playerNameTwo = "Player Two"
) {
  // **** Import board ****
  const board = gameBoard();
  // *** PLAYERS ***
  const players = [
    {
      name: playerNameOne,
      marker: "x",
    },
    {
      name: playerNameTwo,
      marker: "o",
    },
  ];
  // **** Active player ****
  let activePlayer = players[0];

  // **** SWITCH PLAYER ****
  const switchPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;
  // **** Play Round ****
  const playRound = (index) => {
    if (!checkWin()) {
      if (board.getBoard()[index]) return;
      board.setMark(index, getActivePlayer().marker);
      checkWin();
      switchPlayer();
    }
  };

  //  **** CHECK GAME ****
  const checkWin = () => {
    const boardArray = board.getBoard();

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        boardArray[a] &&
        boardArray[a] === boardArray[b] &&
        boardArray[a] === boardArray[c]
      ) {
        return players.find((x) => x.marker === boardArray[a]).name;
      }
    }
    if (boardArray.filter((x) => !!x).length === 9) return "DRAW";
    return null;
  };

  return { playRound, getActivePlayer, getBoard: board.getBoard, checkWin };
}

function screenController() {
  let game = gameController();
  // **** SELECTORS ****
  const startScreen = document.querySelector(".start-screen");
  const startBtn = document.querySelector(".startBtn");
  const playerInputs = document.querySelectorAll(".start-screen input");

  const gameScreen = document.querySelector(".game-screen");
  const containerDiv = document.querySelector(".board");
  const playerTurnDiv = document.querySelector("h2");

  const endScreen = document.querySelector(".end-screen");
  const startNewGameBtn = document.querySelector(".newGameBtn");
  const replayBtn = document.querySelector(".replayBtn");

  // **** START NEW GAME ****
  function startNewGame() {
    startScreen.style.display = "flex";
    endScreen.style.display = "none";
  }

  // **** STARTING SCREEN ****
  function startGame() {
    startScreen.style.display = "none";
    gameScreen.style.display = "flex";
    endScreen.style.display = "none";
    const playerArray = Array.from(playerInputs).map((x) => {
      return x.value === "" ? (x = x.attributes[3].value) : x.value;
    });
    const [player1, player2] = playerArray;

    game = gameController(player1, player2);

    showBoard();
  }

  // **** UPDATE SCREEN ****

  const showBoard = () => {
    const board = game.getBoard();
    playerTurnDiv.textContent = `${game.getActivePlayer().name}'s Turn`;

    containerDiv.textContent = "";
    board.forEach((x, index) => {
      const cellDiv = document.createElement("button");
      cellDiv.classList.add("cell");
      cellDiv.dataset.id = index;
      cellDiv.textContent = x;
      if (cellDiv.textContent === "x") cellDiv.classList.add("x-marker");
      if (cellDiv.textContent === "o") cellDiv.classList.add("o-marker");

      containerDiv.append(cellDiv);
    });
  };

  // **** CLICKHANDLER ****
  function clickHandler(e) {
    const selectedCell = e.target.dataset.id;
    if (!selectedCell) return;
    game.playRound(selectedCell);
    showBoard();
    if (game.checkWin()) {
      announceWinner();
    }
  }

  // **** ANNOUNCE WINNER ****
  function announceWinner() {
    gameScreen.style.display = "none";
    startScreen.style.display = "none";
    endScreen.style.display = "flex";
    endScreen.children[0].textContent =
      game.checkWin() === "DRAW" ? "DRAW" : `${game.checkWin()} WINS`;
  }

  // **** LISTENER ****
  containerDiv.addEventListener("click", clickHandler);
  startBtn.addEventListener("click", startGame);
  startNewGameBtn.addEventListener("click", startNewGame);
  replayBtn.addEventListener("click", startGame);
}

screenController();
