// Simple filter demo
document.querySelectorAll(".filter-group li").forEach(li => {
  li.addEventListener("click", () => {
    li.parentElement.querySelectorAll("li").forEach(x => x.classList.remove("on"));
    li.classList.add("on");
    const cat = li.dataset.cat;
    document.querySelectorAll(".product").forEach(p => {
      p.style.display = !cat || cat === "all" || p.dataset.cat === cat ? "" : "none";
    });
  });
});

document.querySelectorAll(".product__like").forEach(b => {
  b.addEventListener("click", e => {
    e.stopPropagation();
    b.textContent = b.textContent === "♥" ? "♡" : "♥";
  });
});
