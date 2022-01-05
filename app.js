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
    const pitsArray = Array.from(pits);
    pitsArray.forEach(pit => {
        pit.addEventListener("click", function() {
            console.log(pitsArray.indexOf(pit));
           if (pitsArray.indexOf(pit) >= game.numberOfPitsPerPlayer){
               playRound(pitsArray.indexOf(pit) - game.numberOfPitsPerPlayer); 
           } else {
               playRound(game.numberOfPitsPerPlayer*2 - pitsArray.indexOf(pit)); 
           }
           gameView.updateGameView(game);
        });
    });
});

function playRound(pitIndex){
    if(!game.endGame()){
        game.playRound(pitIndex, game.currentPlayer);
        console.log(game.currentPlayer);
        console.log(game.pits);
    }
}

/*pitsArray.forEach(pit => {
        pit.addEventListener("click", function() {
            if(pitsArray.indexOf(pit) < numberOfPitsPerPlayer){
               console.log(numberOfPitsPerPlayer*2- pitsArray.indexOf(pit));
            }
            else{
                console.log(pitsArray.indexOf(pit) - numberOfPitsPerPlayer);
            }
        });
    });*/