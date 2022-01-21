import * as pages from './pages.js';
import * as request from './server/requests.js';
import * as utils from './utils/utils.js';

export default class EventClick {
    constructor(register, game, gameView) {
        this.register = register;
        this.game = game;
        this.gameView = gameView;
        this.state = utils.pages.GAME_MODE;
        this.update();
    }

    handleClickGameModeComputer() {
        return function() {
            pages.gameOptionsPage();
            this.game.setMultiplayer(false);
            this.state =  utils.pages.GAME_OPTIONS;
            this.update();
        }
    }

    handleClickGameMode1v1() {
        return function() {
            this.register.displayRegister();
            this.register.validateRegister(this.game.player1);
            this.game.setMultiplayer(true);
            this.state = utils.pages.REGISTER;
            this.update();
        }
    }

    handleClickRegister() {
        return function() {
            pages.gameOptionsPage();
            this.update();
        }
    }

    handleClickGameOptions() {
        return function() {
            console.log("here");
            let nPits = document.getElementById("selectNPits");
            let nSeeds = document.getElementById("selectNSeeds");
            let numberOfPitsPerPlayer = nPits.options[nPits.selectedIndex].value;
            let numberOfSeedsPerPit = nSeeds.options[nSeeds.selectedIndex].value;
        
            this.game.create(numberOfPitsPerPlayer, numberOfSeedsPerPit);
            this.gameView.createGameMessage("app", this.game);
            this.gameView.createBoard("app", numberOfPitsPerPlayer, this.game.pits, this.game);

            if(this.game.multiplayer)
                request.join(this.game);

            //this.handlePits();
            this.update();

            //addEventListenerPits(game, gameView);
        }
    }

    handleInstructions() {
        return function() {
            pages.instructionsPage(this.game);
            this.state = utils.pages.INSTRUCTIONS;
            this.update();
        }
    }


    handleScoreboard() {
        return function() {
            pages.scoreboardPage(this.game);
            this.state = utils.pages.SCOREBOARD;
            this.update();
        }
    }

    handlePlay() {
        return function() {
            pages.gameModePage();
            this.state = utils.pages.GAME_MODE;
            this.update();
        }
    }

    handlePit(pitsArray, pit) {
        return async function() {
            console.log("fuck this shit");
            if (pitsArray.indexOf(pit) >= this.game.numberOfPitsPerPlayer){
                this.playRound(pitsArray.indexOf(pit) - this.game.numberOfPitsPerPlayer, this.game, this.gameView); 
            } else {
                this.playRound(this.game.numberOfPitsPerPlayer*2 - pitsArray.indexOf(pit), this.game, this.gameView); 
            }
            if(this.game.currentPlayer == this.game.player2) {
                do{
                    await utils.sleep(2000);
                    this.playRound(this.game.getBestMove(), this.game, this.gameView);  
                } while(this.game.playAgain);
            }
        }
    }

    handlePits() {
        console.log("HEREEEEEEEEEEEEEEEE");
        this.game.setHasGameStarted(true);

        //addEventListenerRestartButton(game, gameView);
        //addEventListenerLeaveButton(game, gameView);

        const pits = document.getElementsByClassName("small_pit");
        const pitsArray = Array.from(pits);

        pitsArray.forEach(pit => {
            pit.addEventListener("click", this.handlePit(pitsArray, pit).bind(this), false);
        });
    }

    handleLogout() {
        return function() {
            window.location.reload();
        }
    }

    handleRestart() {
        return function() {
            console.log("RESTART");
            utils.cleanPage();
            this.game.create(this.game.getNumberOfPitsPerPlayer(), this.game.getNumberOfSeedsPerPit(), this.game.getPlayer1().getName(), this.game.getPlayer2().getName());
            this.gameView.resetGameMessages("app", this.game);
            this.gameView.createBoard("app", this.game.getNumberOfPitsPerPlayer(), this.game.pits, this.game);
            this.update();
        }
    }

    handleLeave() {
        return function() {
            // Annouce winner
            this.game.setLeave(true);
            this.update();
        }
    }

    handleInstructionsPlayButton() {
        return function() {
            pages.gameModePage();
            this.state = utils.pages.GAME_MODE;
            this.update();
        }
    }

    handleScoreboardPlayButton() {
        return function() {
            pages.gameModePage();
            this.state = utils.pages.GAME_MODE;
            this.update();
        }
    }


    update() {
        switch(this.state) {
            case utils.pages.GAME_MODE:
                console.log("state = GAME_MODE");

                document.getElementById("opponentComputer").addEventListener("click", this.handleClickGameModeComputer().bind(this), false);
                document.getElementById("opponentPlayer").addEventListener("click", this.handleClickGameMode1v1().bind(this), false);
                document.getElementById("instructions").addEventListener("click", this.handleInstructions().bind(this), false);
                document.getElementById("scoreboard").addEventListener("click", this.handleScoreboard().bind(this), false);
                document.getElementById("play").addEventListener("click", this.handlePlay().bind(this), false);

                if(this.game.multiplayer) {
                    this.state = utils.pages.REGISTER;
                } else{
                    this.state = utils.pages.GAME_OPTIONS;
                }
                break;

            case utils.pages.GAME_OPTIONS:
                console.log("state = GAME_OPTIONS");

                // In case the game is against the computer then it is added a logout button
                if(this.game.multiplayer) {
                    document.getElementById("logoutButton").addEventListener("click", this.handleLogout().bind(this), false);
                }

                document.getElementById("playButton").addEventListener("click", this.handleClickGameOptions().bind(this), false);
                this.state = utils.pages.GAME_COMPUTER;
                break;

            case utils.pages.REGISTER:
                console.log("state = REGISTER");

                document.getElementById("registerButton").addEventListener("click", this.handleClickRegister().bind(this), false);
                this.state = utils.pages.GAME_OPTIONS;
                break;

            case utils.pages.GAME_COMPUTER:
                console.log("state = GAME_COMPUTER");

                this.handlePits();
                // Add buttons to leave ou restart game
                document.getElementById("leave").addEventListener("click", this.handleLeave().bind(this), false);
                document.getElementById("restart").addEventListener("click", this.handleRestart().bind(this), false);

                break;

            case utils.pages.INSTRUCTIONS:
                console.log("state = instructions");


                if(this.game.hasStarted) {
                } else {
                    document.getElementById("instructionsPlayButton").addEventListener("click", this.handleInstructionsPlayButton().bind(this), false);
                }
                
                break;

            case utils.pages.SCOREBOARD:
                console.log("state = scoreboard");

                if(this.game.hasStarted) {

                } else {
                    document.getElementById("scoreboardPlayButton").addEventListener("click", this.handleScoreboardPlayButton().bind(this), false);
                }
                break;
        }
    }

    playRound(pitIndex){
        console.log("GAME HAS STARTED? " + this.game.hasStarted);
        let endGame = this.game.endGame();
        if(!endGame){
            this.game.playRound(pitIndex);
            this.gameView.updateGameBoard(this.game);
            this.gameView.updateGameMessages(this.game);
        } else {
            console.log("Enteres here");
            this.gameView.showEndGameMessage(this.game);
            this.game.setHasGameStarted(false);
            this.game.setLeave(false);
            //addEventListenerPlayButton();
        }
    }
}