import * as eventclick from '../EventClick.js';


const url = 'http://twserver.alunos.dcc.fc.up.pt:8008/';

export async function register(nick, pass) {
    await fetch(url + 'register', {
        method: 'POST',
        body: JSON.stringify({
            nick: nick, 
            password: pass
        }),
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

export async function join(game, updateGame) {
    await fetch(url + 'join', {
        method: 'POST',
        body: JSON.stringify({
            group:"63", 
            nick: game.player1.getName(), 
            password: game.player1.getPassword(),
            size: game.numberOfPitsPerPlayer,
            initial: game.numberOfSeedsPerPit
        }),
    })
    .then(response => response.json())
    .then(response => {
        game.setID(response.game);
        update(response.game, game.player1.getName(), game, updateGame);
        console.log(response);
    });
}

function handleUpdateRequest(data, game, updateGame){

    let player1Name = game.player1.getName();
    for (let playerName in data.stores) {
        if (playerName !== player1Name) game.player2.setName(playerName);
    }
    let player2Name = document.getElementById("player2Name"); 
    if(player2Name != undefined) player2Name.innerHTML = game.player2.getName();

    if (data.board.turn == game.player2.getName()) {
        game.currentPlayer = game.player2;
    } else  {
        game.currentPlayer = game.player1;
    }
    //eventclick.update();

}

function update(gameID, nick, game, updateGame) {
    let updateUrl = url + 'update?nick=' + nick + '&game=' + gameID;
    let eventSource = new EventSource(encodeURI(updateUrl));
    eventSource.onstart = function(event){
        console.log('start');
    }
    eventSource.onmessage = function(event){
        const data = JSON.parse(event.data);
        console.log(data);
        handleUpdateRequest(data, game, updateGame);
    };
    eventSource.onerror = (e) => {
            console.error(e);
            eventSource.close();
        };
    //eventSource.close();
    console.log("ENTERS UPDATE FUNCTION REQUEST");
}

export async function leave(player, gameID) {
    await fetch(url + 'leave', {
        method: 'POST',
        body: JSON.stringify({
            nick: player.getName(),
            password: player.getPassword(),
            game: gameID
        }),
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

export async function notify(player, gameID, pit) {
    console.log("PLAYER NAME = " + player.getName());
    console.log("PLAYER PASSWORD = " + player.getPassword());
    console.log("GAME ID = " + gameID);
    console.log("MOVE = " +  pit);
    await fetch(url + 'notify', {
        method: 'POST',
        body: JSON.stringify({
            nick: player.getName(),
            password: player.getPassword(),
            game: gameID,
            move: pit
        }),
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

    
    