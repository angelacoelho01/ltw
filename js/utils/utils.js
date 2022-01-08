export function getElementCopy(id) {
    let source = document.getElementById(id);
    let target = document.getElementById(id);
    let returnedTarget = Object.assign(target, source);
    return returnedTarget;
}

export function removeElementsByClassName(className) {
    let elements = document.getElementsByClassName(className);
    for(let i = 0; i < elements.length; i++) elements[i].remove();
}

export function removeClass(className) {
    let elements = document.getElementsByClassName(className);
    for(let i = 0; i < elements.length; i++) elements[i].classList.remove(className);
}

export function addClass(id, className) {
    let element = document.getElementById(id);
    element.classList.add(className);
}

export function loadPage(game) {
    removeElementsByClassName("container");
    removeClass("active");
    if(document.getElementById("playersNameScore") != null) document.getElementById("playersNameScore").remove();
}

export function createButton(id, type, innerHTML) {
    let button = document.createElement("button");
    button.id = id;
    button.type = type;
    button.innerHTML = innerHTML;

    return button;
}

export function createInput(id, type, placeholder) {
    let input = document.createElement("input");
    input.id = id;
    input.type = type;
    input.placeholder = placeholder;

    return input;
}

export function loadInitialPage() {
    // Clena current page
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
    let playButton = createButton("bt", "submit", "Play");
    playButton.className = "submitButton";

    gameOptions.appendChild(playButton);

    app.appendChild(gameOptions);
    document.body.appendChild(app);
}