export default class Game {
    constructor() {}

    create(numberOfPitsPerPlayer, numberOfSeedsPerPit, name1, name2){
        this.pits = new Array(numberOfPitsPerPlayer*2 + 2).fill(numberOfSeedsPerPit);
        this.player1 = new Player(name1);
        this.player2 = new Player(name2);
        this.numberOfPitsPerPlayer = numberOfPitsPerPlayer;
        this.totalNumberOfPits = numberOfSeedsPerPit*2 + 2;
        this.rightCaturePit = numberOfPitsPerPlayer;
        this.leftCapturePit = this.totalNumberOfPits - 1;
    }

    isLastMove(seedsToBeMoved, counter){
        return seedsToBeMoved == counter;
    }

    isInPlayer1Pits(index){
        return index < this.numberOfPitsPerPlayer;
    }

    isInPlayer2Pits(index){
        return index > this.numberOfPitsPerPlayer && index < this.totalNumberOfPits - 1;
    }


    playRound(startPit, player){
        seedsToBeMoved = this.pits[startPit];
        this.pits[startPit] = 0;
        for(let i = 1; i <= seedsToBeMoved; i++){
            if (startPit + i == this.leftCapturePit){
                if (player == this.player1){
                    seedsToBeMoved-=i+1;
                    startPit = 0;
                    i = 0;
                } else {
                    this.pits[startPit + i]++;
                    seedsToBeMoved-=i;
                    startPit = 0;
                    i = 0;
                    if (seedsToBeMoved == 0) return true; //The player will play again
                }
            } else if (startPit + i == this.rightCaturePit){
                if (player == this.player1){
                    this.pits[startPit + i]++;
                    if (isLastMove(seedsToBeMoved, i)) return true; //The player will play again
                } else {
                    i--;
                }
            } else if (this.isLastMove(seedsToBeMoved, i) && this.pits[startPit + i] == 0){
                if (player==this.player1 && this.isInPlayer1Pits(startPit + i)){
                    this.pits[this.rightCaturePit]+=this.pits[this.numberOfPitsPerPlayer*2 - (startPit + i)] + 1;
                }
                else if( player == this.player2 && this.isInPlayer2Pits(startPit + i)){
                    this.pits[this.leftCaturePit]+=this.pits[this.numberOfPitsPerPlayer*2 - (startPit + i)] + 1;
                }
            }
            else {
                this.pits[startPit + i]++;
            }
        }
        return false;
    }

    endGame(){
        player1HasNoSeeds = true;
        player2HasNoSeeds = true;
        for(let i = 0; i < this.rightCaturePit; i++){
            if (this.pits[i] != 0){
                player1HasNoSeeds = false;
                break;
            }
        }
        for(let i = this.rightCaturePit + 1; i < this.leftCaturePit; i++){
            if (this.pits[i] != 0) {
                player2HasNoSeeds = false; 
            }
        }
        return player1HasNoSeeds || player2HasNoSeeds;
    }

    playGame(initialPlayer){
        player = initialPlayer;
        startPit = 0;
        while(!this.endGame()){
            if (!this.playRound(startPit, player)){
                player = player == this.player1 ? this.player2 : this.player1;
            }
        }
        this.player1.points = pits[this.rightCaturePit];
        this.player2.points = pits[this.rightCaturePit];
    }
}

class Player{
    constructor(name) {
        this.name = name;
        this.points = 0;
    }
}