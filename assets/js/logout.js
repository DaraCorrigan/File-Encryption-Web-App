document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout-button");
    const navigationMenu = document.querySelector(".navigation-menu");
    const mainContainer = document.querySelector(".main-container");
    const loginBody = document.querySelector(".login-body");

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            // Hides the navigation menu and main container
            navigationMenu.style.display = "none";
            mainContainer.style.display = "none";

            // Shows the login popup
            loginBody.style.display = "flex";

            // Clears the session data on the server
            fetch("assets/php/logout.php")
                .then(() => {
                    console.log("Logged out successfully.");
                })
                .catch((error) => {
                    console.error("Error during logout:", error);
                });
        });
    }
});