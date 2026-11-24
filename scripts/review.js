let count = Number(localStorage.getItem("reviewCount")) || 0;
count += 1;
localStorage.setItem("reviewCount", count);

document.querySelector("#reviewCount").textContent = count;
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;