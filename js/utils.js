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