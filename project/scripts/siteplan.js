// Click a color swatch to copy its hex code.
const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
}

async function copyHex(hex) {
    try {
        await navigator.clipboard.writeText(hex);
        showToast(`Copied ${hex}`);
    } catch (error) {
        showToast(`Copy failed. Color code: ${hex}`);
    }
}

document.querySelectorAll(".swatch").forEach((swatch) => {
    swatch.addEventListener("click", () => copyHex(swatch.dataset.hex));
});