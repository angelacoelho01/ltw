import * as pages from './pages.js';
import * as utils from './utils/utils.js';
import * as request from './server/requests.js';
import { Player } from './Player.js';


function playRound(pitIndex, game, gameView){
    console.log("GAME HAS STARTED? " + game.hasStarted);
    let endGame = game.endGame();
    if(!endGame){
        game.playRound(pitIndex);
        gameView.updateGameBoard(game);
        gameView.updateGameMessages(game);
    } else {
        console.log("Enteres here");
        gameView.showEndGameMessage(game);
        game.setHasGameStarted(false);
        game.setLeave(false);
        //addEventListenerPlayButton();
    }
}

function addEventListenerPits(game, gameView) {
    // Set game has started
    game.setHasGameStarted(true);
    console.log("And now?" + game.hasStarted);

    addEventListenerRestartButton(game, gameView);
    addEventListenerLeaveButton(game, gameView);

    const pits = document.getElementsByClassName("small_pit");
    const pitsArray = Array.from(pits);

    pitsArray.forEach(pit => {
        pit.addEventListener("click", async function() {
            console.log("here");
           if (pitsArray.indexOf(pit) >= game.numberOfPitsPerPlayer){
               playRound(pitsArray.indexOf(pit) - game.numberOfPitsPerPlayer, game, gameView); 
           } else {
               playRound(game.numberOfPitsPerPlayer*2 - pitsArray.indexOf(pit), game, gameView); 
           }
            if(game.currentPlayer == game.player2) {
                do{
                    await utils.sleep(2000);
                    playRound(game.getBestMove(), game, gameView);  
                } while(game.playAgain);
            }
        });
    });
}

function addEventListenerGameOptions(register, game, gameView) {

    document.getElementById("playButton").addEventListener("click", function() {
        // Start game according to game options
        let nPits = document.getElementById("selectNPits");
        let nSeeds = document.getElementById("selectNSeeds");
        let numberOfPitsPerPlayer = nPits.options[nPits.selectedIndex].value;
        let numberOfSeedsPerPit = nSeeds.options[nSeeds.selectedIndex].value;
        
        game.create(numberOfPitsPerPlayer, numberOfSeedsPerPit);
        gameView.createGameMessage("app", game);
        gameView.createBoard("app", numberOfPitsPerPlayer, game.pits, game);

        request.join(game);

        addEventListenerPits(game, gameView);
    });
}

function addEventListenerRegister(register, game, gameView) {
    document.getElementById("registerButton").addEventListener("click", function() {
        pages.gameOptionsPage();
        console.log("Player 1 = " + register.getUsername());
        addEventListenerGameOptions(register, game, gameView);
    });
}

function addEventListenerInstructionsPlayButton(register, game, gameView) {
    document.getElementById("instructionsPlayButton").addEventListener("click", function() {
        pages.gameModePage();
        addEventListenerGameMode(register, game, gameView);
    });
}

function addEventListenerScoreboardPlayButton(register,game, gameView) {
    document.getElementById("scoreboardPlayButton").addEventListener("click", function() {
        pages.gameModePage();
        addEventListenerGameMode(register, game, gameView);
    });
}

function addEventListenerRestartButton(game, gameView) {
    document.getElementById("restart").addEventListener("click", function () {
        utils.cleanPage();
        game.create(game.getNumberOfPitsPerPlayer(), game.getNumberOfSeedsPerPit(), game.getPlayer1().getName(), game.getPlayer2().getName());
        gameView.resetGameMessages("app", game);
        gameView.createBoard("app", game.getNumberOfPitsPerPlayer(), game.pits, game);
        addEventListenerPits(game, gameView);
    });
}

function addEventListenerLeaveButton(game, gameView) {
    document.getElementById("leave").addEventListener("click", function() {
        // Annouce winner
        game.setLeave(true);

    });
}

export function addEventListenerGameMode(register, game, gameView) {
    // Against computer register is optional unlike the game against another player
    document.getElementById("opponentComputer").addEventListener("click", function () {
        // The default name for player 2 is already "Computer" so there is no need to change it
        // Send player to game options page
        pages.gameOptionsPage();
        game.setMultiplayer(false);
        addEventListenerGameOptions(register, game, gameView);
    });

    document.getElementById("opponentPlayer").addEventListener("click", function () {
        // Send player to register page
        register.displayRegister();
        register.validateRegister(game.player1);
        game.setMultiplayer(true);
        addEventListenerRegister(register, game, gameView);
    });
}

export function addEventListenerInstructions(register, game, gameView) {
    document.getElementById("instructions").addEventListener("click", function() {
        pages.instructionsPage(game);
        addEventListenerInstructionsPlayButton(register, game, gameView);
    });
}

export function addEventListenerScoreboard(register, game, gameView) {
    document.getElementById("scoreboard").addEventListener("click", function() {
        pages.scoreboardPage(game);
        addEventListenerScoreboardPlayButton(register, game, gameView);
    });
}

export function addEventListenerPlay(register, game, gameView) {
    document.getElementById("play").addEventListener("click", function() {
        pages.gameModePage();
        addEventListenerGameMode(register, game, gameView);
    });
}

export function addEventListenerLogoutButton() {
    document.getElementById("logoutButton").addEventListener("click", function() {
        window.location.reload();
    });
}