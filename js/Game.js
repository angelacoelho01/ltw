export default class Game {
    constructor() {
        this.hasStarted = false;
    }

    create(numberOfPitsPerPlayer, numberOfSeedsPerPit, name1, name2){
        this.pits = new Array(numberOfPitsPerPlayer*2 + 2).fill(numberOfSeedsPerPit);
        this.player1 = new Player(name1);
        this.player2 = new Player(name2);
        this.numberOfPitsPerPlayer = numberOfPitsPerPlayer;
        this.totalNumberOfPits = this.numberOfPitsPerPlayer*2 + 2;
        this.rightCapturePit = numberOfPitsPerPlayer;
        this.leftCapturePit = this.totalNumberOfPits - 1;
        this.pits[this.leftCapturePit] = 0;
        this.pits[this.rightCapturePit] = 0;
        this.currentPlayer = this.player1;
        this.hasStarted = true;
    }

    getPlayer1() {
        return this.player1;
    }

    getPlayer2() {
        return this.player2;
    }

    isInPlayer1Pits(index){
        return index < this.numberOfPitsPerPlayer;
    }

    isInPlayer2Pits(index){
        return index > this.numberOfPitsPerPlayer && index < this.totalNumberOfPits - 1;
    }

    playRound(startPit, player){
        let seedsToBeMoved = this.pits[startPit];
        this.pits[startPit] = 0;
        for(let i = 1; i <= seedsToBeMoved; i++){
            if (startPit + i == this.leftCapturePit){
                if (player == this.player1){
                    seedsToBeMoved = seedsToBeMoved -i + 1;
                    startPit = -1;
                    i = 0;
                } else {
                    this.pits[startPit + i]++;
                    seedsToBeMoved-=i;
                    startPit = -1;
                    i = 0;
                    if (seedsToBeMoved == 0) return; //The player will play again
                }
            } else if (startPit + i == this.rightCapturePit){
                if (player == this.player1){
                    this.pits[startPit + i]++;
                    if (seedsToBeMoved == i) return; //The player will play again
                } else {
                    seedsToBeMoved++;
                }
            } else if (seedsToBeMoved == i && this.pits[startPit + i] == 0 && this.pits[this.numberOfPitsPerPlayer*2 - (startPit + i)] != 0){
                if (player==this.player1 && this.isInPlayer1Pits(startPit + i)){
                    this.pits[this.rightCapturePit] += parseInt(this.pits[this.numberOfPitsPerPlayer*2 - (startPit + i)]) + 1;
                    this.pits[this.numberOfPitsPerPlayer*2 - (startPit + i)] = 0;
                }
                else if( player == this.player2 && this.isInPlayer2Pits(startPit + i)){
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
        this.currentPlayer = this.currentPlayer == this.player1 ? this.player2 : this.player1;
    }

    endGame(){
        let player1HasNoSeeds = true;
        let player2HasNoSeeds = true;
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
        return player1HasNoSeeds || player2HasNoSeeds;
    }
}

class Player{
    constructor(name) {
        this.name = name;
        this.points = 0;
    }

    getName() {
        return this.name;
    }

    getPoints() {
        return this.points;
    }
}