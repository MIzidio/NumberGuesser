/*
GAME FUNCTIONS:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

//game values
let min = 1,
	max = 10,
	winningNumber = getRandomNumber(min, max),
	guessesLeft = 3;

//UI elements
const game = document.querySelector("#game"),
	minNum = document.querySelector(".min-num"),
	maxNum = document.querySelector(".max-num"),
	guessBtn = document.querySelector("#guess-btn"),
	guessInput = document.querySelector("#guess-input"),
	message = document.querySelector(".message");

//assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

//play again event listener
game.addEventListener('mousedown', function(e) {
    if(e.target.className === 'play-again') {
        window.location.reload();
    }
})

//listen for guess
guessBtn.addEventListener("click", function (e) {
	let guess = parseInt(guessInput.value);
	//validate
	if (isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a numer between ${min} and ${max}`, "red");
	}

	//check if won
	if (guess === winningNumber) {
		gameOver(true, `${winningNumber} is correct! YOU WIN!`);
	} else {
		//wrong number
		guessesLeft -= 1;

		if (guessesLeft === 0) {
			//game over - lost
			gameOver(
				false,
				`Game Over, you Lost. The correct number was ${winningNumber}`
			);
		} else {
			//game continues - answer wrong

			//change border color
			guessInput.style.borderColor = "red";

			//clear input
			guessInput.value = "";

			//tell user its the wrong number
			setMessage(
				`${guess} is not correct, ${guessesLeft} guesses left`,
				"red"
			);
		}
	}
});

//game over function
function gameOver(won, msg) {
	let color;
    won === true ? (color = "green") : (color = "red");
    
    //disable input
	guessInput.disabled = true;
	//change border color
	guessInput.style.borderColor = color;
	//set message
    setMessage(msg, color);
    
    //play again ?
    guessBtn.value = 'Play Again ?';
    guessBtn.className += 'play-again';

}

//set message
function setMessage(msg, color) {
	message.style.color = color;
	message.textContent = msg;
}

//get winning number
function getRandomNumber(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
