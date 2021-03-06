const boardBody = document.querySelector("#boardBody");
const playersLetters = document.querySelectorAll(".letter");
const newLettersButton = document.querySelector("#newLetters");
const letterSpans = document.querySelectorAll(".lettersRow span");

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

const allSquares = document.querySelectorAll(".square");

function randomLetter() {
    const alphabet = "aeiouyrtzplkjhgfdsxcvbnměščřžýáíéůú";
    let letter = alphabet[Math.floor(Math.random() * alphabet.length)];
    return letter;
}

function giveLetters () {
    for (let i = 1; i < 8; i++){
        document.querySelector(`.letter${i}`).innerText = randomLetter();
    }    
}

giveLetters();

newLettersButton.addEventListener("click", giveLetters);

playersLetters.forEach(letter => {
    letter.addEventListener("dragstart", () => {
        letter.classList.add("dragging");      
    })

    letter.addEventListener("dragend", () => {
        letter.classList.remove("dragging");
    })
})

function dropElement(nodeList) {
    nodeList.forEach(node => {
        node.addEventListener("dragover", (e) => {
            e.preventDefault();
            const letter = document.querySelector(".dragging");
            if (!node.firstChild) {node.appendChild(letter);}
        })
    })
}

dropElement(allSquares);
dropElement(letterSpans);
