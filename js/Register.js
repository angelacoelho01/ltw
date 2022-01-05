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