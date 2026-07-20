/*==================================================
            REVEAL ON SCROLL
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("in");

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.12

    });

    document.querySelectorAll(".reveal").forEach((element) => {

        observer.observe(element);

    });

});

// ================================================================

/*==================================================
                PREMIUM NAVBAR
==================================================*/

const navbar = document.getElementById("navbar");
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("navOverlay");

/*==========================================
        OPEN MENU
==========================================*/

function openMobileMenu(){

    mobileMenu.classList.add("active");
    overlay.classList.add("active");
    burger.classList.add("active");

    document.body.classList.add("menu-open");

}

/*==========================================
        CLOSE MENU
==========================================*/

function closeMobileMenu(){

    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    burger.classList.remove("active");

    document.body.classList.remove("menu-open");

}

/*==========================================
            BUTTON EVENTS
==========================================*/

burger.addEventListener("click", () => {

    if (mobileMenu.classList.contains("active")) {

        closeMobileMenu();

    } else {

        openMobileMenu();

    }

});



overlay.addEventListener("click", closeMobileMenu);

/*==========================================
        CLOSE WHEN LINK CLICKED
==========================================*/

document
.querySelectorAll(".mobile-nav a,.mobile-btn")
.forEach(link=>{

    link.addEventListener("click",()=>{

        closeMobileMenu();

    });

});

/*==========================================
        ESC KEY CLOSE
==========================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeMobileMenu();

    }

});

/*==========================================
        SCROLL EFFECT
==========================================*/

window.addEventListener("scroll",()=>{

    if(window.scrollY>40){

        navbar.classList.add("scrolled");

    }

    else{

        navbar.classList.remove("scrolled");

    }

});

/*==========================================
        WINDOW RESIZE
==========================================*/

window.addEventListener("resize",()=>{

    if(window.innerWidth>992){

        closeMobileMenu();

    }

});

/*==========================================
        ACTIVE LINK
==========================================*/

const currentPage = location.pathname.split("/").pop();

document
.querySelectorAll(".nav-links a,.mobile-nav a")
.forEach(link=>{

    const href = link.getAttribute("href");

    if(href===currentPage || (currentPage==="" && href==="index.html")){

        link.classList.add("active");

    }

});

/*==========================================
        PREVENT BODY SCROLL
==========================================*/

mobileMenu.addEventListener("touchmove",(e)=>{

    if(!mobileMenu.contains(e.target)){

        e.preventDefault();

    }

},{passive:false});

