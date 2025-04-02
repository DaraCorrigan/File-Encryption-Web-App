document.addEventListener("DOMContentLoaded", () => {
    const profileButton = document.querySelector(".profile-button");
    const dropdownWrapper = document.querySelector(".dropdown-wrapper");
  
    profileButton.addEventListener("click", () => {
      dropdownWrapper.classList.toggle("show");
    });
  
    document.addEventListener("click", (e) => {
      const isClickInsideDropdown = dropdownWrapper.contains(e.target);
      const isProfileClicked = profileButton.contains(e.target);
  
      if (!isClickInsideDropdown && !isProfileClicked) {
        dropdownWrapper.classList.remove("show");
      }
    });
  });