import * as utils from '../utils/utils.js';
import * as server from '../server/server.js';

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
        let button = utils.createButton("loginSubmitButton", "submit", "Login");
        this.register.appendChild(button);
    }

    validateRegister(pageToLoad) {
        let username = document.querySelector("#usernameInput");
        let password = document.querySelector("#passwordInput");
        let registerSubmitButton = document.querySelector("#loginSubmitButton");

        registerSubmitButton.addEventListener("click", function() {

            console.log(username.value);
            server.register(username.value, password.value);

            this.username = username.value;
            this.password = password.value;

            console.log("User signed in successfully!");
            utils.cleanPage();

            // Load play page and add username
            let registerButton = document.getElementById("register");   /* Reutilize register button for logout */
            registerButton.innerHTML = "Logout";

            let user = document.createElement("div");
            user.id = "user";
            user.innerHTML = username.value;

            let authenticationField = document.getElementById("authentication");
            authenticationField.insertBefore(user, registerButton);

            // Make Play in header active
            utils.addClass("play", "active");

            document.body.appendChild(pageToLoad);

            // Update player1 Name in play page
            let player1Name = document.getElementById("player1Name"); 
            if(player1Name != undefined) player1Name.innerHTML = username.value;

            // Clear input fields
            username.value = "";
            password.value = "";
            this.isRegistered = true;
        });
    }
}