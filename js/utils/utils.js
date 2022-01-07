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

export function loadPage() {
    removeElementsByClassName("container");
    removeClass("active");
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