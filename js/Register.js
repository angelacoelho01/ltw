export class Register {
    constructor() {
        this.register = document.createElement("div");
        this.register.className = "auth";

        this.inputFields = document.createElement("div");
        this.inputFields.className = "inputFields";
    }

    userRegister() {
        let title = document.createTextNode("Sign Up");
        this.register.appendChild(title);

        this.createInputFields();
        this.createSubmitButton();

        document.body.appendChild(this.register);
    }

    createInputFields() {
        let username = document.createElement("input");
        let password = document.createElement("input");
        let confirmPassword = document.createElement("input");

        username.className = "username";
        password.className = "password";
        confirmPassword.className = "confirmPassword";

        username.placeholder = "Username";
        password.placeholder = "Password";
        confirmPassword.placeholder = "Confirm passowrd";

        this.inputFields.appendChild(username);
        this.inputFields.appendChild(password);
        this.inputFields.appendChild(confirmPassword);

        this.register.appendChild(this.inputFields);
    }

    createSubmitButton() {
        let button = document.createElement("button");

        button.className = "submitButton";
        button.type = "submit";
        button.innerHTML = "Register";

        this.register.appendChild(button);

    }
}