const form = document.getElementById("contact-form");
const toast = document.getElementById("toast");
form?.addEventListener("submit", e => {
  e.preventDefault();
  toast.classList.add("show");
  form.reset();
  setTimeout(() => toast.classList.remove("show"), 3200);
});
