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
    const arr = board.getBoard();
    let winningPlayer = "";

    if (arr.filter((x) => !!x).length > 4) {
      for (let i = 0; i < 9; i += 3) {
        if (arr[i] && arr[i] === arr[i + 1] && arr[i + 1] === arr[i + 2]) {
          winningPlayer = players.find((x) => x.marker === arr[i]);
          return winningPlayer.name;
        }
      }
      for (let i = 0; i < 3; i++) {
        if (arr[i] && arr[i] === arr[i + 3] && arr[i] === arr[i + 6]) {
          winningPlayer = players.find((x) => x.marker === arr[i]);
          return winningPlayer.name;
        }
      }
      if (arr[0] === arr[4] && arr[4] === arr[8]) {
        winningPlayer = players.find((x) => x.marker === arr[0]);
        return winningPlayer.name;
      }
      if (arr[2] === arr[4] && arr[4] === arr[6]) {
        winningPlayer = players.find((x) => x.marker === arr[2]);
        return winningPlayer.name;
      }
    }
    if (arr.filter((x) => !!x).length > 6 && !winningPlayer) return "DRAW";
  };

  return { playRound, getActivePlayer, getBoard: board.getBoard, checkWin };
}

function screenController() {
  const game = gameController();
  const containerDiv = document.querySelector(".board");
  const playerTurnDiv = document.querySelector("h2");

  // **** UPDATE SCREEN ****

  const board = game.getBoard();

  const showBoard = () => {
    playerTurnDiv.textContent = `${game.getActivePlayer().name}'s Turn`;

    containerDiv.textContent = "";
    board.forEach((x, index) => {
      const cellDiv = document.createElement("button");
      cellDiv.classList.add("cell");
      cellDiv.dataset.id = index;
      cellDiv.textContent = x;

      containerDiv.append(cellDiv);
    });
  };

  showBoard();
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
    if (game.checkWin() == "DRAW") return "DRAW";
    else return `${game.checkWin()} WINS`;
  }

  // **** LISTENER ****
  containerDiv.addEventListener("click", clickHandler);
}

screenController();
