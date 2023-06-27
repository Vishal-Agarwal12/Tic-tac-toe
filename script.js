let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
const cells = document.getElementsByClassName('cell');

function playerMove(cellIndex) {
  if (board[cellIndex] === '') {
    board[cellIndex] = currentPlayer;
    cells[cellIndex].innerText = currentPlayer;
    cells[cellIndex].classList.add(currentPlayer);
    if (checkWinner(currentPlayer)) {
      alert(currentPlayer + ' wins!');
      resetGame();
      return;
    }
    if (checkDraw()) {
      alert('It\'s a draw!');
      resetGame();
      return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (currentPlayer === 'O') {
      computerMove();
    }
  }
}

function computerMove() {
  let bestScore = -Infinity;
  let bestMove;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      board[i] = currentPlayer;
      let score = minimax(board, 0, false);
      board[i] = '';
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }
  playerMove(bestMove);
}

function minimax(board, depth, isMaximizing) {
  if (checkWinner('X')) {
    return -1;
  }
  if (checkWinner('O')) {
    return 1;
  }
  if (checkDraw()) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        let score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        board[i] = 'X';
        let score = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function checkWinner(player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let combination of winningCombinations) {
    if (
      board[combination[0]] === player &&
      board[combination[1]] === player &&
      board[combination[2]] === player
    ) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return !board.includes('');
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  for (let cell of cells) {
    cell.innerText = '';
    cell.classList.remove('X', 'O');
  }
}
