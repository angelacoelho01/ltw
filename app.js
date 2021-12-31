import Game from "./Game.js"
import GameView from "./GameView.js"

let gameView = new GameView("app");
let game = new Game();
let hasGameStarted = false;

document.getElementById("bt").addEventListener("click", function(){
    let nPits = document.getElementById("selectNPits");
    let nSeeds = document.getElementById("selectNSeeds");
    let numberOfPitsPerPlayer = nPits.options[nPits.selectedIndex].value;
    let numberOfSeedsPerPit = nSeeds.options[nSeeds.selectedIndex].value;
    gameView.createBoard(numberOfPitsPerPlayer, numberOfSeedsPerPit);
    game.create(numberOfPitsPerPlayer, numberOfSeedsPerPit, "sonso", "mafarrico");
    const pits = document.querySelectorAll(".small_pit");
    const a = Array.from(pits);
    a.forEach(pit => {
        pit.addEventListener("click", function() {
            if(a.indexOf(pit) < numberOfPitsPerPlayer){
               console.log(numberOfPitsPerPlayer*2- a.indexOf(pit));
            }
            else{
                console.log(a.indexOf(pit) - numberOfPitsPerPlayer);
            }
        });
    });
});

function playRound(pitIndex){
    if(!game.endGame()){
        game.playRound(pitIndex, game.player1);
        console.log(game.pits);
    }
}

