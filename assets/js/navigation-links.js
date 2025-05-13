document.addEventListener("DOMContentLoaded", function () {
    const allLinks = document.querySelectorAll(".navigation-menu-links a");
    const allSections = document.querySelectorAll("section");

    // Function to hide all sections
    function hideAllSections() {
        allSections.forEach((section) => section.classList.add("hidden"));
    }

    // Add click event listeners to all navigation links
    allLinks.forEach((elem) => {
        elem.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default anchor behavior

            // Remove the active class from all links
            allLinks.forEach((link) => link.classList.remove("active"));

            // Add the active class to the clicked link
            elem.classList.add("active");

            // Hide all sections
            hideAllSections();

            // Show the clicked section
            const targetId = elem.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.classList.remove("hidden");
            } else {
                console.error(`Section with ID ${targetId} not found.`);
            }
        });
    });
});