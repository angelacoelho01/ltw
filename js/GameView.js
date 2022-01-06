export default class GameView {
    constructor(){}

    createBoard(parentID, numberOfPitsPerPlayer, numberOfSeedsPerPit){
        this.board = new Board(parentID, numberOfPitsPerPlayer, numberOfSeedsPerPit);
    }
    updateGameView(game){
        let divPits = document.querySelectorAll(".small_pit");
        let leftCapturePit = document.querySelector(".left_capture_pit");
        let rightCapturePit = document.querySelector(".right_capture_pit");
        let pits = Array.from(divPits);
       
        for(let i = 0; i < pits.length+2; i++){
            if (i < game.numberOfPitsPerPlayer){
                this.board.updateNumberOfSeeds(pits[i + parseInt(game.numberOfPitsPerPlayer)], game.pits[i]);
            } else if (i > game.numberOfPitsPerPlayer && i < game.totalNumberOfPits - 1){
                this.board.updateNumberOfSeeds(pits[game.numberOfPitsPerPlayer*2-i], game.pits[i]);
            } else if (i == game.rightCapturePit){
                this.board.updateNumberOfSeeds(rightCapturePit, game.pits[i]);
            } else if (i == game.leftCapturePit){
                this.board.updateNumberOfSeeds(leftCapturePit, game.pits[i]);
            }
        }
    }
}

class Board {
    constructor(parentID, pitsPerPlayer, seedsPerPit) {
        const parent = document.getElementById(parentID);
        const board = document.createElement("div");
        const pitsUp = document.createElement("div");
        const pitsDown = document.createElement("div");

        board.className = "board";
        pitsUp.className = "small_pits_up";
        pitsDown.className = "small_pits_down";

        parent.appendChild(board);
        board.appendChild(pitsUp);
        board.appendChild(pitsDown);
        
        for(let i = 0; i < pitsPerPlayer*2+2; i++){
            let pit = document.createElement("div");
            if (i == pitsPerPlayer) pit.className = "right_capture_pit";
            else if (i == pitsPerPlayer*2 + 1) pit.className = "left_capture_pit";
            else pit.className = "small_pit";

            if (i < pitsPerPlayer) pitsDown.appendChild(pit)
            else if (i == pitsPerPlayer || i == pitsPerPlayer*2 + 1) board.appendChild(pit);
            else pitsUp.appendChild(pit);

            for (let j = 0; j < seedsPerPit[i]; j++){
                let seed = document.createElement("div");
                let left = Math.floor((Math.random() * (60 - 5) + 1) + 5);
                let top = Math.floor((Math.random() * (65 - 5) + 1) + 5);
                seed.style.top=top+"%";
                seed.style.left=left+"%";
                seed.className = "seed";
                pit.appendChild(seed);
            }
        }
    }
    updateNumberOfSeeds(parent, numberOfSeeds){
        if(parent.childElementCount != numberOfSeeds){
            this.removeChilds(parent);
            this.addNewSeeds(parent, numberOfSeeds);
        }
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
}