import { Login } from './Login.js';
import { Register } from './Register.js';
import Game from './Game.js';
import GameView from "./GameView.js"
import {removeElementsByClassName, removeClass, createButton, addClass, loadPage} from './utils.js';

let gameView = new GameView();
let game = new Game();
let login = new Login();
let register = new Register();

document.getElementById("bt").addEventListener("click", function(){
    let nPits = document.getElementById("selectNPits");
    let nSeeds = document.getElementById("selectNSeeds");
    let numberOfPitsPerPlayer = nPits.options[nPits.selectedIndex].value;
    let numberOfSeedsPerPit = nSeeds.options[nSeeds.selectedIndex].value;
    game.create(numberOfPitsPerPlayer, numberOfSeedsPerPit, "sonso", "mafarrico");
    gameView.createBoard("app", numberOfPitsPerPlayer, game.pits);
    addEventListenerInPits();
});

document.getElementById("login").addEventListener("click", function() {
    loadPage();
    login.userLogin();

    document.getElementById("loginSubmitButton").addEventListener("click", function() {
        window.location.reload();
    });
});

document.getElementById("register").addEventListener("click", function() {
    loadPage();
    register.userRegister();  
    
    document.getElementById("registerSubmitButton").addEventListener("click", function() {
        window.location.reload();
    });
});

document.getElementById("play").addEventListener("click", function() {
    window.location.reload();
});

document.getElementById("instructions").addEventListener("click", function() {
    loadPage();
    addClass("instructions", "active");

    let container = document.createElement("container");
    container.className = "container";
    container.id = "app";

    let instructions = document.createElement("div");
    instructions.className = "auth";
    instructions.innerHTML = "Instructions";

    let playButton = createButton("playButton", "submit", "Play") ;
    instructions.appendChild(playButton);

    if(game.hasStarted) {
        let resumeButton = createButton("resumeButton", "submit", "Resume");
        instructions.appendChild(resumeButton);
    }

    container.appendChild(instructions);
    document.body.appendChild(container);

    document.getElementById("playButton").addEventListener("click", function() {
        window.location.reload();
    });

    if(game.hasStarted) {
        document.getElementById("resumeButton").addEventListener("click", function() {
            gameView.createBoard("app", game.numberOfPitsPerPlayer, game.pits);
            addEventListenerInPits();
            removeClass("active");
            addClass("play", "active");
        });
    }
});

document.getElementById("scoreboard").addEventListener("click", function() {
    loadPage();
    addClass("scoreboard", "active");

    let container = document.createElement("container");
    container.className = "container";
    container.id = "app";

    let scoreboard = document.createElement("container");
    scoreboard.className = "auth";
    scoreboard.innerHTML = "Scoreboard";
    container.appendChild(scoreboard);

    let playButton = createButton("playButton", "submit", "Play");        
    scoreboard.appendChild(playButton);

    if(game.hasStarted) {
        let resumeButton = createButton("resumeButton", "submit", "Resume");
        scoreboard.appendChild(resumeButton);
    }

    container.appendChild(scoreboard);

    document.body.appendChild(container);

    document.getElementById("playButton").addEventListener("click", function() {
        window.location.reload();
    });

    if(game.hasStarted) {
        document.getElementById("resumeButton").addEventListener("click", function() {
            gameView.createBoard("app", game.numberOfPitsPerPlayer, game.pits);
            addEventListenerInPits();
            removeClass("active");
            addClass("play", "active");
        });
    }
});

function playRound(pitIndex){
    if(!game.endGame()){
        game.playRound(pitIndex, game.currentPlayer);
        console.log(game.currentPlayer);
        console.log(game.pits);
    }
}

function addEventListenerInPits(){
    const pits = document.querySelectorAll(".small_pit");
    const pitsArray = Array.from(pits);
    pitsArray.forEach(pit => {
        pit.addEventListener("click", function() {
            console.log(pitsArray.indexOf(pit));
           if (pitsArray.indexOf(pit) >= game.numberOfPitsPerPlayer){
               playRound(pitsArray.indexOf(pit) - game.numberOfPitsPerPlayer); 
           } else {
               playRound(game.numberOfPitsPerPlayer*2 - pitsArray.indexOf(pit)); 
           }
           gameView.updateGameView(game);
        });
    });
}


