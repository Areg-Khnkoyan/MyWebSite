/* SCROLL REVEAL */
const reveals = document.querySelectorAll(".reveal");
window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) el.classList.add("active");
  });
});

/* Lively COUNTERS */
const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {
  const animate = () => {
    const target = +counter.dataset.target;
    let current = 0;
    const duration = 2000; // 2 seconds
    const stepTime = Math.abs(Math.floor(duration / target));

    const step = () => {
      current += Math.ceil(target / 100);
      if (current > target) current = target;
      counter.innerText = current;
      if (current < target) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  animate();
});

/* DARK MODE BUTTON */
const themeBtn = document.getElementById("themeToggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent =
    document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});

// FLOATING SCROLL FUNCTION
function smoothScroll(target, duration = 1000) {
  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + window.scrollY;
  const distance = end - start;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    // easeInOutQuad for smooth acceleration/deceleration
    const ease = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;

    window.scrollTo(0, start + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

// APPLY TO ALL ANCHORS
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) smoothScroll(target, 1200); // 1.2s duration
  });
});
