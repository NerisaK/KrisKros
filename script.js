const newLettersButton = document.querySelector("#newLetters");
const boardBody = document.querySelector("#boardBody");

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
        giveLetters();
    }
}

document.body.onload = generateBoard;

newLettersButton.addEventListener("click", giveLetters);