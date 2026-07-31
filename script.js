function showPage(id, el) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.getElementById('page-' + id).classList.add('active');
      el.classList.add('active');
      window.scrollTo(0, 0);
      // fecha o menu mobile após escolher
      document.querySelector('.navbar-tabs').classList.remove('active');
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
