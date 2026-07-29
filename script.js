// ===== Terminal typing effect =====
const terminalLines = [
  { type: 'cmd', text: 'whoami' },
  { type: 'out', text: 'Abdullah Al Mamun — CSE Graduate, BUBT' },
  { type: 'cmd', text: 'skills --list' },
  { type: 'out', text: 'Python, AI/ML, NLP, full-stack web development' },
  { type: 'cmd', text: 'status' },
  { type: 'out', text: 'Open to Software Engineering / AI-ML / Automation roles' },
];

const body = document.getElementById('terminalBody');
let lineIndex = 0;

function typeLine() {
  if (lineIndex >= terminalLines.length) {
    // blinking cursor at the end
    const cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';
    body.appendChild(cursor);
    return;
  }

  const lineData = terminalLines[lineIndex];
  const lineEl = document.createElement('div');
  lineEl.className = 'terminal-line';

  if (lineData.type === 'cmd') {
    const prompt = document.createElement('span');
    prompt.className = 'terminal-prompt';
    prompt.textContent = '❯ ';
    lineEl.appendChild(prompt);
    body.appendChild(lineEl);
    typeText(lineEl, lineData.text, prompt.textContent.length === 0 ? 0 : undefined, () => {
      lineIndex++;
      setTimeout(typeLine, 260);
    });
  } else {
    lineEl.className = 'terminal-line terminal-output';
    body.appendChild(lineEl);
    typeText(lineEl, lineData.text, undefined, () => {
      lineIndex++;
      setTimeout(typeLine, 260);
    });
  }
}

function typeText(el, text, _unused, done) {
  let i = 0;
  const speed = 22;
  const span = document.createElement('span');
  el.appendChild(span);

  function step() {
    if (i < text.length) {
      span.textContent += text.charAt(i);
      i++;
      setTimeout(step, speed);
    } else {
      done();
    }
  }
  step();
}

// Respect reduced motion: skip animation, show everything instantly
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReduced) {
  terminalLines.forEach(lineData => {
    const lineEl = document.createElement('div');
    lineEl.className = lineData.type === 'cmd' ? 'terminal-line' : 'terminal-line terminal-output';
    if (lineData.type === 'cmd') {
      lineEl.innerHTML = `<span class="terminal-prompt">❯ </span>${lineData.text}`;
    } else {
      lineEl.textContent = lineData.text;
    }
    body.appendChild(lineEl);
  });
} else {
  typeLine();
}

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Contact form (no backend — swap in Formspree/EmailJS) =====
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // TODO: Replace this with a real submission handler.
  // Easiest options: Formspree (https://formspree.io) or EmailJS (https://emailjs.com)
  // Both let a static site send real emails with no backend of your own.
  note.textContent = 'Message captured locally — connect a form service (see script.js) to actually send this.';
  form.reset();
});

// ===== Active nav link on scroll =====
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(section => observer.observe(section));
