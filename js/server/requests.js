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

export async function join(game) {
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
        update(response.game, game.player1.getName());
    });
}

function update(gameID, nick) {
    let updateUrl = url + 'update?nick=' + nick + '&game=' + gameID;
    let eventSource = new EventSource(encodeURI(updateUrl));
    console.log("ENTERS UPDATE FUNCTION REQUEST");
    /*eventSource.onmessage = function(event) {
        console.log("enters in update function request");
        const data = JSON.parse(event.data);
        console.log(data);
    }*/
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


    
    