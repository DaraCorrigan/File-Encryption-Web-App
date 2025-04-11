document.addEventListener('DOMContentLoaded', () => {
    const loginPopup = document.querySelector('.login-popup-container');
    const loginButton = document.querySelector('#login-button');

    // Opens the popup when the button is clicked
    loginButton.addEventListener('click', () => {
        loginPopup.style.display = 'flex';
    });
});