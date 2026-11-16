const toast = document.getElementById('toast');
let timer;

function showToast(text) {
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(() => toast.classList.remove('show'), 1800);
}

// Any element with data-msg shows a message when tapped
document.querySelectorAll('[data-msg]').forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        showToast(el.dataset.msg + ' tapped');
    });
});

// Bottom tab switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        showToast(tab.dataset.tab);
    });
});

// Notification bell clears the badge
document.getElementById('bell').addEventListener('click', () => {
    const badge = document.getElementById('badge');
    badge.classList.add('hidden');
    showToast('Notifications cleared');
});

// Email banner opens a prompt and hides itself
document.getElementById('email').addEventListener('click', e => {
    e.preventDefault();
    const email = prompt('Enter your email address:');
    if (email && /^\S+@\S+\.\S+$/.test(email)) {
        document.getElementById('email').classList.add('hidden');
        showToast('Email updated');
    } else if (email) {
        showToast('Enter a valid email');
    }
});