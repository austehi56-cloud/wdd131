// Temple Data Array (7 provided + 3 added = 10 temples)
const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // 3 Additional Temples
    {
        templeName: "Salt Lake",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 382207,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/salt-lake-utah/400x250/salt-lake-temple-37762.jpg"
    },
    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/accra-ghana/400x250/accra-ghana-temple-detail-249022-2400x1200.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/400x250/1-Rome-Temple-2160936.jpg"
    }
];

// DOM Elements
const templeContainer = document.getElementById("temple-cards");
const pageTitle = document.getElementById("page-title");
const navLinks = document.querySelectorAll(".navigation a");
const hamButton = document.getElementById("menu");
const navigation = document.querySelector(".navigation");

// Hamburger Menu Toggle
hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
});

// Function to Build and Render Temple Cards
function displayTemples(filteredList) {
    templeContainer.innerHTML = "";

    filteredList.forEach((temple) => {
        const card = document.createElement("section");
        card.classList.add("temple-card");

        const name = document.createElement("h3");
        name.textContent = temple.templeName;

        const location = document.createElement("p");
        location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;

        const dedicated = document.createElement("p");
        dedicated.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;

        const area = document.createElement("p");
        area.innerHTML = `<span class="label">Size:</span> ${temple.area.toLocaleString()} sq ft`;

        const img = document.createElement("img");
        img.src = temple.imageUrl;
        img.alt = temple.templeName;
        img.loading = "lazy";
        img.width = 400;
        img.height = 250;

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedicated);
        card.appendChild(area);
        card.appendChild(img);

        templeContainer.appendChild(card);
    });
}

// Helper to Manage Active Link Styling
function setActiveLink(activeId) {
    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.id === activeId) {
            link.classList.add("active");
        }
    });
}

// Navigation Filter Event Listeners
document.getElementById("home").addEventListener("click", (e) => {
    e.preventDefault();
    pageTitle.textContent = "Home";
    setActiveLink("home");
    displayTemples(temples);
});

document.getElementById("old").addEventListener("click", (e) => {
    e.preventDefault();
    pageTitle.textContent = "Old";
    setActiveLink("old");
    const oldTemples = temples.filter((temple) => {
        const year = parseInt(temple.dedicated.split(",")[0], 10);
        return year < 1900;
    });
    displayTemples(oldTemples);
});

document.getElementById("new").addEventListener("click", (e) => {
    e.preventDefault();
    pageTitle.textContent = "New";
    setActiveLink("new");
    const newTemples = temples.filter((temple) => {
        const year = parseInt(temple.dedicated.split(",")[0], 10);
        return year > 2000;
    });
    displayTemples(newTemples);
});

document.getElementById("large").addEventListener("click", (e) => {
    e.preventDefault();
    pageTitle.textContent = "Large";
    setActiveLink("large");
    const largeTemples = temples.filter((temple) => temple.area > 90000);
    displayTemples(largeTemples);
});

document.getElementById("small").addEventListener("click", (e) => {
    e.preventDefault();
    pageTitle.textContent = "Small";
    setActiveLink("small");
    const smallTemples = temples.filter((temple) => temple.area < 10000);
    displayTemples(smallTemples);
});

// Initial Render (All Temples)
displayTemples(temples);

// Footer Copyright Year and Last Modified Date
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;