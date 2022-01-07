let isUsernameValid = false;
let isPasswordValid = false;
let isConfirmPasswordValid = false;

export function validateRegister() {
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

