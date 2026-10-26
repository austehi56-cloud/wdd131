// Current year in the footer
document.querySelector("#currentyear").textContent = new Date().getFullYear();

// Last modified date of this document
document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;