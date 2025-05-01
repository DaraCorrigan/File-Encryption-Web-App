let passwords = [];

// Render the list of passwords in UI
function renderPasswords() {
    const passwordList = document.getElementById('passwords-list');
    passwordList.innerHTML = ''; // Clear the current list

    // Loop through each password entry and create list items
    passwords.forEach((item, index) => {
        const listItem = document.createElement('li');

        // Display the website and password (hidden by default)
        const passwordSpan = document.createElement('span');
        passwordSpan.innerHTML = `
        <strong>${item.website}</strong>: 
        <span class="password" id="password-${index}">${'*'.repeat(item.password.length)}</span>
        <i class="fas fa-eye show-password" onclick="togglePassword(${index})" title="Show/Hide Password"></i> 
        `;

        // Create action buttons (copy, edit, delete)
        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');
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

// Event listener for the add password button
document.getElementById('add-password-button').addEventListener('click', () => {
    const website = document.getElementById('pwm-website').value.trim(); // Get website input
    const password = document.getElementById('pwm-password').value.trim(); // Get password input

    // Validate inputs
    if (website && password) {
        // Add the new password entry to the array
        passwords.push({ website, password });

        // Re-render the password list
        renderPasswords();

        // Clear the input fields
        document.getElementById('pwm-website').value = '';
        document.getElementById('pwm-password').value = '';
    } else {
        // Show a popup if inputs are empty
        showPopup('Please fill out required fields.');
    }
});

// Copy a password to the clipboard
function copyPassword(index) {
    navigator.clipboard.writeText(passwords[index].password);
    showPopup('Password copied to clipboard.');
}

// Show a custom popup with a message
function showPopup(message, hasCancel = false, isEditing = false, index = null) {
    const popup = document.getElementById('custom-pwm-popup');
    const popupMessage = document.querySelector('.pwm-popup-message');
    const popupInputContainer = document.getElementById('pwm-popup-input-container');
    const popupInput = document.getElementById('pwm-popup-input');

    // Popup message
    popupMessage.textContent = message;

    // Show or hide the input container based on whether editing is enabled
    popupInputContainer.classList.toggle('hidden', !isEditing);

    // Show or hide the cancel button
    document.getElementById('pwm-popup-cancel').classList.toggle('hidden', !hasCancel);

    if (isEditing && index !== null) {
        popupInput.value = passwords[index].password;
    }

    // Show the popup
    popup.classList.remove('hidden');

    return new Promise((resolve) => {
        document.getElementById('pwm-popup-ok').onclick = () => {
            if (isEditing && index !== null) {
                const newPassword = popupInput.value.trim(); // Get the new password
                if (newPassword) {
                    passwords[index].password = newPassword; // Update the password
                    renderPasswords(); // Re-render the list
                } else {
                    showPopup('Password cannot be empty.'); // Show an error if the input is empty
                    return;
                }
            }
            popup.classList.add('hidden'); // Hide the popup
            resolve(true);
        };
        if (hasCancel) {
            document.getElementById('pwm-popup-cancel').onclick = () => {
                popup.classList.add('hidden'); // Hide the popup
                resolve(false);
            };
        }
    });
}

// Confirm deletion of a password
async function confirmDelete(index) {
    const confirmed = await showPopup('Are you sure you want to delete this password?', true);
    if (confirmed) {
        deletePassword(index);
    }
}

// Prompt the user to edit a password
async function promptEditPassword(index) {
    await showPopup('Enter new password:', false, true, index);
}

// Delete a password
function deletePassword(index) {
    passwords.splice(index, 1); // Remove the password from the array
    renderPasswords(); // Re-render the list
}

// Toggle the visibility of a password
function togglePassword(index) {
    const passwordSpan = document.getElementById(`password-${index}`);

    // Showing and hiding the password
    if (passwordSpan.textContent === '*'.repeat(passwords[index].password.length)) {
        passwordSpan.textContent = passwords[index].password;
    } else {
        passwordSpan.textContent = '*'.repeat(passwords[index].password.length);
    }
}

// Rendering of the password list
renderPasswords();


