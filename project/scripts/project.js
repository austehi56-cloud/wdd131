document.addEventListener("DOMContentLoaded", () => {
    // Mobile Navigation Toggle
    const menuBtn = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", () => {
            navMenu.classList.toggle("open");
        });
    }

    // 50/30/20 Budget Calculator (Runs on tools.html)
    const calcForm = document.getElementById("budget-form");
    if (calcForm) {
        calcForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const incomeInput = document.getElementById("monthly-income").value;
            const income = parseFloat(incomeInput);

            if (isNaN(income) || income <= 0) {
                alert("Please enter a valid monthly income greater than 0.");
                return;
            }

            const needs = (income * 0.50).toFixed(2);
            const wants = (income * 0.30).toFixed(2);
            const savings = (income * 0.20).toFixed(2);

            document.getElementById("needs-out").textContent = `$${needs}`;
            document.getElementById("wants-out").textContent = `$${wants}`;
            document.getElementById("savings-out").textContent = `$${savings}`;
            document.getElementById("calc-results").hidden = false;
        });
    }
});