// Smooth scroll for Explore button
document.querySelector(".btn-explore").addEventListener("click", (e)=>{
  e.preventDefault();
  const targetId = e.target.getAttribute("href").slice(1);
  const target = document.getElementById(targetId);
  if(!target) return;

  const startY = window.pageYOffset;
  const targetY = target.getBoundingClientRect().top + startY;
  const distance = targetY - startY;
  const duration = 800;
  let startTime = null;

  function animate(time){
    if(!startTime) startTime = time;
    const elapsed = time - startTime;
    const t = Math.min(elapsed/duration,1);
    const ease = t<0.5? 2*t*t : -1 + (4-2*t)*t;
    window.scrollTo(0, startY + distance*ease);
    if(elapsed<duration) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});

// Animated counters with gradual slow-down
const counters = document.querySelectorAll(".counter");
function easeOutQuad(t){ return t*(2-t); } // easing function for slow-down

function animateCounter(counter){
  const target = +counter.getAttribute("data-target");
  const duration = 2000; // total animation duration
  const start = performance.now();

  function update(now){
    const elapsed = now-start;
    let progress = Math.min(elapsed/duration,1);
    // Apply easing to gradually slow down
    const easedProgress = easeOutQuad(progress);
    counter.textContent = Math.floor(easedProgress * target);

    // Add a subtle "pop" at the end without blocking hover
    if(progress >= 1){
      counter.style.transform = "scale(1.2)";
      counter.style.transition = "transform 0.3s";
      setTimeout(()=>{
        counter.style.transform = "scale(1)";
      },300);
    }

    if(progress < 1){
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Observe counters when they scroll into view
function observeCounters(){
  const observer = new IntersectionObserver((entries, obs)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold:0.5 });
  counters.forEach(c=>observer.observe(c));
}
document.addEventListener("DOMContentLoaded", observeCounters);

// Dark mode toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Reveal animation on scroll
const revealElements = document.querySelectorAll(".reveal");
function revealOnScroll(){
  const h = window.innerHeight;
  revealElements.forEach(el=>{
    if(el.getBoundingClientRect().top < h-100) el.classList.add("active");
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
