export class Login {
    constructor() {
        this.login = document.createElement("div");
        this.login.className = "auth";

        this.inputFields = document.createElement("div");
        this.inputFields.className = "inputFields";
    }

    userLogin() {
        let title = document.createTextNode("Sign In");
        this.login.appendChild(title);

        this.createInputFields();
        this.createSubmitButton();

        document.body.appendChild(this.login);
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

        button.className = "submitButton";
        button.type = "submit";
        button.innerHTML = "Login";
        
        this.login.appendChild(button);

    }
}