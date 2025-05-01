const container = document.querySelector('.login-popup-container');
const loginButton = document.querySelector('.toggle-login-button');
const signupButton = document.querySelector('.toggle-sign-up-button');

loginButton.addEventListener('click', () => {
    container.classList.remove('active');
});

signupButton.addEventListener('click', () => {
    container.classList.add('active');
});