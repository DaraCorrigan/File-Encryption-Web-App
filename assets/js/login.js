document.addEventListener('DOMContentLoaded', () => {
    const userProfile = document.getElementById('user-profile');
    const loginSection = document.getElementById('login-section');
    const loginButton = document.getElementById('login-button');

    let isLoggedIn = false;

    function updateUI() {
        if (isLoggedIn) {
            userProfile.style.display = 'flex';
            loginSection.style.display = 'none';
        } else {
            userProfile.style.display = 'none';
            loginSection.style.display = 'flex';
        }
    }

    loginButton.addEventListener('click', () => {
        isLoggedIn = true;
        updateUI();
    });

    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', () => {
        isLoggedIn = false;
        updateUI();
    });

    updateUI();
});