var loginSection = document.getElementById("loginSection");
var registerSection = document.getElementById("registerSection");
var homeSection = document.getElementById("homeSection");
var homeSection1 = document.getElementById("homeSection1");

var loginEmail = document.getElementById("loginEmail");
var loginPassword = document.getElementById("loginPassword");
var registerName = document.getElementById("registerName");
var registerEmail = document.getElementById("registerEmail");
var registerPassword = document.getElementById("registerPassword");
var userWelcome = document.getElementById("userWelcome");

var switchToRegister = document.getElementById("switchToRegister");
var switchToLogin = document.getElementById("switchToLogin");
var loginBtn = document.getElementById("loginBtn");
var registerBtn = document.getElementById("registerBtn");
var logoutBtn = document.getElementById("logoutBtn");
var registerError = document.getElementById("registerError")
var loginError = document.getElementById("loginError")

var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
var passwordRegex = /^[A-Za-z0-9]{8,}$/;

var users = [];

var storedUsers = localStorage.getItem("users");
if (storedUsers) {
    users = JSON.parse(storedUsers);
}


switchToRegister.addEventListener("click", function () {
    loginSection.classList.add("d-none");
    registerSection.classList.remove("d-none");
});

switchToLogin.addEventListener("click", function () {
    registerSection.classList.add("d-none");
    loginSection.classList.remove("d-none");
});

registerBtn.addEventListener("click", function () {
    var name = registerName.value.trim();
    var email = registerEmail.value.trim();
    var password = registerPassword.value.trim();

    if (!name || !email || !password) {
        registerError.textContent = "All inputs are required.";
        registerError.classList.remove("d-none");
        registerError.classList.add("d-block");
        return;
    }

    var emailExists = false;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            emailExists = true;
            break;
        }
    }

    if (emailExists) {
        registerError.textContent = "This email is already registered.";
        registerError.classList.remove("d-none");
        registerError.classList.add("d-block");
        registerError.classList.add("text-danger");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Invalid email format.")
        registerError.classList.remove("d-none");
        registerError.classList.add("d-block");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters long and include a letter, a number, and a special character.");
        registerError.classList.remove("d-none");
        registerError.classList.add("d-block");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("loggedInUser", JSON.stringify(users));
    registerError.textContent = "Registration successful! Please log in.";
    registerError.classList.replace("text-danger", "text-success")
    registerError.classList.remove("d-none");
    registerError.classList.add("text-success");
});


loginBtn.addEventListener("click", function () {
    var email = loginEmail.value.trim();
    var password = loginPassword.value.trim();

    if (!email || !password) {
        loginError.textContent = "All inputs are required.";
        loginError.classList.remove("d-none");
        loginError.classList.add("d-block");
        return;
    }

    var user = null;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email == email && users[i].password == password) {
            user = users[i]
            break
        }
    }
    if (!user) {
        loginError.textContent = "Invalid email or password.";
        loginError.classList.remove("d-none");
        loginError.classList.add("d-block");
        return;
    }

    if (!emailRegex.test(email)) {
        alert("Invalid email format.")
        loginError.classList.remove("d-none");
        loginError.classList.add("d-block");
        return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(users));

    userWelcome.textContent = user.name;
    loginSection.classList.add("d-none");
    homeSection.classList.remove("d-none");
    homeSection1.classList.remove("d-none");
    loginError.classList.add("d-none");
});


logoutBtn.addEventListener("click", function () {
    homeSection1.classList.add("d-none");
    homeSection.classList.add("d-none");
    loginSection.classList.remove("d-none");
    loginEmail.value = "";
    loginPassword.value = "";
});