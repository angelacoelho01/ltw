import { createButton, createInput } from '../utils/utils.js';

export class Login {
    constructor() {
        this.container = document.createElement("div");
        this.container.className = "container";
        this.container.id = "app";

        this.login = document.createElement("div");
        this.login.className = "auth";

        this.inputFields = document.createElement("div");
        this.inputFields.className = "inputFields";

        this.createContainer();
    }

    userLogin() {
        document.body.appendChild(this.container);
    }

    createContainer() {
        let title = document.createTextNode("Sign In");
        this.login.appendChild(title);

        this.createInputFields();
        this.createSubmitButton();

        this.container.appendChild(this.login);
    }

    createInputFields() {
        // Create username land password inputs fields
        let usernameInput = createInput("usernameInput", "text", "Username");
        let passwordInput = createInput("passwordInput", "password", "Password");

        this.inputFields.appendChild(usernameInput);
        this.inputFields.appendChild(passwordInput);
        this.login.appendChild(this.inputFields);
    }

    createSubmitButton() {
        let button = createButton("loginSubmitButton", "submit", "Login");
        this.login.appendChild(button);
    }
}