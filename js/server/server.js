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

export async function join(player) {
    await fetch(url + 'join', {
        method: 'POST',
        body: JSON.stringify({
            group:"63", 
            nick: player.name, 
            password: player.password,
            size: game.numberOfPitsPerPlayer,
            initial: game.numberOfSeedsPerPit
        }),
    })
    .then(response => response.json())
    .then(data => console.log(data));
}
    