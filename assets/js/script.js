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