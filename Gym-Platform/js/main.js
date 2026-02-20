// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ================= ACTIVE NAV LINK ON SCROLL =================
const navLinks = document.querySelectorAll('.nav a');

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100; // Offset for header
  navLinks.forEach(link => {
    if (link.hash) {
      const section = document.querySelector(link.hash);
      if (section) {
        if (
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    }
  });
});

// ================= MOBILE NAV TOGGLE (OPTIONAL) =================
const header = document.querySelector('.main-header');
if (window.innerWidth <= 768) {
  const nav = document.querySelector('.nav');
  const toggle = document.createElement('div');
  toggle.classList.add('nav-toggle');
  toggle.innerHTML = '&#9776;';
  header.appendChild(toggle);

  toggle.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
  });
}
