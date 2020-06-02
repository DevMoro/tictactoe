var gameBoard;
const firstPlayer = "O";
const secondPlayer = "X";
const WinnerBox = document.getElementById("winner");
let pTurn = 1;
const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cells = document.querySelectorAll('.cell');
startGame();

function startGame() {
    document.querySelector(".endgame").style.display = "none";
    WinnerBox.innerText = "";
    gameBoard = Array.from(Array(9).keys());
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
        cells[i].style.removeProperty("background-color");
        cells[i].addEventListener("click", turnClick, false)
    }
}

function turnClick(square) {
    if(typeof gameBoard[square.target.id] == 'number') {
    if (pTurn == 1) { 
         turn(square.target.id, firstPlayer)
         pTurn = 2
     } else if (pTurn == 2) {
        turn(square.target.id, secondPlayer)
        pTurn = 1
     }
    checkTie();
    }
}

function turn(squareId, player) {
    gameBoard[squareId] = player;
    document.getElementById(squareId).innerHTML = player;
    let gameWon = checkWin(gameBoard, player);
    if (gameWon) gameOver(gameWon)
}

function emptySquares() {
    return gameBoard.filter(s => typeof s == "number");
}

function checkTie() {
    if (emptySquares().length == 0) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green";
            cells[i].removeEventListener("click", turnClick, false);
        }
        WinnerBox.innerText = "Tie!"
        return true;
    }
    return false;
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) =>  (e === player)
     ? a.concat(i) : a, []);

    let gameWon = null;
    for (let [index, win] of winCombos.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = {index: index, player: player};
            break;   
    }
}
return gameWon;
    
}

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
        gameWon.player == firstPlayer ? "blue" : "red";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener("click", turnClick, false)
    };

    WinnerBox.innerText = gameWon.player + " Wins!";
}
