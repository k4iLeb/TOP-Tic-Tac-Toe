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

  // const printBoard = () => {
  //   const boardWithCellValues = board.map((x) => x.getValues());
  //   console.log(boardWithCellValues);
  // };

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
    console.log(`Marking ${getActivePlayer().name}'s the index ${index}`);

    board.setMark(index, getActivePlayer().marker);
    switchPlayer();
  };

  console.log(board.getBoard());
  console.log(getActivePlayer());
  playRound(2);
  console.log(getActivePlayer());
  console.log(board.getBoard());
  // playRound(2);
  console.log(board.getBoard());

  //  **** CHECK GAME ****
  const checkGame = () => {
    const board = gameBoard.board;
    console.log(board);
    // console.log(board[0].name);

    // if (board[1] === board[4] && board[4] === board[7]) {
    //   console.log(`${board[1].name} WINS`);
    // }

    // USE FOR LOOP TO CHECK
  };

  return { playRound, getActivePlayer };
}
const game = gameController();

// gameBoard.setMark(4, p1);
// gameBoard.setMark(7, p1);
// checkGame();
