import { Player } from "./Player.js";

export default class Game {
    constructor() {
        this.hasStarted = false;
        this.id = null;
        this.player1 = new Player("Player 1");
        this.player2 = new Player("Computer");
        this.multiplayer = false;
        this.hasStarted = false;
        this.leave = false;
    }

    create(numberOfPitsPerPlayer, numberOfSeedsPerPit, player1, player2){
        this.pits = new Array(numberOfPitsPerPlayer*2 + 2).fill(numberOfSeedsPerPit);
        this.numberOfSeedsPerPit = numberOfSeedsPerPit;
        this.numberOfPitsPerPlayer = numberOfPitsPerPlayer;
        this.totalNumberOfPits = this.numberOfPitsPerPlayer*2 + 2;
        this.rightCapturePit = numberOfPitsPerPlayer;
        this.leftCapturePit = this.totalNumberOfPits - 1;
        this.pits[this.leftCapturePit] = 0;
        this.pits[this.rightCapturePit] = 0;
        this.currentPlayer = this.player1;
        this.playAgain = false;
        this.winner = null;
    }

    setLeave(leave) {
        this.leave = leave;
    }

    setHasGameStarted(hasStarted) {
        this.hasStarted = hasStarted;
    }

    hasGameStarted() {
        return this.hasStarted;
    }

    getNumberOfPitsPerPlayer() {
        return this.numberOfPitsPerPlayer;
    }

    getNumberOfSeedsPerPit() {
        return this.numberOfSeedsPerPit;
    }

    getPlayer1() {
        return this.player1;
    }

    setPlayer1(player1) {
        this.player1 = player1;
    }

    getPlayer2() {
        return this.player2;
    }

    setMultiplayer(multiplayer) {
        this.multiplayer = multiplayer;
    }

    isMultiplayer() {
        return this.multiplayer;
    }

    isInPlayer1Pits(index){
        return index < this.numberOfPitsPerPlayer;
    }

    isInPlayer2Pits(index){
        return index > this.numberOfPitsPerPlayer && index < this.totalNumberOfPits - 1;
    }


    playRound(startPit){
        let seedsToBeMoved = this.pits[startPit];
        this.pits[startPit] = 0;
        for(let i = 1; i <= seedsToBeMoved; i++){
            if (startPit + i == this.leftCapturePit){
                if (this.currentPlayer == this.player1){
                    seedsToBeMoved = seedsToBeMoved -i + 1;
                    startPit = -1;
                    i = 0;
                } else {
                    this.pits[startPit + i]++;
                    seedsToBeMoved-=i;
                    startPit = -1;
                    i = 0;
                    if (seedsToBeMoved == 0) {
                        this.playAgain = true;
                        return;
                    }
                }
            } else if (startPit + i == this.rightCapturePit){
                if (this.currentPlayer == this.player1){
                    this.pits[startPit + i]++;
                    if (seedsToBeMoved == i) {
                        this.playAgain = true;
                        return;
                    }
                } else {
                    seedsToBeMoved++;
                }
            } else if (seedsToBeMoved == i && this.pits[startPit + i] == 0 && this.pits[this.numberOfPitsPerPlayer*2 - (startPit + i)] != 0){
                if (this.currentPlayer ==this.player1 && this.isInPlayer1Pits(startPit + i)){
                    this.pits[this.rightCapturePit] += parseInt(this.pits[this.numberOfPitsPerPlayer*2 - (startPit + i)]) + 1;
                    this.pits[this.numberOfPitsPerPlayer*2 - (startPit + i)] = 0;
                }
                else if( this.currentPlayer == this.player2 && this.isInPlayer2Pits(startPit + i)){
                    this.pits[this.leftCapturePit] += parseInt(this.pits[this.numberOfPitsPerPlayer*2 - (startPit + i)]) + 1;
                    this.pits[this.numberOfPitsPerPlayer*2 - (startPit + i)] = 0;
                }
                else {
                    this.pits[startPit + i]++;
                }
            }
            else {
                this.pits[startPit + i]++;
            }
        }
        this.playAgain = false;
        this.currentPlayer = this.currentPlayer == this.player1 ? this.player2 : this.player1;
    }

    endGame(){
        let player1HasNoSeeds = true;
        let player2HasNoSeeds = true;

        console.log("leave = " + this.leave);

        for(let i = 0; i < this.rightCapturePit; i++){
            if (this.pits[i] != 0){
                player1HasNoSeeds = false;
                break;
            }
        }
        for(let i = this.rightCapturePit - (-1); i < this.leftCapturePit; i++){
            if (this.pits[i] != 0) {
                player2HasNoSeeds = false; 
                break;
            }
        }
        if (player1HasNoSeeds || player2HasNoSeeds || this.leave){
            if (this.pits[this.rightCapturePit] > this.pits[this.leftCapturePit]){
                this.winner = this.player1;
                this.winner.points = this.pits[this.rightCapturePit];
            } else {
                this.winner = this.player2;
                this.winner = pits[this.leftCapturePit];
            }
            return true;
        }
        return false;
    }
    getBestMove(){ //ESQUECER ESTE ESPARGUETE E COLOCAR UM ARRAY NOS ARGUMENTOS DO PLAYROUND
        let bestPit = 0;
        let seedsInBestPit = 0;
        let currPits = Object.assign({}, this.pits);
        let currPlayer = this.currentPlayer == this.player1 ? this.player1 : this.player2;
        if (this.currentPlayer == this.player1){
            for (let i = 0; i < this.rightCapturePit; i++){
                this.playRound(i);
                if (seedsInBestPit < this.pits[this.rightCapturePit]) {
                    bestPit = i;
                    seedsInBestPit = this.pits[this.rightCapturePit];
                }
                this.pits = Object.assign({}, currPits);
                this.currentPlayer = currPlayer;
            }
        } else {
            for (let i = parseInt(this.rightCapturePit) + 1; i < this.leftCapturePit; i++){
                this.playRound(i);
                if (seedsInBestPit < this.pits[this.leftCapturePit]) {
                    bestPit = i;
                    seedsInBestPit = this.pits[this.leftCapturePit];
                }
                this.pits = Object.assign({}, currPits);
                this.currentPlayer = currPlayer;
            }
        }
        return bestPit;
    }
}

