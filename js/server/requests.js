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
        update(response.game, game.player1.getName())
    });
}

export function update(gameID, nick) {
    let updateUrl = url + 'update?nick=' + nick + '&game=' + gameID;
    let eventSource = new EventSource(encodeURI(updateUrl));
    eventSource.onmessage = function(event) {
        console.log("enters here");
        const data = JSON.parse(event.data);
        console.log(data);
    }
}

export async function leave(player) {
    await fetch(url + 'join', {
        method: 'POST',
        body: JSON.stringify({
            nick: "",
            password: "",
            game: ""
        }),
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

export async function notify(player) {
    await fetch(url + 'join', {
        method: 'POST',
        body: JSON.stringify({
            nick: "",
            password: "",
            game: "",
            move: ""
        }),
    })
    .then(response => response.json())
    .then(data => console.log(data));
}


    
    