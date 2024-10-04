const fileDrop = document.getElementsByClassName("file-drop")[0];
const inputFiles = document.querySelectorAll(".file-drop-area input[type='file']");
const inputElement = inputFiles[0];
const fileDropElement = inputElement.closest(".file-drop-area")
const fileLimit = 250 * 1000000;

inputElement.addEventListener("change", (e) => {
    if(inputElement.files[0].size > fileLimit) {
        alert("File is over 250MB!");
        return
    }

    if (inputElement.files.length) {
        updateFileDropFileList(fileDropElement, inputElement.files[0]);
    }
});

fileDropElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    fileDropElement.classList.add("fileDrop--over");
});