// Shared: navbar toggle, reveal-on-scroll, active link
document.addEventListener("DOMContentLoaded", () => {
  // Burger
  const nav = document.querySelector(".nav");
  const burger = document.querySelector(".nav__burger");
  burger?.addEventListener("click", () => nav.classList.toggle("open"));

  // Active link based on filename
  const page = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__links a").forEach(a => {
    if (a.getAttribute("href") === page) a.classList.add("active");
  });

  // Reveal on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
});
