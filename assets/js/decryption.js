// Drop Down Decryption Selections
const decryptionMenu = document.querySelector(".decryption-menu"),
  decryptionDropDownButton = decryptionMenu.querySelector(".decryption-drop-down-button"),
  decryptionSelections = decryptionMenu.querySelectorAll(".selection"),
  decryptionDropDownText = decryptionMenu.querySelector(".decryption-drop-down-text");

decryptionDropDownButton.addEventListener("click", () => {
  decryptionMenu.classList.toggle("active");
});

decryptionSelections.forEach((selection) => {
  selection.addEventListener("click", () => {
    let selectedOption = selection.querySelector(".selection-text").innerText;
    decryptionDropDownText.innerText = selectedOption;
    document.getElementById("decryption-method").value = selectedOption.toLowerCase();
    decryptionMenu.classList.remove("active");
  });
});

function toggleDecryptionDropdown() {
  document.querySelector(".decryption-selections").classList.toggle("hidden");
}

// Set the selected decryption method
function setDecryptionMethod(method) {
  document.getElementById("decryption-method").value = method;
  document.querySelector(".decryption-drop-down-text").innerText = method.toUpperCase();
  document.querySelector(".decryption-selections").classList.add("hidden");
}