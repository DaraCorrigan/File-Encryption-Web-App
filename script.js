const expand_btn = document.querySelector(".expand");

expand_btn.addEventListener("click", () => {
  document.body.classList.toggle("collapsed");
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