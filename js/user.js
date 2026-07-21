const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

if (currentUser) {

    const email = currentUser.email;

    // Extract username from email
    let name = email.split("@")[0];

    // Remove numbers and special characters
    name = name.replace(/[0-9._-]/g, " ");

    // Remove extra spaces
    name = name.replace(/\s+/g, " ").trim();

    // Capitalize each word
    const formattedName = name
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");

    document.querySelectorAll(".user-name").forEach(el => {
        el.textContent = formattedName;
    });

    document.querySelectorAll(".user-email").forEach(el => {
        el.textContent = email;
    });

}

// Buyer Dashboard — module switcher + interactions
const toast = document.getElementById('toast');
function showToast(msg){
  toast.textContent = msg;
  toast.classList.add('on');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=>toast.classList.remove('on'), 2200);
}

// ── VIEW SWITCHER ──────────────────────────────────────────────
const navLinks = document.querySelectorAll('.bnav a');
const views = document.querySelectorAll('.view');
const labels = {
  home:'Overview', orders:'Orders', wish:'Wishlist', map:'Craft map',
  msgs:'Messages', impact:'Impact', wallet:'Wallet', settings:'Settings'
};

function activateView(key){

    navLinks.forEach(l =>
        l.classList.toggle('active', l.dataset.view === key)
    );

    views.forEach(v =>
        v.classList.toggle('on', v.dataset.panel === key)
    );

    // Close sidebar on mobile
    if (window.innerWidth <= 900) {
    closeSidebar();
}

    window.scrollTo({
        top:0,
        behavior:'smooth'
    });

    showToast(`↪ ${labels[key] || key}`);

}

navLinks.forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  activateView(a.dataset.view);
}));
// tiles that jump to another module
document.querySelectorAll('[data-jump]').forEach(el =>
  el.addEventListener('click', e => { e.preventDefault(); activateView(el.dataset.jump); })
);

// ── OVERVIEW: wishlist mini "move to cart" ─────────────────────
document.querySelectorAll('.w-card .tiny').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const card = btn.closest('.w-card');
    const name = card.querySelector('p').textContent;
    card.style.transition='.4s'; card.style.opacity='0'; card.style.transform='translateX(20px)';
    setTimeout(()=>card.remove(), 380);
    showToast(`Added "${name}" to cart`);
  });
});

// ── OVERVIEW: reco filter chips ────────────────────────────────
const chips = document.querySelectorAll('.chip');
chips.forEach(c=>c.addEventListener('click',()=>{
  chips.forEach(x=>x.classList.remove('on'));
  c.classList.add('on');
  const row = document.getElementById('recoRow');
  if(row){ row.style.opacity='0'; setTimeout(()=>{row.style.transition='.35s';row.style.opacity='1'},120); }
  showToast(`Filter: ${c.textContent}`);
}));

// ── OVERVIEW: map pins hover ───────────────────────────────────
document.querySelectorAll('.pin').forEach(p=>{
  p.addEventListener('mouseenter',()=>{p.style.transform='translate(-50%,-50%) scale(1.15)';p.style.transition='.2s'});
  p.addEventListener('mouseleave',()=>{p.style.transform='translate(-50%,-50%) scale(1)'});
});

// ── ORDERS: segment filter ─────────────────────────────────────
document.querySelectorAll('.segs .seg').forEach(s => s.addEventListener('click', ()=>{
  s.parentElement.querySelectorAll('.seg').forEach(x=>x.classList.remove('on'));
  s.classList.add('on');
  showToast(`Showing: ${s.textContent}`);
}));

// ── WISHLIST: move card ────────────────────────────────────────
document.querySelectorAll('.wg-card .tiny').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const card = btn.closest('.wg-card');
    const name = card.querySelector('.wg-name').textContent;
    card.style.transition='.35s'; card.style.opacity='0'; card.style.transform='scale(.9)';
    setTimeout(()=>card.remove(), 320);
    showToast(`Moved "${name}" to cart`);
  });
});

// ── MESSAGES: thread selection ─────────────────────────────────
document.querySelectorAll('.thread').forEach(t => t.addEventListener('click', ()=>{
  document.querySelectorAll('.thread').forEach(x=>x.classList.remove('active'));
  t.classList.add('active');
  showToast(`Opened chat with ${t.querySelector('b').textContent}`);
}));
const chatBtn = document.querySelector('.chat-compose button');
if(chatBtn) chatBtn.addEventListener('click', ()=>{
  const input = document.querySelector('.chat-compose input');
  if(!input.value.trim()) return;
  const log = document.querySelector('.chat-log');
  const b = document.createElement('div');
  b.className='cb out';
  b.innerHTML = `<p>${input.value}</p><small>You · just now</small>`;
  log.appendChild(b);
  log.scrollTop = log.scrollHeight;
  input.value=''; showToast('Message sent');
});

// ── SETTINGS: toggles ──────────────────────────────────────────
document.querySelectorAll('.sw').forEach(s => s.addEventListener('click', ()=>{
  s.classList.toggle('on');
  showToast(s.classList.contains('on') ? 'Turned on' : 'Turned off');
}));
document.querySelectorAll('.s-card .tiny').forEach(b => b.addEventListener('click', e =>{
  e.preventDefault(); showToast('Saved');
}));

// ── Scroll reveal for overview tiles ───────────────────────────
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }
  });
},{threshold:.1});
document.querySelectorAll('.tile').forEach((el,i)=>{
  el.style.opacity='0'; el.style.transform='translateY(24px)';
  el.style.transition=`opacity .6s ${i*.05}s ease, transform .6s ${i*.05}s ease`;
  io.observe(el);
});

console.log('%cKarigar° Buyer Console','background:#b3663e;color:#f5efe3;padding:6px 14px;border-radius:999px;font-family:monospace');

// ===============================

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".bside");
const overlay = document.querySelector(".sidebar-overlay");

let scrollPosition = 0;

function openSidebar() {

    scrollPosition = window.scrollY;

    sidebar.classList.add("active");
    overlay.classList.add("active");

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";
}

function closeSidebar() {

    sidebar.classList.remove("active");
    overlay.classList.remove("active");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";

    window.scrollTo(0, scrollPosition);
}

menuToggle.addEventListener("click", openSidebar);

overlay.addEventListener("click", closeSidebar);

document.querySelectorAll(".bnav a").forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 900) {
            closeSidebar();
        }
    });
});

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        sessionStorage.removeItem("currentUser");

        window.location.href = "login.html";

    });

}