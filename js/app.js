import { Register } from './auth/Register.js';
import Game from './Game.js';
import GameView from "./GameView.js"
import * as utils from './utils/utils.js';
import * as pageLoader from './pages.js';
import EventClick from './EventClick.js';

let gameView = new GameView();
let game = new Game();
let register = new Register();
let appCopy = utils.getElementCopy("app");

let state = utils.pages.GAME_MODE;
// First listens to buttons with id="opponentComputer" and id="opponentPlayer"
let ec = new EventClick(register, game, gameView);




/*ev.addEventListenerGameMode(register, game, gameView);
ev.addEventListenerInstructions(game, gameView);
ev.addEventListenerScoreboard(game, gameView);
ev.addEventListenerPlay(register, game, gameView);*/

/*document.getElementById("register").addEventListener("click", function() {
    console.log(register.isUserRegistered());
    if(register.isUserRegistered()) {
        window.location.reload();
    } else {
        utils.cleanPage();
        register.displayRegister();  
        register.validateRegister(appCopy);
    }
});*/

/*function addEventListenerPlayButton() {
    document.getElementById("bt").addEventListener("click", function(){
        let nPits = document.getElementById("selectNPits");
        let nSeeds = document.getElementById("selectNSeeds");
        let numberOfPitsPerPlayer = nPits.options[nPits.selectedIndex].value;
        let numberOfSeedsPerPit = nSeeds.options[nSeeds.selectedIndex].value;
        game.create(numberOfPitsPerPlayer, numberOfSeedsPerPit, register.getUsername(), "mafarrico");
        game.player1.setPassword("123456");
        game.player2.setPassword("123456");
        join(game.player1);
        gameView.createGameMessage("app", game);
        gameView.createBoard("app", numberOfPitsPerPlayer, game.pits, game);
        addEventListenerInPits();
    });
}*/


/*document.getElementById("play").addEventListener("click", function() {
    utils.removeClass("active");
    utils.addClass("play", "active");
    pageLoader.loadInitialPage();
    addEventListenerPlayButton();
});*/

/*document.getElementById("instructions").addEventListener("click", function() {
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
});*/

/*document.getElementById("scoreboard").addEventListener("click", function() {
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
});*/

/*function playRound(pitIndex){
    if(!game.endGame()){
        game.playRound(pitIndex);
        gameView.updateGameBoard(game);
        gameView.updateGameMessages(game);
    } else {
        gameView.showEndGameMessage(game);
        addEventListenerPlayButton();
    }*/
    /*    game.playRound(pitIndex, game.currentPlayer);
        console.log(game.currentPlayer);
        console.log(game.pits);
    } else addEventListenerPlayButton();*/
//}

/*function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}*/

/*function addEventListenerInPits(){
    const pits = document.querySelectorAll(".small_pit");
    const pitsArray = Array.from(pits);
    addEventListenerQuitButton();
    addEventListenerRestartButton();
    pitsArray.forEach(pit => {
        pit.addEventListener("click", async function() {
           if (pitsArray.indexOf(pit) >= game.numberOfPitsPerPlayer){
               playRound(pitsArray.indexOf(pit) - game.numberOfPitsPerPlayer); 
           } else {
               playRound(game.numberOfPitsPerPlayer*2 - pitsArray.indexOf(pit)); 
           }
            if(game.currentPlayer == game.player2) {
                do{
                    await sleep(2000);
                    playRound(game.getBestMove());  
                } while(game.playAgain);
            }
        });
    });
}

function addEventListenerRestartButton() {
    document.getElementById("restart").addEventListener("click", function() {
        utils.removeElementsByClassName("board");
        document.getElementById("playersNames").remove();
        document.getElementById("gameButtons").remove();
        game.create(game.getNumberOfPitsPerPlayer(), game.getNumberOfSeedsPerPit(), register.getUsername(), "mafarrico");
        gameView.resetGameMessages("app", game);
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

*/

