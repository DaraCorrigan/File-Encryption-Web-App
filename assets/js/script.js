const expand_btn = document.querySelector(".expand");

expand_btn.addEventListener("click", () => {
  document.body.classList.toggle("collapsed");
  const profileDiv = document.querySelector('div#hide-profile');
  const logoutButton = document.querySelector('svg#logout-button');
  const nav = document.querySelector('nav.navigation-menu');
  if (document.body.classList.contains("collapsed")) {
    nav.style.animation = 'navCollapse 0.5s forwards';
    setTimeout(() => {
      profileDiv.style.display = 'none';
      logoutButton.style.display = 'none';
    }, 200);
  } else {
    nav.style.animation = 'navExpand 0.5s forwards';
    setTimeout(() => {
      profileDiv.style.display = 'block';
      logoutButton.style.display = 'block';      
    }, 70);
  }
});

const current = window.location.href;

const allLinks = document.querySelectorAll(".navigation-menu-links a");

allLinks.forEach((elem) => {
  if (elem.href === current) {
    elem.classList.add("active");
  }

  elem.addEventListener("click", function () {
    allLinks.forEach((link) => {
      if (link.href === elem.href) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  });
});

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
