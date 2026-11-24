// Sample product list to populate the dropdown
const products = [
    { id: "fc-1888", name: "Flux Capacitor" },
    { id: "fc-2050", name: "Power Laces" },
    { id: "fs-1987", name: "Time Circuits" },
    { id: "ac-2000", name: "Low Voltage Reactor" },
    { id: "jj-1969", name: "Warp Equalizer" },
    { id: "tt-1985", name: "Hoverboard" },
    { id: "tt-2015", name: "Mr. Fusion" },
    { id: "tt-1989", name: "Delorean Time Machine" }
];

document.addEventListener("DOMContentLoaded", () => {
    // 1. Populate Product Name dropdown
    const productSelect = document.getElementById("productName");
    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });

    // 2. Populate Footer Year and Last Modified Timestamp
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    // 3. Handle Form Submission
    const form = document.getElementById("reviewForm");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Track total reviews submitted using localStorage
        let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;
        reviewCount++;
        localStorage.setItem("reviewCount", reviewCount);

        alert(`Thank you! Your review has been posted. (Total reviews: ${reviewCount})`);
        form.reset();
    });
});