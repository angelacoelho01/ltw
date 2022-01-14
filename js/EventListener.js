import * as pages from './pages.js';
import { Register } from './auth/Register.js';
import * as utils from './utils/utils.js';
import Game from './Game.js';

function addEventListenerGameOptions(game, gameView) {
    document.getElementById("playButton").addEventListener("click", function() {
        // Start game according to game options
        let nPits = document.getElementById("selectNPits");
        let nSeeds = document.getElementById("selectNSeeds");
        let numberOfPitsPerPlayer = nPits.options[nPits.selectedIndex].value;
        let numberOfSeedsPerPit = nSeeds.options[nSeeds.selectedIndex].value;

        game.create(numberOfPitsPerPlayer, numberOfSeedsPerPit, "sonso", "mafarrico");
        gameView.createGameMessage("app", game);
        gameView.createBoard("app", numberOfPitsPerPlayer, game.pits, game);

    });
}

function addEventListenerRegister(game, gameView) {
    document.getElementById("registerButton").addEventListener("click", function() {
        pages.gameOptionsPage();
        addEventListenerGameOptions(game, gameView);
    });
}

function addEventListenerInstructionsPlayButton(game, gameView) {
    document.getElementById("instructionsPlayButton").addEventListener("click", function() {
        pages.gameOptionsPage();
        addEventListenerGameOptions(game, gameView);
    });
}

function addEventListenerScoreboardPlayButton(game, gameView) {
    document.getElementById("scoreboardPlayButton").addEventListener("click", function() {
        pages.gameOptionsPage();
        addEventListenerGameOptions(game, gameView);
    });
}

export function addEventListenerOpponentOptions(register, game, gameView) {
    // Against computer register is optional unlike the game against another player
    document.getElementById("opponentComputer").addEventListener("click", function () {
        // The default name for player 2 is already "Computer" so there is no need to change it
        // Send player to game options page
        pages.gameOptionsPage();
        addEventListenerGameOptions(game, gameView);
    });

    document.getElementById("opponentPlayer").addEventListener("click", function () {
        // Send player to register page
        register.displayRegister();
        register.validateRegister();
        addEventListenerRegister(game, gameView);
    });
}

export function addEventListenerInstructions(game, gameView) {
    document.getElementById("instructions").addEventListener("click", function() {
        pages.instructionsPage(game);
        addEventListenerInstructionsPlayButton(game, gameView);
    });
}

export function addEventListenerScoreboard(game, gameView) {
    document.getElementById("scoreboard").addEventListener("click", function() {
        pages.scoreboardPage(game);
        addEventListenerScoreboardPlayButton(game, gameView);
    });
}