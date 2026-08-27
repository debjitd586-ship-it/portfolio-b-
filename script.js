const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('nav');
const profilePhoto = document.querySelector('.profile-photo');
const heroCopy = document.querySelector('.hero-copy');
const aiMessages = document.querySelector('#ai-messages');
const aiInput = document.querySelector('#ai-input');
const aiForm = document.querySelector('#ai-form');
const heroHeading = document.querySelector('.hero h1');
if (heroHeading) heroHeading.innerHTML = 'Turning ideas<br><span class="hero-second-line">into <span class="word-cycle">projects</span><b>.</b></span>';
const sectionSpecifics = {
  about: 'A quick profile of Debjit\'s interests, motivation, and current base.',
  work: 'Three browser projects built to practise interaction, logic, and real-time interfaces.',
  skills: 'The current toolkit: core concepts first, then practical experiments that make them stick.',
  education: 'Academic milestones and the B.Tech CSE journey currently in progress.',
  contact: 'For collaboration, feedback, or a conversation about building something useful.'
};
Object.entries(sectionSpecifics).forEach(([sectionId, description]) => {
  const section = document.querySelector(`#${sectionId}`) || document.querySelector(`.${sectionId}`);
  if (!section || section.querySelector('.section-specific')) return;
  const note = document.createElement('p');
  note.className = 'section-specific';
  note.textContent = description;
  const heading = section.querySelector('.section-heading, .section-label') || section.querySelector('.education-grid')?.previousElementSibling || section.firstElementChild;
  heading?.append(note);
});
document.querySelectorAll('.project').forEach((project) => {
  const logo = project.querySelector('.project-logo');
  if (logo) logo.dataset.project = project.querySelector('small')?.textContent || 'BUILD';
});
const aiAnswers = [
  { words: ['hello', 'hi', 'hey', 'who are you', 'about you'], answer: 'Hi, I am Debjit\'s portfolio guide. Debjit is a tech enthusiast and aspiring software developer who likes turning ideas into small, useful projects.' },
  { words: ['hobby', 'hobbies', 'anime', 'game', 'free time'], answer: 'Debjit loves watching anime and playing games. They keep him curious about storytelling, systems, design, and memorable experiences.' },
  { words: ['qualification', 'education', 'school', 'degree', 'study'], answer: 'He scored 74.33% in Class 10 and 72.64% in Higher Secondary at Tiljala High School. He is now a first-year B.Tech CSE student at Future Institute of Engineering and Management under MAKAUT.' },
  { words: ['project', 'projects', 'made', 'build', 'portfolio'], answer: 'His projects include The Curiosity Club, a five-question quiz; Neon Run, a 3D browser shooting experience; and Chronos World Clock with world time, stopwatch, and alarm tools.' },
  { words: ['learn', 'learning', 'skill', 'skills', 'code'], answer: 'He is learning C fundamentals, problem solving, HTML, CSS, and JavaScript basics through hands-on projects.' },
  { words: ['location', 'live', 'where', 'from', 'based', 'city', 'kolkata'], answer: 'Debjit is from and currently based around Picnic Garden Road, Kolkata.' },
  { words: ['contact', 'email', 'hire', 'reach'], answer: 'You can reach Debjit at debjitd586@gmail.com. He is open to learning, collaborating, and hearing about interesting ideas.' }
];

function askAi(question) {
  const cleanQuestion = question.trim();
  if (!cleanQuestion) return;
  const userMessage = document.createElement('div');
  userMessage.className = 'ai-message ai-user';
  const userText = document.createElement('p');
  userText.textContent = cleanQuestion;
  const userLabel = document.createElement('b');
  userLabel.textContent = 'YOU';
  userMessage.append(userText, userLabel);
  aiMessages.append(userMessage);
  const match = aiAnswers.find((item) => item.words.some((word) => cleanQuestion.toLowerCase().includes(word)));
  const botMessage = document.createElement('div');
  botMessage.className = 'ai-message ai-bot';
  const botLabel = document.createElement('b');
  botLabel.textContent = 'AI';
  const botText = document.createElement('p');
  botText.textContent = match?.answer || 'Try asking about Debjit\'s hobbies, qualifications, projects, skills, location, or contact details.';
  botMessage.append(botLabel, botText);
  aiMessages.append(botMessage);
  aiMessages.scrollTop = aiMessages.scrollHeight;
  aiInput.value = '';
}

aiForm.addEventListener('submit', (event) => { event.preventDefault(); askAi(aiInput.value); });
document.querySelectorAll('.ai-suggestions button').forEach((button) => button.addEventListener('click', () => askAi(button.dataset.question)));

window.addEventListener('pointermove', (event) => {
  if (!heroCopy || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth <= 700) return;
  const x = (event.clientX / window.innerWidth - 0.5) * 2;
  const y = (event.clientY / window.innerHeight - 0.5) * 2;
  heroCopy.style.transform = `perspective(900px) rotateY(${x * 1.8}deg) rotateX(${y * -1.2}deg)`;
});
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
const fallingStars = document.querySelector('.falling-stars');

for (let index = 0; index < 52; index += 1) {
  const star = document.createElement('i');
  star.className = 'falling-star';
  star.style.left = `${Math.random() * 100}%`;
  star.style.setProperty('--star-size', `${1 + Math.random() * 2.5}px`);
  star.style.setProperty('--star-duration', `${7 + Math.random() * 10}s`);
  star.style.setProperty('--star-delay', `${Math.random() * -16}s`);
  star.style.setProperty('--star-drift', `${-80 + Math.random() * 160}px`);
  fallingStars.append(star);
}

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
