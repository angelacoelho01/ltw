import * as utils from './utils/utils.js';
import * as auth from './auth/auth.js';

export function gameModePage() {
    // Clean current page
    document.getElementById("app").remove();

    // Make Play in header active
    utils.removeClass("active");
    utils.addClass("play", "active");

    let app = document.createElement("container");
    app.id = "app";

    let opponentOptions = document.createElement("div");
    opponentOptions.className = "gameMode";

    let opponentOptionsText = document.createElement("div");
    opponentOptionsText.className = "gameModeText";
    opponentOptionsText.innerHTML = "Choose your opponent";

    let opponentOptionsButtons = document.createElement("div");
    opponentOptionsButtons.className = "gameModeButtons";

    let opponentComputer = utils.createButton("opponentComputer", "submit", "Computer");
    opponentComputer.className = "opponent";

    let opponentPlayer = utils.createButton("opponentPlayer", "submit", "1v1");
    opponentPlayer.className = "opponent";

    opponentOptionsButtons.appendChild(opponentComputer);
    opponentOptionsButtons.appendChild(opponentPlayer);

    opponentOptions.appendChild(opponentOptionsText);
    opponentOptions.appendChild(opponentOptionsButtons);

    app.appendChild(opponentOptions);

    document.body.appendChild(app);
}

export function gameOptionsPage() {
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
    let playButton = utils.createButton("playButton", "submit", "Play");
    playButton.className = "submitButton";

    gameOptions.appendChild(playButton);

    app.appendChild(gameOptions);
    document.body.appendChild(app);
}

export function gamePage() {

}


export function addUsernameLogout(username) {
    let header = document.getElementById("header");
    
    let headerRight = document.createElement("div");
    headerRight.id = "headerRight";

    let user = document.createElement("div");
    user.id = "user";
    user.innerHTML = username;
    headerRight.appendChild(user);

    let logoutButton = utils.createButton("logoutButton", "submit", "Logout");
    headerRight.appendChild(logoutButton);

    header.appendChild(headerRight);

    // Make Play in header active
    utils.addClass("play", "active");

    // Update player1 Name in play page
    let player1Name = document.getElementById("player1Name"); 
    if(player1Name != undefined) player1Name.innerHTML = username;
}

export function instructionsPage(game) {
    // Clean current page
    document.getElementById("app").remove();

    // Make Instructions in header active
    utils.removeClass("active");
    utils.addClass("instructions", "active");

    let container = document.createElement("div");
    container.className = "container";
    container.id = "app";

    let instructions = document.createElement("div");
    instructions.className = "auth";
    instructions.innerHTML = "Instructions";

    console.log(game.hasStarted);
    if(game.hasStarted) {
        let resumeButton = utils.createButton("backButton", "submit", "Back");
        instructions.appendChild(resumeButton);
    } else {
        let playButton = utils.createButton("instructionsPlayButton", "submit", "Play") ;
        instructions.appendChild(playButton);
    }

    container.appendChild(instructions);
    document.body.appendChild(container);
}

export function scoreboardPage(game) {
    // Clean current page
    document.getElementById("app").remove();

    // Make Scoreboard in header active
    utils.removeClass("active");
    utils.addClass("scoreboard", "active");

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

    let playButton = utils.createButton("scoreboardPlayButton", "submit", "Play");        
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