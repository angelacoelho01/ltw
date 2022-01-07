import { createButton, loadPage, removeClass, removeElementsByClassName } from "../utils/utils.js";

export function validateRegister() {
    let isUsernameValid = false;
    let isPasswordValid = false;
    let isConfirmPasswordValid = false;

    // Check username
    let username = document.querySelector("#usernameInput");
    username.addEventListener("keyup", function() {
        if(username.value.length < 5) {
            console.log("Username too short...");
            isUsernameValid = false;
        } else {
            console.log("Good username!");
            isUsernameValid = true;
        }
    });

    // Check password
    let password = document.querySelector("#passwordInput");
    password.addEventListener("keyup", function() {
        if(password.length < 6) {
            console.log("Password too short...");
            isPasswordValid = false;
        } else {
            console.log("Good password!");
            isPasswordValid = true;
        }
    });

    // Check if confirm password is equal to the actual password
    let confirmPassword = document.querySelector("#confirmPasswordInput");
    confirmPassword.addEventListener("keyup", function() {
        if(password.value != confirmPassword.value) {
            console.log("Passwords are differente...");
            isConfirmPasswordValid = false;
        } else {
            console.log("Passwords are equal!");
            isConfirmPasswordValid = true;
        }
    });

    // Submit registration
    let register = document.querySelector("#registerSubmitButton");
    register.addEventListener("click", function() {
        if(isUsernameValid && isPasswordValid && isConfirmPasswordValid) {
            console.log("Registration completed successfully!");
            let userList = JSON.parse(localStorage.getItem('userList') || '[]');

            userList.push(
                {
                    username: username.value,
                    password: password.value
                }
            );

            localStorage.setItem('userList', JSON.stringify(userList));
        } else {
            console.log("Error in registration.");
        }
    });
}

export function validateLogin(pageToLoad) {
    let username = document.querySelector("#usernameInput");
    let password = document.querySelector("#passwordInput");
    let userList = [];
    let validUser = {
        username: '',
        password: ''
    };
    let login = document.querySelector("#loginSubmitButton");

    login.addEventListener("click", function() {
        userList = JSON.parse(localStorage.getItem('userList'));

        // Search username and password in userList
        userList.forEach(function (element) {
            if(username.value == element.username && password.value == element.password) {
                validUser = {
                    username: element.username,
                    password: element.password
                };
            }
        });

        if(username.value == validUser.username && password.value == validUser.password) {
            console.log("User signed in successfully!");
            loadPage();

            // Load play page and add username
            document.getElementById("login").remove();
            document.getElementById("register").remove();

            let user = document.createElement("div");
            user.id = "user";
            user.innerHTML = username.value;

            let logout = createButton("logout", "submit", "Logout");

            let authenticationField = document.getElementById("authentication");
            authenticationField.appendChild(user);
            authenticationField.appendChild(logout);

            document.body.appendChild(pageToLoad);

            // Clear input fields
            username.value = "";
            password.value = "";
        } else {
            console.log("Can't sign in user...");
        }
    });
}
