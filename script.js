let board;
let currentPlayer;
let gameActive;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function initializeGame() {
    board = Array(9).fill('');
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById('message').textContent = `Player ${currentPlayer}'s turn`;
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(i));
        boardElement.appendChild(cell);
    }
}
initializeGame();

function handleCellClick(index) {
    if (board[index] || !gameActive) {
        return;
    }
    board[index] = currentPlayer;
    document.getElementById('board').children[index].textContent = currentPlayer;
    if (checkWin()) {
        document.getElementById('message').textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    if (board.every(cell => cell)) {
        document.getElementById('message').textContent = 'It\'s a draw!';
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('message').textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function restartGame() {
    initializeGame();
}