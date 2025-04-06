let passwords = [];

function renderPasswords() {
    const passwordList = document.getElementById('passwords-list');
    passwordList.innerHTML = '';

    passwords.forEach((item, index) => {
        const listItem = document.createElement('li');

        const passwordSpan = document.createElement('span');
        passwordSpan.innerHTML = `
        <strong>${item.website}</strong>: 
        <span class="password" id="password-${index}">${'*'.repeat(item.password.length)}</span>
        <i class="fas fa-eye show-password" onclick="togglePassword(${index})" title="Show/Hide Password"></i> 
        `;
        
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

document.getElementById('add-password-button').addEventListener('click', () => {
    const website = document.getElementById('pwm-website').value.trim();
    const password = document.getElementById('pwm-password').value.trim();

    if (website && password) {
        passwords.push({ website, password });
        renderPasswords();
        document.getElementById('pwm-website').value = '';
        document.getElementById('pwm-password').value = '';
    } else {
        showPopup('Please fill out required fields.');
    }
});

function copyPassword(index) {
    navigator.clipboard.writeText(passwords[index].password);
    showPopup('Password copied to clipboard.');
}

function showPopup(message, hasCancel = false, isEditing = false, index = null) {
    const popup = document.getElementById('custom-pwm-popup');
    const popupMessage = document.querySelector('.pwm-popup-message');
    const popupInputContainer = document.getElementById('pwm-popup-input-container');
    const popupInput = document.getElementById('pwm-popup-input');

    popupMessage.textContent = message;
    popupInputContainer.classList.toggle('hidden', !isEditing);
    document.getElementById('pwm-popup-cancel').classList.toggle('hidden', !hasCancel);

    if (isEditing && index !== null) {
        popupInput.value = passwords[index].password;
    }

    popup.classList.remove('hidden');

    return new Promise((resolve) => {
        document.getElementById('pwm-popup-ok').onclick = () => {
            if (isEditing && index !== null) {
                const newPassword = popupInput.value.trim();
                if (newPassword) {
                    passwords[index].password = newPassword;
                    renderPasswords();
                } else {
                    showPopup('Password cannot be empty.');
                    return;
                }
            }
            popup.classList.add('hidden');
            resolve(true);
        };
        if (hasCancel) {
            document.getElementById('pwm-popup-cancel').onclick = () => {
                popup.classList.add('hidden');
                resolve(false);
            };
        }
    });
}

async function confirmDelete(index) {
    const confirmed = await showPopup('Are you sure you want to delete this password?', true);
    if (confirmed) {
        deletePassword(index);
    }
}

async function promptEditPassword(index) {
    await showPopup('Enter new password:', false, true, index);
}

function deletePassword(index) {
    passwords.splice(index, 1);
    renderPasswords();
}

function togglePassword(index) {
    const passwordSpan = document.getElementById(`password-${index}`);

    if (passwordSpan.textContent === '*'.repeat(passwords[index].password.length)) {
        passwordSpan.textContent = passwords[index].password;
    } else {
        passwordSpan.textContent = '*'.repeat(passwords[index].password.length);
    }
}

renderPasswords();