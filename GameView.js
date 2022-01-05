export default class GameView {
    constructor(root){
        this.root = root;
    }
    createBoard(numberOfPitsPerPlayer, numberOfSeedsPerPit){
        this.board = new Board(this.root, numberOfPitsPerPlayer, numberOfSeedsPerPit);
    }
    removeChilds(parent){
        while(parent.firstChild){
            parent.removeChild(parent.lastChild);
        }
    }
    addNewSeeds(parent, numberOfSeeds){
        for(let i = 0; i < numberOfSeeds; i++){
            let seed = document.createElement("div");
            let left = Math.floor((Math.random() * (60 - 5) + 1) + 5);
            let top = Math.floor((Math.random() * (65 - 5) + 1) + 5);
            seed.style.top=top+"%";
            seed.style.left=left+"%";
            seed.className = "seed";
            parent.appendChild(seed);
        }
    }
    updateNumberOfSeeds(parent, numberOfSeeds){
        if(parent.childElementCount != numberOfSeeds){
            this.removeChilds(parent);
            this.addNewSeeds(parent, numberOfSeeds);
        }
    }
    updateGameView(game){
        let divPits = document.querySelectorAll(".small_pit");
        let leftCapturePit = document.querySelector(".left_capture_pit");
        let rightCapturePit = document.querySelector(".right_capture_pit");
        let pits = Array.from(divPits);
       
        for(let i = 0; i < pits.length+2; i++){
            if (i < game.numberOfPitsPerPlayer){
                this.updateNumberOfSeeds(pits[i + parseInt(game.numberOfPitsPerPlayer)], game.pits[i]);
            } else if (i > game.numberOfPitsPerPlayer && i < game.totalNumberOfPits - 1){
                this.updateNumberOfSeeds(pits[game.numberOfPitsPerPlayer*2-i], game.pits[i]);
            } else if (i == game.rightCapturePit){
                this.updateNumberOfSeeds(rightCapturePit, game.pits[i]);
            } else if (i == game.leftCapturePit){
                this.updateNumberOfSeeds(leftCapturePit, game.pits[i]);
            }
        }
    }
}

class Board {
    constructor(parentID, pitsPerPlayer, seedsPerPit) {
        const parent = document.getElementById(parentID);
        const board = document.createElement("div");
        const leftCapturePit = document.createElement("div");
        const rightCapturePit = document.createElement("div");
        const pitsUp = document.createElement("div");
        const pitsDown = document.createElement("div");

        board.className = "board";
        leftCapturePit.className = "left_capture_pit";
        rightCapturePit.className = "right_capture_pit";
        leftCapturePit.className = "left_capture_pit";
        pitsUp.className = "small_pits_up";
        pitsDown.className = "small_pits_down";

        parent.appendChild(board);
        board.appendChild(pitsUp);
        board.appendChild(pitsDown);
        
        for(let i = 0; i < pitsPerPlayer*2; i++){
            let smallPit = document.createElement("div");
            smallPit.className = "small_pit";
            if (i < pitsPerPlayer){ pitsDown.appendChild(smallPit) }
            else { pitsUp.appendChild(smallPit); } 
            for (let j = 0; j < seedsPerPit; j++){
                let seed = document.createElement("div");
                let left = Math.floor((Math.random() * (60 - 5) + 1) + 5);
                let top = Math.floor((Math.random() * (65 - 5) + 1) + 5);
                seed.style.top=top+"%";
                seed.style.left=left+"%";
                seed.className = "seed";
                smallPit.appendChild(seed);
            }
        }

        board.appendChild(rightCapturePit);
        board.appendChild(leftCapturePit);
    }
    randomInRange(min, max) {
    return(Math.floor((Math.random() * (max - min) + 1) + min));    
    }
}