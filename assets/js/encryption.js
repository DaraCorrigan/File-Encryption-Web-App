// Drop Down Encryption Selections
const encryptionMenu = document.querySelector(".encryption-menu"),
  dropDownButton = encryptionMenu.querySelector(".encryption-drop-down-button"),
  selections = encryptionMenu.querySelectorAll(".selection"),
  dropDownText = encryptionMenu.querySelector(".encryption-drop-down-text");

dropDownButton.addEventListener("click", () => {
  encryptionMenu.classList.toggle("active");
});

selections.forEach((selection) => {
  selection.addEventListener("click", () => {
    let selectedOption = selection.querySelector(".selection-text").innerText;
    dropDownText.innerText = selectedOption;
    encryptionMenu.classList.remove("active");
  });
});

function toggleDropdown() {
    document.querySelector('.selections').classList.toggle('hidden');
}

// Select Encryption Method
function setEncryptionMethod(method) {
    document.getElementById('encryption-method').value = method;
    document.querySelector('.encryption-drop-down-text').innerText = method.toUpperCase();
    document.querySelector('.selections').classList.add('hidden');
}