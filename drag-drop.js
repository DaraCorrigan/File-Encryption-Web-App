const fileDrop = document.getElementsByClassName("file-drop")[0];
const inputFiles = document.querySelectorAll(".file-drop-area input[type='file']");
const inputElement = inputFiles[0];
const fileDropElement = inputElement.closest(".file-drop-area");
// 250MB File Limit
const fileLimit = 250 * 1000000;

inputElement.addEventListener("change", (e) => {
  if (inputElement.files[0].size > fileLimit) {
    alert("File is over 250MB!");
    return;
  }

  if (inputElement.files.length) {
    updateFileDropList(fileDropElement, inputElement.files[0]);
  }
});

fileDropElement.addEventListener("dragover", (e) => {
  e.preventDefault();
  fileDropElement.classList.add("file-drop--over");
});

["dragleave", "dragend"].forEach((type) => {
  fileDropElement.addEventListener(type, (e) => {
    fileDropElement.classList.remove("file-drop--over");
  });
});

fileDropElement.addEventListener("drop", (e) => {
  e.preventDefault();

  if (e.dataTransfer.files[0].size > fileLimit) {
    alert("File is over 250MB!");
    fileDropElement.classList.remove("file-drop--over");
    return;
  }

  if (e.dataTransfer.files.length) {
    inputElement.files = e.dataTransfer.files;
    updateFileDropList(fileDropElement, e.dataTransfer.files[0]);
  }

  fileDropElement.classList.remove("file-drop--over");
});

const updateFileDropList = (fileDropElement, file) => {
  let fileDropMessage = fileDropElement.querySelector(".file-information");

  fileDropMessage.innerHTML = `
        ${file.name}, ${(file.size / 1000000).toFixed(2)}MB`;
};

fileDrop.addEventListener("reset", (e) => {
  let fileDropMessage = fileDropElement.querySelector(".file-information");

  fileDropMessage.innerHTML = `No Files Selected`;
});

fileDrop.addEventListener("submit", (e) => {
  e.preventDefault();
  const myFile = document.getElementById("upload-file");

  if (myFile.files[0].size > fileLimit) {
    alert("File is over 250MB!");
  }

  console.log(myFile.files[0]);
});