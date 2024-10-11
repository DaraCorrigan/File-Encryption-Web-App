const expand_btn = document.querySelector(".expand");

expand_btn.addEventListener("click", () => {
  document.body.classList.toggle("collapsed");
  const profileDiv = document.querySelector('div#hide-profile');
  const logoutButton = document.querySelector('svg#logout-button');
  if (document.body.classList.contains("collapsed")) {
    profileDiv.style.display = 'none';
    logoutButton.style.display = 'none';
  } else {
    profileDiv.style.display = 'block';
    logoutButton.style.display = 'block';
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