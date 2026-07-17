function openInvitation() {
  const intro = document.getElementById("curtainIntro");

  if (!intro) return;

  playSoftChime();

  intro.classList.add("opening");

  setTimeout(() => {
    intro.classList.add("opened");
    document.body.classList.remove("intro-active");
  }, 1450);
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("intro-active");

  const soundToggle = document.getElementById("sound-toggle");
  if (soundToggle) {
    soundToggle.addEventListener("click", playSoftChime);
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  setupCountdown();
  setupScrollReveal();
});

function setupCountdown() {
  const weddingDate = new Date("2026-09-05T14:30:00+05:30").getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  function updateCountdown() {
    const now = Date.now();
    const distance = weddingDate - now;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    daysEl.textContent = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0");
    hoursEl.textContent = String(Math.floor((distance / (1000 * 60 * 60)) % 24)).padStart(2, "0");
    minutesEl.textContent = String(Math.floor((distance / (1000 * 60)) % 60)).padStart(2, "0");
    secondsEl.textContent = String(Math.floor((distance / 1000) % 60)).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function setupScrollReveal() {
  const animatedItems = document.querySelectorAll("[data-animate]");

  if (!("IntersectionObserver" in window)) {
    animatedItems.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  animatedItems.forEach((item) => observer.observe(item));
}

function playSoftChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();

    [523.25, 659.25, 783.99].forEach((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.value = frequency;

      const startTime = audioContext.currentTime + index * 0.13;

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.75);

      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start(startTime);
      oscillator.stop(startTime + 0.8);
    });
  } catch (error) {
    // Audio is optional.
  }
}
