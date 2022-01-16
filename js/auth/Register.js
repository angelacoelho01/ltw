import * as utils from '../utils/utils.js';
import * as server from '../server/requests.js';
import * as pages from '../pages.js';

export class Register {
    constructor() {
        this.container = document.createElement("div");
        this.container.className = "container";
        this.container.id = "app";

        this.register = document.createElement("div");
        this.register.className = "auth";

        this.inputFields = document.createElement("div");
        this.inputFields.className = "inputFields";

        this.isRegistered = false;

        this.username = null;
        this.password = null;

        this.createContainer();
    }

    isUserRegistered() {
        return this.isRegistered;
    }

    getUsername() {
        return this.username;
    }

    getPassword() {
        return this.password;
    }

    displayRegister() {
        // Remove current page
        document.getElementById("app").remove();
        document.body.appendChild(this.container);
    }

    createContainer() {
        let title = document.createTextNode("Sign In");
        this.register.appendChild(title);

        this.createInputFields();
        this.createSubmitButton();

        this.container.appendChild(this.register);
    }

    createInputFields() {
        // Create username land password inputs fields
        let usernameInput = utils.createInput("usernameInput", "text", "Username");
        let passwordInput = utils.createInput("passwordInput", "password", "Password");

        this.inputFields.appendChild(usernameInput);
        this.inputFields.appendChild(passwordInput);
        this.register.appendChild(this.inputFields);
    }

    createSubmitButton() {
        let button = utils.createButton("registerButton", "submit", "Login");
        this.register.appendChild(button);
    }

    validateRegister(player) {
        let username = document.querySelector("#usernameInput");
        let password = document.querySelector("#passwordInput");
        let registerButton = document.querySelector("#registerButton");
        this.isRegistered = true;

        registerButton.addEventListener("click", function() {

            console.log(username.value);
            server.register(username.value, password.value);

            this.username = username.value;
            this.password = password.value;
           
            player.name = username.value;
            player.password = password.value;

            pages.addUsernameLogout(username.value);

            // Clear input fields
            username.value = "";
            password.value = "";
        });
    }
}