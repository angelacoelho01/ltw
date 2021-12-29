function getNPits() {
    let d = document.getElementById("selectNPits");
    return (d.options[d.selectedIndex].value);
}

document.getElementById("bt").addEventListener("click", function(){
    let board = new Board("app", getNPits());
});

class Board {
    constructor(parentID, PitsPerPlayer) {
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
        
        this.content = new Array(PitsPerPlayer*2);
        for(let i = 0; i < PitsPerPlayer*2; i++){
            this.content[i] = 4;
            let smallPit = document.createElement("div");
            smallPit.className = "small_pit";
            if (i < PitsPerPlayer){ pitsDown.appendChild(smallPit) }
            else { pitsUp.appendChild(smallPit); } 
        }

        board.appendChild(rightCapturePit);
        board.appendChild(leftCapturePit);
    }
}

    /*<div id=app></div>
    <script src="app.js" type="module"></script>
    <div class="header">
        <div class="logo">
            <img src="images/new_logo.png" class="logo_image" alt="Logo">
            <h1 class="logo_text">Mancala</h1>
        </div>
    </div>*/