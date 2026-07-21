const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

if(currentUser){

    let name = currentUser.email.split("@")[0];

    // Remove numbers and special characters
    name = name.replace(/[0-9._-]/g," ");
    name = name.replace(/\s+/g," ").trim();

    // Format name
    const formattedName = name
        .split(" ")
        .map(word =>
            word.charAt(0).toUpperCase() +
            word.slice(1).toLowerCase()
        )
        .join(" ");

    // Show name
    document.querySelectorAll(".user-name").forEach(el=>{
        el.textContent = formattedName;
    });

    // Show first letter in avatar
    document.getElementById("userAvatar").textContent =
        formattedName.charAt(0).toUpperCase();

}

// Artisan Dashboard — module switcher + interactions
const toast = document.getElementById('toast');
function showToast(msg){
  toast.textContent = msg;
  toast.classList.add('on');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=>toast.classList.remove('on'), 2200);
}

// ── VIEW SWITCHER ──
const navLinks = document.querySelectorAll('.loom-nav a');
const views    = document.querySelectorAll('.aview');
const labels   = { overview:'Overview', orders:'Orders', inventory:'Inventory', story:'Story', earnings:'Earnings', workshop:'Workshop' };
function activate(key){
  navLinks.forEach(l => l.classList.toggle('active', l.dataset.view === key));
  views.forEach(v => v.classList.toggle('on', v.dataset.panel === key));
  window.scrollTo({top:0, behavior:'smooth'});
  showToast(`↪ ${labels[key] || key}`);
}
navLinks.forEach(a => a.addEventListener('click', e => { e.preventDefault(); activate(a.dataset.view); }));
document.querySelectorAll('[data-jump]').forEach(el =>
  el.addEventListener('click', e => { e.preventDefault(); activate(el.dataset.jump); }));

// ── Order stage cycling ──
const stages = [{label:'dyeing',cls:'dye'},{label:'drying',cls:'dry'},{label:'packing',cls:'pack'}];
document.querySelectorAll('.orders .mini').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const row = btn.closest('tr');
    const tag = row.querySelector('.tag');
    if(!tag) return;
    const cur = stages.findIndex(s=>tag.classList.contains(s.cls));
    const nxt = stages[(cur+1)%stages.length];
    tag.className = 'tag '+nxt.cls;
    tag.textContent = nxt.label;
    showToast(`Order ${row.querySelector('code').textContent} → ${nxt.label}`);
  });
});

// ── Filter tabs ──
document.querySelectorAll('.aftab').forEach(t => t.addEventListener('click', ()=>{
  t.parentElement.querySelectorAll('.aftab').forEach(x=>x.classList.remove('on'));
  t.classList.add('on');
  showToast(`Showing: ${t.textContent}`);
}));

// ── Chat composer (workshop view) ──
const send = document.getElementById('send');
const inp  = document.getElementById('msg');
if(send && inp){
  const chat = document.querySelector('.chat');
  const sendMsg = ()=>{
    const v = inp.value.trim(); if(!v) return;
    const b = document.createElement('div');
    b.className='bubble out';
    b.innerHTML = `<p>${v}</p><small>You · just now</small>`;
    chat.appendChild(b); chat.scrollTop = chat.scrollHeight;
    inp.value=''; showToast('Reply sent');
  };
  send.addEventListener('click', sendMsg);
  inp.addEventListener('keydown', e=>{ if(e.key==='Enter') sendMsg(); });
}

// ── Calendar days ──
document.querySelectorAll('.d:not(.muted)').forEach(d =>
  d.addEventListener('click', ()=> showToast(`Selected July ${d.textContent}`)));

// ── Story: save / preview ──
document.querySelectorAll('.se-actions .pill-btn').forEach(b =>
  b.addEventListener('click', ()=> showToast(b.textContent.trim())));

// ── Inventory: add product placeholder ──
document.querySelectorAll('.ic .mini').forEach(b =>
  b.addEventListener('click', ()=> showToast(b.textContent.trim()+' — coming soon')));
const addCard = document.querySelector('.ic.add');
if(addCard) addCard.addEventListener('click', ()=> showToast('Opening new-product form…'));

// ── Plan checkboxes ──
document.querySelectorAll('.plan .chk').forEach(c =>
  c.addEventListener('click', ()=>{ c.classList.toggle('on'); showToast(c.classList.contains('on') ? 'Done ✓' : 'Reopened'); }));

// ── Quick actions ──
document.querySelectorAll('.topbar .pill-btn').forEach(b =>
  b.addEventListener('click', ()=> showToast(b.textContent.trim()+' — coming soon')));

// ── Reveal ──
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; } });
},{threshold:.08});
document.querySelectorAll('.stat,.panel,.ic,.po,.se-col').forEach((el,i)=>{
  el.style.opacity='0'; el.style.transform='translateY(20px)';
  el.style.transition=`opacity .5s ${i*.03}s ease, transform .5s ${i*.03}s ease`;
  io.observe(el);
});

console.log('%cKarigar° Artisan Studio','background:#e8b04a;color:#161311;padding:6px 14px;border-radius:999px;font-family:monospace;font-weight:600');


const menuToggle = document.getElementById("menuToggle");
const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.querySelector(".loom");
const overlay = document.getElementById("sidebarOverlay");

function openMenu() {
    sidebar.classList.add("active");
    overlay.classList.add("active");
}

function closeMenu() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
}

menuToggle.addEventListener("click", openMenu);

closeSidebar.addEventListener("click", closeMenu);

overlay.addEventListener("click", closeMenu);

document.querySelectorAll(".loom-nav a").forEach(link => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});