document.addEventListener("DOMContentLoaded", () => {
    const loginBody = document.querySelector(".login-body");
    const mainContainer = document.querySelector(".main-container");
    const navigationMenu = document.querySelector(".navigation-menu");

    // Checks the session status
    function checkSession() {
        fetch("assets/php/session-check.php")
            .then(response => response.json())
            .then(data => {
                if (data.isLoggedIn) {
                    // For when the user is logged in
                    loginBody.style.display = "none";
                    navigationMenu.style.display = "block";
                    mainContainer.style.display = "flex";

                    // Fetchs passwords for the logged-in user
                    fetchPasswords();
                } else {
                    // For when the user isn't logged in
                    loginBody.style.display = "flex";
                    navigationMenu.style.display = "none";
                    mainContainer.style.display = "none";
                }
            })
            .catch(error => console.error("Error checking session:", error));
    }

    // Fetchs passwords for the logged-in user
    function fetchPasswords() {
        const passwordList = document.getElementById("passwords-list");
        if (passwordList) {
            passwordList.innerHTML = "<li>Loading...</li>"; // Shows a loading message

            fetch("assets/php/password-manager.php", {
                method: "GET",
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        renderPasswords(data.passwords); // Updates the UI with the fetched passwords
                    } else {
                        passwordList.innerHTML = "<li>Failed to load passwords.</li>";
                        console.error("Failed to fetch passwords:", data.message);
                    }
                })
                .catch(error => {
                    passwordList.innerHTML = "<li>Error loading passwords.</li>";
                    console.error("Error fetching passwords:", error);
                });
        }
    }

    // Renders passwords in the UI with full functionality
    function renderPasswords(passwords) {
        const passwordList = document.getElementById("passwords-list");
        if (passwordList) {
            passwordList.innerHTML = "";

            passwords.forEach((item, index) => {
                const listItem = document.createElement("li");

                const passwordSpan = document.createElement("span");
                passwordSpan.innerHTML = `
                    <strong>${item.website}</strong>: 
                    <span class="password" id="password-${index}">${"*".repeat(item.password.length)}</span>
                    <i class="fas fa-eye show-password" onclick="togglePassword(${index})" title="Show/Hide Password"></i>
                `;

                const actionsDiv = document.createElement("div");
                actionsDiv.classList.add("actions");
                actionsDiv.innerHTML = `
                    <i class="fas fa-copy" onclick="copyPassword(${index})" title="Copy"></i>
                    <i class="fas fa-edit" onclick="promptEditPassword(${index})" title="Edit"></i>
                    <i class="fas fa-trash-alt" onclick="confirmDelete(${index})" title="Delete"></i>
                `;

                listItem.appendChild(passwordSpan);
                listItem.appendChild(actionsDiv);
                passwordList.appendChild(listItem);
            });
        }
    }

    // Toggles password visibility
    function togglePassword(index) {
        const passwordSpan = document.getElementById(`password-${index}`);
        const password = passwords[index].password;

        if (passwordSpan.textContent === "*".repeat(password.length)) {
            passwordSpan.textContent = password; // Show the password
        } else {
            passwordSpan.textContent = "*".repeat(password.length); // Hide the password
        }
    }

    // Copy a password to the clipboard
    function copyPassword(index) {
        navigator.clipboard.writeText(passwords[index].password);
        alert("Password copied to clipboard.");
    }

    // Prompt to edit a password
    function promptEditPassword(index) {
        const newPassword = prompt("Enter the new password:", passwords[index].password);
        if (newPassword) {
            updatePassword(index, newPassword);
        }
    }

    // Update a password
    function updatePassword(index, newPassword) {
        const formData = new FormData();
        formData.append("id", passwords[index].ID);
        formData.append("password", newPassword);

        fetch("assets/php/password-manager.php", {
            method: "PUT",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    passwords[index].password = newPassword;
                    renderPasswords(passwords); // Re-render the updated passwords
                } else {
                    alert("Failed to update password: " + data.message);
                }
            })
            .catch(error => console.error("Error updating password:", error));
    }

    // Confirms deletion of a password
    function confirmDelete(index) {
        if (confirm("Are you sure you want to delete this password?")) {
            deletePassword(index);
        }
    }

    // Deletes a password
    function deletePassword(index) {
        const formData = new FormData();
        formData.append("id", passwords[index].ID);

        fetch("assets/php/password-manager.php", {
            method: "DELETE",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    passwords.splice(index, 1);
                    renderPasswords(passwords);
                } else {
                    alert("Failed to delete password: " + data.message);
                }
            })
            .catch(error => console.error("Error deleting password:", error));
    }

    // Handles login
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

    // Handles registration
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
                    checkSession();
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

    checkSession();
});