import * as utils from "../utils/utils.js";

let isUserLogged = false;

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

export function validateLogin(pageToLoad, game) {
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
            utils.loadPage();

            // Load play page and add username
            document.getElementById("login").remove();
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
            isUserLogged = true;
        } else {
            console.log("Can't sign in user...");
        }
    });
}

export function isUserLoggedIn() {
    return isUserLogged;
}

export function getUsername() {
    let user = document.getElementById("user");
    return isUserLogged ? user.innerHTML : "sonso";
}

