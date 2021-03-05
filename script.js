const newLettersButton = document.querySelector("#newLetters");
const boardBody = document.querySelector("#boardBody");

function generateBoard() {
    for (let i = 1; i < 16; i++) {
        const newRow = document.createElement("tr");
        newRow.className += "boardRow";
            for (let i = 1; i < 16; i++) {
                const newTD = document.createElement("td");
                const newButton = document.createElement("button");
                newTD.append(newButton);
                newRow.append(newTD);
            }
        boardBody.append(newRow);
    }
}

document.body.onload = generateBoard;

function randomLetter() {
    const alphabet = "aeiouyrtzplkjhgfdsxcvbnměščřžýáíéůú";
    let letter = alphabet[Math.floor(Math.random() * alphabet.length)];
    return letter;
}

function giveLetters () {
    for (let i = 1; i < 8; i++){
        document.querySelector(`#letter${i}`).innerText = randomLetter();
    }    
}

newLettersButton.addEventListener("click", giveLetters);