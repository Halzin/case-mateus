const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  mobileMenu.inert = !open;
  if (!open) menuButton.focus({ preventScroll: true });
}

menuButton.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && document.body.classList.contains('menu-open')) setMenu(false);
});
window.matchMedia('(min-width: 761px)').addEventListener('change', event => {
  if (event.matches && document.body.classList.contains('menu-open')) setMenu(false);
});

const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 35);
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

if (window.gsap && window.ScrollTrigger && !prefersReducedMotion.matches) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.from('.hero h1', { autoAlpha: 0, y: 28, duration: .9, ease: 'power3.out', delay: .2 });
  gsap.from('.hero-bottom', { autoAlpha: 0, y: 18, duration: .7, ease: 'power2.out', delay: .42 });

  gsap.fromTo('.hero-image', { scale: 1.045 }, { scale: 1, duration: 1.5, ease: 'power2.out' });

  const moment = document.querySelector('.visual-moment');
  const statements = [...document.querySelectorAll('.moment-statement')];
  const progress = document.querySelector('.moment-progress span');
  let activeIndex = 0;
  function showStatement(index) {
    if (index === activeIndex) return;
    statements.forEach((statement, statementIndex) => statement.classList.toggle('is-active', statementIndex === index));
    activeIndex = index;
  }
  if (window.matchMedia('(min-width: 761px)').matches) {
    ScrollTrigger.create({
      trigger: moment,
      start: 'top 75%',
      end: 'bottom 25%',
      onUpdate: self => {
        showStatement(Math.min(2, Math.floor(self.progress * 3)));
        gsap.set(progress, { width: `${(self.progress * 66.67) + 33.33}%` });
      },
      onLeave: () => showStatement(2),
      onLeaveBack: () => showStatement(0)
    });
  }
}
