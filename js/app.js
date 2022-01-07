import { Login } from './auth/Login.js';
import { Register } from './auth/Register.js';
import Game from './Game.js';
import GameView from "./GameView.js"
import {removeElementsByClassName, removeClass, createButton, addClass, loadPage, getElementCopy} from './utils/utils.js';
import * as auth from './auth/auth.js';

let gameView = new GameView();
let game = new Game();
let login = new Login();
let register = new Register();
let appCopy = getElementCopy("app");

document.getElementById("login").addEventListener("click", function() {
    loadPage(game);
    login.userLogin();
    auth.validateLogin(appCopy);
});

document.getElementById("register").addEventListener("click", function() {
    loadPage(game);

    if(auth.isUserLoggedIn()) {
        window.location.reload();                     
    } else {
        register.userRegister();  
        auth.validateRegister();
    }
});

document.getElementById("bt").addEventListener("click", function(){
    let nPits = document.getElementById("selectNPits");
    let nSeeds = document.getElementById("selectNSeeds");
    let numberOfPitsPerPlayer = nPits.options[nPits.selectedIndex].value;
    let numberOfSeedsPerPit = nSeeds.options[nSeeds.selectedIndex].value;
    game.create(numberOfPitsPerPlayer, numberOfSeedsPerPit, auth.getUsername(), "mafarrico");
    gameView.createBoard("app", numberOfPitsPerPlayer, game.pits, game);
    addEventListenerInPits();
});

document.getElementById("play").addEventListener("click", function() {
    window.location.reload();
});

document.getElementById("instructions").addEventListener("click", function() {
    loadPage(game);
    addClass("instructions", "active");

    let container = document.createElement("container");
    container.className = "container";
    container.id = "app";

    let instructions = document.createElement("div");
    instructions.className = "auth";
    instructions.innerHTML = "Instructions";

    if(game.hasStarted) {
        let resumeButton = createButton("resumeButton", "submit", "Resume");
        instructions.appendChild(resumeButton);
    }

    let playButton = createButton("playButton", "submit", "Play") ;
    instructions.appendChild(playButton);

    container.appendChild(instructions);
    document.body.appendChild(container);

    document.getElementById("playButton").addEventListener("click", function() {
        window.location.reload();
    });

    if(game.hasStarted) {
        document.getElementById("resumeButton").addEventListener("click", function() {
            gameView.createBoard("app", game.numberOfPitsPerPlayer, game.pits, game);
            addEventListenerInPits();
            removeClass("active");
            addClass("play", "active");
        });
    }
});

document.getElementById("scoreboard").addEventListener("click", function() {
    loadPage(game);
    addClass("scoreboard", "active");

    let container = document.createElement("container");
    container.className = "container";
    container.id = "app";

    let scoreboard = document.createElement("container");
    scoreboard.className = "auth";
    scoreboard.innerHTML = "Scoreboard";
    container.appendChild(scoreboard);

    if(game.hasStarted) {
        let resumeButton = createButton("resumeButton", "submit", "Resume");
        scoreboard.appendChild(resumeButton);
    }

    let playButton = createButton("playButton", "submit", "Play");        
    scoreboard.appendChild(playButton);

    container.appendChild(scoreboard);

    document.body.appendChild(container);

    document.getElementById("playButton").addEventListener("click", function() {
        window.location.reload();
    });

    if(game.hasStarted) {
        document.getElementById("resumeButton").addEventListener("click", function() {
            gameView.createBoard("app", game.numberOfPitsPerPlayer, game.pits, game);
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


