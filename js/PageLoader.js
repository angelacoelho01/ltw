import * as utils from './utils/utils.js';
import * as auth from './auth/auth.js';

export function loadInitialPage() {
    // Clean current page
    document.getElementById("app").remove();

    // Create container with id=app
    let app = document.createElement("div");
    app.className = "container";
    app.id = "app";

    let gameOptions = document.createElement("div");
    gameOptions.className = "gameOptions";

    // Create option to choose the number of pits per player
    let chooseNPits = document.createElement("div");
    chooseNPits.className = "chooseNPits";
    chooseNPits.innerHTML = "Choose the number of pits per player: ";

    let selectNPits = document.createElement("select");
    selectNPits.id = "selectNPits";

    for(let i = 3; i <= 6; i++) {
        let nPit = document.createElement("option");
        nPit.value = i;
        nPit.innerHTML = i;
        selectNPits.appendChild(nPit);
    }

    chooseNPits.appendChild(selectNPits);
    gameOptions.appendChild(chooseNPits);

    // Create option to choose the number of seeds per pit
    let chooseNSeeds = document.createElement("div");
    chooseNSeeds.className = "chooseNSeeds";
    chooseNSeeds.innerHTML = "Choose the number of seeds per pit: ";

    let selectNSeeds = document.createElement("select");
    selectNSeeds.id = "selectNSeeds";

    for(let i = 3; i <= 6; i++) {
        let nSeed = document.createElement("option");
        nSeed.value = i;
        nSeed.innerHTML = i;
        selectNSeeds.appendChild(nSeed);
    }

    chooseNSeeds.appendChild(selectNSeeds);
    gameOptions.appendChild(chooseNSeeds);

    // Create play button
    let playButton = utils.createButton("bt", "submit", "Play");
    playButton.className = "submitButton";

    gameOptions.appendChild(playButton);

    app.appendChild(gameOptions);
    document.body.appendChild(app);
}

export function loadInstructionsPage(game) {
    let container = document.createElement("div");
    container.className = "container";
    container.id = "app";

    let instructions = document.createElement("div");
    instructions.className = "auth";
    instructions.innerHTML = "Instructions";

    if(game.hasStarted) {
        let resumeButton = utils.createButton("resumeButton", "submit", "Resume");
        instructions.appendChild(resumeButton);
    }

    let playButton = utils.createButton("playButton", "submit", "Play") ;
    instructions.appendChild(playButton);

    container.appendChild(instructions);
    document.body.appendChild(container);
}

export function loadScoreboardPage(game) {
    let container = document.createElement("div");
    container.className = "container";
    container.id = "app";

    let scoreboard = document.createElement("container");
    scoreboard.className = "auth";
    scoreboard.innerHTML = "Scoreboard";
    container.appendChild(scoreboard);

    if(game.hasStarted) {
        let resumeButton = utils.createButton("resumeButton", "submit", "Resume");
        scoreboard.appendChild(resumeButton);
    }

    let playButton = utils.createButton("playButton", "submit", "Play");        
    scoreboard.appendChild(playButton);

    container.appendChild(scoreboard);

    document.body.appendChild(container);
}

export function loadInitialHeader() {
    let header = document.getElementById("header");
    let app = document.getElementById("app");
    let authentication = document.getElementById("authentication");

    // Remove username
    document.getElementById("user").remove();

    // Create login button
    let loginButton = utils.createButton("login", "submit", "Login");
    loginButton.className = "loginButton";

    // Change innerHTML from register button
    let registerButton = document.getElementById("register");
    registerButton.innerHTML = "Register";

    authentication.insertBefore(loginButton, registerButton);

    // Make user log out
    auth.userLogout();
}