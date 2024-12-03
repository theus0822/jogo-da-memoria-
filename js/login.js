const form = document.querySelector(".login-form");
const input = document.querySelector(".login__input");
const button = document.querySelector(".login__button");

//funçao para acionar o botao jogador
const validateInput = ({target}) => {

if (target.value.length > 2) {
    
    button.removeAttribute(`disabled`);
    return;
}

button.setAttribute('disabled', '');

};

//funçao para guardar o none no local storage
const handleSubmit = (event) => {

    event.preventDefault();

    localStorage.setItem("player", input.value);
    input.value = "";

    window.location = "pages/games.html";

};

form.addEventListener("submit",handleSubmit);
input.addEventListener("input", validateInput);