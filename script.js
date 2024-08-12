const High = 1000000;
const coeff1 = High / 100;
const coeff2 = High * 0.2;
const coeff4 = High * 0.4;
const coeff6 = High * 0.6;

let gameData = {};

let computerGuess;
let userGuesses = [];
let attempts = 0;

let low = 1;
let high = High;

function rangeUpdate() {
  var l1 = low, h1 = high;
  if (h1 - l1 < coeff4) {
    l1 = (h1 + l1) / 2 - coeff2;
    l1 = l1 < 0 ? 0 : l1;
    l1 = l1 > coeff6 ? coeff6 : l1;
    h1 = l1 + coeff4;
  }
  const rangeOutput = document.getElementById("rangeOutput");
  rangeOutput.innerText = `${low} - ${high}`
  rangeOutput.style.marginLeft = l1/coeff1 + '%';
  rangeOutput.style.marginRight = 100 - h1/coeff1 + '%';
  rangeOutput.classList.add("flash");


  const lowValue = document.getElementById("low");
  lowValue.style.flex = low/coeff1 + '%';
  lowValue.style.background = "#ffb35c ";
  lowValue.style.borderRadius = "border-radius: 0px";

  const space = document.getElementById("space");
  space.style.flex = (high - low)/coeff1 + '%';
  space.style.background = "#62bcf0";
  space.style.borderRadius = "0px";


  const highValue = document.getElementById("high");
  highValue.style.flex = 100 - high/coeff1 + '%';
  highValue.style.background = "#ffb35c ";
  highValue.style.borderRadius = "0px";

  
}

function endGame() {
  // document.getElementById("newGameButton").style.display = "inline";
  document.getElementById('inputBox').setAttribute("readonly", "readonly");
  gameData.time = (new Date().getTime() - gameData.time)/1000;
  gameData.guesses = attempts;
  console.log(gameData);
}

function newGame() {
  window.location.reload();
}

function init() {
    computerGuess = Math.floor(Math.random() * High + 1);
    console.log(computerGuess); 
    document.getElementById("newGameButton").style.display = "none";
    document.getElementById("gameArea").style.display = "none";
}

function startGame() {
    document.getElementById("welcomeScreen").style.display = "none";
    document.getElementById("gameArea").style.display = "block";
}

function compareGuess() {
  const userGuess =  Number(document.getElementById("inputBox").value);
  userGuesses.push(" " + userGuess);
  document.getElementById("guesses").innerHTML = userGuesses;
  attempts++
  document.getElementById("attempts").innerHTML = attempts;
  // document.getElementById("attemptsleft").innerHTML = maxGuesses - attempts;
  if(userGuess > computerGuess){
   if (userGuess < high) high = userGuess;
    document.getElementById("textOutput").innerHTML 
    = "Guess too high, try a lower one 🙂 "
    document.getElementById("inputBox").value = "";
    } else if (userGuess < computerGuess) {
      if (userGuess > low) low = userGuess;
      document.getElementById("textOutput").innerHTML = 
      "Guess too low, try a higher one 🙂 "
      document.getElementById("inputBox").value = "";
    }else {
      document.getElementById("textOutput").innerHTML = 
      "You Won! 🏆 Correct guess after  " + attempts + " attempts";
      endGame();
    }
    rangeUpdate();
}


function loginAndStart(){
  let formData = new FormData(document.getElementById("loginForm"));
  gameData = {
    name: formData.get("name"),
    entry: formData.get("entry"),
    time: new Date().getTime()
  };
  console.log(gameData);
  startGame();
}