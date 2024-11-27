// DO NOT DELETE YET

// document.getElementById('file-encryption-link').addEventListener('click', function(event) {
//     event.preventDefault();
//     const element = document.getElementById('file-encryption');
//     element.classList.toggle('hidden');
// });
// document.addEventListener('DOMContentLoaded', function(){
//     const fileDropSection = document.getElementById('file-encryption');
//     const fileEncryptionLink = document.getElementById('file-encryption-link');
//     const navigationMenu = document.querySelector('nav.navigation-menu');
    
//     fileEncryptionLink.addEventListener('click', function(e) {
//         e.preventDefault();
//         fileDropSection.classList.toggle('hidden');
//     });

//     document.addEventListener('click', function(e) {
//         const activeButton = navigationMenu.querySelector('a.active');
//         console.log(activeButton);
//         if (!navigationMenu.contains(e.target) || e.target == activeButton || e.target.contains(activeButton)) {
//             return;
//         }
//     });
// });

// DO NOT DELETE YET

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.main-container section');
    const links = document.querySelectorAll('.navigation-menu-links a');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector(link.getAttribute('href'));

            sections.forEach(section => {
                if (section !== targetSection) {
                    section.classList.add('hidden');
                }
            });

            if (targetSection) {
                targetSection.classList.toggle('hidden');
            }
        });
    });
});