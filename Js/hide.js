// document.getElementById('file-encryption-link').addEventListener('click', function(event) {
//     event.preventDefault();
//     const element = document.getElementById('file-encryption');
//     element.classList.toggle('hidden');
// });

document.addEventListener('DOMContentLoaded', function(){
    const fileDropSection = document.getElementById('file-encryption');
    const fileEncryptionLink = document.getElementById('file-encryption-link');
    
    fileEncryptionLink.addEventListener('click', function(e) {
        e.preventDefault();
        fileDropSection.classList.toggle('hidden');
    });

    document.addEventListener('click', function(e) {
        const isClickInside = fileDropSection.contains(e.target) || fileEncryptionLink.contains(e.target);

        if (!isClickInside) {
            fileDropSection.classList.add('hidden');
        }
    });
});