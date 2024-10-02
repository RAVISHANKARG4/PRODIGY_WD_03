const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
const modeSelection = document.querySelectorAll('input[name="mode"]');
const markerSelection = document.querySelectorAll('input[name="marker"]');
const gameResult = document.getElementById('gameResult');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameMode = 'human';
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
modeSelection.forEach((input) => {
  input.addEventListener('change', (event) => {
    gameMode = event.target.value;
    restartGame();
  });
});
markerSelection.forEach((input) => {
  input.addEventListener('change', (event) => {
    currentPlayer = event.target.value;
    restartGame();
  });
});
function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = cell.getAttribute('data-index');
  if (gameState[cellIndex] || checkWinner()) return;
  gameState[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer;
  if (checkWinner()) {
    displayResult(`${currentPlayer} wins!`);
  } else if (!gameState.includes(null)) {
    displayResult('It\'s a draw!');
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameMode === 'computer' && currentPlayer === 'X') {
      setTimeout(computerMoveAsX, 500);
    } else if (gameMode === 'computer' && currentPlayer === 'O') {
      setTimeout(computerMoveAsO, 500);
    }
  }
}
function displayResult(resultText) {
  gameResult.textContent = resultText;
  gameResult.className = 'game-result';
}
function computerMoveAsX() {
  const availableCells = gameState
    .map((value, index) => (value === null ? index : null))
    .filter((index) => index !== null);
  if (availableCells.length > 0) {
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    gameState[randomIndex] = 'X';
    cells[randomIndex].textContent = 'X';

    if (checkWinner()) {
      displayResult('X wins!');
    } else if (!gameState.includes(null)) {
      displayResult('It\'s a draw!');
    } else {
      currentPlayer = 'O';
    }
  }
}
function computerMoveAsO() {
  const availableCells = gameState
    .map((value, index) => (value === null ? index : null))
    .filter((index) => index !== null);

  if (availableCells.length > 0) {
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    gameState[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    if (checkWinner()) {
      displayResult('O wins!');
    } else if (!gameState.includes(null)) {
      displayResult('It\'s a draw!');
    } else {
      currentPlayer = 'X';
    }
  }
}
function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return gameState[index] === currentPlayer;
    });
  });
}
function restartGame() {
  gameState.fill(null);
  cells.forEach(cell => (cell.textContent = ''));
  const selectedMarker = document.querySelector('input[name="marker"]:checked').value;
  currentPlayer = selectedMarker;
  gameResult.textContent = '';

  if (currentPlayer === 'O' && gameMode === 'computer') {
    currentPlayer = 'X';
    setTimeout(computerMoveAsX, 500);
  }
}
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);