function getNPits() {
    let d = document.getElementById("selectNPits");
    return (d.options[d.selectedIndex].value);
}

function getNSeeds() {
    let d = document.getElementById("selectNSeeds");
    return (d.options[d.selectedIndex].value);
}

document.getElementById("bt").addEventListener("click", function(){
    let board = new Board("app", getNPits(), getNSeeds());
});

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
        
        this.content = new Array(pitsPerPlayer*2);
        for(let i = 0; i < pitsPerPlayer*2; i++){
            this.content[i] = 4;
            let smallPit = document.createElement("div");
            smallPit.className = "small_pit";
            if (i < pitsPerPlayer){ pitsDown.appendChild(smallPit) }
            else { pitsUp.appendChild(smallPit); } 
            for (let j = 0; j < seedsPerPit; j++){
                let seed = document.createElement("div");
                seed.className = "seed";
                smallPit.appendChild(seed);
            }
        }

        board.appendChild(rightCapturePit);
        board.appendChild(leftCapturePit);
    }
}