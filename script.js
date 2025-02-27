// *** GAMEBOARD ***
const gameBoard = (() => {
  const board = [, , , , , , , , ,];
  const setMark = (index, player) => {
    board[index] = player;
  };
  return { board, setMark };
})();

// *** PLAYERS ***
function createPlayer(name, marker) {
  return { name, marker };
}

const p1 = createPlayer("p1", "x");

const p2 = createPlayer("p2", "o");
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
