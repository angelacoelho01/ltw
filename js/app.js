import { Login } from './auth/Login.js';
import { Register } from './auth/Register.js';
import Game from './Game.js';
import GameView from "./GameView.js"
import * as utils from './utils/utils.js';
import * as auth from './auth/auth.js';
import * as pageLoader from './PageLoader.js';

let gameView = new GameView();
let game = new Game();
let login = new Login();
let register = new Register();
let appCopy = utils.getElementCopy("app");

console.log("Logged in?" + auth.isUserLoggedIn());

document.getElementById("login").addEventListener("click", function() {
    utils.cleanPage();
    login.userLogin();
    auth.validateLogin(appCopy);
});

document.getElementById("register").addEventListener("click", function() {

    if(auth.isUserLoggedIn()) {
        console.log("here");    
        //pageLoader.loadInitialHeader();          
        window.location.reload();
    } else {
        console.log("enters here");
        utils.cleanPage();
        register.userRegister();  
        auth.validateRegister(login, appCopy);
    }
});

function addEventListenerPlayButton() {
    document.getElementById("bt").addEventListener("click", function(){
        let nPits = document.getElementById("selectNPits");
        let nSeeds = document.getElementById("selectNSeeds");
        let numberOfPitsPerPlayer = nPits.options[nPits.selectedIndex].value;
        let numberOfSeedsPerPit = nSeeds.options[nSeeds.selectedIndex].value;
        game.create(numberOfPitsPerPlayer, numberOfSeedsPerPit, auth.getUsername(), "mafarrico");
        gameView.createBoard("app", numberOfPitsPerPlayer, game.pits, game);
        addEventListenerInPits();
    });
}


document.getElementById("play").addEventListener("click", function() {
    utils.removeClass("active");
    utils.addClass("play", "active");
    pageLoader.loadInitialPage();
    addEventListenerPlayButton();
});

document.getElementById("instructions").addEventListener("click", function() {
    utils.cleanPage();
    utils.addClass("instructions", "active");
    pageLoader.loadInstructionsPage(game);

    document.getElementById("playButton").addEventListener("click", function() {
        utils.removeClass("active");
        utils.addClass("play", "active");
        pageLoader.loadInitialPage();
        addEventListenerPlayButton();
    });

    if(game.hasStarted) {
        document.getElementById("resumeButton").addEventListener("click", function() {
            gameView.createBoard("app", game.numberOfPitsPerPlayer, game.pits, game);
            addEventListenerInPits();
            utils.removeClass("active");
            utils.addClass("play", "active");
        });
    }
});

document.getElementById("scoreboard").addEventListener("click", function() {
    utils.cleanPage();
    utils.addClass("scoreboard", "active"); 
    pageLoader.loadScoreboardPage(game);

    document.getElementById("playButton").addEventListener("click", function() {
        utils.removeClass("active");
        utils.addClass("play", "active");
        pageLoader.loadInitialPage();
        addEventListenerPlayButton();
    });

    if(game.hasStarted) {
        document.getElementById("resumeButton").addEventListener("click", function() {
            gameView.createBoard("app", game.numberOfPitsPerPlayer, game.pits, game);
            addEventListenerInPits();
            utils.removeClass("active");
            utils.addClass("play", "active");
        });
    }
});

function playRound(pitIndex){
    if(!game.endGame()){
        game.playRound(pitIndex, game.currentPlayer);
        console.log(game.currentPlayer);
        console.log(game.pits);
    } else addEventListenerPlayButton();
}

function addEventListenerInPits(){
    const pits = document.querySelectorAll(".small_pit");
    const pitsArray = Array.from(pits);
    addEventListenerQuitButton();
    addEventListenerRestartButton();
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

function addEventListenerRestartButton() {
    document.getElementById("restart").addEventListener("click", function() {
        utils.removeElementsByClassName("board");
        document.getElementById("playersNames").remove();
        document.getElementById("gameButtons").remove();
        game.create(game.getNumberOfPitsPerPlayer(), game.getNumberOfSeedsPerPit(), auth.getUsername(), "mafarrico");
        gameView.createBoard("app", game.getNumberOfPitsPerPlayer(), game.pits, game);
        addEventListenerInPits();
    });
}

function addEventListenerQuitButton() {
    document.getElementById("quit").addEventListener("click", function() {
        console.log("quit");
        pageLoader.loadInitialPage();
        game.endGame();
        game.hasStarted = false;
        addEventListenerPlayButton();
    });
}


if(game.hasStarted) {
    addEventListenerRestartButton();
    addEventListenerQuitButton();
} else {
    addEventListenerPlayButton();

}

