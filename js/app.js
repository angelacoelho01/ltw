import { Login } from './Login.js';
import { Register } from './Register.js';
import Game from './Game.js';
import GameView from "./GameView.js"

let gameView = new GameView();
let game = new Game();
let login = new Login();
let register = new Register();

document.getElementById("bt").addEventListener("click", function(){
    let nPits = document.getElementById("selectNPits");
    let nSeeds = document.getElementById("selectNSeeds");
    let numberOfPitsPerPlayer = nPits.options[nPits.selectedIndex].value;
    let numberOfSeedsPerPit = nSeeds.options[nSeeds.selectedIndex].value;
    game.create(numberOfPitsPerPlayer, numberOfSeedsPerPit, "sonso", "mafarrico");
    gameView.createBoard("app", numberOfPitsPerPlayer, game.pits);
    gameView.createGameMessage("app", game);
    addEventListenerInPits();
});

document.getElementById("login").addEventListener("click", function() {
    let elementsLogin = document.getElementsByClassName("container");
    for(let i = 0; i < elementsLogin.length; i++) elementsLogin[i].remove();

    login.userLogin();

    document.getElementById("loginSubmitButton").addEventListener("click", function() {
        console.log("login here");
        window.location.reload();
    });
});

document.getElementById("register").addEventListener("click", function() {
    let elementsRegister = document.getElementsByClassName("container");
    for(let i = 0; i < elementsRegister.length; i++) elementsRegister[i].remove();

    register.userRegister();  
    
    document.getElementById("registerSubmitButton").addEventListener("click", function() {
        console.log("register here");
        window.location.reload();
    });
});

document.getElementById("instructions").addEventListener("click", function() {
    let elementsInstruction = document.getElementsByClassName("container");
    for(let i = 0; i < elementsInstruction.length; i++) elementsInstruction[i].remove();

    let container = document.createElement("container");
    container.className = "container";
    container.id = "app";

    let instructions = document.createElement("div");
    instructions.className = "auth";
    instructions.innerHTML = "Instructions";

    let button = document.createElement("button");

    button.id = "back";
    button.type = "submit";
    button.innerHTML = "Back";
        
    instructions.appendChild(button);

    container.appendChild(instructions);
    document.body.appendChild(container);

    document.getElementById("back").addEventListener("click", function() {
        if (game.hasStarted) {
            gameView.createBoard("app", game.numberOfPitsPerPlayer, game.pits);
            addEventListenerInPits();
        }
        else window.location.reload();
    });
});

document.getElementById("scoreboard").addEventListener("click", function() {
    let elementsScoreboard = document.getElementsByClassName("container");
    for(let i = 0; i < elementsScoreboard.length; i++) elementsScoreboard[i].remove();

    let container = document.createElement("container");
    container.className = "container";
    container.id = "app";

    let scoreboard = document.createElement("container");
    scoreboard.className = "auth";
    scoreboard.innerHTML = "Scoreboard";
    container.appendChild(scoreboard);

    let button = document.createElement("button");

    button.id = "back";
    button.type = "submit";
    button.innerHTML = "Back";
        
    scoreboard.appendChild(button);

    container.appendChild(scoreboard);

    document.body.appendChild(container);

    document.getElementById("back").addEventListener("click", function() {
        if (game.hasStarted) {
            gameView.createBoard("app", game.numberOfPitsPerPlayer, game.pits);
            addEventListenerInPits();
        }
        else window.location.reload();
    });
});

function playRound(pitIndex){
    if(!game.endGame()){
        game.playRound(pitIndex);
        gameView.updateGameBoard(game);
        gameView.updateGameMessages(game);
    } else {
        gameView.showEndGameMessage(game);
    }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function addEventListenerInPits(){
    const pits = document.querySelectorAll(".small_pit");
    const pitsArray = Array.from(pits);
    pitsArray.forEach(pit => {
        pit.addEventListener("click", async function() {
            console.log(pitsArray.indexOf(pit));
           if (pitsArray.indexOf(pit) >= game.numberOfPitsPerPlayer){
               playRound(pitsArray.indexOf(pit) - game.numberOfPitsPerPlayer); 
           } else {
               playRound(game.numberOfPitsPerPlayer*2 - pitsArray.indexOf(pit)); 
           }
            if(game.currentPlayer == game.player2) {
                do{
                    await sleep(2000);
                    playRound(game.getBestMove());  
                } while(game.playAgain);
            }
        });
    });
}

const url = 'http://twserver.alunos.dcc.fc.up.pt:8008/';

async function register(nick, pass) {
    await fetch(url + 'register', {
    method: 'POST',
    body: JSON.stringify({
        nick: nick, 
        pass: pass
    }),
})
    .then(response => response.json())
    .then(//VAI PARA A PÁGINA DE LOGIN
        );
}

async function join() {
await fetch(url + 'join', {
    method: 'POST',
    body: JSON.stringify({
        group:"63", 
        nick: game.player1.name, 
        password: "123456",
        size: game.numberOfPitsPerPlayer,
        initial: game.numberOfSeedsPerPit
    }),
})
    .then(response => response.json())
    .then(data => console.log(data));
}


