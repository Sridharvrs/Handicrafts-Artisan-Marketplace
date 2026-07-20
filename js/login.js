/*==================================================
                ELEMENTS
==================================================*/

const loginForm = document.getElementById("loginForm");

const email = document.getElementById("email");

const password = document.getElementById("password");

const togglePassword =
document.getElementById("togglePassword");

const message =
document.getElementById("message");


/*==================================================
            PASSWORD RULES
==================================================*/

const lengthRule =
document.getElementById("length");

const upperRule =
document.getElementById("upper");

const lowerRule =
document.getElementById("lower");

const numberRule =
document.getElementById("number");

const symbolRule =
document.getElementById("symbol");


/*==================================================
            EYE TOGGLE
==================================================*/

togglePassword.addEventListener("click",()=>{

    if(password.type==="password"){

        password.type="text";

        togglePassword.innerHTML=
        '<i class="fa-solid fa-eye-slash"></i>';

    }

    else{

        password.type="password";

        togglePassword.innerHTML=
        '<i class="fa-solid fa-eye"></i>';

    }

});


/*==================================================
            PASSWORD VALIDATION
==================================================*/

function validatePassword(){

    const value=password.value;

    const rules={

        length:value.length>=8,

        upper:/[A-Z]/.test(value),

        lower:/[a-z]/.test(value),

        number:/[0-9]/.test(value),

        symbol:/[!@#$%^&*(),.?":{}|<>]/.test(value)

    };

    updateRule(lengthRule,rules.length);

    updateRule(upperRule,rules.upper);

    updateRule(lowerRule,rules.lower);

    updateRule(numberRule,rules.number);

    updateRule(symbolRule,rules.symbol);

    return Object.values(rules).every(Boolean);

}


/*==================================================
            UPDATE RULE
==================================================*/

function updateRule(element,status){

    if(status){

        element.classList.add("valid");

        element.classList.remove("invalid");

        element.innerHTML="✔ "+
        element.textContent.replace(/^✔|✖/,"");

    }

    else{

        element.classList.add("invalid");

        element.classList.remove("valid");

        element.innerHTML="✖ "+
        element.textContent.replace(/^✔|✖/,"");

    }

}


/*==================================================
        LIVE PASSWORD CHECK
==================================================*/

password.addEventListener("input",()=>{

    validatePassword();

});


/*==================================================
            EMAIL FORMAT
==================================================*/

function validateEmail(emailValue){

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(emailValue);

}


/*==================================================
        REMOVE EXTRA SPACES
==================================================*/

email.addEventListener("input",()=>{

    email.value=email.value.trimStart();

});

/*==================================================
                REMEMBER ME
==================================================*/

const rememberMe = document.getElementById("rememberMe");

/*==================================================
                LOGIN
==================================================*/

loginForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    const emailValue = email.value.trim();

    const passwordValue = password.value;

    const role =
    document.querySelector(
    'input[name="role"]:checked'
    ).value;

    /*==============================
            EMAIL
    ==============================*/

    if(emailValue===""){

        showMessage(
        "Please enter your email.",
        false
        );

        return;

    }

    if(!validateEmail(emailValue)){

        showMessage(
        "Please enter a valid email address.",
        false
        );

        return;

    }

    /*==============================
            PASSWORD
    ==============================*/

    if(passwordValue===""){

        showMessage(
        "Please enter your password.",
        false
        );

        return;

    }

    if(!validatePassword()){

        showMessage(
        "Password doesn't satisfy all requirements.",
        false
        );

        return;

    }

    /*==============================
        REMEMBER ME
    ==============================*/

    if(rememberMe && rememberMe.checked){

        localStorage.setItem(
            "rememberEmail",
            emailValue
        );

    }

    else{

        localStorage.removeItem(
            "rememberEmail"
        );

    }

    /*==============================
        CURRENT USER
    ==============================*/

    const currentUser={

        email:emailValue,

        role:role,

        name:emailValue.split("@")[0]

    };

    sessionStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );

    /*==============================
        SUCCESS
    ==============================*/

    showMessage(
        "Login successful! Redirecting...",
        true
    );

    setTimeout(()=>{

        if(role==="admin"){

            window.location.href=
            "admin-dashboard.html";

        }

        else{

            window.location.href=
            "user-dashboard.html";

        }

    },1200);

});


/*==================================================
            SHOW MESSAGE
==================================================*/

function showMessage(text,success){

    message.textContent=text;

    if(success){

        message.classList.remove("error");

        message.classList.add("success");

    }

    else{

        message.classList.remove("success");

        message.classList.add("error");

    }

}


/*==================================================
        LOAD SAVED EMAIL
==================================================*/

window.addEventListener("DOMContentLoaded",()=>{

    const savedEmail =
    localStorage.getItem(
    "rememberEmail"
    );

    if(savedEmail){

        email.value = savedEmail;

        if(rememberMe){

            rememberMe.checked = true;

        }

    }

    validatePassword();

});