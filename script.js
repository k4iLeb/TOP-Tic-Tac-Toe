// *** GAMEBOARD ***
const gameBoard = (() => {
  const board = [, , , , , , , , ,];
  const getBoard = () => board;
  const setMark = (index, player) => {
    board[index] = player;
  };
  return { setMark, board };
})();
console.log(gameBoard.board);

// *** PLAYERS ***
const players = [
  {
    name: p1,
    marker: "x",
  },
  {
    name: p2,
    marker: "o",
  },
];

// console.log(p1);

// *** GAME LOGIC ***
function checkGame() {
  const board = gameBoard.board;
  console.log(board);
  // console.log(board[0].name);

  if (board[1] === board[4] && board[4] === board[7]) {
    console.log(`${board[1].name} WINS`);
  }

  // USE FOR LOOP TO CHECK
}

gameBoard.setMark(1, p1);
gameBoard.setMark(4, p1);
gameBoard.setMark(7, p1);
checkGame();
