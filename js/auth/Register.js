import { createButton, createInput } from '../utils/utils.js';

export class Register {
    constructor() {
        this.container = document.createElement("div");
        this.container.className = "container";

        this.register = document.createElement("div");
        this.register.className = "auth";

        this.inputFields = document.createElement("div");
        this.inputFields.className = "inputFields";
        
        this.createContainer();
    }

    createContainer() {
        let title = document.createTextNode("Sign Up");
        this.register.appendChild(title);

        this.createInputFields();
        this.createSubmitButton();

        this.container.appendChild(this.register);
    }

    userRegister() {
        document.body.appendChild(this.container);
    }

    createInputFields() {
        let usernameInput = createInput("usernameInput", "text", "Username");
        let passwordInput = createInput("passwordInput", "password", "Password");
        let confirmPasswordInput = createInput("confirmPasswordInput", "password", "Confirm Password");

        this.inputFields.appendChild(usernameInput);
        this.inputFields.appendChild(passwordInput);
        this.inputFields.appendChild(confirmPasswordInput);

        this.register.appendChild(this.inputFields);
    }

    createSubmitButton() {
        let button = createButton("registerSubmitButton", "submit", "Register");
        this.register.appendChild(button);
    }
}