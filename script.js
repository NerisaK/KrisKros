// *** All variables available from the start of the game ***//


const boardBody = document.querySelector("#boardBody");
const newLettersButton = document.querySelector("#newLetters");
const cancelButton = document.querySelector("#cancel");
const sendButton = document.querySelector("#send");
const letterSpans = document.querySelectorAll(".letSQ");
const showScore = document.querySelector("#myScore");
let playerScore = 0;


//All available czech letters, points for using them and how many are there in the game
const alphabet = [
    {value: "a", points: 1, quantity: 5},
    {value: "á", points: 2, quantity: 2},
    {value: "b", points: 3, quantity: 2},
    {value: "c", points: 2, quantity: 3},
    {value: "č", points: 4, quantity: 1},
    {value: "d", points: 1, quantity: 3},
    {value: "ď", points: 8, quantity: 1},
    {value: "e", points: 1, quantity: 5},
    {value: "é", points: 3, quantity: 2},
    {value: "ě", points: 3, quantity: 2},
    {value: "f", points: 5, quantity: 1},
    {value: "g", points: 5, quantity: 1},
    {value: "h", points: 2, quantity: 3},
    {value: "i", points: 1, quantity: 4},
    {value: "í", points: 2, quantity: 3},
    {value: "j", points: 2, quantity: 2},
    {value: "k", points: 1, quantity: 3},
    {value: "l", points: 1, quantity: 3},
    {value: "m", points: 2, quantity: 3},
    {value: "n", points: 1, quantity: 5},
    {value: "ň", points: 6, quantity: 1},
    {value: "o", points: 1, quantity: 6},
    {value: "ó", points: 7, quantity: 1},
    {value: "p", points: 1, quantity: 3},
    {value: "r", points: 1, quantity: 3},
    {value: "ř", points: 4, quantity: 2},
    {value: "s", points: 1, quantity: 4},
    {value: "š", points: 4, quantity: 2},
    {value: "t", points: 1, quantity: 4},
    {value: "ť", points: 7, quantity: 1},
    {value: "u", points: 2, quantity: 3},
    {value: "ú", points: 5, quantity: 1},
    {value: "ů", points: 4, quantity: 1},
    {value: "v", points: 1, quantity: 4},
    {value: "x", points: 10, quantity: 1},
    {value: "y", points: 2, quantity: 4},
    {value: "ý", points: 4, quantity: 3},
    {value: "z", points: 2, quantity: 2},
    {value: "ž", points: 4, quantity: 2}
]



// *** Game board *** //


//Create game board with 15 x 15 squares
function generateBoard() {
    for (let i = 1; i < 16; i++) {
        const newRow = document.createElement("div");
        newRow.className += "boardRow";
        for (let i = 1; i < 16; i++) {
            const newSquare = document.createElement("span");
            newSquare.className += "square";
            newRow.append(newSquare);
        }
        boardBody.append(newRow);        
    }
}

generateBoard();

//Choose all game board squares
const allSquares = document.querySelectorAll(".square");



// *** Generating and assigning letters to the player *** //


//Create new property called "current" for each letter/object in an array, its the same as quantity for now. It's going to be used to count how many letters are left in the bank.
function setCurrent(){alphabet.forEach((letter)=>{letter.current = letter.quantity;})};
setCurrent();

//Check if there are any unused letters still (their "current" property value is bigger than 0)
function anyLettersLeft() {
    let arr = alphabet.map((item) => {const allQ = item.current; return allQ;});
    let areLeft = arr.some((q) => {return q > 0;});    
    return areLeft;  
};

//Generate random letter
function randomLetter() {
    let letter = alphabet[Math.floor(Math.random() * alphabet.length)]    
    return letter;       
};

//Choose random letter, but only from available letters and only if there are some letters left
function chooseLetter () {
    let rdmLetter = randomLetter();
    while (rdmLetter.current <= 0) {
        if (anyLettersLeft() == true) {
            rdmLetter = randomLetter();
        } else {newLettersButton.disabled = true; return console.log("No letters left!"); }
    }
    return rdmLetter;
}; 

//Create draggable buttons with random letters
function giveLetters() {
    for (span of letterSpans) {
        if (!span.firstChild) {
            const newButton = document.createElement("button");
            newButton.className += "letter active";
            newButton.draggable = true;
            const newLetter = chooseLetter();
            newButton.innerText = newLetter.value;
            const pointsSpan = document.createElement("span");
            pointsSpan.className += "points";
            pointsSpan.innerText = newLetter.points;
            newLetter.current--
            newButton.appendChild(pointsSpan);
            span.appendChild(newButton);
        }
    }
    playersLetters = document.querySelectorAll(".active");
    dragDrop();    
} 

giveLetters();

//Change letters for other available ones, it costs 5 pts. and player can't have less then 0 pts.
function changeLetters () {
    if (playerScore >= 5) {        
        for (letter of playersLetters){
            //Making old letters available again - currently not working
            //let thisLetter = letter.innerText;
            //let index = alphabet.findIndex(obj => obj.value == thisLetter);
            //alphabet[index].current--;

            const anotherLetter = chooseLetter();
            letter.innerText = anotherLetter.value;
            anotherLetter.current--;
        }
        playerScore = playerScore - 5;           
        showScore.innerText = playerScore;
    }
    else console.log("Not enough points!");
};



// *** Making letters draggable *** //

function dragDrop () {
//Add class to currently dragged letter, so it can be targeted, remove class after player drops it
playersLetters.forEach(letter => {
    letter.addEventListener("dragstart", () => {
        letter.classList.add("dragging");      
    })
    
    letter.addEventListener("dragend", () => {
        letter.classList.remove("dragging");
    })
});


//Allow player to drop the letter to a free square on game board or to a free spot among other available letters
function dropElement(nodeList) {
    nodeList.forEach(node => {
        node.addEventListener("dragover", (e) => {
            e.preventDefault();
            const letter = document.querySelector(".dragging");
            if (!node.firstChild) {node.appendChild(letter);}
        })
    })
};

dropElement(allSquares);
dropElement(letterSpans);
}

dragDrop();

// *** Ending the turn and scoring *** //


function placeLetters() {
    playersLetters = document.querySelectorAll(".active");
    for (letter of playersLetters) {
        if (letter.parentElement.className == "square"){
            letter.classList.add("placed");
            letter.classList.remove("active");
            letter.draggable = false;
            letter.parentElement.classList.add("noBorder");
            let score = parseInt(letter.firstElementChild.innerText);
            playerScore += score;            
            showScore.innerText = playerScore;
        }
    }
}



// *** Buttons and controls *** //


//Change letters when player clicks the button
newLettersButton.addEventListener("click", changeLetters);

//Place letters when player clicks the button 
sendButton.addEventListener("click", () => {
    placeLetters();
    giveLetters();
}); 