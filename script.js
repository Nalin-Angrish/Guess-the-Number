let computerGuess;
let userGuesses = [];
let attempts = 0;
let maxGuesses;

let low = 1;
let high = 1000;

function rangeUpdate() {
  var l1 = low, h1 = high;
  if (h1 - l1 < 400) {
    l1 = (h1 + l1) / 2 - 200;
    l1 = max(0, l1);
    l1 = min(600, l1);
    h1 = l1 + 400;
  }
  const rangeOutput = document.getElementById("rangeOutput");
  rangeOutput.innerText = `${low} - ${high}`
  rangeOutput.style.marginLeft = l1/10 + '%';
  rangeOutput.style.marginRight = 100 - h1/10 + '%';
  rangeOutput.classList.add("flash");


  const lowValue = document.getElementById("low");
  lowValue.style.flex = low/10 + '%';
  lowValue.style.background = "#ffb35c ";
  lowValue.style.borderRadius = "border-radius: 0px";

  const space = document.getElementById("space");
  space.style.flex = (high - low)/10 + '%';
  space.style.background = "#62bcf0";
  space.style.borderRadius = "0px";


  const highValue = document.getElementById("high");
  highValue.style.flex = 100 - high/10 + '%';
  highValue.style.background = "#ffb35c ";
  highValue.style.borderRadius = "0px";

  
}

function endGame() {
document.getElementById("newGameButton").style.display = "inline";
document.getElementById('inputBox').setAttribute("readonly", "readonly");
}
function newGame() {
  window.location.reload();
}

function init() {
    computerGuess = Math.floor(Math.random() * 1000 + 1);
    console.log(computerGuess); 
    document.getElementById("newGameButton").style.display = "none";
    document.getElementById("gameArea").style.display = "none";
}

function startGame() {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
}

function easyMode() {
    maxGuesses = 20;
    startGame();

}

function hardMode() {
    maxGuesses = 15;
    startGame();
}

function proMode() {
  maxGuesses = 10;
  startGame();
}
function compareGuess() {
  const userGuess =  Number(document.getElementById("inputBox").value);
  userGuesses.push(" " + userGuess);
  document.getElementById("guesses").innerHTML = userGuesses;
  attempts++
  document.getElementById("attempts").innerHTML = attempts;
  document.getElementById("attemptsleft").innerHTML = 10 - attempts;
  if (attempts < maxGuesses)
  if(userGuess > computerGuess){
   if (userGuess < high) high = userGuess;
    document.getElementById("textOutput").innerHTML 
    = "Guess to high, try a lower one 🙂 "
    document.getElementById("inputBox").value = "";
    } else if (userGuess < computerGuess) {
      if (userGuess > low) low = userGuess;
      document.getElementById("textOutput").innerHTML = 
      "Guess to low, try a higher one 🙂 "
      document.getElementById("inputBox").value = "";
    }else {
      document.getElementById("textOutput").innerHTML = 
      "You Won! 🏆 Correct guess after  " + attempts + " attempts";
      endGame();
    } else {
        if(userGuess > computerGuess){
            document.getElementById("textOutput").innerHTML = 
            "You Lose! 😳 but you can try again, <br> The number was " + computerGuess;
             endGame();
            } else if (userGuess < computerGuess) {
              document.getElementById("textOutput").innerHTML = 
              "You Lose! 😳 but you can try again, <br> The number was " + computerGuess;
             endGame();
            } else {
              document.getElementById("textOutput").innerHTML = 
              "You Won!👏  Correct after  " + attempts + " attempts";
             endGame();
           }
    }
    rangeUpdate();
}
