const BOXED_PAGES = ['sobre','alzirometro', 'trilhas', 'ebook', 'memoria', 'midia', 'noticias'];

// ══ ALTURA REAL DO NAVBAR, PARA AS PÉTALAS COMEÇAREM ABAIXO DELE ══
function updateNavbarHeight() {
  const nav = document.querySelector('.navbar');
  if (nav) {
    document.documentElement.style.setProperty('--navbar-height', nav.offsetHeight + 'px');
  }
}
updateNavbarHeight();
window.addEventListener('resize', updateNavbarHeight);

function showPage(id, el) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.getElementById('page-' + id).classList.add('active');
      el.classList.add('active');
      window.scrollTo(0, 0);
      // fecha o menu mobile após escolher
      document.querySelector('.navbar-tabs').classList.remove('active');

      document.body.classList.toggle('petals-boxed-page', BOXED_PAGES.includes(id));
}

AOS.init({ duration: 700, once: true, offset: 80 });

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  document.querySelector('.theme-toggle').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('alziras-theme', isDark ? 'dark' : 'light');
}

// Aplica o tema salvo assim que a página carrega
(function () {
  const saved = localStorage.getItem('alziras-theme');
  if (saved === 'dark') {
    document.body.classList.add('dark-mode');
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelector('.theme-toggle').textContent = '☀️';
    });
  }
})();

// ══ PÉTALAS LILÁS CAINDO ══
(function () {
  const layer = document.getElementById('petalsLayer');
  if (!layer) return;

  const colors = ['#a878d6', '#8456bf', '#7b3fa0', '#c79ef0'];
  const count = window.innerWidth < 640 ? 12 : 22;

  function petalSVG(color) {
    return '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M12 2 C 18 6, 20 14, 12 22 C 4 14, 6 6, 12 2 Z" fill="' + color + '"/>' +
    '</svg>';
  }

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    const size = 10 + Math.random() * 12;
    petal.style.left = Math.random() * 100 + '%';
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    petal.style.opacity = (0.5 + Math.random() * 0.4).toFixed(2);
    petal.innerHTML = petalSVG(colors[Math.floor(Math.random() * colors.length)]);

    const fallDuration = 9 + Math.random() * 10;
    const swayDuration = 3 + Math.random() * 3;
    petal.style.animationDuration = fallDuration + 's, ' + swayDuration + 's';
    petal.style.animationDelay = (-Math.random() * fallDuration) + 's, ' + (-Math.random() * swayDuration) + 's';
    layer.appendChild(petal);
  }
})();

// ══ PÉTALAS NAS COLUNAS LATERAIS (Alzirômetro, Trilha, E-Book) ══
(function () {
  const colors = ['#a878d6', '#8456bf', '#7b3fa0', '#c79ef0'];

  function petalSVG(color) {
    return '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">' +
      '<path d="M12 2 C 18 6, 20 14, 12 22 C 4 14, 6 6, 12 2 Z" fill="' + color + '"/>' +
    '</svg>';
  }

  function fillColumn(col, count) {
    if (!col) return;
    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';
      const size = 10 + Math.random() * 12;
      petal.style.left = Math.random() * 100 + '%';
      petal.style.width = size + 'px';
      petal.style.height = size + 'px';
      petal.style.opacity = (0.5 + Math.random() * 0.4).toFixed(2);
      petal.innerHTML = petalSVG(colors[Math.floor(Math.random() * colors.length)]);
      const fallDuration = 9 + Math.random() * 10;
      const swayDuration = 3 + Math.random() * 3;
      petal.style.animationDuration = fallDuration + 's, ' + swayDuration + 's';
      petal.style.animationDelay = (-Math.random() * fallDuration) + 's, ' + (-Math.random() * swayDuration) + 's';
      col.appendChild(petal);
    }
  }

  // menos pétalas em telas estreitas, onde sobra pouco espaço lateral
  const count = window.innerWidth < 900 ? 4 : 9;
  document.querySelectorAll('.petals-col').forEach(col => fillColumn(col, count));
})();

document.body.classList.add('petals-boxed-page');
