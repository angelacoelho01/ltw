import { Login} from './Login.js';
import { Register } from './Register.js';

let login = new Login();
let register = new Register();

document.getElementById("login").addEventListener("click", function() {
    login.userLogin();
});

document.getElementById("register").addEventListener("click", function() {
    register.userRegister();
});