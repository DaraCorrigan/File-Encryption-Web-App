let passwords = [];

// Fetch passwords from the database
function fetchPasswords() {
    fetch("assets/php/password-manager.php")
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                passwords = data.passwords;
                renderPasswords();
            } else {
                console.error("Failed to fetch passwords:", data.message);
            }
        })
        .catch(error => console.error("Error fetching passwords:", error));
}

// Renders passwords in the UI
function renderPasswords() {
    const passwordList = document.getElementById("passwords-list");
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

// Adds a new password
document.getElementById("add-password-button").addEventListener("click", () => {
    const website = document.getElementById("pwm-website").value.trim();
    const password = document.getElementById("pwm-password").value.trim();

    if (website && password) {
        const formData = new FormData();
        formData.append("website", website);
        formData.append("password", password);

        fetch("assets/php/password-manager.php", {
            method: "POST",
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    passwords.push({ website, password });
                    renderPasswords();
                    document.getElementById("pwm-website").value = "";
                    document.getElementById("pwm-password").value = "";
                } else {
                    showPopup(data.message);
                }
            })
            .catch(error => console.error("Error adding password:", error));
    } else {
        showPopup("Please fill out required fields.");
    }
});

// Copies password to the clipboard
function copyPassword(index) {
    navigator.clipboard.writeText(passwords[index].password);
    showPopup("Password copied to clipboard.");
}

// Show popup message
function showPopup(message, hasCancel = false, isEditing = false, index = null) {
    const popup = document.getElementById("custom-pwm-popup");
    const popupMessage = document.querySelector(".pwm-popup-message");
    const popupInputContainer = document.getElementById("pwm-popup-input-container");
    const popupInput = document.getElementById("pwm-popup-input");

    popupMessage.textContent = message;
    popupInputContainer.classList.toggle("hidden", !isEditing);
    document.getElementById("pwm-popup-cancel").classList.toggle("hidden", !hasCancel);

    if (isEditing && index !== null) {
        popupInput.value = passwords[index].password;
    }

    popup.classList.remove("hidden");

    return new Promise((resolve) => {
        document.getElementById("pwm-popup-ok").onclick = () => {
            if (isEditing && index !== null) {
                const newPassword = popupInput.value.trim();
                if (newPassword) {
                    updatePassword(index, newPassword);
                } else {
                    showPopup("Password cannot be empty.");
                    return;
                }
            }
            popup.classList.add("hidden");
            resolve(true);
        };
        if (hasCancel) {
            document.getElementById("pwm-popup-cancel").onclick = () => {
                popup.classList.add("hidden");
                resolve(false);
            };
        }
    });
}

// Confirm deletion of password
async function confirmDelete(index) {
    const confirmed = await showPopup("Are you sure you want to delete this password?", true);
    if (confirmed) {
        deletePassword(index);
    }
}

// Edit a password
async function promptEditPassword(index) {
    await showPopup("Enter new password:", false, true, index);
}

// Delete a password
function deletePassword(index) {
    fetch("assets/php/password-manager.php", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: passwords[index].ID }),
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

// Update a password
function updatePassword(index, newPassword) {
    const formData = new FormData();
    formData.append("id", passwords[index].id);
    formData.append("password", newPassword);

    fetch("assets/php/password-manager.php", {
        method: "POST",
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                passwords[index].password = newPassword;
                renderPasswords();
            } else {
                showPopup(data.message);
            }
        })
        .catch(error => console.error("Error updating password:", error));
}

// Toggles password visibility
function togglePassword(index) {
    const passwordSpan = document.getElementById(`password-${index}`);

    if (passwordSpan.textContent === "*".repeat(passwords[index].password.length)) {
        passwordSpan.textContent = passwords[index].password;
    } else {
        passwordSpan.textContent = "*".repeat(passwords[index].password.length);
    }
}

// Fetches passwords on page load
fetchPasswords();



