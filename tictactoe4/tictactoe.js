const statusDisplay = document.querySelector('.game--status');
const debugOutput = document.querySelector('.debug--output');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["","","","","","","","","","","","","","","","",];
let winSound = new Audio('winsound.mp3');

statusDisplay.innerHTML = `It's <span style="color:#2fd62d">${currentPlayer}</span>'s turn`;


function handleRestartGame() {
	//Set GameAcive and current player back to their initial state
	gameActive = true;
	currentPlayer = "X";
	
	//Insert empty string "" into each cell within gameState
	gameState = ["","","","","","","","","","","","","","","","",];
	statusDisplay.innerHTML = `It's <span style="color:#2fd62d">${currentPlayer}</span>'s turn`;
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    document.querySelectorAll('.cell').forEach(cell => cell.style.background = "");
}


//lListen for user input and play a turn based on which cell is clicked
function handleCellClick(clickedCellEvent) {
	//play 'click' sound when cell is clicked
	clickSound = new Audio('clicksound.mp3');
	clickSound.play();
	const clickedCell = clickedCellEvent.target;
	const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    //If clicked square not empty return (do nothing)
	if (gameState[clickedCellIndex] != "" || !gameActive) {
		return;
	}
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

//Add active players symbol to the clicked square
function handleCellPlayed(clickedCell, clickedCellIndex) {
	gameState[clickedCellIndex] = currentPlayer;
	if (currentPlayer == "X") {
		{clickedCell.innerHTML = "<img class='rotate' src = 'x.png' alt = 'X' width = '100' height = '100'>";}

	}
	else
		{clickedCell.innerHTML = "<img class='rotate' src = 'o.png' alt = '0' width '100' height = '100' >";}
}

//Define array holding all the winning combinations
const winningConditions = [
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    [0, 5, 10, 15],
    [3, 6, 9, 12]
];

function handleResultValidation() {
    //Check win conditions
	let roundWon = false;
	for (let i = 0; i <= 9; i++) {
		const winCondition = winningConditions[i];
		let a = gameState[winCondition[0]];
		let b = gameState[winCondition[1]];
		let c = gameState[winCondition[2]];
		let d = gameState[winCondition[3]];

		if (a === '' || b === '' || c === ''|| d === ''){
			continue;
		}
		if (a === b && b === c && c === d) {
			//Change background color on cells in winning pattern
			for (let i=0; i<=3; i++){
			    cellIndex = winCondition[i] + 1;
			    document.querySelector(`.game--container :nth-child(${cellIndex})`).style.background = "#fff6a7";
		    }
			roundWon = true;
			break
		}

	}

	if (roundWon) {
        //Play win music
		winSound.play();
		playerColor = "#9e37ff";
		if (currentPlayer == "X") {playerColor = "#2fd62d"};
		statusDisplay.innerHTML = `<span class="blinky" style="color:yellow"><span style="color:` + playerColor + `">${currentPlayer}</span> WINS!</span>`;
		gameActive = false;
		return
	}

	//Check for draw condition
	let roundDraw =!gameState.includes("");
	if (roundDraw) {
		statusDisplay.innerHTML = `Draw!`;
		gameActive = false;
		return
	}

	handlePlayerChange();
}

//Switch players
function handlePlayerChange() {
	currentPlayer = currentPlayer === "X" ? "O" : "X";
	playerColor = "#9e37ff";
	if (currentPlayer == "X") {playerColor = "#2fd62d"};
	statusDisplay.innerHTML = `It's <span style="color:` + playerColor + `">${currentPlayer}</span>'s turn`;
}

//add event listeners to each cell
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);



// check draw before win.