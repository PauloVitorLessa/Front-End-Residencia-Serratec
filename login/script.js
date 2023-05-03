class User {
    constructor(nome, sobrenome, email, senha){
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = window.btoa(email);
        this.senha = window.btoa(senha);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#create_account");

    document.querySelector("#link_create_account").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form_hidden");
        createAccountForm.classList.remove("form_hidden");
    });

    document.querySelector("#link_login").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form_hidden");
        createAccountForm.classList.add("form_hidden");
    });

});

function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form_message");

    messageElement.textContent = message;
    messageElement.classList.remove("form_message_success", "form_message_error");
    messageElement.classList.add(`form_message_${type}`);
};

document.querySelector("#login").querySelector(".form_button").addEventListener("click" , e => {
    e.preventDefault();    
    const loginForm = document.querySelector("#login");
    const email = loginForm.querySelector("#email_input");
    const password = loginForm.querySelector("#password_input");    

    if(localStorage.getItem(window.btoa(email.value)) !== null){
        const user = JSON.parse(localStorage.getItem(window.btoa(email.value)));
        if(user.senha == window.btoa(password.value)){
            function clearSessionStorage(_callback){
                sessionStorage.clear();
                _callback();
            }
            sessionStorage.setItem("user", JSON.stringify(user));
            window.location.href = "./home.html";
        }else{
            setFormMessage(loginForm, "error" , "E-mail ou senha inválidos.");        
        setTimeout(function() {
            setFormMessage(loginForm, "error" , "");
        }, 3000);
        }
    } else{
        setFormMessage(loginForm, "error" , "E-mail ou senha inválidos.");        
        setTimeout(function() {
            setFormMessage(loginForm, "error" , "");
        }, 3000);
    }
});

document.querySelector("#create_account").querySelector(".form_button").addEventListener("click" , e => {
    e.preventDefault();    
    const createAccountForm = document.querySelector("#create_account");
    const name = createAccountForm.querySelector("#create_name_input");
    const surname = createAccountForm.querySelector("#create_surname_input");
    const email = createAccountForm.querySelector("#create_email_input");
    const password = createAccountForm.querySelector("#create_password_input");
    const password2 = createAccountForm.querySelector("#confirm_password_input");

    if(localStorage.getItem(window.btoa(email.value)) == null && password.value == password2.value && name.value != "" && surname.value != "" && email.value != "" && password != ""){
        const user = new User(name.value,surname.value, email.value, password.value);
        localStorage.setItem(user.email, JSON.stringify(user));
        setFormMessage(createAccountForm, "success" , "Conta criada com sucesso!");
        setTimeout(function() {
            setFormMessage(createAccountForm, "success" , "");
        }, 3000);
    }else{
        setFormMessage(createAccountForm, "error" , "Não foi possível criar a conta. Algum campo está inválido");
        console.log(name.value);
        setTimeout(function() {
            setFormMessage(createAccountForm, "success" , "");
        }, 3000);
    }
    

});

function setInputError(inputElement, message) {
    inputElement.classList.add("form_input_error");
    inputElement.parentElement.querySelector(".form_input_error_message").textContent = message;
}

function clearInputError(inputElement){
    inputElement.classList.remove("form_input_error");
    inputElement.parentElement.querySelector(".form_input_error_message").textContent = "";
}

document.querySelector("#confirm_password_input").addEventListener("input" , e => {
    const password = document.querySelector("#create_password_input");
    if(e.target.value !== password.value){
        setInputError(e.target, "As senhas não são iguais. Tente novamente.")
    }else{
        clearInputError(e.target);
    }
    
});

document.querySelector("#create_email_input").addEventListener("input" , e => {

    
    if(localStorage.getItem(window.btoa(e.target.value)) !== null){
        setInputError(e.target, "E-mail já cadastrado. Tente novamente.")
    }else{
        clearInputError(e.target);
    }
    
});






