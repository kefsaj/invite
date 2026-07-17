const weddingDate = new Date('2026-09-05T14:30:00+05:30');

window.addEventListener('load', () => {
  setTimeout(() => document.getElementById('site-loader')?.classList.add('is-hidden'), 500);
});

const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  links.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.16 });
document.querySelectorAll('[data-animate]').forEach(el => revealObserver.observe(el));

const revealButton = document.getElementById('reveal-button');
const dateCard = document.getElementById('date-card');
if (revealButton && dateCard) {
  revealButton.addEventListener('click', () => {
    revealButton.classList.add('is-open');
    setTimeout(() => dateCard.classList.add('is-visible'), 280);
    playChime();
    burstConfetti();
  });
}

function updateCountdown() {
  const countdown = document.getElementById('countdown');
  if (!countdown) return;
  const diff = weddingDate - new Date();
  if (diff <= 0) {
    countdown.innerHTML = '<p class="time-line">The joyful day is here — praise the Lord!</p>';
    return;
  }
  const values = {
    days: Math.floor(diff / 86400000),
    hours: String(Math.floor(diff / 3600000 % 24)).padStart(2, '0'),
    minutes: String(Math.floor(diff / 60000 % 60)).padStart(2, '0'),
    seconds: String(Math.floor(diff / 1000 % 60)).padStart(2, '0')
  };

  Object.entries(values).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.textContent !== String(value)) {
      el.textContent = value;
      el.classList.remove('flip');
      void el.offsetWidth;
      el.classList.add('flip');
    }
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

function playChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioCtx();
    [523.25, 659.25, 783.99].forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const start = ctx.currentTime + index * 0.12;
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.exponentialRampToValueAtTime(0.09, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.85);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.9);
    });
  } catch (e) {
    // Audio is optional and may be blocked by some browsers.
  }
}

function burstConfetti() {
  const colors = ['#c5a557', '#e2cf9c', '#a9bb98', '#cfa3a3', '#55684b'];
  for (let i = 0; i < 34; i++) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--drift', `${(Math.random() - 0.5) * 220}px`);
    piece.style.setProperty('--fall-time', `${1.8 + Math.random() * 1.2}s`);
    piece.style.animationDelay = `${Math.random() * 0.35}s`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 3400);
  }
}

const soundToggle = document.getElementById('sound-toggle');
if (soundToggle) {
  soundToggle.classList.add('pulse');
  soundToggle.addEventListener('click', () => {
    soundToggle.classList.remove('pulse');
    playChime();
  });
}

window.addEventListener('scroll', () => {
  const bg = document.querySelector('.hero-bg');
  if (!bg) return;
  const offset = window.scrollY * 0.08;
  bg.style.setProperty('background-position-y', `calc(50% + ${offset}px)`);
}, { passive: true });
