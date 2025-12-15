// Smooth scroll for Explore button
document.querySelector(".btn-explore").addEventListener("click", (e) => {
  e.preventDefault();
  const targetId = e.target.getAttribute("href").slice(1);
  const targetSection = document.getElementById(targetId);

  if (targetSection) {
    // Use window.scroll with smooth behavior
    targetSection.scrollIntoView({ behavior: "smooth" });
  }
});

// Animated counters
const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const count = +counter.innerText;

    const increment = target / 200; // Speed control

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 10);
    } else {
      counter.innerText = target; // Ensure it finishes exactly at target
    }
  };
  updateCount();
});

// Dark mode toggle
const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️ Light Mode";
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
  }
});

// Reveal animation on scroll
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;
  revealElements.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
