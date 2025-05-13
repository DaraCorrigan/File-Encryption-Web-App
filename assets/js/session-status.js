document.addEventListener("DOMContentLoaded", () => {
    const loginBody = document.querySelector(".login-body");
    const mainContainer = document.querySelector(".main-container");
    const navigationMenu = document.querySelector(".navigation-menu");

    //Checks the session status
    function checkSession() {
        fetch("assets/php/session-check.php")
            .then(response => response.json())
            .then(data => {
                if (data.isLoggedIn) {
                    //For when the user is logged in
                    loginBody.style.display = "none";
                    navigationMenu.style.display = "block";
                    mainContainer.style.display = "flex";
                } else {
                    //For when the user isn't logged in
                    loginBody.style.display = "flex";
                    navigationMenu.style.display = "none";
                    mainContainer.style.display = "none";
                }
            })
            .catch(error => console.error("Error checking session:", error));
    }

    //Handles login
    function handleLogin(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        fetch("assets/php/login.php", {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    checkSession(); // Updates the UI after a user logs in
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error("Error logging in:", error));
    }

    //Handles registration
    function handleRegister(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        fetch("assets/php/register.php", {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    checkSession(); // Updates the UI after a user signs up
                } else {
                    alert(data.message);
                }
            })
            .catch(error => console.error("Error registering:", error));
    }

    const loginForm = document.querySelector(".form-box.login form");
    const registerForm = document.querySelector(".form-box.sign-up form");

    if (loginForm) loginForm.addEventListener("submit", handleLogin);
    if (registerForm) registerForm.addEventListener("submit", handleRegister);

    //Checks the session on page load
    checkSession();
});