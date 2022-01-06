export class Login {
    constructor() {
        this.container = document.createElement("div");
        this.container.className = "container";

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
        let username = document.createElement("input");
        let password = document.createElement("input");

        username.className = "username";
        password.className = "password";

        username.placeholder = "Username";
        password.placeholder = "Password";

        this.inputFields.appendChild(username);
        this.inputFields.appendChild(password);

        this.login.appendChild(this.inputFields);
    }

    createSubmitButton() {
        let button = document.createElement("button");

        button.id = "loginSubmitButton";
        button.type = "submit";
        button.innerHTML = "Login";
        
        this.login.appendChild(button);

    }
}