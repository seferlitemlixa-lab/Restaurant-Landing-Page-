// ---------- Currency symbols ----------
const CUR_SYMBOLS = { azn: '₼', usd: '$', eur: '€' };
let currentCurrency = 'azn';

function applyCurrency(cur) {
    currentCurrency = cur;
    document.querySelectorAll('.price').forEach(el => {
        const amount = el.getAttribute('data-' + cur);
        el.textContent = CUR_SYMBOLS[cur] + amount;
    });
    document.querySelectorAll('.cur-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-cur') === cur);
    });
}

document.querySelectorAll('.cur-btn').forEach(btn => {
    btn.addEventListener('click', () => applyCurrency(btn.getAttribute('data-cur')));
});

// ---------- Search filter ----------
const searchInput = document.getElementById('dishSearch');
const noResults = document.getElementById('noResults');
const dishCards = Array.from(document.querySelectorAll('.dish-card'));
const menuGroups = Array.from(document.querySelectorAll('.menu-group'));

function filterDishes() {
    const query = searchInput.value.trim().toLowerCase();
    let anyVisible = false;

    menuGroups.forEach(group => {
        const cards = Array.from(group.querySelectorAll('.dish-card'));
        let groupHasMatch = false;

        cards.forEach(card => {
            const name = card.getAttribute('data-name');
            const description = card.querySelector('p').textContent.toLowerCase();
            const matches = query === '' || name.includes(query) || description.includes(query);
            card.style.display = matches ? '' : 'none';
            if (matches) { groupHasMatch = true; anyVisible = true; }
        });

        group.style.display = groupHasMatch ? '' : 'none';
    });

    noResults.hidden = anyVisible;
}

searchInput.addEventListener('input', filterDishes);

// ---------- Init ----------
applyCurrency('azn');
