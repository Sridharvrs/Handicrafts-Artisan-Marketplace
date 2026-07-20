/*==================================================
                ELEMENTS
==================================================*/

const form = document.getElementById("signupForm");

const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");

const nextBtn = document.getElementById("nextBtn");
const backBtn = document.querySelector(".back-btn");

const progressBar = document.querySelector(".progress-bar");

const steps = document.querySelectorAll(".step");

const roleCards = document.querySelectorAll(".role-card");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirm = document.getElementById("toggleConfirm");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");


/*==================================================
            STEP NAVIGATION
==================================================*/

nextBtn.addEventListener("click", () => {

    step1.classList.remove("active");
    step2.classList.add("active");

    steps[0].classList.remove("active");
    steps[1].classList.add("active");

    progressBar.style.width = "100%";

});


backBtn.addEventListener("click", () => {

    step2.classList.remove("active");
    step1.classList.add("active");

    steps[1].classList.remove("active");
    steps[0].classList.add("active");

    progressBar.style.width = "50%";

});


/*==================================================
            PASSWORD EYE
==================================================*/

togglePassword.addEventListener("click", () => {

    if(password.type === "password"){

        password.type = "text";

        togglePassword.innerHTML =
        '<i class="fa-solid fa-eye-slash"></i>';

    }else{

        password.type = "password";

        togglePassword.innerHTML =
        '<i class="fa-solid fa-eye"></i>';

    }

});


toggleConfirm.addEventListener("click", () => {

    if(confirmPassword.type === "password"){

        confirmPassword.type = "text";

        toggleConfirm.innerHTML =
        '<i class="fa-solid fa-eye-slash"></i>';

    }else{

        confirmPassword.type = "password";

        toggleConfirm.innerHTML =
        '<i class="fa-solid fa-eye"></i>';

    }

});


/*==================================================
            ROLE CARD
==================================================*/

roleCards.forEach(card=>{

    card.addEventListener("click",()=>{

        roleCards.forEach(c=>c.classList.remove("active"));

        card.classList.add("active");

        card.querySelector("input").checked = true;

    });

});


/*==================================================
            VALIDATION
==================================================*/

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const agree = document.getElementById("agree");
const message = document.getElementById("message");

/* Password Rules */

const lengthRule = document.getElementById("length");
const upperRule = document.getElementById("upper");
const lowerRule = document.getElementById("lower");
const numberRule = document.getElementById("number");
const symbolRule = document.getElementById("symbol");
const matchRule = document.getElementById("match");

/*==================================================
        PASSWORD VALIDATION
==================================================*/

function validatePassword(){

    const value = password.value;

    const checks = {

        length:value.length >= 8,

        upper:/[A-Z]/.test(value),

        lower:/[a-z]/.test(value),

        number:/[0-9]/.test(value),

        symbol:/[!@#$%^&*(),.?":{}|<>]/.test(value)

    };

    updateRule(lengthRule,checks.length);

    updateRule(upperRule,checks.upper);

    updateRule(lowerRule,checks.lower);

    updateRule(numberRule,checks.number);

    updateRule(symbolRule,checks.symbol);

    updateRule(matchRule,value !== "" && value === confirmPassword.value);

    return Object.values(checks).every(Boolean);

}

/*==================================================
            UPDATE RULE
==================================================*/

function updateRule(element,status){

    if(status){

        element.classList.add("valid");

        element.classList.remove("invalid");

        element.innerHTML = "✔ " + element.textContent.replace(/^✔|✖/,"");

    }else{

        element.classList.add("invalid");

        element.classList.remove("valid");

        element.innerHTML = "✖ " + element.textContent.replace(/^✔|✖/,"");

    }

}

/*==================================================
            LIVE VALIDATION
==================================================*/

password.addEventListener("input",validatePassword);

confirmPassword.addEventListener("input",validatePassword);

/*==================================================
        PHONE ONLY NUMBERS
==================================================*/

phone.addEventListener("input",function(){

    this.value = this.value.replace(/[^0-9]/g,"");

});

/*==================================================
            STEP 1 CHECK
==================================================*/

nextBtn.addEventListener("click",()=>{

    const nameRegex = /^[A-Za-z ]+$/;

    const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(firstName.value.trim()===""){

        alert("Enter First Name");

        return;

    }

    if(!nameRegex.test(firstName.value)){

        alert("First Name should contain only letters.");

        return;

    }

    if(lastName.value.trim()===""){

        alert("Enter Last Name");

        return;

    }

    if(!nameRegex.test(lastName.value)){

        alert("Last Name should contain only letters.");

        return;

    }

    if(!emailRegex.test(email.value)){

        alert("Enter valid Email.");

        return;

    }

    if(phone.value.length!==10){

        alert("Phone number must contain 10 digits.");

        return;

    }

});

/*==================================================
            FORM SUBMIT
==================================================*/

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    if(!validatePassword()){

        message.className="message error";

        message.textContent=
        "Please create a stronger password.";

        return;

    }

    if(password.value!==confirmPassword.value){

        message.className="message error";

        message.textContent=
        "Passwords do not match.";

        return;

    }

    if(!agree.checked){

        message.className="message error";

        message.textContent=
        "Accept Terms & Conditions.";

        return;

    }

    message.className="message success";

    message.textContent=
    "Account created successfully! Redirecting...";

    setTimeout(()=>{

        window.location.href="login.html";

    },1500);

});