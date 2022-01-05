import { Login } from './Login.js';
import { Register } from './Register.js';
import Game from './Game.js';
import GameView from "./GameView.js"

let gameView = new GameView("app");
let game = new Game();
let login = new Login();
let register = new Register();

let hasGameStarted = false;

document.getElementById("bt").addEventListener("click", function(){
    let nPits = document.getElementById("selectNPits");
    let nSeeds = document.getElementById("selectNSeeds");
    let numberOfPitsPerPlayer = nPits.options[nPits.selectedIndex].value;
    let numberOfSeedsPerPit = nSeeds.options[nSeeds.selectedIndex].value;
    gameView.createBoard(numberOfPitsPerPlayer, numberOfSeedsPerPit);
    game.create(numberOfPitsPerPlayer, numberOfSeedsPerPit, "sonso", "mafarrico");
    const pits = document.querySelectorAll(".small_pit");
    const pitsArray = Array.from(pits);
    pitsArray.forEach(pit => {
        pit.addEventListener("click", function() {
           console.log(pitsArray.indexOf(pit));
           gameView.updateGameView(game);
        });
    });
});

document.getElementById("login").addEventListener("click", function() {
    let elementsLogin = document.getElementsByClassName("container");
    for(let i = 0; i < elementsLogin.length; i++) elementsLogin[i].remove();

    login.userLogin();

    document.getElementById("loginSubmitButton").addEventListener("click", function() {
        console.log("login here");
        window.location.reload();
    });
});

document.getElementById("register").addEventListener("click", function() {
    let elementsRegister = document.getElementsByClassName("container");
    for(let i = 0; i < elementsRegister.length; i++) elementsRegister[i].remove();

    register.userRegister();  
    
    document.getElementById("registerSubmitButton").addEventListener("click", function() {
        console.log("register here");
        window.location.reload();
    });
});

document.getElementById("instructions").addEventListener("click", function() {
    let elementsRegister = document.getElementsByClassName("container");
    for(let i = 0; i < elementsRegister.length; i++) elementsRegister[i].remove();

    let instructions = document.createElement("container");
    instructions.className = "auth";
    instructions.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    document.body.appendChild(instructions);
});

document.getElementById("scoreboard").addEventListener("click", function() {
    let elementsRegister = document.getElementsByClassName("container");
    for(let i = 0; i < elementsRegister.length; i++) elementsRegister[i].remove();

    let scoreboard = document.createElement("container");
    scoreboard.className = "auth";
    scoreboard.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    document.body.appendChild(scoreboard);
});



function playRound(pitIndex){
    if(!game.endGame()){
        game.playRound(pitIndex, game.player1);
        console.log(game.pits);
    }
}

/*pitsArray.forEach(pit => {
        pit.addEventListener("click", function() {
            if(pitsArray.indexOf(pit) < numberOfPitsPerPlayer){
               console.log(numberOfPitsPerPlayer*2- pitsArray.indexOf(pit));
            }
            else{
                console.log(pitsArray.indexOf(pit) - numberOfPitsPerPlayer);
            }
        });
    });*/



