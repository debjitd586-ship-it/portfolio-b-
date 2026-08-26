const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('nav');
const profilePhoto = document.querySelector('.profile-photo');
const clockLogo = document.querySelector('.clock .project-logo span');
const clockLogoFrame = document.querySelector('.clock .project-logo');

function updateProjectClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;
  clockLogo.style.setProperty('--clock-hour', `${hours * 30}deg`);
  clockLogo.style.setProperty('--clock-minute', `${minutes * 6}deg`);
  clockLogoFrame.style.setProperty('--clock-second', `${seconds * 6}deg`);
}

updateProjectClock();
setInterval(updateProjectClock, 1000);
const introScreen = document.querySelector('#intro-screen');
const glitterField = document.querySelector('.glitter-field');

for (let index = 0; index < 38; index += 1) {
  const glitter = document.createElement('i');
  glitter.className = 'glitter';
  glitter.style.left = `${Math.random() * 100}%`;
  glitter.style.top = `${Math.random() * 100}%`;
  glitter.style.setProperty('--glitter-duration', `${1.4 + Math.random() * 2.2}s`);
  glitter.style.setProperty('--glitter-delay', `${Math.random() * 1.8}s`);
  glitterField.append(glitter);
}

setTimeout(() => introScreen.classList.add('done'), 2600);

profilePhoto.addEventListener('error', () => {
  profilePhoto.hidden = true;
});

clockLogo?.addEventListener('click', (event) => {
  event.preventDefault();
  clockLogo.classList.add('logo-pulse');
  setTimeout(() => clockLogo.classList.remove('logo-pulse'), 500);
});

window.addEventListener('pointermove', (event) => {
  cursorDot.style.left = `${event.clientX}px`;
  cursorDot.style.top = `${event.clientY}px`;
  cursorRing.style.left = `${event.clientX}px`;
  cursorRing.style.top = `${event.clientY}px`;
});

document.querySelectorAll('a, button, select').forEach((interactive) => {
  interactive.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
  interactive.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
});

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

const cycleWords = ['projects', 'experiments', 'experiences'];
let wordIndex = 0;
const wordElement = document.querySelector('.word-cycle');
setInterval(() => {
  wordElement.classList.add('changing');
  setTimeout(() => {
    wordIndex = (wordIndex + 1) % cycleWords.length;
    wordElement.textContent = cycleWords[wordIndex];
    wordElement.classList.remove('changing');
  }, 220);
}, 2400);

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.about, .work, .skills, .education, .contact').forEach((section) => revealObserver.observe(section));
