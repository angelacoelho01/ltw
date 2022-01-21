export const pages = {
    GAME_MODE: 0,
    GAME_OPTIONS: 1,
    REGISTER: 2,
    INSTRUCTIONS: 3,
    SCOREBOARD: 4,
    GAME_COMPUTER: 5,
    GAME_PLAYER: 6
};

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

export function cleanPage() {
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

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}