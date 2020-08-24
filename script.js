
const startBtn = document.querySelector(".start");
const gameMessage = document.querySelector('#gamemessage');
const score = document.querySelector('#score');
startBtn.addEventListener('click', startRestart);

// game counter variable declarations
let numGames = 0;
let playerWins = 0;
let computerWins = 0;
let playerChoice = "";

//each of the rps buttons will play a round when clicked
const buttons = document.querySelectorAll(".select");

buttons.forEach((btn) => {btn.addEventListener('click', function(e){
    playRound(btn.id);
});});
 
/*  function to start/restart the game
    preconditions: the number entered when prompted doesn't cause
    an overflow
    postconditions: the start/restart button is not interactable
    or visible, game message is empty, scoreboard shows 0:0, 
    images are visible and a message popups for the player to
    input how many rounds the game will be out of. If a decimal
    number is added for the number of rounds to play it will be
    rounded up to the nearest integer.
*/
function startRestart(){
    playerWins = 0;
    computerWins = 0;
    playerChoice = "";
    startBtn.classList.add("hidden");
    const icons = document.querySelectorAll("img");
    icons.forEach((icon) => {
        icon.classList.remove("hidden");
    })
    const selections = document.querySelectorAll(".select");
    selections.forEach((btn) => {
        btn.classList.remove("hidden");
    })
    const scoreboard = document.querySelector("#scoreboard");
    scoreboard.classList.remove('hidden');
    gameMessage.textContent = "";
    const score = document.querySelector('#score');
    score.textContent = "Player: 0 | CPU: 0"
    numGames = prompt("First to how many wins?: ");
    while (numGames <= 0 || isNaN(numGames)) {
        numGames = prompt("Please enter a positive number: ");
    }
}
//no preconditions, returns either 'rock', 'paper' or 'scissors'
//with equal probability
function computerPlay(){
    let num = Math.floor(Math.random() * 3);
    switch (num){
        case 0 : return "rock";
        case 1 : return "paper";
        default: return "scissors";
    }
}

/*Precondition: computerChoice is either "rock", "paper" or "scissors", 
* case sensitive. (Should be called with computerPlay() as computerChoice)
* Postcondition: if the player enters in either "rock", "paper" or "scissors"
* (non-case sensitive) it returns the result of the rock, paper, scissors round
* following standard rules. If the player doesn't enter in a valid string 
* returns "Game invalid"
*/

function playGame(computerChoice, playerChoice){
    let playerChoiceL = playerChoice.toLowerCase();
    if(computerChoice == playerChoiceL){
        return "Draw";
    }
    switch (playerChoiceL) {
        case "rock" : 
            if(computerChoice == "scissors") {
                return "Player wins, rock beats scissors";
            }
            else {
                return "Computer wins, paper beats rock";
            }
        case "paper" :
            if(computerChoice == "rock") {
                return "Player wins, paper beats rock";
            } else {
                return "Computer wins, scissors beats paper";
            }
        case "scissors":
            if(computerChoice == "paper") {
                return "Player wins, scissors beats paper";
            }
            else {
                return "Computer wins, rock beats scissors";
            }
        default: return "Game Invalid";
    }    
}

/* Precondition: choice is either "rock", "paper" or "scissors"
*  Modifies: The playerWins, computerWins, the textContent of the score
*  element, gamemessage element and may display a button to reset the game
*  Post condition: returns nothing
*/
function playRound(choice){
    if(playerWins >= numGames || computerWins >= numGames) {
        return;
    }
    console.log(choice);
    let result = playGame(computerPlay(), choice);
    gameMessage.textContent = result;
    if(result.includes("Player")) {
        playerWins++;
    }
    if(result.includes("Computer")) {
        computerWins++;
    }
    score.textContent = "Player: " + playerWins  + " | CPU: " + computerWins;
    console.log(playerWins);
    console.log(computerWins);
    if(playerWins >= numGames || computerWins >= numGames) {
        startBtn.classList.remove("hidden");
        startBtn.classList.add("restart");
        startBtn.classList.remove("start");
        startBtn.textContent = (playerWins > computerWins) ? 
            "You win! Play Again?" : "You lose, try again?";
    }
}
