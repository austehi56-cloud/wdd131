// ----- Data -----
const planting = {
    January: { crops: ["Garlic (under mulch)", "Onion seeds (indoors)"], tip: "Plan your beds and order seeds." },
    February: { crops: ["Peas", "Spinach", "Lettuce (indoors)"], tip: "Start tomato and pepper seeds indoors." },
    March: { crops: ["Radishes", "Carrots", "Kale", "Potatoes"], tip: "Plant once the soil is workable." },
    April: { crops: ["Beets", "Broccoli", "Cabbage", "Swiss chard"], tip: "Protect seedlings on cold nights." },
    May: { crops: ["Tomatoes", "Peppers", "Green beans", "Squash", "Cucumbers"], tip: "Plant warm-season crops after the last frost." },
    June: { crops: ["Corn", "Pumpkins", "Basil", "Melons"], tip: "Water deeply in the morning." },
    July: { crops: ["Bush beans", "Carrots (fall crop)", "Zucchini"], tip: "Mulch to keep soil cool and moist." },
    August: { crops: ["Broccoli (fall)", "Kale", "Turnips", "Lettuce"], tip: "Start fall crops in shade or under cloth." },
    September: { crops: ["Spinach", "Radishes", "Garlic", "Peas"], tip: "Sow cover crops in empty beds." },
    October: { crops: ["Garlic", "Onion sets", "Cover crops"], tip: "Plant garlic before the first hard freeze." },
    November: { crops: ["Garlic (late)", "Winter rye"], tip: "Clean tools and mulch beds for winter." },
    December: { crops: ["Nothing outdoors"], tip: "Rest the beds and review your garden notes." }
};

const plots = [
    { id: "A1", name: "Plot A1", size: "4 x 8 ft raised bed", price: 30, available: true },
    { id: "A2", name: "Plot A2", size: "4 x 8 ft raised bed", price: 30, available: false },
    { id: "B1", name: "Plot B1", size: "4 x 12 ft raised bed", price: 40, available: true },
    { id: "B2", name: "Plot B2", size: "4 x 12 ft raised bed", price: 40, available: true },
    { id: "C1", name: "Plot C1", size: "10 x 10 ft ground plot", price: 55, available: false },
    { id: "C2", name: "Plot C2", size: "10 x 10 ft ground plot", price: 55, available: true }
];

// ----- Helpers -----
const $ = (s) => document.querySelector(s);

// ----- Mobile menu -----
const menuBtn = $("#menuBtn"), nav = $("#nav");
menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
});
nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", false); }
});

// ----- Planting guide -----
const monthSelect = $("#monthSelect"), guideResult = $("#guideResult");
Object.keys(planting).forEach((m) => monthSelect.add(new Option(m, m)));
monthSelect.value = new Date().toLocaleString("en-US", { month: "long" });

function showGuide() {
    const m = monthSelect.value, info = planting[m];
    guideResult.innerHTML = `<h3>What to plant in ${m}</h3>
    <ul class="tags">${info.crops.map((c) => `<li>${c}</li>`).join("")}</ul>
    <p class="tip">${info.tip}</p>`;
}
monthSelect.addEventListener("change", showGuide);
showGuide();

// ----- Plots -----
const plotList = $("#plotList"), plotChoice = $("#plotChoice");
let filter = "all";

function renderPlots() {
    const list = plots.filter((p) => filter === "all" || p.available);
    plotList.innerHTML = list.map((p) => `
    <article class="plot ${p.available ? "" : "taken"}">
      <h3>${p.name}</h3>
      <span>${p.size}</span>
      <span class="price">$${p.price} per season</span>
      <span class="badge ${p.available ? "open" : "taken"}">${p.available ? "Available" : "Taken"}</span>
      ${p.available ? `<a class="btn" href="#join" data-plot="${p.id}">Request this plot</a>` : ""}
    </article>`).join("");
}

document.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("click", () => {
        document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        filter = chip.dataset.filter;
        renderPlots();
    });
});

plotList.addEventListener("click", (e) => {
    const id = e.target.dataset.plot;
    if (id) { plotChoice.value = id; $("#request").value = "plot"; togglePlotField(); }
});

plotChoice.add(new Option("No preference", ""));
plots.filter((p) => p.available).forEach((p) =>
    plotChoice.add(new Option(`${p.name} ($${p.price})`, p.id)));
renderPlots();

// ----- Form -----
const form = $("#joinForm"), request = $("#request"), status = $("#formStatus");

function togglePlotField() {
    $("#plotField").style.display = request.value === "volunteer" ? "none" : "block";
}
request.addEventListener("change", togglePlotField);
togglePlotField();

function setError(input, errId, msg) {
    $(errId).textContent = msg;
    input.classList.toggle("invalid", !!msg);
    return !msg;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#name"), email = $("#email");
    const okName = setError(name, "#nameErr", name.value.trim() ? "" : "Enter your full name.");
    const okEmail = setError(email, "#emailErr",
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value) ? "" : "Enter a valid email address.");
    if (!okName || !okEmail) { status.textContent = ""; return; }

    const first = name.value.trim().split(" ")[0];
    status.textContent = `Thanks, ${first}. We received your request and will email you soon.`;
    form.reset();
    togglePlotField();
});

// ----- Footer year -----
$("#year").textContent = new Date().getFullYear();