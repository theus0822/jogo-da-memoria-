const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");
const grid = document.querySelector(".grid")
const points = document.querySelector(".points")

let currentTime = 0;
let pontos = 0;

window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem("player");

    startTimer();
    loadGame();
};

const startTimer = () => {

    this.loop = setInterval(() => {
       
        points.innerHTML = pontos;
        currentTime++;
        timer.innerHTML = currentTime;

    }, 1000);
};


// array dos personagens da cartas

const characters = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10"
    
]

// dobrando o tamanho do array
const duplicateCharacters = [...characters, ...characters];

// Embaralhar as cartas
const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5)

// função paracriar os elementos
const createElement = (tag, className) => {

    const element = document.createElement(tag);
    element.className = className;
    return element;
;}


// criar as cartas
const createCard = (character) => {

const card = createElement("div", "card");

const front = createElement("div", "face front");

const back = createElement("div", "face back");

front.style.backgroundImage = `url(../images/${character}.webp)`


card.className = "card";

front.className = "face front";
back.className = "face back";

card.appendChild(front);
card.appendChild(back);

card.addEventListener("click", revealCard)
card.setAttribute("data-character", character)

return card

};

// função iniciar o jogo
const loadGame = () => {

    shuffledArray.forEach((character) => {

        const card = createCard(character);
        grid.appendChild(card);
        grid.appendChild(card);

    })


};


let firstCard = "";
let secondCard = "";

// função revelar a carta

const revealCard = ({target}) => {

    console.log(target.parentNode);

    if(target.parentNode.className.includes("reveal-card")){

        return;

    }

    if (firstCard === "") {
        
        target.parentNode.classList.add("reveal-card");
        firstCard = target.parentNode;

    } else if (secondCard === "") {

        target.parentNode.classList.add("reveal-card");
        secondCard = target.parentNode;
        
    }

    checkCards()
};

// função para checar as cartas



const checkCards = () =>{

    const firstCharacter = firstCard.getAttribute("data-character");
    const secondCharacter = secondCard.getAttribute("data-character");

    if (firstCharacter === secondCharacter) {
        // quando as cartas forem iguais

        pontos += 10;

        firstCard.firstChild.classList.add("disabled-card");
        secondCard.firstChild.classList.add("disabled-card");

        firstCard = "";
        secondCard = "";

        

        checkEndGame();

    } else {
        // quando as cartas forem diferentes
        pontos -= 2;

        setTimeout(() => {

            firstCard.classList.remove("reveal-card");
            secondCard.classList.remove("reveal-card");

            firstCard = "";
            secondCard = "";

        }, 500)

        
        
    }

};

// função para checar fim de jogo
const checkEndGame = () => {

    

    const disabledCards = document.querySelectorAll(".disabled-card");

    if (disabledCards.length === 20) {

        localStorage.setItem("score", pontos);
        localStorage.setItem("recordTimer", currentTime);

        clearInterval(this.loop);

        setTimeout (() => {

            alert(`Parabéns ${spanPlayer.innerHTML}!! 
                 Tempo Total: ${currentTime} segundos.
                 Pontos: ${pontos}.`) 
                 
                 const dialog = confirm("Gostaria de jogar novamente?")

                 if (dialog) {
         
                     window.location.reload();
                     
                 } else {
         
                     window.location.href = "../index.html"
                     
                 }

        }, 800);

       

    };
    

};